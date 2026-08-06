import Header from './components/Header';
import SectionHeading from './components/SectionHeading';
import ServiceCard from './components/ServiceCard';
import GalleryCard from './components/GalleryCard';
import ContactForm from './components/ContactForm';
import {
  services,
  galleryItems,
  trustHighlights,
  quickLinks,
  footerServices,
} from './data/siteContent';

function App() {
  return (
    <div className="site-shell">
      <Header />

      <main>
        <section className="about-section" id="about">
          <div className="container">
            <SectionHeading
              eyebrow="आस्था, परंपरा और विश्वास की सेवा"
              title="वैदिक अनुष्ठान सेवा परिचय"
              description="श्री पंडित पवन शास्त्री जी उज्जैन (अवंतिका तीर्थ) के सुप्रसिद्ध वैदिक आचार्य एवं तंत्र साधक हैं।"
            />

            <div className="about-grid">
              <div className="about-copy">
                <p>
                  पंडित जी को समस्त प्रकार के वैदिक अनुष्ठानों, पूजन विधियों और धार्मिक संस्कारों का गहन एवं प्रयोगात्मक ज्ञान अपने पिता जी से प्राप्त हुआ है।
                </p>
                <p>
                  वे पिछले 25 वर्षों से अधिक समय से विभिन्न दोषों और बाधाओं के निवारण हेतु वैदिक व तांत्रिक विधियों से पूजा-अनुष्ठान कराते आ रहे हैं।
                </p>
              </div>

              <div className="highlights-card">
                <h3>हमारी प्रमुख विशेषताएँ</h3>
                <ul>
                  {trustHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="container">
            <SectionHeading
              eyebrow="वैदिक अनुष्ठान सेवाएँ"
              title="दोष निवारण एवं शांति हेतु विशेष सेवाएँ"
              description="शुद्ध मंत्रोच्चारण, विधि-विधान और परंपरागत अनुष्ठान के साथ आपकी आवश्यकताओं का समाधान।"
            />

            <div className="cards-grid">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="container">
            <SectionHeading
              eyebrow="झलकियाँ"
              title="पूजा एवं अनुष्ठानों की पावन झलक"
              description="वैदिक विधि-विधान के साथ संपन्न की गई पूजाओं एवं अनुष्ठानों की झलक।"
            />

            <div className="gallery-grid">
              {galleryItems.map((item) => (
                <GalleryCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-card">
              <SectionHeading
                eyebrow="पूजा बुकिंग"
                title="आज ही संपर्क करें"
                description="जीवन में उत्पन्न ग्रह दोष, बाधाएं एवं नकारात्मक प्रभावों के निवारण हेतु वैदिक विधि-विधान के साथ अनुष्ठान संपन्न किए जाते हैं।"
              />
              <div className="contact-details">
                <p><strong>📞</strong> +91 90390 95999</p>
                <p><strong>📍</strong> उज्जैन (म.प्र.)</p>
                <p><strong>💬</strong> व्हाट्सएप पर तुरंत पूछताछ</p>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>वैदिक अनुष्ठान केंद्र</h3>
            <p>विश्वास, परंपरा और शुद्ध मंत्रोच्चारण की सेवा में।</p>
          </div>

          <div>
            <h4>हमारी सेवाएँ</h4>
            <ul>
              {footerServices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>त्वरित लिंक</h4>
            <ul>
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
