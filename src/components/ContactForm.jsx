function ContactForm() {
  return (
    <div className="form-card">
      <form>
        <input placeholder="आपका नाम" />
        <input placeholder="मोबाइल नंबर" />
        <input placeholder="पूजा का प्रकार" />
        <textarea rows="4" placeholder="पूजा से संबंधित विवरण लिखें" />
        <button type="button">पूजा बुक करें</button>
      </form>
    </div>
  );
}

export default ContactForm;
