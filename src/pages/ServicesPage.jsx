import { useContext, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "../components/common/SectionHeading";
import { LocaleContext } from "../LocaleContext";
import "../components/Services.css";

function ServicesPage() {
  const { messages } = useContext(LocaleContext);
  const services = messages.pages.services;
  const buildWhatsAppLink = (serviceTitle) => {
    const message = messages.whatsapp.serviceTemplate.replace(
      "{service}",
      serviceTitle,
    );
    return `https://wa.me/919039095999?text=${encodeURIComponent(message)}`;
  };
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    if (!elements?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [messages]);

  return (
    <section className="page-section services-page-section" ref={sectionRef}>
      <div className="container">
        <div className="services-page-intro reveal reveal-up">
          <div className="services-page-intro-content">
            <SectionHeading
              eyebrow={services.eyebrow}
              title={services.title}
              description={services.description}
              align="center"
            />

            <div className="services-page-highlights">
              <div className="services-page-highlight">
                Traditional Vedic procedure
              </div>
              <div className="services-page-highlight">
                Home, temple, and personalized guidance
              </div>
              <div className="services-page-highlight">
                Trusted support for every puja and dosh nivaran need
              </div>
            </div>
          </div>
        </div>

        <div className="services-grid">
          {services.items.map((service, idx) => {
            const imageSrc =
              service.image || "/images/vaidikanushthan/03/divine.webp";
            return (
              <div
                key={service.title}
                className="service-card reveal reveal-up"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="service-img-wrap">
                  <img src={imageSrc} alt={service.title} loading="lazy" />
                </div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a
                    href={buildWhatsAppLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary whatsapp-link"
                    style={{ marginTop: "18px", alignSelf: "flex-start" }}
                  >
                    {messages.whatsapp.bookNow}{" "}
                    <FaWhatsapp
                      style={{ marginLeft: "8px", fontSize: "1rem" }}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesPage;
