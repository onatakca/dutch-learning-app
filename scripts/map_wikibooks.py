import urllib.request
import json
import urllib.parse

def map_wikibooks_dutch():
    # The base API endpoint for English Wikibooks
    base_url = "https://en.wikibooks.org/w/api.php"
    
    # Parameters to list all pages starting with "Dutch/"
    params = {
        "action": "query",
        "list": "allpages",
        "apprefix": "Dutch/",
        "aplimit": "500",
        "format": "json"
    }
    
    query_string = urllib.parse.urlencode(params)
    url = f"{base_url}?{query_string}"
    
    print(f"Querying API: {url}")
    print("-" * 50)
    
    # Add User-Agent header to comply with Wikimedia policy
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'DutchLearningAppBot/1.0 (Educational Project; mail@example.com)'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            
            pages = data.get("query", {}).get("allpages", [])
            
            if not pages:
                print("No pages found.")
                return

            print(f"Found {len(pages)} pages in the Dutch Wikibook structure:")
            print("-" * 50)
            
            # Categorize pages
            lessons = []
            appendices = []
            others = []
            
            for page in pages:
                title = page['title']
                if "Lesson" in title:
                    lessons.append(title)
                elif "Appendix" in title or "Grammar" in title:
                    appendices.append(title)
                else:
                    others.append(title)
            
            print("📚 LESSONS:")
            for title in sorted(lessons):
                print(f"  - {title}")
                
            print("\n📖 APPENDICES & GRAMMAR:")
            for title in sorted(appendices):
                print(f"  - {title}")
                
            print("\n📂 OTHER PAGES:")
            for title in sorted(others):
                print(f"  - {title}")

    except Exception as e:
        print(f"Error querying API: {e}")

if __name__ == "__main__":
    map_wikibooks_dutch()
