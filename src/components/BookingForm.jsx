import React, { useState, useContext } from "react";
import Select from "react-select";
import "./BookingForm.css";
import { LocaleContext } from "../LocaleContext";
import enLocales from "../locales/en.json";
import hiLocales from "../locales/hi.json";

const BookingForm = () => {
  const { locale, messages } = useContext(LocaleContext);

  // Build bilingual options using both locale files so user sees translation
  const pujaOptions = (hiLocales.pages.services.items || []).map(
    (hiItem, idx) => {
      const enItem = enLocales.pages.services.items?.[idx];
      const hiTitle = hiItem.title || "";
      const enTitle = enItem?.title || hiTitle;
      return {
        value: enTitle, // canonical value in English
        label: `${hiTitle} / ${enTitle}`,
      };
    },
  );

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    puja: null,
    city: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, date, puja, city, message } = formData;
    if (!name || !date || !puja || !city) {
      const errMsg =
        locale === "hi"
          ? "कृपया अपना नाम, पूजा का प्रकार, शहर और तिथि भरें।"
          : "Please enter name, puja type, city, and date.";
      alert(errMsg);
      return;
    }

    const pujaText = puja.label || puja.value || "";

    // Use localized template if available and then append form details with localized labels
    const serviceTemplate =
      messages.whatsapp?.serviceTemplate ||
      (locale === "hi"
        ? "नमस्ते, मैं निम्न सेवा बुक करना चाहता/चाहती हूँ: {service}।"
        : "Hello, I would like to book the following service: {service}.");

    const dateLabel = locale === "hi" ? "तिथि" : "Date";
    const cityLabel = locale === "hi" ? "शहर" : "City";
    const nameLabel =
      messages.pages?.contactForm?.nameLabel ||
      (locale === "hi" ? "नाम" : "Name");
    const messageLabel =
      messages.pages?.contactForm?.messageLabel ||
      (locale === "hi" ? "संदेश" : "Message");

    const lines = [];
    lines.push(serviceTemplate.replace("{service}", pujaText));
    lines.push(`${nameLabel}: ${name}`);
    lines.push(`${dateLabel}: ${date}`);
    lines.push(`${cityLabel}: ${city}`);
    lines.push(
      `${messageLabel}: ${message || (locale === "hi" ? "कोई नहीं" : "None")}`,
    );

    const whatsappText = lines.join("\n");
    const whatsappUrl = `https://wa.me/919039095999?text=${encodeURIComponent(whatsappText)}`;

    window.open(whatsappUrl, "_blank");
    setFormData({ name: "", date: "", puja: null, city: "", message: "" });
  };

  return (
    <section id="contact" className="section booking-section">
      <div className="container">
        <div className="booking-container glass-panel">
          <div className="booking-content">
            <h2 className="section-title">
              {messages.pages?.contact?.title ||
                (locale === "hi" ? "पूजा बुक करें" : "Book Puja")}
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
              {messages.pages?.home?.contactCta?.description ||
                (locale === "hi"
                  ? "अपनी सुविधानुसार पूजा की तिथि और स्थान चुनें।"
                  : "Choose a date and location that suits you.")}
            </p>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    {messages.pages?.contactForm?.nameLabel ||
                      (locale === "hi" ? "नाम" : "Name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={
                      messages.pages?.contactForm?.namePlaceholder ||
                      (locale === "hi"
                        ? "आपका नाम दर्ज करें"
                        : "Enter your name")
                    }
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">
                    {locale === "hi" ? "पूजा तिथि" : "Date"}
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="puja">
                    {messages.pages?.contactForm?.serviceLabel ||
                      (locale === "hi" ? "पूजा का प्रकार" : "Puja Type")}
                  </label>
                  <Select
                    inputId="puja"
                    name="puja"
                    options={pujaOptions.map((opt) => ({
                      ...opt,
                      label:
                        locale === "hi" ? opt.label.split(" / ")[0] : opt.value,
                    }))}
                    value={formData.puja}
                    onChange={(selected) =>
                      setFormData((prev) => ({ ...prev, puja: selected }))
                    }
                    placeholder={
                      messages.pages?.contactForm?.servicePlaceholder ||
                      (locale === "hi" ? "कृपया चुनें" : "Please select")
                    }
                    isSearchable
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        minHeight: "48px",
                        borderRadius: "10px",
                      }),
                      menu: (p) => ({ ...p, zIndex: 9999 }),
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">
                    {messages.pages?.contact?.locationLabel ||
                      (locale === "hi" ? "शहर / स्थान" : "City")}
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder={
                      messages.pages?.contactForm?.servicePlaceholder ||
                      (locale === "hi"
                        ? "उज्जैन / अन्य शहर"
                        : "Ujjain / other city")
                    }
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  {messages.pages?.contactForm?.messageLabel ||
                    (locale === "hi" ? "विशेष संदेश" : "Special Message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder={
                    messages.pages?.contactForm?.messagePlaceholder ||
                    (locale === "hi"
                      ? "यदि कोई विशेष निर्देश हैं तो लिखें"
                      : "Write any special instructions")
                  }
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary submit-btn">
                {messages.pages?.contactForm?.submitButton ||
                  (locale === "hi" ? "पूजा बुक करें" : "Book Now")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
