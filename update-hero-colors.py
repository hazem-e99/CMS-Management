import json

# Read current db.json
with open('db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

# Update all hero sections to have white background and black text
count = 0
for page in db['pages']:
    for section in page.get('sections', []):
        if section.get('type') == 'hero':
            # Update settings
            if 'settings' in section:
                section['settings']['backgroundColor'] = '#ffffff'
                section['settings']['textColor'] = '#000000'
                count += 1

# Write updated db.json
with open('db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print(f"Done! Updated {count} hero sections to white background with black text!")
