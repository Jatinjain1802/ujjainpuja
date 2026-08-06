import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import { LocaleContext } from "../LocaleContext";

const buildWhatsAppLink = (message) =>
  `https://wa.me/919039095999?text=${encodeURIComponent(message)}`;

/*
  Services Component
  ------------------
  यह component original website के "वैदिक अनुष्ठान सेवाएं" section को replicate करता है।
  
  सीखने के लिए:
  1. Images को public folder से load करते हैं — "/images/..." path use करो
  2. हर service card में image + title + description है
  3. CSS Grid से 3-column layout बनाया है
*/

const Services = () => {
  const { messages } = useContext(LocaleContext);
  const services = messages.pages.services;
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
    <section
      id="services"
      className="section services-section"
      ref={sectionRef}
    >
      <div className="container">
        {/* Section heading */}
        <div className="section-heading center reveal reveal-up">
          <span className="eyebrow">{services.eyebrow}</span>
          <h2>{services.title}</h2>
          <p>{services.description}</p>
        </div>

        {/* Services grid */}
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
                  <p>{service.details || service.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div className="services-cta services-cta-center reveal reveal-up">
          <Link to="/services" className="btn btn-primary">
            {services.ctaPrimary}
          </Link>
          <a
            href={buildWhatsAppLink(messages.whatsapp.generic)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            {services.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
