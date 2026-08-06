import { useContext } from "react";
import SectionHeading from "../components/common/SectionHeading";
import { LocaleContext } from "../LocaleContext";

function AboutPage() {
  const { messages } = useContext(LocaleContext);
  const about = messages.pages.about;

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
        />

        <div className="split-grid page-grid">
          <div className="info-card">
            <h3>{about.traditionTitle}</h3>
            <p>{about.traditionParagraph1}</p>
            <p>{about.traditionParagraph2}</p>
          </div>

          <div className="info-card highlight-card">
            <h3>{about.highlightsTitle}</h3>
            <ul>
              {about.trustHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
