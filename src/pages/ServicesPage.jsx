import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/common/ServiceCard';
import { services } from '../data/siteContent';

function ServicesPage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="सेवाएँ"
          title="आपकी हर पूजा और दोष निवारण की आवश्यकता के लिए"
          description="हमारे अनुभवी पंडित पारंपरिक मंत्रोच्चारण और वैदिक विधि-विधान के साथ सेवाएँ प्रदान करते हैं।"
        />

        <div className="cards-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} badge="ॐ" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesPage;
