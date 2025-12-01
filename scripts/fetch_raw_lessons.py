import urllib.request
import json
import urllib.parse
import os

def fetch_raw_lesson(lesson_title):
    base_url = "https://en.wikibooks.org/w/api.php"
    
    params = {
        "action": "query",
        "prop": "revisions",
        "titles": lesson_title,
        "rvprop": "content",
        "format": "json"
    }
    
    query_string = urllib.parse.urlencode(params)
    url = f"{base_url}?{query_string}"
    
    print(f"Fetching: {lesson_title}...")
    
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'DutchLearningAppBot/1.0 (Educational Project; mail@example.com)'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data.get("query", {}).get("pages", {})
            
            for page_id, page_data in pages.items():
                if "revisions" in page_data:
                    content = page_data["revisions"][0]["*"]
                    return content
    except Exception as e:
        print(f"Error fetching {lesson_title}: {e}")
        return None

def main():
    # Create a directory for raw data if it doesn't exist
    os.makedirs("data/raw_wikibooks", exist_ok=True)
    
    lessons_to_fetch = ["Dutch/Lesson 1", "Dutch/Lesson 2", "Dutch/Lesson 3"]
    
    for title in lessons_to_fetch:
        content = fetch_raw_lesson(title)
        if content:
            safe_title = title.replace("/", "_").replace(" ", "_")
            filename = f"data/raw_wikibooks/{safe_title}.txt"
            with open(filename, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Saved to {filename}")

if __name__ == "__main__":
    main()
