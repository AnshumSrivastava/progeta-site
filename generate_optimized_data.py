
import json
import re

def optimize_text():
    with open('extracted_content.txt', 'r') as f:
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

    # Helper for sections
    def get_section(header, end_pattern, src):
        pattern = re.escape(header) + r"(.*?)" + end_pattern
        match = re.search(pattern, src, re.DOTALL)
        return match.group(1).strip() if match else ""

    # --- 1. DETAILS PARSING (Build Dictionary) ---
    # We must split Tech (Part 1) and Soft (Part 2) to avoid ID collision
    
    modules_odt = get_section("--- Modules.odt ---", "--- ModulesList.odt ---", text)
    part1_tech = get_section("Part 1: Technical Skill Modules", "Part 2: Soft Skill Modules", modules_odt)
    part2_soft = modules_odt.split("Part 2: Soft Skill Modules")[-1] # Rest of file

    def parse_details(section_text):
        details = {} # Map ID (int) -> Dict
        lines = section_text.split('\n')
        curr_id = None
        curr_obj = {}
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line: continue
            
            # Match "1. Title"
            match = re.match(r"^(\d+)\.\s+(.+)$", line)
            
            # Check if this is a header by looking ahead for "Goal:" or "I. "
            is_header = False
            if match:
                for j in range(1, 5):
                    if i+j < len(lines):
                        nxt = lines[i+j].strip()
                        if nxt.startswith("Goal:") or nxt.startswith("I. Core"):
                            is_header = True
                            break
            
            if is_header:
                # Save previous
                if curr_id: details[curr_id] = curr_obj
                
                curr_id = int(match.group(1))
                curr_obj = {
                    "title": match.group(2).strip(),
                    "goal": "", "concepts": "", "tools": "", "skills": ""
                }
                continue
            
            if curr_id:
                if line.startswith("Goal:"):
                    curr_obj["goal"] = line.replace("Goal:", "").strip()
                elif line.startswith("I. Core Concepts"):
                    curr_obj["concepts"] = line.split(":", 1)[1].strip() if ":" in line else ""
                elif line.startswith("II. Tools"):
                    curr_obj["tools"] = line.split(":", 1)[1].strip() if ":" in line else ""
                elif line.startswith("III. Skills"):
                    curr_obj["skills"] = line.split(":", 1)[1].strip() if ":" in line else ""
        
        if curr_id: details[curr_id] = curr_obj
        return details

    tech_details = parse_details(part1_tech)
    soft_details = parse_details(part2_soft)

    # --- 2. LIST PARSING (Populate Data with Categories) ---
    modules_list = get_section("--- ModulesList.odt ---", "IV. The 12 Practical Workshops", text)
    tech_list_text = get_section("A. Technical Skill Modules", "B. Soft Skill Modules", modules_list)
    soft_list_text = modules_list.split("B. Soft Skill Modules")[-1]

    def process_list(list_text, details_dict, output_list, is_tech):
        curr_cat = "General"
        for line in list_text.split('\n'):
            line = line.strip()
            if not line: continue
            
            # Detect Category (No digit start, not unreasonably long)
            if not line[0].isdigit() and len(line) < 60:
                curr_cat = line
                continue
            
            match = re.match(r"^(\d+)\.\s+(.+)", line)
            if match:
                mid = int(match.group(1))
                mtitle = match.group(2).strip().replace("(Bonus)", "").strip()
                
                # Retrieve detail
                # Prioritize ID match if title is similar
                detail = details_dict.get(mid)
                
                # Check for mismatch (e.g. ID reuse issues or misalignment)
                # If detail tile is very different, we might have an issue
                # But here we split sections so ID should be unique per section.
                
                goal = detail["goal"] if detail else "Content locked."
                tools = detail["tools"] if detail else ""
                skills = detail["skills"] if detail else ""
                
                # --- OPTIMIZATION (Rewriting) ---
                # Remove repeats
                if goal.startswith("Goal:"): goal = goal[5:].strip()
                
                output_list.append({
                    "id": mid,
                    "title": mtitle,
                    "category": curr_cat,
                    "goal": goal,
                    "tools": tools,
                    "skills": skills,
                    "type": "Technical" if is_tech else "Soft Skills"
                })

    process_list(tech_list_text, tech_details, data["modules"]["technical"], True)
    process_list(soft_list_text, soft_details, data["modules"]["soft_skills"], False)

    # --- 3. TRACKS ---
    tracks_text = get_section("--- TrackModule.odt ---", "--- content.odt ---", text)
    current_track = None
    
    # Simple state machine for tracks
    lines = tracks_text.split('\n')
    for line in lines:
        line = line.strip()
        if not line: continue
        
        # Track Header: "Track 1: ..."
        match = re.match(r"Track (\d+):\s+(.+)", line)
        if match:
            if current_track: data["tracks"].append(current_track)
            current_track = {
                "id": int(match.group(1)),
                "title": match.group(2),
                "phases": []
            }
            continue
        
        # Phase Header: "Phase X: ..."
        if line.startswith("Phase") and current_track:
             current_track["phases"].append({"name": line, "modules": []})
             continue
             
        # Module Item: "Tech #1: ..." or "Soft #1: ..."
        m_match = re.match(r"(Tech|Soft)\s+#(\d+):\s+(.+)", line)
        if m_match and current_track and current_track["phases"]:
            m_type = "Technical" if m_match.group(1) == "Tech" else "Soft Skills"
            m_id = m_match.group(2)
            m_title = m_match.group(3)
            # Remove parentheses usage for cleaner title if needed
            # m_title = re.sub(r"\(.*?\)", "", m_title).strip() 
            
            # Add to last phase
            current_track["phases"][-1]["modules"].append({
                "id": m_id,
                "title": m_title,
                "type": m_type
            })
            
    if current_track: data["tracks"].append(current_track)

    # --- 4. WORKSHOPS ---
    ws_text = get_section("--- WorkShops.odt ---", "--- Modules.odt ---", text)
    current_ws = None
    for line in ws_text.split('\n'):
        line = line.strip()
        if not line: continue
        
        if re.match(r"^\d+\.\s", line):
            if current_ws: data["workshops"].append(current_ws)
            current_ws = {
                "title": re.sub(r"^\d+\.\s", "", line).strip(),
                "role": "", "mission": "", "outcome": "",
                "tech_mods": [], "soft_mods": []
            }
            continue
            
        if current_ws:
            if line.startswith("Role:"): current_ws["role"] = line.replace("Role:", "").strip()
            if line.startswith("Mission:"): current_ws["mission"] = line.replace("Mission:", "").strip()
            if line.startswith("Outcome:"): current_ws["outcome"] = line.replace("Outcome:", "").strip()
            
            m = re.search(r"\[Tech #(\d+)\]\s+(.+)", line)
            if m: current_ws["tech_mods"].append({"id": m.group(1), "title": m.group(2)})
            
            m = re.search(r"\[Soft #(\d+)\]\s+(.+)", line)
            if m: current_ws["soft_mods"].append({"id": m.group(1), "title": m.group(2)})

    if current_ws: data["workshops"].append(current_ws)

    # --- 5. EVENTS ---
    # We use 'text' but with a safety stop
    # The clean list is likely the LAST occurrence in the file (Lines 1353+), 
    # but to be safe we will parse, and if we hit a file header "--- ... ---", we stop.
    
    # Let's try to extract strictly from the ModulesList section again, matching the file structure
    # ModulesList.odt contains "V. The 18 Community Events" ... "Would you like"
    
    events_raw = get_section("V. The 18 Community Events", "Would you like", text)
    
    # If get_section grabs the first occurrence (line 292), it might span until the END of the file 
    # if "Would you like" (line 1375) is the *only* occurrence.
    # PROBABLE CAUSE: "V. The 18..." at 292 goes all the way to 1375, swallowing everything in between (Events.odt, Tracks, etc).
    
    # FIX: Split the events_raw by any File Header "---" and take the first chunk? 
    # Better: Split text by "V. The 18..." and take the LAST chunk (lines 1353+).
    
    events_chunk = text.split("V. The 18 Community Events")[-1] 
    events_chunk = events_chunk.split("Would you like")[0]
    
    curr_t = "Technical Events"
    
    for line in events_chunk.split('\n'):
        line = line.strip()
        if not line: continue
        
        # STOP if we hit a file header (Just in case)
        if line.startswith("--- ") and line.endswith(" ---"):
            break
            
        # Header Detection
        if "Events (" in line:
            curr_t = line.split("(")[0].strip()
            continue
            
        # Skip description line "Short, high-impact..."
        if line.startswith("Short, high-impact"): continue

        # Event Parsing
        title = line
        desc = ""
        
        m = re.match(r"(.+?)\s+\((.+)\)$", line)
        if m:
            title = m.group(1).strip()
            desc = m.group(2).strip()
        elif ":" in line:
             parts = line.split(":", 1)
             title = parts[0].strip()
             desc = parts[1].strip()
        
        # Extra Sanitation: If title is too long or looks like a paragraph, skip
        if len(title) > 100 or "Here is the" in title or "Track" in title:
            continue

        data["events"].append({
            "title": title,
            "description": desc,
            "type": curr_t
        })

    # --- 6. BENEFITS ---
    benefits_text = get_section("I. Student Benefits & Deliverables", "II. The 6 Career Tracks", modules_list)
    for line in benefits_text.split('\n'):
        line = line.strip()
        if not line: continue
        
        if ":" in line:
            parts = line.split(":", 1)
            data["benefits"].append({
                "title": parts[0].strip(),
                "description": parts[1].strip()
            })
            
    # --- 6. OUTPUT ---
    json_str = json.dumps(data, indent=2)
    js_content = f"const siteData = {json_str};\n"
    
    with open("data.js", "w") as f:
        f.write(js_content)
    
    print("Optimization Complete. data.js generated.")

if __name__ == "__main__":
    optimize_text()
