import { Link } from 'react-router-dom';
import { footerServices, quickLinks } from '../../data/siteContent';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>वैदिक अनुष्ठान केंद्र</h3>
          <p>विश्वास, परंपरा और शुद्ध मंत्रोच्चारण की सेवा में उज्जैन से सेवा।</p>
          <p className="footer-contact">📞 +91 90390 95999</p>
        </div>

        <div>
          <h4>हमारी सेवाएँ</h4>
          <ul>
            {footerServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>त्वरित लिंक</h4>
          <ul>
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-note">
        © 2026 वैदिक अनुष्ठान केंद्र · उज्जैन की प्राचीन परंपराओं के साथ आपकी सेवा।
      </div>
    </footer>
  );
}

export default Footer;
