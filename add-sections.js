const fs = require('fs');

// Read current db.json
const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

// Helper function to create a hero section
function createHeroSection(pageTitle) {
  return {
    id: `hero-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: 'hero',
    content: {
      en: {
        title: `Welcome to ${pageTitle.en}`,
        subtitle: `Discover our ${pageTitle.en.toLowerCase()} programs and initiatives`,
        buttonText: 'Learn More',
        buttonLink: '#'
      },
      ar: {
        title: `مرحباً بك في ${pageTitle.ar}`,
        subtitle: `اكتشف برامجنا ومبادراتنا في ${pageTitle.ar}`,
        buttonText: 'اعرف المزيد',
        buttonLink: '#'
      },
      ku: {
        title: `بەخێربێیت بۆ ${pageTitle.ku}`,
        subtitle: `بەرنامە و دەستپێشخەریەکانمان بدۆزەرەوە`,
        buttonText: 'زیاتر بزانە',
        buttonLink: '#'
      }
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#1e40af',
      textColor: '#ffffff',
      backgroundImage: '',
      paddingTop: '100px',
      paddingBottom: '100px'
    },
    order: 1
  };
}

// Add hero section to pages without sections
db.pages.forEach(page => {
  if (!page.sections || page.sections.length === 0) {
    page.sections = [createHeroSection(page.title)];
  }
});

// Write updated db.json
fs.writeFileSync('db.json', JSON.stringify(db, null, 2), 'utf8');
console.log('✅ Added sections to all pages!');
