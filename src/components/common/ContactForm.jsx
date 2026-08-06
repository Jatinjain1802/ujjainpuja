import { useState, useContext } from "react";
import { LocaleContext } from "../../LocaleContext";

function ContactForm() {
  const { messages } = useContext(LocaleContext);
  const formLabels = messages.pages.contactForm;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="contact-form-card">
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="name">
          {formLabels.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={formLabels.namePlaceholder}
        />

        <label className="field-label" htmlFor="phone">
          {formLabels.phoneLabel}
        </label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={formLabels.phonePlaceholder}
        />

        <label className="field-label" htmlFor="service">
          {formLabels.serviceLabel}
        </label>
        <input
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          placeholder={formLabels.servicePlaceholder}
        />

        <label className="field-label" htmlFor="message">
          {formLabels.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          placeholder={formLabels.messagePlaceholder}
        />

        <button type="submit">{formLabels.submitButton}</button>
      </form>
    </div>
  );
}

export default ContactForm;
