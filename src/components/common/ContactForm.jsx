import { useState } from 'react';

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });

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
        <label className="field-label" htmlFor="name">आपका नाम</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="आपका नाम" />

        <label className="field-label" htmlFor="phone">मोबाइल नंबर</label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="मोबाइल नंबर" />

        <label className="field-label" htmlFor="service">पूजा का प्रकार</label>
        <input id="service" name="service" value={form.service} onChange={handleChange} placeholder="पूजा का प्रकार" />

        <label className="field-label" htmlFor="message">विवरण</label>
        <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} placeholder="पूजा से संबंधित विवरण लिखें" />

        <button type="submit">पूजा बुक करें</button>
      </form>
    </div>
  );
}

export default ContactForm;
