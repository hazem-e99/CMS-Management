/**
 * Mock data for sections library
 */

export const sectionsLibrary = [
  {
    id: 'hero-1',
    type: 'hero',
    name: {
      en: 'Hero Section',
      ar: 'قسم البطل',
      ku: 'بەشی سەرەکی',
    },
    description: {
      en: 'Large hero section with title, subtitle and CTA button',
      ar: 'قسم بطل كبير مع عنوان وعنوان فرعي وزر',
      ku: 'بەشێکی گەورەی سەرەکی بە ناونیشان و دوگمە',
    },
    defaultContent: {
      en: {
        title: 'Welcome to Our Website',
        subtitle: 'Build amazing experiences with our platform',
        buttonText: 'Get Started',
        buttonLink: '#',
      },
      ar: {
        title: 'مرحباً بك في موقعنا',
        subtitle: 'قم ببناء تجارب رائعة مع منصتنا',
        buttonText: 'ابدأ الآن',
        buttonLink: '#',
      },
      ku: {
        title: 'بەخێربێیت بۆ ماڵپەڕەکەمان',
        subtitle: 'ئەزموونی سەرنجڕاکێش دروست بکە',
        buttonText: 'دەست پێبکە',
        buttonLink: '#',
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#0ea5e9',
      textColor: '#ffffff',
      backgroundImage: '',
      backgroundVideo: '',
      backgroundOverlay: true,
      overlayOpacity: 0.5,
      paddingTop: '80px',
      paddingBottom: '80px',
      minHeight: '500px',
    },
  },
  {
    id: 'features-1',
    type: 'features',
    name: {
      en: 'Features Grid',
      ar: 'شبكة المميزات',
      ku: 'تۆڕی تایبەتمەندییەکان',
    },
    description: {
      en: 'Grid layout showcasing features',
      ar: 'تخطيط شبكي لعرض المميزات',
      ku: 'شێوازی تۆڕ بۆ پیشاندانی تایبەتمەندییەکان',
    },
    defaultContent: {
      en: {
        title: 'Our Features',
        features: [
          {
            title: 'Fast Performance',
            description: 'Lightning fast load times',
            icon: '⚡',
          },
          {
            title: 'Secure',
            description: 'Enterprise-grade security',
            icon: '🔒',
          },
          {
            title: 'Scalable',
            description: 'Grows with your business',
            icon: '📈',
          },
        ],
      },
      ar: {
        title: 'مميزاتنا',
        features: [
          {
            title: 'أداء سريع',
            description: 'أوقات تحميل سريعة للغاية',
            icon: '⚡',
          },
          {
            title: 'آمن',
            description: 'أمان على مستوى المؤسسات',
            icon: '🔒',
          },
          {
            title: 'قابل للتوسع',
            description: 'ينمو مع عملك',
            icon: '📈',
          },
        ],
      },
      ku: {
        title: 'تایبەتمەندییەکانمان',
        features: [
          {
            title: 'کارکردنی خێرا',
            description: 'کاتی بارکردنی زۆر خێرا',
            icon: '⚡',
          },
          {
            title: 'پارێزراو',
            description: 'پاراستنی ئاستی کۆمپانیا',
            icon: '🔒',
          },
          {
            title: 'گەشەپێدراو',
            description: 'لەگەڵ کارەکەت گەشە دەکات',
            icon: '📈',
          },
        ],
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#f9fafb',
      textColor: '#111827',
      backgroundImage: '',
      paddingTop: '64px',
      paddingBottom: '64px',
      columns: 3,
    },
  },
  {
    id: 'cta-1',
    type: 'cta',
    name: {
      en: 'Call to Action',
      ar: 'دعوة لاتخاذ إجراء',
      ku: 'بانگهێشتی کردار',
    },
    description: {
      en: 'Call to action section with button',
      ar: 'قسم دعوة لاتخاذ إجراء مع زر',
      ku: 'بەشی بانگهێشتی کردار بە دوگمە',
    },
    defaultContent: {
      en: {
        title: 'Ready to Get Started?',
        description: 'Join thousands of satisfied customers today',
        buttonText: 'Sign Up Now',
        buttonLink: '#',
      },
      ar: {
        title: 'هل أنت مستعد للبدء؟',
        description: 'انضم إلى آلاف العملاء الراضين اليوم',
        buttonText: 'سجل الآن',
        buttonLink: '#',
      },
      ku: {
        title: 'ئامادەیت بۆ دەستپێکردن؟',
        description: 'ئەمڕۆ بەشداری هەزاران کڕیاری ڕازی بە',
        buttonText: 'ئێستا تۆمار بکە',
        buttonLink: '#',
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#0ea5e9',
      textColor: '#ffffff',
      backgroundImage: '',
      backgroundVideo: '',
      backgroundOverlay: true,
      overlayOpacity: 0.3,
      paddingTop: '64px',
      paddingBottom: '64px',
    },
  },
  {
    id: 'testimonials-1',
    type: 'testimonials',
    name: {
      en: 'Testimonials',
      ar: 'الشهادات',
      ku: 'شایەتییەکان',
    },
    description: {
      en: 'Customer testimonials section',
      ar: 'قسم شهادات العملاء',
      ku: 'بەشی شایەتی کڕیاران',
    },
    defaultContent: {
      en: {
        title: 'What Our Customers Say',
        testimonials: [
          {
            content: 'This product changed my life! Highly recommended.',
            name: 'John Doe',
            role: 'CEO, Company Inc',
            avatar: '',
          },
          {
            content: 'Amazing service and great support team.',
            name: 'Jane Smith',
            role: 'Marketing Director',
            avatar: '',
          },
        ],
      },
      ar: {
        title: 'ماذا يقول عملاؤنا',
        testimonials: [
          {
            content: 'هذا المنتج غير حياتي! أوصي به بشدة.',
            name: 'أحمد محمد',
            role: 'المدير التنفيذي',
            avatar: '',
          },
          {
            content: 'خدمة رائعة وفريق دعم ممتاز.',
            name: 'فاطمة علي',
            role: 'مديرة التسويق',
            avatar: '',
          },
        ],
      },
      ku: {
        title: 'کڕیارەکانمان چی دەڵێن',
        testimonials: [
          {
            content: 'ئەم بەرهەمە ژیانی منی گۆڕی! زۆر باشە.',
            name: 'ئەحمەد محەمەد',
            role: 'بەڕێوەبەری گشتی',
            avatar: '',
          },
          {
            content: 'خزمەتگوزاری نایاب و تیمی پشتگیری نایاب.',
            name: 'فاتیمە عەلی',
            role: 'بەڕێوەبەری مارکێتینگ',
            avatar: '',
          },
        ],
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      backgroundImage: '',
      paddingTop: '64px',
      paddingBottom: '64px',
    },
  },
  {
    id: 'gallery-1',
    type: 'gallery',
    name: {
      en: 'Image Gallery',
      ar: 'معرض الصور',
      ku: 'گالێری وێنە',
    },
    description: {
      en: 'Image gallery grid',
      ar: 'شبكة معرض الصور',
      ku: 'تۆڕی گالێری وێنە',
    },
    defaultContent: {
      en: {
        title: 'Our Gallery',
        images: [
          { url: '', caption: 'Image 1' },
          { url: '', caption: 'Image 2' },
          { url: '', caption: 'Image 3' },
          { url: '', caption: 'Image 4' },
          { url: '', caption: 'Image 5' },
          { url: '', caption: 'Image 6' },
        ],
      },
      ar: {
        title: 'معرضنا',
        images: [
          { url: '', caption: 'صورة 1' },
          { url: '', caption: 'صورة 2' },
          { url: '', caption: 'صورة 3' },
          { url: '', caption: 'صورة 4' },
          { url: '', caption: 'صورة 5' },
          { url: '', caption: 'صورة 6' },
        ],
      },
      ku: {
        title: 'گالێریەکەمان',
        images: [
          { url: '', caption: 'وێنە 1' },
          { url: '', caption: 'وێنە 2' },
          { url: '', caption: 'وێنە 3' },
          { url: '', caption: 'وێنە 4' },
          { url: '', caption: 'وێنە 5' },
          { url: '', caption: 'وێنە 6' },
        ],
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#f9fafb',
      textColor: '#111827',
      backgroundImage: '',
      paddingTop: '64px',
      paddingBottom: '64px',
      columns: 3,
    },
  },
  {
    id: 'faq-1',
    type: 'faq',
    name: {
      en: 'FAQ Section',
      ar: 'قسم الأسئلة الشائعة',
      ku: 'بەشی پرسیارە باوەکان',
    },
    description: {
      en: 'Frequently asked questions',
      ar: 'الأسئلة المتكررة',
      ku: 'پرسیارە دووبارەکان',
    },
    defaultContent: {
      en: {
        title: 'Frequently Asked Questions',
        faqs: [
          {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day money-back guarantee on all purchases.',
          },
          {
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 5-7 business days.',
          },
          {
            question: 'Do you offer customer support?',
            answer: 'Yes, we provide 24/7 customer support via email and chat.',
          },
        ],
      },
      ar: {
        title: 'الأسئلة الشائعة',
        faqs: [
          {
            question: 'ما هي سياسة الإرجاع؟',
            answer: 'نقدم ضمان استرداد الأموال لمدة 30 يومًا على جميع المشتريات.',
          },
          {
            question: 'كم من الوقت يستغرق الشحن؟',
            answer: 'يستغرق الشحن القياسي من 5 إلى 7 أيام عمل.',
          },
          {
            question: 'هل تقدمون دعم العملاء؟',
            answer: 'نعم، نقدم دعم العملاء على مدار الساعة عبر البريد الإلكتروني والدردشة.',
          },
        ],
      },
      ku: {
        title: 'پرسیارە دووبارەکان',
        faqs: [
          {
            question: 'سیاسەتی گەڕاندنەوە چییە؟',
            answer: 'مۆڵەتی گەڕاندنەوەی پارە بۆ 30 ڕۆژ پێشکەش دەکەین.',
          },
          {
            question: 'گەیاندن چەند کات دەخایەنێت؟',
            answer: 'گەیاندنی ئاسایی 5-7 ڕۆژی کاری دەخایەنێت.',
          },
          {
            question: 'پشتگیری کڕیار پێشکەش دەکەن؟',
            answer: 'بەڵێ، پشتگیری 24/7 لە ڕێگەی ئیمەیڵ و چات پێشکەش دەکەین.',
          },
        ],
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      backgroundImage: '',
      paddingTop: '64px',
      paddingBottom: '64px',
    },
  },
  {
    id: 'image-text-left-1',
    type: 'image-text-left',
    name: {
      en: 'Image Left - Text Right',
      ar: 'صورة يسار - نص يمين',
      ku: 'وێنە لای چەپ - دەق لای ڕاست',
    },
    description: {
      en: 'Image on the left with title and description on the right',
      ar: 'صورة على اليسار مع عنوان ووصف على اليمين',
      ku: 'وێنە لە لای چەپ لەگەڵ ناونیشان و وەسف لە لای ڕاست',
    },
    defaultContent: {
      en: {
        title: 'Discover Our Story',
        description: 'We are passionate about creating amazing experiences for our customers. Our journey started with a simple idea and has grown into something truly special.',
        imageUrl: '',
        imageAlt: 'Feature image',
        buttonText: 'Learn More',
        buttonLink: '#',
      },
      ar: {
        title: 'اكتشف قصتنا',
        description: 'نحن شغوفون بخلق تجارب رائعة لعملائنا. بدأت رحلتنا بفكرة بسيطة ونمت لتصبح شيئًا مميزًا حقًا.',
        imageUrl: '',
        imageAlt: 'صورة الميزة',
        buttonText: 'اعرف المزيد',
        buttonLink: '#',
      },
      ku: {
        title: 'چیرۆکەکەمان بزانە',
        description: 'ئێمە حەزمان لە دروستکردنی ئەزموونی سەرنجڕاکێش بۆ کڕیارەکانمان هەیە. گەشتەکەمان بە بیرۆکەیەکی سادە دەستی پێکرد و بووە شتێکی تایبەت.',
        imageUrl: '',
        imageAlt: 'وێنەی تایبەتمەندی',
        buttonText: 'زیاتر بزانە',
        buttonLink: '#',
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      backgroundImage: '',
      paddingTop: '64px',
      paddingBottom: '64px',
      imageWidth: '50%',
    },
  },
  {
    id: 'image-text-right-1',
    type: 'image-text-right',
    name: {
      en: 'Image Right - Text Left',
      ar: 'صورة يمين - نص يسار',
      ku: 'وێنە لای ڕاست - دەق لای چەپ',
    },
    description: {
      en: 'Text on the left with image on the right',
      ar: 'نص على اليسار مع صورة على اليمين',
      ku: 'دەق لە لای چەپ لەگەڵ وێنە لە لای ڕاست',
    },
    defaultContent: {
      en: {
        title: 'Why Choose Us',
        description: 'Our commitment to excellence and customer satisfaction sets us apart. We deliver quality results that exceed expectations every time.',
        imageUrl: '',
        imageAlt: 'Feature image',
        buttonText: 'Get Started',
        buttonLink: '#',
      },
      ar: {
        title: 'لماذا تختارنا',
        description: 'التزامنا بالتميز ورضا العملاء يميزنا. نقدم نتائج عالية الجودة تتجاوز التوقعات في كل مرة.',
        imageUrl: '',
        imageAlt: 'صورة الميزة',
        buttonText: 'ابدأ الآن',
        buttonLink: '#',
      },
      ku: {
        title: 'بۆچی ئێمە هەڵبژێریت',
        description: 'پابەندبوونمان بە باشی و ڕەزامەندی کڕیار جیامان دەکاتەوە. ئەنجامی کوالیتی دابین دەکەین کە چاوەڕوانی تێدەپەڕێنێت.',
        imageUrl: '',
        imageAlt: 'وێنەی تایبەتمەندی',
        buttonText: 'دەست پێبکە',
        buttonLink: '#',
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#f9fafb',
      textColor: '#111827',
      backgroundImage: '',
      paddingTop: '64px',
      paddingBottom: '64px',
      imageWidth: '50%',
    },
  },
  {
    id: 'pricing-table-1',
    type: 'pricing-table',
    name: {
      en: 'Pricing Table',
      ar: 'جدول الأسعار',
      ku: 'خشتەی نرخەکان',
    },
    description: {
      en: 'Customizable pricing table with plans',
      ar: 'جدول أسعار قابل للتخصيص مع الخطط',
      ku: 'خشتەی نرخی گونجاو لەگەڵ پلانەکان',
    },
    defaultContent: {
      en: {
        title: 'Choose Your Plan',
        subtitle: 'Select the perfect plan for your needs',
        plans: [
          {
            name: 'Basic',
            price: '$9',
            period: '/month',
            features: [
              'Up to 10 users',
              '5GB storage',
              'Email support',
              'Basic features',
            ],
            buttonText: 'Get Started',
            buttonLink: '#',
            highlighted: false,
          },
          {
            name: 'Pro',
            price: '$29',
            period: '/month',
            features: [
              'Up to 50 users',
              '50GB storage',
              'Priority support',
              'Advanced features',
              'Analytics dashboard',
            ],
            buttonText: 'Get Started',
            buttonLink: '#',
            highlighted: true,
          },
          {
            name: 'Enterprise',
            price: '$99',
            period: '/month',
            features: [
              'Unlimited users',
              'Unlimited storage',
              '24/7 support',
              'All features',
              'Custom integrations',
              'Dedicated manager',
            ],
            buttonText: 'Contact Us',
            buttonLink: '#',
            highlighted: false,
          },
        ],
      },
      ar: {
        title: 'اختر خطتك',
        subtitle: 'اختر الخطة المثالية لاحتياجاتك',
        plans: [
          {
            name: 'أساسي',
            price: '$9',
            period: '/شهر',
            features: [
              'حتى 10 مستخدمين',
              '5 جيجابايت تخزين',
              'دعم البريد الإلكتروني',
              'الميزات الأساسية',
            ],
            buttonText: 'ابدأ الآن',
            buttonLink: '#',
            highlighted: false,
          },
          {
            name: 'احترافي',
            price: '$29',
            period: '/شهر',
            features: [
              'حتى 50 مستخدم',
              '50 جيجابايت تخزين',
              'دعم ذو أولوية',
              'ميزات متقدمة',
              'لوحة التحليلات',
            ],
            buttonText: 'ابدأ الآن',
            buttonLink: '#',
            highlighted: true,
          },
          {
            name: 'مؤسسات',
            price: '$99',
            period: '/شهر',
            features: [
              'مستخدمون غير محدودين',
              'تخزين غير محدود',
              'دعم 24/7',
              'جميع الميزات',
              'تكاملات مخصصة',
              'مدير مخصص',
            ],
            buttonText: 'اتصل بنا',
            buttonLink: '#',
            highlighted: false,
          },
        ],
      },
      ku: {
        title: 'پلانەکەت هەڵبژێرە',
        subtitle: 'پلانی تەواو هەڵبژێرە بۆ پێداویستییەکانت',
        plans: [
          {
            name: 'بنەڕەتی',
            price: '$9',
            period: '/مانگ',
            features: [
              'تا 10 بەکارهێنەر',
              '5GB کۆگا',
              'پشتگیری ئیمەیڵ',
              'تایبەتمەندی بنەڕەتی',
            ],
            buttonText: 'دەست پێبکە',
            buttonLink: '#',
            highlighted: false,
          },
          {
            name: 'پیشەیی',
            price: '$29',
            period: '/مانگ',
            features: [
              'تا 50 بەکارهێنەر',
              '50GB کۆگا',
              'پشتگیری تایبەت',
              'تایبەتمەندی پێشکەوتوو',
              'داشبۆردی شیکاری',
            ],
            buttonText: 'دەست پێبکە',
            buttonLink: '#',
            highlighted: true,
          },
          {
            name: 'کۆمپانیا',
            price: '$99',
            period: '/مانگ',
            features: [
              'بەکارهێنەری بێسنوور',
              'کۆگای بێسنوور',
              'پشتگیری 24/7',
              'هەموو تایبەتمەندییەکان',
              'یەکخستنی تایبەت',
              'بەڕێوەبەری تایبەت',
            ],
            buttonText: 'پەیوەندیمان پێوە بکە',
            buttonLink: '#',
            highlighted: false,
          },
        ],
      },
    },
    settings: {
      backgroundType: 'color',
      backgroundColor: '#f9fafb',
      textColor: '#111827',
      backgroundImage: '',
      paddingTop: '64px',
      paddingBottom: '64px',
      columns: 3,
    },
  },
];
