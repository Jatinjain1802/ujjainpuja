import { useContext } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ContactForm from "../components/common/ContactForm";
import { LocaleContext } from "../LocaleContext";

function ContactPage() {
  const { messages } = useContext(LocaleContext);
  const contact = messages.pages.contact;

  return (
    <section className="page-section">
      <div className="container contact-page-grid">
        <div className="info-card">
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />

          <div className="contact-details">
            <p>
              <strong>📞</strong> {contact.phoneValue}
            </p>
            <p>
              <strong>📍</strong> {contact.locationValue}
            </p>
            <p>
              <strong>💬</strong> {contact.chatLabel}
            </p>
            <p>
              <strong>⏳</strong> {contact.availabilityLabel}
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default ContactPage;
