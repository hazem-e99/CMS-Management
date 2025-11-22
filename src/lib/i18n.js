import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        pages: 'Pages',
        pageBuilder: 'Page Builder',
        surveys: 'Surveys',
        settings: 'Settings',
      },
      // Common
      common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create',
        search: 'Search',
        filter: 'Filter',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        confirm: 'Confirm',
        yes: 'Yes',
        no: 'No',
        back: 'Back',
        next: 'Next',
        preview: 'Preview',
        publish: 'Publish',
        draft: 'Draft',
        actions: 'Actions',
      },
      // Pages
      pages: {
        title: 'Pages Management',
        createPage: 'Create Page',
        editPage: 'Edit Page',
        deletePage: 'Delete Page',
        pageTitle: 'Page Title',
        slug: 'Slug',
        parent: 'Parent Page',
        noParent: 'No Parent',
        metadata: 'Metadata',
        description: 'Description',
        showInNav: 'Show in Navigation',
        isPublished: 'Published',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
      },
      // Page Builder
      builder: {
        title: 'Page Builder',
        sectionLibrary: 'Section Library',
        addSection: 'Add Section',
        editContent: 'Edit Content',
        duplicate: 'Duplicate',
        moveUp: 'Move Up',
        moveDown: 'Move Down',
        deleteSection: 'Delete Section',
        undo: 'Undo',
        redo: 'Redo',
        autosaved: 'Autosaved',
        saving: 'Saving...',
        dragHere: 'Drag sections here to build your page',
      },
      // Surveys
      surveys: {
        title: 'Surveys',
        createSurvey: 'Create Survey',
        editSurvey: 'Edit Survey',
        surveyTitle: 'Survey Title',
        addQuestion: 'Add Question',
        questionType: 'Question Type',
        questionText: 'Question Text',
        options: 'Options',
        required: 'Required',
        openText: 'Open Text',
        singleChoice: 'Single Choice',
        multiChoice: 'Multiple Choice',
        publicLink: 'Public Link',
        copyLink: 'Copy Link',
        responses: 'Responses',
        viewResponses: 'View Responses',
        noResponses: 'No responses yet',
      },
      // Theme
      theme: {
        light: 'Light',
        dark: 'Dark',
        toggle: 'Toggle Theme',
      },
      // Language
      language: {
        en: 'English',
        ar: 'العربية',
        ku: 'کوردی',
        select: 'Select Language',
      },
    },
  },
  ar: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'لوحة التحكم',
        pages: 'الصفحات',
        pageBuilder: 'منشئ الصفحات',
        surveys: 'الاستبيانات',
        settings: 'الإعدادات',
      },
      // Common
      common: {
        save: 'حفظ',
        cancel: 'إلغاء',
        delete: 'حذف',
        edit: 'تعديل',
        create: 'إنشاء',
        search: 'بحث',
        filter: 'تصفية',
        loading: 'جاري التحميل...',
        error: 'خطأ',
        success: 'نجح',
        confirm: 'تأكيد',
        yes: 'نعم',
        no: 'لا',
        back: 'رجوع',
        next: 'التالي',
        preview: 'معاينة',
        publish: 'نشر',
        draft: 'مسودة',
        actions: 'إجراءات',
      },
      // Pages
      pages: {
        title: 'إدارة الصفحات',
        createPage: 'إنشاء صفحة',
        editPage: 'تعديل الصفحة',
        deletePage: 'حذف الصفحة',
        pageTitle: 'عنوان الصفحة',
        slug: 'الرابط',
        parent: 'الصفحة الأم',
        noParent: 'لا يوجد صفحة أم',
        metadata: 'البيانات الوصفية',
        description: 'الوصف',
        showInNav: 'إظهار في القائمة',
        isPublished: 'منشور',
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التحديث',
      },
      // Page Builder
      builder: {
        title: 'منشئ الصفحات',
        sectionLibrary: 'مكتبة الأقسام',
        addSection: 'إضافة قسم',
        editContent: 'تعديل المحتوى',
        duplicate: 'تكرار',
        moveUp: 'تحريك لأعلى',
        moveDown: 'تحريك لأسفل',
        deleteSection: 'حذف القسم',
        undo: 'تراجع',
        redo: 'إعادة',
        autosaved: 'تم الحفظ تلقائياً',
        saving: 'جاري الحفظ...',
        dragHere: 'اسحب الأقسام هنا لبناء صفحتك',
      },
      // Surveys
      surveys: {
        title: 'الاستبيانات',
        createSurvey: 'إنشاء استبيان',
        editSurvey: 'تعديل الاستبيان',
        surveyTitle: 'عنوان الاستبيان',
        addQuestion: 'إضافة سؤال',
        questionType: 'نوع السؤال',
        questionText: 'نص السؤال',
        options: 'الخيارات',
        required: 'مطلوب',
        openText: 'نص مفتوح',
        singleChoice: 'اختيار واحد',
        multiChoice: 'اختيار متعدد',
        publicLink: 'الرابط العام',
        copyLink: 'نسخ الرابط',
        responses: 'الردود',
        viewResponses: 'عرض الردود',
        noResponses: 'لا توجد ردود بعد',
      },
      // Theme
      theme: {
        light: 'فاتح',
        dark: 'داكن',
        toggle: 'تبديل السمة',
      },
      // Language
      language: {
        en: 'English',
        ar: 'العربية',
        ku: 'کوردی',
        select: 'اختر اللغة',
      },
    },
  },
  ku: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'داشبۆرد',
        pages: 'پەڕەکان',
        pageBuilder: 'دروستکەری پەڕە',
        surveys: 'ڕاپرسییەکان',
        settings: 'ڕێکخستنەکان',
      },
      // Common
      common: {
        save: 'پاشەکەوت',
        cancel: 'پاشگەزبوونەوە',
        delete: 'سڕینەوە',
        edit: 'دەستکاری',
        create: 'دروستکردن',
        search: 'گەڕان',
        filter: 'پاڵاوتن',
        loading: 'بارکردن...',
        error: 'هەڵە',
        success: 'سەرکەوتوو',
        confirm: 'پشتڕاستکردنەوە',
        yes: 'بەڵێ',
        no: 'نەخێر',
        back: 'گەڕانەوە',
        next: 'دواتر',
        preview: 'پێشبینین',
        publish: 'بڵاوکردنەوە',
        draft: 'ڕەشنووس',
        actions: 'کردارەکان',
      },
      // Pages
      pages: {
        title: 'بەڕێوەبردنی پەڕەکان',
        createPage: 'دروستکردنی پەڕە',
        editPage: 'دەستکاری پەڕە',
        deletePage: 'سڕینەوەی پەڕە',
        pageTitle: 'ناونیشانی پەڕە',
        slug: 'بەستەر',
        parent: 'پەڕەی دایک',
        noParent: 'پەڕەی دایک نییە',
        metadata: 'زانیاری وەسفی',
        description: 'وەسف',
        showInNav: 'پیشاندان لە مێنیو',
        isPublished: 'بڵاوکراوەتەوە',
        createdAt: 'بەرواری دروستکردن',
        updatedAt: 'بەرواری نوێکردنەوە',
      },
      // Page Builder
      builder: {
        title: 'دروستکەری پەڕە',
        sectionLibrary: 'کتێبخانەی بەشەکان',
        addSection: 'زیادکردنی بەش',
        editContent: 'دەستکاری ناوەڕۆک',
        duplicate: 'دووبارەکردنەوە',
        moveUp: 'جوڵاندن بۆ سەرەوە',
        moveDown: 'جوڵاندن بۆ خوارەوە',
        deleteSection: 'سڕینەوەی بەش',
        undo: 'گەڕانەوە',
        redo: 'دووبارەکردنەوە',
        autosaved: 'خۆکار پاشەکەوت کرا',
        saving: 'پاشەکەوتکردن...',
        dragHere: 'بەشەکان بکێشە بۆ ئێرە بۆ دروستکردنی پەڕەکەت',
      },
      // Surveys
      surveys: {
        title: 'ڕاپرسییەکان',
        createSurvey: 'دروستکردنی ڕاپرسی',
        editSurvey: 'دەستکاری ڕاپرسی',
        surveyTitle: 'ناونیشانی ڕاپرسی',
        addQuestion: 'زیادکردنی پرسیار',
        questionType: 'جۆری پرسیار',
        questionText: 'دەقی پرسیار',
        options: 'هەڵبژاردنەکان',
        required: 'پێویست',
        openText: 'دەقی کراوە',
        singleChoice: 'هەڵبژاردنی یەک',
        multiChoice: 'هەڵبژاردنی فرە',
        publicLink: 'بەستەری گشتی',
        copyLink: 'کۆپی بەستەر',
        responses: 'وەڵامەکان',
        viewResponses: 'بینینی وەڵامەکان',
        noResponses: 'هێشتا وەڵامێک نییە',
      },
      // Theme
      theme: {
        light: 'ڕووناک',
        dark: 'تاریک',
        toggle: 'گۆڕینی ڕووکار',
      },
      // Language
      language: {
        en: 'English',
        ar: 'العربية',
        ku: 'کوردی',
        select: 'هەڵبژاردنی زمان',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
