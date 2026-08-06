import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/common/ServiceCard';
import GalleryCard from '../components/common/GalleryCard';
import { featuredServices, galleryItems, trustHighlights } from '../data/siteContent';

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">वैदिक अनुष्ठान केंद्र</span>
            <h1>विश्वास एवं वैदिक परंपरा की सच्ची पहचान</h1>
            <p>
              उज्जैन के अनुभवी पंडित पवन शास्त्री जी के साथ शुद्ध मंत्रोच्चारण, पारंपरिक पूजा और दोष निवारण की भरोसेमंद सेवा।
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/contact">पूजा बुक करें</Link>
              <a className="btn btn-secondary" href="https://wa.me/919039095999" target="_blank" rel="noreferrer">व्हाट्सएप करें</a>
            </div>
          </div>

          <div className="hero-panel">
            <h3>उज्जैन (म.प्र.)</h3>
            <p>25+ वर्षों के अनुभव के साथ वैदिक अनुष्ठान एवं पारंपरिक पूजा सेवाएँ।</p>
            <ul>
              {trustHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <SectionHeading
            eyebrow="हमारी विशेषताएँ"
            title="आस्था, परंपरा और विश्वास के साथ सेवा"
            description="पंडित पवन शास्त्री जी उज्जैन की पवित्र धरती से वैदिक अनुष्ठान और दोष निवारण के पारंपरिक संस्कार प्रस्तुत करते हैं।"
          />

          <div className="split-grid">
            <div className="info-card">
              <h3>क्यों चुनें हमारी सेवा?</h3>
              <p>
                हर पूजा विधि को विस्तारपूर्वक समझकर, शुद्ध मंत्रोच्चारण और परंपरा के अनुरूप संपन्न किया जाता है। यह सेवा घर पर या आपके चुने हुए स्थल पर पूर्ण विश्वास के साथ उपलब्ध है।
              </p>
              <ul>
                <li>विधि-विधान का पूर्ण पालन</li>
                <li>प्रत्यक्ष अनुभव और परंपरागत ज्ञान</li>
                <li>गृहस्थ जीवन, व्यापार और गृह प्रवेश के अनुष्ठान</li>
              </ul>
            </div>
            <div className="info-card highlight-card">
              <h3>हमारी सेवाएँ</h3>
              <ul>
                {trustHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="सेवाएँ"
            title="विशेष पूजा एवं दोष निवारण सेवाएँ"
            description="हमारी टीम आपको राशि दोषों, ग्रह प्रभावों तथा धार्मिक संस्कारों के लिए सशक्त और पारंपरिक समाधान प्रदान करती है।"
          />

          <div className="cards-grid">
            {featuredServices.map((service) => (
              <ServiceCard key={service.title} {...service} badge="ॐ" />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <SectionHeading
            eyebrow="झलकियाँ"
            title="पूजा एवं अनुष्ठानों की पावन झलक"
            description="हमारी सेवा के दौरान संपन्न कराए गए कुछ मुख्य अनुष्ठानों की भावपूर्ण झलक।"
            align="center"
          />

          <div className="cards-grid gallery-grid">
            {galleryItems.map((item) => (
              <GalleryCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-cta-section">
        <div className="container contact-cta">
          <div>
            <span className="eyebrow">पूजा बुकिंग</span>
            <h2>आज ही अपने अनुष्ठान की योजना बनाएं</h2>
            <p>
              ग्रह दोष, बाधाएँ और नकारात्मक प्रभाव दूर करने के लिए पारंपरिक वैदिक अनुष्ठानों के साथ जुड़ें।
            </p>
          </div>
          <Link className="btn btn-primary" to="/contact">संपर्क करें</Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
