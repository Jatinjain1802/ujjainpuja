import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "../components/common/SectionHeading";
import { LocaleContext } from "../LocaleContext";
import "../components/Services.css";

function ServicesPage() {
  const navigate = useNavigate();
  const { locale, messages } = useContext(LocaleContext);
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
                className="service-card reveal reveal-up clickable-card"
                onClick={(e) => {
                  if (e.target.closest("a") || e.target.closest("button")) return;
                  navigate(`/services/${service.id}`);
                }}
                style={{ transitionDelay: `${idx * 80}ms`, cursor: "pointer" }}
              >
                <div className="service-img-wrap">
                  <Link to={`/services/${service.id}`}>
                    <img src={imageSrc} alt={service.title} loading="lazy" />
                  </Link>
                </div>
                <div className="service-info">
                  <h3>
                    <Link to={`/services/${service.id}`} className="service-title-link" style={{ color: "inherit", textDecoration: "none" }}>
                      {service.title}
                    </Link>
                  </h3>
                  <p>{service.description}</p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "18px", alignSelf: "flex-start", flexWrap: "wrap" }}>
                    <Link
                      to={`/services/${service.id}`}
                      className="btn btn-primary view-details-link"
                      style={{ padding: "10px 18px", fontSize: "0.95rem" }}
                    >
                      {services.viewDetails || (locale === "hi" ? "विवरण देखें" : "View Details")}
                    </Link>
                    <a
                      href={buildWhatsAppLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary whatsapp-link"
                      style={{ padding: "10px 18px", fontSize: "0.95rem", marginTop: "0" }}
                    >
                      {messages.whatsapp.bookNow}{" "}
                      <FaWhatsapp
                        style={{ marginLeft: "8px", fontSize: "1rem" }}
                      />
                    </a>
                  </div>
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
