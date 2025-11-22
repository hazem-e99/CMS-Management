import json
import random
import string

# Read current db.json
with open('db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

# Helper function to create an image-text section
def create_image_text_section(page_title, page_id):
    random_id = ''.join(random.choices(string.ascii_lowercase + string.digits, k=12))
    
    return {
        "id": f"image-text-{random_id}",
        "type": "image-text",
        "content": {
            "en": {
                "title": f"About {page_title['en']}",
                "text": f"Learn more about our {page_title['en'].lower()} programs. We provide comprehensive support and resources to help you achieve your goals. Our experienced team is dedicated to delivering excellence in every aspect of our work.",
                "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
                "imageAlt": page_title['en'],
                "buttonText": "Get Started",
                "buttonLink": "#"
            },
            "ar": {
                "title": f"حول {page_title['ar']}",
                "text": f"تعرف على المزيد حول برامجنا في {page_title['ar']}. نحن نقدم الدعم الشامل والموارد لمساعدتك على تحقيق أهدافك. فريقنا ذو الخبرة ملتزم بتقديم التميز في كل جانب من جوانب عملنا.",
                "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
                "imageAlt": page_title['ar'],
                "buttonText": "ابدأ الآن",
                "buttonLink": "#"
            },
            "ku": {
                "title": f"دەربارەی {page_title['ku']}",
                "text": "زیاتر بزانە دەربارەی بەرنامەکانمان. ئێمە پشتگیری و سەرچاوەی تەواو پێشکەش دەکەین بۆ یارمەتیدانت لە گەیشتن بە ئامانجەکانت. تیمی شارەزامان پابەندە بە گەیاندنی باشترین لە هەموو لایەکی کارەکەماندا.",
                "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
                "imageAlt": page_title['ku'],
                "buttonText": "دەست پێ بکە",
                "buttonLink": "#"
            }
        },
        "settings": {
            "imagePosition": "left",
            "backgroundType": "color",
            "backgroundColor": "#ffffff",
            "textColor": "#111827",
            "paddingTop": "80px",
            "paddingBottom": "80px"
        },
        "order": 2
    }

# Add image-text section to all pages (after hero section)
count = 0
for page in db['pages']:
    # Check if page already has an image-text section
    has_image_text = any(s.get('type') == 'image-text' for s in page.get('sections', []))
    
    if not has_image_text:
        new_section = create_image_text_section(page['title'], page['id'])
        page['sections'].append(new_section)
        count += 1

# Write updated db.json
with open('db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print(f"Done! Added image-text sections to {count} pages!")
