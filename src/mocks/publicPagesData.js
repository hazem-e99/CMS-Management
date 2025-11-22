/**
 * Mock data for public pages with hierarchy
 */

export const publicPagesData = [
  // 1. أكاديمية PGS (PGS Academy)
  {
    id: 'pgs-academy',
    slug: 'pgs-academy',
    title: {
      en: 'PGS Academy',
      ar: 'أكاديمية PGS',
      ku: 'ئەکادیمیای PGS',
    },
    parentId: null,
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 1,
    },
    sections: [],
  },
  {
    id: 'leadership',
    slug: 'leadership',
    title: {
      en: 'Leadership',
      ar: 'القيادة',
      ku: 'سەرکردایەتی',
    },
    parentId: 'pgs-academy',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 1,
    },
    sections: [],
  },
  {
    id: 'women-leadership',
    slug: 'women-leadership',
    title: {
      en: "Women's Leadership",
      ar: 'قيادة نسائية',
      ku: 'سەرکردایەتی ژنان',
    },
    parentId: 'pgs-academy',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 2,
    },
    sections: [],
  },
  {
    id: 'youth-leadership',
    slug: 'youth-leadership',
    title: {
      en: 'Youth Leadership',
      ar: 'قيادة شبابية',
      ku: 'سەرکردایەتی گەنجان',
    },
    parentId: 'pgs-academy',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 3,
    },
    sections: [],
  },
  {
    id: 'individual-development',
    slug: 'individual-development',
    title: {
      en: 'Individual Development',
      ar: 'تنمية فردية',
      ku: 'گەشەپێدانی تاکەکەسی',
    },
    parentId: 'pgs-academy',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 4,
    },
    sections: [],
  },
  {
    id: 'professional-development',
    slug: 'professional-development',
    title: {
      en: 'Professional Development',
      ar: 'تنمية مهنية',
      ku: 'گەشەپێدانی پیشەیی',
    },
    parentId: 'pgs-academy',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 5,
    },
    sections: [],
  },

  // 2. المجتمع (Community)
  {
    id: 'community',
    slug: 'community',
    title: {
      en: 'Community',
      ar: 'المجتمع',
      ku: 'کۆمەڵگا',
    },
    parentId: null,
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 2,
    },
    sections: [],
  },
  {
    id: 'universities-institutes',
    slug: 'universities-institutes',
    title: {
      en: 'Universities & Institutes',
      ar: 'الجامعات والمعاهد',
      ku: 'زانکۆ و پەیمانگاکان',
    },
    parentId: 'community',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 1,
    },
    sections: [],
  },
  {
    id: 'women',
    slug: 'women',
    title: {
      en: 'Women',
      ar: 'النساء',
      ku: 'ژنان',
    },
    parentId: 'community',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 2,
    },
    sections: [],
  },
  {
    id: 'students-youth',
    slug: 'students-youth',
    title: {
      en: 'Students & Youth',
      ar: 'الطلبة والشباب',
      ku: 'قوتابی و گەنجان',
    },
    parentId: 'community',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 3,
    },
    sections: [],
  },
  {
    id: 'belonging',
    slug: 'belonging',
    title: {
      en: 'Belonging',
      ar: 'الانتماء',
      ku: 'سەربەخۆیی',
    },
    parentId: 'community',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 4,
    },
    sections: [],
  },

  // 3. استطلاعات إلكترونية (Online Surveys)
  {
    id: 'online-surveys',
    slug: 'surveys',
    title: {
      en: 'Online Surveys',
      ar: 'استطلاعات إلكترونية',
      ku: 'ڕاپرسییە ئەلیکترۆنییەکان',
    },
    parentId: null,
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 3,
    },
    sections: [],
  },

  // 4. عام (General)
  {
    id: 'general',
    slug: 'general',
    title: {
      en: 'General',
      ar: 'عام',
      ku: 'گشتی',
    },
    parentId: null,
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 4,
    },
    sections: [],
  },
  {
    id: 'society',
    slug: 'society',
    title: {
      en: 'Society',
      ar: 'المجتمع',
      ku: 'کۆمەڵگا',
    },
    parentId: 'general',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 1,
    },
    sections: [],
  },
  {
    id: 'economy',
    slug: 'economy',
    title: {
      en: 'Economy',
      ar: 'الاقتصاد',
      ku: 'ئابووری',
    },
    parentId: 'general',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 2,
    },
    sections: [],
  },
  {
    id: 'health',
    slug: 'health',
    title: {
      en: 'Health',
      ar: 'الصحة',
      ku: 'تەندروستی',
    },
    parentId: 'general',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 3,
    },
    sections: [],
  },
  {
    id: 'environment',
    slug: 'environment',
    title: {
      en: 'Environment',
      ar: 'البيئة',
      ku: 'ژینگە',
    },
    parentId: 'general',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 4,
    },
    sections: [],
  },
  {
    id: 'education',
    slug: 'education',
    title: {
      en: 'Education',
      ar: 'التعليم',
      ku: 'پەروەردە',
    },
    parentId: 'general',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 5,
    },
    sections: [],
  },
  {
    id: 'management',
    slug: 'management',
    title: {
      en: 'Management',
      ar: 'الإدارة',
      ku: 'بەڕێوەبردن',
    },
    parentId: 'general',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 6,
    },
    sections: [],
  },
  {
    id: 'masters-theses',
    slug: 'masters-theses',
    title: {
      en: "Master's Theses",
      ar: 'رسائل الماجستير',
      ku: 'تێزی ماستەر',
    },
    parentId: 'general',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 7,
    },
    sections: [],
  },
  {
    id: 'phd-dissertations',
    slug: 'phd-dissertations',
    title: {
      en: 'PhD Dissertations',
      ar: 'رسائل الدكتوراه',
      ku: 'تێزی دکتۆرا',
    },
    parentId: 'general',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 8,
    },
    sections: [],
  },

  // 5. الموسيقى (Music & Arts)
  {
    id: 'music-arts',
    slug: 'music-arts',
    title: {
      en: 'Music & Arts',
      ar: 'الموسيقى',
      ku: 'مۆزیک و هونەر',
    },
    parentId: null,
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 5,
    },
    sections: [],
  },
  {
    id: 'theater',
    slug: 'theater',
    title: {
      en: 'Theater',
      ar: 'المسرح',
      ku: 'شانۆ',
    },
    parentId: 'music-arts',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 1,
    },
    sections: [],
  },
  {
    id: 'painting',
    slug: 'painting',
    title: {
      en: 'Painting',
      ar: 'الرسم',
      ku: 'وێنەکێشان',
    },
    parentId: 'music-arts',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 2,
    },
    sections: [],
  },
  {
    id: 'sculpture',
    slug: 'sculpture',
    title: {
      en: 'Sculpture',
      ar: 'النحت',
      ku: 'پەیکەرتاشی',
    },
    parentId: 'music-arts',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 3,
    },
    sections: [],
  },
  {
    id: 'handicrafts',
    slug: 'handicrafts',
    title: {
      en: 'Handicrafts',
      ar: 'أعمال يدوية',
      ku: 'دەستکردەکان',
    },
    parentId: 'music-arts',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 4,
    },
    sections: [],
  },
  {
    id: 'creations',
    slug: 'creations',
    title: {
      en: 'Creations',
      ar: 'الإبداعات',
      ku: 'داهێنانەکان',
    },
    parentId: 'music-arts',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 5,
    },
    sections: [],
  },

  // 6. في PGS (At PGS)
  {
    id: 'at-pgs',
    slug: 'at-pgs',
    title: {
      en: 'At PGS',
      ar: 'في PGS',
      ku: 'لە PGS',
    },
    parentId: null,
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 6,
    },
    sections: [],
  },
  {
    id: 'work-at-pgs',
    slug: 'work-at-pgs',
    title: {
      en: 'Work at PGS',
      ar: 'العمل في PGS',
      ku: 'کارکردن لە PGS',
    },
    parentId: 'at-pgs',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 1,
    },
    sections: [],
  },
  {
    id: 'work-elsewhere',
    slug: 'work-elsewhere',
    title: {
      en: 'Work Elsewhere',
      ar: 'العمل في أماكن أخرى',
      ku: 'کارکردن لە شوێنی تر',
    },
    parentId: 'at-pgs',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 2,
    },
    sections: [],
  },
  {
    id: 'volunteer-elsewhere',
    slug: 'volunteer-elsewhere',
    title: {
      en: 'Volunteer Work Elsewhere',
      ar: 'العمل الطوعي في أماكن أخرى',
      ku: 'کاری خۆبەخشانە لە شوێنی تر',
    },
    parentId: 'at-pgs',
    metadata: {
      showInNav: true,
      isPublished: true,
      order: 3,
    },
    sections: [],
  },
];
