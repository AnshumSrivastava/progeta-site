
import json
import re
import os

def parse_content_deep(filepath):
    with open(filepath, 'r') as f:
        text = f.read()

    data = {
        "tracks": [],
        "modules": {
            "technical": [],
            "soft_skills": []
        },
        "workshops": [],
        "events": [],
        "benefits": []
    }
    
    def get_section_text(header, text):
        pattern = re.escape(header) + r"(.*?)(?=\n---|\Z)" # Read until next file marker or end
        match = re.search(pattern, text, re.DOTALL)
        return match.group(1).strip() if match else ""

    # --- 1. Parse Master Module Catalog (Reference Dict) ---
    # We do this first to populate the 'modules' list and have a lookup map
    
    module_details = {} # Map ID (str) -> Detail Dict
    
    # We scan the "Modules.odt" section primarily
    modules_section = get_section_text("--- Modules.odt ---", text)
    
    # Parser for Master Modules
    lines = modules_section.split('\n')
    current_mid = None
    current_m = None
    
    # Regex to find "1. Title"
    for i, line in enumerate(lines):
        line = line.strip()
        if not line: continue
        
        # Match "1. Title"
        match = re.match(r"^(\d+)\.\s+(.+)$", line)
        if match:
            # Check if this looks like a module header (followed by Goal/I/II)
            is_mod = False
            for j in range(1, 5):
                if i+j < len(lines):
                    l_next = lines[i+j].strip()
                    if l_next.startswith("Goal:") or l_next.startswith("I. Core"):
                        is_mod = True
                        break
            
            if is_mod:
                # Save previous
                if current_mid and current_m:
                    module_details[str(current_mid)] = current_m
                
                current_mid = match.group(1)
                current_m = {
                    "id": int(current_mid),
                    "title": match.group(2).strip(),
                    "category": "General", # Placeholder
                    "goal": "", "concepts": "", "tools": "", "skills": ""
                }
                continue
        
        if current_mid:
            if line.startswith("Goal:"):
                current_m["goal"] = line.replace("Goal:", "").strip()
            elif line.startswith("I. Core"):
                current_m["concepts"] = line.split(":", 1)[1].strip() if ":" in line else ""
            elif line.startswith("II. Tools"):
                current_m["tools"] = line.split(":", 1)[1].strip() if ":" in line else ""
            elif line.startswith("III. Skills"):
                current_m["skills"] = line.split(":", 1)[1].strip() if ":" in line else ""
            # Capture Category from header if we were smarter, but let's rely on list parsing for Category
    
    if current_mid and current_m:
         module_details[str(current_mid)] = current_m

    # Now populate data['modules'] using the List structure in "content.odt" or just use our extracted details
    # The 'content.odt' has the categorized list. Let's use that for structure and merge details.
    
    content_text = get_section_text("--- content.odt ---", text)
    tech_section_text = get_section_text("A. Technical Skill Modules (54 Modules)", content_text)
    # Be careful not to read into Soft Skills
    tech_section_text = tech_section_text.split("B. Soft Skill Modules")[0] # Simple split
    
    def process_category_list(section_text, is_tech):
        curr_cat = "General"
        list_out = []
        for line in section_text.split('\n'):
            line = line.strip()
            if not line: continue
            if not line[0].isdigit() and len(line) < 60:
                curr_cat = line
                continue
            
            match = re.match(r"^(\d+)\.\s+(.+)", line)
            if match:
                mid_str = match.group(1)
                title = match.group(2).strip().replace("(Bonus)", "").strip()
                
                # Retrieve details
                # Note: IDs might collide between tech/soft if not distinct?
                # In text, Tech are 1-54. Soft are 1-36?
                # Wait, "Soft #19" exists.
                # Let's assume unique IDs or use Title matching if ID fails?
                # Actually in 'Modules.odt', "1. Cybersecurity" is Tech. "1. Resume" is Soft.
                # IDs are NOT unique.
                # We need to distinguish via ID + Type or just Title.
                # Since 'module_details' was built from 'Modules.odt' which splits by part?
                # 'Modules.odt' has "Part 1: Technical...", "Part 2 ..."?
                # Let's filter 'module_details' by looking for title match.
                
                # Better approach: Iterate module_details and try to find matching title.
                detail = {}
                for k, v in module_details.items():
                    if v['title'].lower() == title.lower():
                        detail = v
                        break
                    # Fuzzy match?
                    if title.lower() in v['title'].lower() or v['title'].lower() in title.lower():
                        # loose match
                         detail = v
                         # keep searching for better match?
                
                mod_obj = {
                    "id": int(mid_str),
                    "title": title,
                    "category": curr_cat,
                    "goal": detail.get("goal", ""),
                    "concepts": detail.get("concepts", ""),
                    "tools": detail.get("tools", ""),
                    "skills": detail.get("skills", "")
                }
                list_out.append(mod_obj)
        return list_out

    data["modules"]["technical"] = process_category_list(tech_section_text, True)
    
    soft_section_text = get_section_text("B. Soft Skill Modules (36 Modules)", content_text)
    soft_section_text = soft_section_text.split("IV. The 12 Practical Workshops")[0]
    data["modules"]["soft_skills"] = process_category_list(soft_section_text, False)


    # --- 2. Parse Tracks with Structure (TrackModule.odt) ---
    tracks_section = get_section_text("--- TrackModule.odt ---", text)
    # Split by "Track X:"
    track_blocks = re.split(r"Track \d+:", tracks_section)
    
    # Block 0 is intro, 1-6 are tracks
    for i in range(1, len(track_blocks)):
        block = track_blocks[i]
        # Get Title (first line)
        lines = block.strip().split('\n')
        title = lines[0].strip()
        
        # Phases
        phases = []
        current_phase = None
        
        for line in lines:
            line = line.strip()
            if line.startswith("Phase"):
                if current_phase: phases.append(current_phase)
                current_phase = {"name": line, "modules": []} # line is "Phase 1: ..."
            elif line.startswith("Tech #") or line.startswith("Soft #"):
                # Parse "Tech #1: Title (Note)"
                # Regex: (Tech|Soft) #(\d+): (.+)
                m = re.match(r"(Tech|Soft)\s+#(\d+):\s+(.+)", line)
                if m and current_phase:
                    m_type = "Technical" if m.group(1) == "Tech" else "Soft Skills"
                    m_id = m.group(2)
                    m_name = m.group(3)
                    # Clean name of parens if needed? Keep them for context
                    current_phase["modules"].append({
                        "id": m_id,
                        "title": m_name,
                        "type": m_type
                    })
        
        if current_phase: phases.append(current_phase)
        
        data["tracks"].append({
            "id": i,
            "title": title,
            "phases": phases
        })

    # --- 3. Parse Workshops (WorkShops.odt) ---
    ws_section = get_section_text("--- WorkShops.odt ---", text)
    # Split by "X. Title"
    # Use robust line iteration
    ws_lines = ws_section.split('\n')
    current_ws = None
    
    for line in ws_lines:
        line = line.strip()
        if not line: continue
        
        # New Workshop: "1. The Bug Bounty Hunter"
        if re.match(r"^\d+\.\s", line) and not line.startswith("2026"): # Avoid data lines
             # Save prev
             if current_ws: data["workshops"].append(current_ws)
             current_ws = {
                 "title": re.sub(r"^\d+\.\s", "", line), 
                 "role": "", "mission": "", "tech_mods": [], "soft_mods": [], "outcome": ""
             }
             continue
        
        if current_ws:
            if line.startswith("Role:"):
                current_ws["role"] = line.replace("Role:", "").strip()
            elif line.startswith("Mission:"):
                current_ws["mission"] = line.replace("Mission:", "").strip()
            elif line.startswith("Outcome:"):
                current_ws["outcome"] = line.replace("Outcome:", "").strip()
            elif line.startswith("[Tech #"):
                # [Tech #20] Web Application Security...
                m = re.search(r"\[Tech #(\d+)\]\s+(.+)", line)
                if m:
                    current_ws["tech_mods"].append({"id": m.group(1), "title": m.group(2)})
            elif line.startswith("[Soft #"):
                m = re.search(r"\[Soft #(\d+)\]\s+(.+)", line)
                if m:
                    current_ws["soft_mods"].append({"id": m.group(1), "title": m.group(2)})
    
    if current_ws: data["workshops"].append(current_ws)

    # --- 4. Events & Benefits (Reuse Logic) ---
    benefits_text = get_section_text("I. Student Benefits & Deliverables", content_text)
    for line in benefits_text.split('\n'):
        if ':' in line:
            title, desc = line.split(':', 1)
            data["benefits"].append({"title": title.strip(), "description": desc.strip()})

    events_text = get_section_text("V. The 18 Community Events", content_text)
    curr_t = "General"
    for line in events_text.split('\n'):
        line = line.strip()
        if "Events" in line and "(" in line:
            curr_t = line.split("(")[0].strip()
            continue
        if re.match(r"\d+\.\s", line):
             data["events"].append({"title": re.sub(r"^\d+\.\s", "", line), "type": curr_t})

    return data

if __name__ == "__main__":
    if os.path.exists("extracted_content.txt"):
        try:
            data = parse_content_deep("extracted_content.txt")
            with open("data.json", "w") as f:
                json.dump(data, f, indent=2)
            print("Successfully regenerated rich data.json")
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
    else:
        print("extracted_content.txt missing")
