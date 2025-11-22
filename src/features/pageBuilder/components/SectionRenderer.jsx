import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * Renders a page section based on its type
 */
export function SectionRenderer({ section }) {
  const { language } = useLanguage();
  const content = section.content?.[language] || section.content?.en || {};
  const settings = section.settings || {};

  switch (section.type) {
    case 'hero':
      return <HeroSection content={content} settings={settings} />;
    case 'features':
      return <FeaturesSection content={content} settings={settings} />;
    case 'cta':
      return <CTASection content={content} settings={settings} />;
    case 'testimonials':
      return <TestimonialsSection content={content} settings={settings} />;
    case 'gallery':
      return <GallerySection content={content} settings={settings} />;
    case 'faq':
      return <FAQSection content={content} settings={settings} />;
    case 'image-text':
      // Handle image-text with dynamic positioning
      return settings.imagePosition === 'right' 
        ? <ImageTextRightSection content={content} settings={settings} />
        : <ImageTextLeftSection content={content} settings={settings} />;
    case 'image-text-left':
      return <ImageTextLeftSection content={content} settings={settings} />;
    case 'image-text-right':
      return <ImageTextRightSection content={content} settings={settings} />;
    case 'pricing-table':
      return <PricingTableSection content={content} settings={settings} />;
    case 'data-table':
      return <DataTableSection content={content} settings={settings} />;
    default:
      return <DefaultSection content={content} type={section.type} />;
  }
}

/**
 * Wrapper component for sections with background image/video support
 */
function SectionWrapper({ settings, children, className = '' }) {
  const {
    backgroundColor = '#ffffff',
    textColor = '#000000',
    backgroundImage,
    backgroundVideo,
    backgroundType = 'color',
    backgroundOverlay,
    overlayOpacity = 0.5,
    paddingTop = '64px',
    paddingBottom = '64px',
    minHeight,
  } = settings;

  const hasMediaBackground = backgroundType === 'media' && (backgroundImage || backgroundVideo);

  return (
    <section
      className={`relative ${className}`}
      style={{
        backgroundColor: hasMediaBackground ? 'transparent' : backgroundColor,
        color: textColor,
        paddingTop,
        paddingBottom,
        minHeight,
      }}
    >
      {/* Background Video */}
      {hasMediaBackground && backgroundVideo && !backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Background Image */}
      {hasMediaBackground && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Overlay */}
      {hasMediaBackground && backgroundOverlay !== false && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function HeroSection({ content, settings }) {
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
        <p className="text-xl mb-8 opacity-90">{content.subtitle}</p>
        {content.buttonText && (
          <a
            href={content.buttonLink || '#'}
            className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </SectionWrapper>
  );
}

function FeaturesSection({ content, settings }) {
  const columns = settings.columns || 3;
  
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {content.title}
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8`}>
          {content.features?.map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">{feature.icon || '⚡'}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function CTASection({ content, settings }) {
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
        <p className="text-xl mb-8 opacity-90">{content.description}</p>
        {content.buttonText && (
          <a
            href={content.buttonLink || '#'}
            className="inline-block px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {content.buttonText}
          </a>
        )}
      </div>
    </SectionWrapper>
  );
}

function TestimonialsSection({ content, settings }) {
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {content.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.testimonials?.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-lg"
            >
              <p className="mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
                )}
                <div>
                  <p className="font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-sm opacity-70">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function GallerySection({ content, settings }) {
  const columns = settings.columns || 3;

  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {content.title}
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
          {content.images?.map((image, idx) => (
            <div key={idx} className="aspect-square bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function FAQSection({ content, settings }) {
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {content.title}
        </h2>
        <div className="space-y-4">
          {content.faqs?.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-lg"
            >
              <h3 className="font-semibold text-lg mb-2">
                {faq.question}
              </h3>
              <p className="opacity-80">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ImageTextLeftSection({ content, settings }) {
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image on Left */}
          <div className="order-2 md:order-1">
            {content.imageUrl ? (
              <img
                src={content.imageUrl}
                alt={content.imageAlt || content.title}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Image Placeholder</span>
              </div>
            )}
          </div>
          
          {/* Text on Right */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
            <p className="text-lg mb-6 opacity-90">{content.text || content.description}</p>
            {content.buttonText && (
              <a
                href={content.buttonLink || '#'}
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {content.buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function ImageTextRightSection({ content, settings }) {
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text on Left */}
          <div>
            <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
            <p className="text-lg mb-6 opacity-90">{content.text || content.description}</p>
            {content.buttonText && (
              <a
                href={content.buttonLink || '#'}
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {content.buttonText}
              </a>
            )}
          </div>
          
          {/* Image on Right */}
          <div>
            {content.imageUrl ? (
              <img
                src={content.imageUrl}
                alt={content.imageAlt || content.title}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Image Placeholder</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function PricingTableSection({ content, settings }) {
  const columns = settings.columns || 3;
  
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
          {content.subtitle && (
            <p className="text-xl opacity-80">{content.subtitle}</p>
          )}
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(columns, content.plans?.length || 3)} gap-8`}>
          {content.plans?.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-lg border-2 transition-all ${
                plan.highlighted
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features?.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">✓</span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={plan.buttonLink || '#'}
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function DataTableSection({ content, settings }) {
  const striped = settings.striped !== false;
  const bordered = settings.bordered !== false;
  const headerBgColor = settings.headerBgColor || '#f3f4f6';
  
  return (
    <SectionWrapper settings={settings}>
      <div className="max-w-7xl mx-auto px-4">
        {content.title && (
          <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>
        )}
        
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className={`min-w-full ${bordered ? 'border-collapse' : ''}`}>
            <thead style={{ backgroundColor: headerBgColor }}>
              <tr>
                {content.headers?.map((header, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 text-left text-sm font-semibold ${
                      bordered ? 'border border-gray-300 dark:border-gray-600' : ''
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {content.rows?.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`${
                    striped && rowIdx % 2 === 1
                      ? 'bg-gray-50 dark:bg-gray-700'
                      : ''
                  } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`px-6 py-4 text-sm ${
                        bordered ? 'border border-gray-300 dark:border-gray-600' : ''
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  );
}

function DefaultSection({ content, type }) {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Section Type: {type}
          </p>
          <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
}
