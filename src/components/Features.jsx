import React, { useContext, useEffect, useRef } from "react";
import "./Features.css";
import { FaClock, FaHandsHelping, FaAward } from "react-icons/fa";
import { LocaleContext } from "../LocaleContext";

/*
  Features Component
  ------------------
  यह component 3 feature cards दिखाता है जो original website से लिए गए हैं।
  
  React सीखने के लिए ध्यान दो:
  1. हम एक array (featuresData) में data रखते हैं — यह "data-driven" approach है।
  2. .map() से हम array को loop करके JSX render करते हैं।
  3. हर item को एक unique "key" prop देना जरूरी है (React internally track करता है)।
*/

const iconComponents = [FaClock, FaHandsHelping, FaAward];

const Features = () => {
  const { messages } = useContext(LocaleContext);
  const sectionRef = useRef(null);
  const features = messages.features?.items ?? [];

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
      { threshold: 0.25 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [messages]);

  return (
    <section id="features" className="features-section" ref={sectionRef}>
      <div className="container">
        {/* Section heading */}
        <div className="section-heading center">
          <span className="eyebrow">{messages.features.eyebrow}</span>
          <h2>{messages.features.heading}</h2>
        </div>

        {/* Intro with portrait and bio */}
        <div className="features-intro">
          <div className="priest-portrait reveal reveal-left">
            <img
              src="/images/vaidikanushthan/03/pandit-768x1024.webp"
              alt={messages.priest.name}
              className="priest-photo"
            />
            <div className="priest-caption">{messages.priest.name}</div>
          </div>

          <div className="priest-bio reveal reveal-right">
            {[
              messages.priest.intro,
              messages.priest.training,
              messages.priest.experience,
              messages.priest.additional,
            ]
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index} className="bio-paragraph">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {/* Feature cards grid — translated feature data */}
        <div className="features-grid">
          {features.map((feature, idx) => {
            const Icon = iconComponents[idx % iconComponents.length];
            return (
              <div
                key={`${feature.title}-${idx}`}
                className="feature-card reveal reveal-up"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
