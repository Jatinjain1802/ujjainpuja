const links = [
  { label: 'परिचय', href: '#about' },
  { label: 'सेवाएँ', href: '#services' },
  { label: 'झलकियाँ', href: '#gallery' },
  { label: 'संपर्क', href: '#contact' },
];

function Header() {
  return (
    <header className="hero">
      <div className="container">
        <nav className="topbar">
          <a className="brand" href="#">
            वैदिक अनुष्ठान केंद्र
          </a>
          <div className="nav-links">
            {links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">विश्वास, परंपरा और शुद्ध मंत्रोच्चारण</span>
            <h1>अनुभवी वैदिक पंडित सेवाएँ</h1>
            <p className="hero-text">
              सभी प्रकार की वैदिक पूजा, अनुष्ठान एवं दोष निवारण पूर्ण विधि-विधान एवं शुद्ध मंत्रोच्चारण के साथ कराए जाते हैं।
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">
                पूजा बुक करें
              </a>
              <a className="btn btn-secondary" href="https://wa.me/919039095999">
                व्हाट्सएप करें
              </a>
            </div>
          </div>

          <div className="hero-card">
            <h3>उज्जैन (म.प्र.)</h3>
            <p>25+ वर्षों का अनुभव</p>
            <p>घर या इच्छित स्थान पर सेवा</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
