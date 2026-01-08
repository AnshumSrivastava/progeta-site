
import glob
import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text(filepath):
    try:
        with zipfile.ZipFile(filepath) as z:
            content = z.read('content.xml')
        
        root = ET.fromstring(content)
        
        # ODT namespaces
        ns = {'text': 'urn:oasis:names:tc:opendocument:xmlns:text:1.0'}
        
        extracted = []
        for elem in root.iter():
            if elem.tag in [f"{{{ns['text']}}}p", f"{{{ns['text']}}}h"]:
                text = ''.join(elem.itertext())
                if text.strip():
                    extracted.append(text.strip())
        
        return "\n".join(extracted)
    except Exception as e:
        return f"Error reading {os.path.basename(filepath)}: {e}"

files = glob.glob("*.odt")
full_text = ""
for f in files:
    full_text += f"\n--- {f} ---\n"
    full_text += extract_text(f)
    full_text += "\n\n"

with open("extracted_content.txt", "w") as f:
    f.write(full_text)

print("Extraction complete. Check extracted_content.txt")
