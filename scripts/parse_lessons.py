import re
import json
import os

def parse_wikitext(text, lesson_id, title):
    blocks = []
    
    # 1. Split into sections based on headers
    # Regex to find == Header ==
    sections = re.split(r'(==+[^=]+==+)', text)
    
    current_section_title = "Introduction"
    
    for i, section in enumerate(sections):
        section = section.strip()
        if not section:
            continue
            
        # Check if it's a header
        header_match = re.match(r'^(==+)([^=]+)(==+)$', section)
        if header_match:
            current_section_title = header_match.group(2).strip()
            # Clean up title (remove ~ part if exists)
            if "~" in current_section_title:
                current_section_title = current_section_title.split("~")[1].strip()
            
            blocks.append({
                "type": "heading",
                "content": current_section_title
            })
            continue
            
        # Process content within section
        
        # A. Look for Textboxes (Dialogues/Stories)
        textbox_matches = re.finditer(r'{{Dutch/Textbox\|(.*?)(?:}}|$)', section, re.DOTALL)
        for match in textbox_matches:
            content = match.group(1)
            lines = content.split('\n')
            dialogue_lines = []
            
            for line in lines:
                line = line.strip()
                # Remove {{C|Dutch|English}} templates and keep Dutch for display
                # We want to capture the translation for a "hover" effect ideally, 
                # but for now let's just clean it to readable text.
                
                # Regex to replace {{C|Dutch|English}} with Dutch (English)
                # or just Dutch depending on preference. Let's do Dutch.
                
                # Simple cleanup of {{C|...}}
                clean_line = re.sub(r'{{C\|([^|]+)\|([^}]+)}}', r'\1', line)
                
                # Remove other templates
                clean_line = re.sub(r'\[\[File:[^\]]+\]\]', '', clean_line)
                clean_line = re.sub(r"'''", "", clean_line)
                clean_line = re.sub(r"''", "", clean_line)
                
                if clean_line and not clean_line.startswith(';'):
                    dialogue_lines.append(clean_line)
            
            if dialogue_lines:
                blocks.append({
                    "type": "text",
                    "content": "<br>".join(dialogue_lines) # Simple text block for now
                })

        # B. Look for Vocabulary Tables
        # {|class="wikitable ...
        table_matches = re.finditer(r'\{\|class="wikitable.*?(?:\n\|})(?:$)', section, re.DOTALL)
        # Note: The regex above is weak for nested tables, but Wikibooks usually doesn't nest deeply here.
        # Let's try a simpler line-by-line approach for tables if regex fails or just look for vocab patterns.
        
        # Alternative: Scan for lines with || that look like vocab
        vocab_items = []
        lines = section.split('\n')
        for line in lines:
            if '||' in line and '{{Nlwikt|' in line:
                # Likely a vocab row: |{{Nlwikt|word}}||[[file:..]]||translation
                parts = line.split('||')
                if len(parts) >= 3:
                    dutch_part = parts[0].strip()
                    english_part = parts[-1].strip()
                    
                    # Extract word from {{Nlwikt|word}}
                    word_match = re.search(r'{{Nlwikt\|([^}]+)}}', dutch_part)
                    if word_match:
                        dutch_word = word_match.group(1)
                        
                        # Clean english part
                        english_word = english_part.replace('[[', '').replace(']]', '')
                        
                        vocab_items.append({
                            "dutch": dutch_word,
                            "english": english_word
                        })
        
        if vocab_items:
            # Create a phrase block for each, or a list?
            # Let's create a list of phrases
            for item in vocab_items:
                 blocks.append({
                    "type": "phrase",
                    "dutch": item['dutch'],
                    "english": item['english']
                })

        # C. Regular Text (Paragraphs)
        # If we haven't matched special blocks, treat as text
        # Remove templates and markup
        clean_text = re.sub(r'{{.*?}}', '', section) # Remove all templates
        clean_text = re.sub(r'\[\[.*?\]\]', '', clean_text) # Remove links/images
        clean_text = re.sub(r'<.*?>', '', clean_text) # Remove HTML tags
        
        # Split by double newline for paragraphs
        paras = clean_text.split('\n\n')
        for p in paras:
            p = p.strip()
            if len(p) > 50 and not p.startswith('{') and not p.startswith('|'):
                blocks.append({
                    "type": "text",
                    "content": p
                })
                
    return {
        "id": lesson_id,
        "title": title,
        "description": f"Generated from Wikibooks: {title}",
        "level": "Beginner",
        "duration": "15 min",
        "image": "📚",
        "content": blocks
    }

def main():
    raw_dir = "data/raw_wikibooks"
    output_file = "data/lessons_generated.js"
    
    lessons = []
    
    for filename in sorted(os.listdir(raw_dir)):
        if filename.endswith(".txt"):
            filepath = os.path.join(raw_dir, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                
            # Derive title from filename
            title = filename.replace("Dutch_", "").replace(".txt", "").replace("_", " ")
            lesson_id = filename.replace(".txt", "").lower()
            
            print(f"Parsing {filename}...")
            lesson_data = parse_wikitext(content, lesson_id, title)
            lessons.append(lesson_data)
            
    # Write to JS file
    js_content = f"window.lessonsData = {json.dumps(lessons, indent=4)};"
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Successfully generated {output_file}")

if __name__ == "__main__":
    main()
