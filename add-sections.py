import json
import random
import string

# Read current db.json
with open('db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

# Helper function to create a hero section
def create_hero_section(page_title, page_id):
    random_id = ''.join(random.choices(string.ascii_lowercase + string.digits, k=12))
    
    return {
        "id": f"hero-{random_id}",
        "type": "hero",
        "content": {
            "en": {
                "title": f"Welcome to {page_title['en']}",
                "subtitle": f"Discover our {page_title['en'].lower()} programs and initiatives",
                "buttonText": "Learn More",
                "buttonLink": "#"
            },
            "ar": {
                "title": f"مرحباً بك في {page_title['ar']}",
                "subtitle": f"اكتشف برامجنا ومبادراتنا",
                "buttonText": "اعرف المزيد",
                "buttonLink": "#"
            },
            "ku": {
                "title": f"بەخێربێیت بۆ {page_title['ku']}",
                "subtitle": "بەرنامە و دەستپێشخەریەکانمان بدۆزەرەوە",
                "buttonText": "زیاتر بزانە",
                "buttonLink": "#"
            }
        },
        "settings": {
            "backgroundType": "color",
            "backgroundColor": "#1e40af",
            "textColor": "#ffffff",
            "backgroundImage": "",
            "paddingTop": "100px",
            "paddingBottom": "100px"
        },
        "order": 1
    }

# Add hero section to pages without sections
count = 0
for page in db['pages']:
    if not page.get('sections') or len(page['sections']) == 0:
        page['sections'] = [create_hero_section(page['title'], page['id'])]
        count += 1

# Write updated db.json
with open('db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print(f"Done! Added sections to {count} pages!")
