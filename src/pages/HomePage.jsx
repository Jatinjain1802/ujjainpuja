import { Link } from "react-router-dom";
import { useContext } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ServiceCard from "../components/common/ServiceCard";
import GalleryCard from "../components/common/GalleryCard";
import { LocaleContext } from "../LocaleContext";

function HomePage() {
  const { messages } = useContext(LocaleContext);
  const home = messages.pages.home;
  const featuredServices = messages.pages.services.items.slice(0, 4);
  const galleryItems = messages.pages.gallery.items;

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{home.eyebrow}</span>
            <h1>{home.title}</h1>
            <p>{home.description}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/contact">
                {home.ctaPrimary}
              </Link>
              <a
                className="btn btn-secondary"
                href={`https://wa.me/919039095999?text=${encodeURIComponent(messages.whatsapp.generic)}`}
                target="_blank"
                rel="noreferrer"
              >
                {home.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <h3>{home.panelTitle}</h3>
            <p>{home.panelDescription}</p>
            <ul>
              {home.trustHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <SectionHeading
            eyebrow={home.featuresSection.eyebrow}
            title={home.featuresSection.title}
            description={home.featuresSection.description}
          />

          <div className="split-grid">
            <div className="info-card">
              <h3>{home.featureSectionTitle}</h3>
              <p>{home.featureSectionText1}</p>
              <ul>
                {home.featureSectionList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="info-card highlight-card">
              <h3>{home.serviceSection.eyebrow}</h3>
              <ul>
                {home.trustHighlights.map((item) => (
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
            eyebrow={home.serviceSection.eyebrow}
            title={home.serviceSection.title}
            description={home.serviceSection.description}
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
            eyebrow={home.gallerySection.eyebrow}
            title={home.gallerySection.title}
            description={home.gallerySection.description}
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
            <span className="eyebrow">{home.contactCta.eyebrow}</span>
            <h2>{home.contactCta.title}</h2>
            <p>{home.contactCta.description}</p>
          </div>
          <Link className="btn btn-primary" to="/contact">
            {home.ctaPrimary}
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
