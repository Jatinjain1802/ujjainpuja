import SectionHeading from '../components/common/SectionHeading';
import ContactForm from '../components/common/ContactForm';

function ContactPage() {
  return (
    <section className="page-section">
      <div className="container contact-page-grid">
        <div className="info-card">
          <SectionHeading
            eyebrow="संपर्क"
            title="पुजा बुकिंग हेतु संपर्क करें"
            description="जीवन में उत्पन्न ग्रह दोष, बाधाएं एवं नकारात्मक प्रभावों के निवारण हेतु वैदिक विधि-विधान के साथ अनुष्ठान संपन्न किए जाते हैं।"
          />

          <div className="contact-details">
            <p><strong>📞</strong> +91 90390 95999</p>
            <p><strong>📍</strong> उज्जैन (म.प्र.)</p>
            <p><strong>💬</strong> व्हाट्सएप पर तुरंत पूछताछ</p>
            <p><strong>⏳</strong> सेवा 24x7 उपलब्ध</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default ContactPage;
