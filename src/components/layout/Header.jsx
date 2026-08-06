import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

const navItems = [
  { label: 'होम', to: '/' },
  { label: 'परिचय', to: '/about' },
  { label: 'सेवाएँ', to: '/services' },
  { label: 'झलकियाँ', to: '/gallery' },
  { label: 'संपर्क', to: '/contact' },
];

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/">
          <img src={logo} alt="वैदिक अनुष्ठान केंद्र" className="brand-logo" />
          <div className="brand-copy">
            <span className="brand-title">वैदिक अनुष्ठान केंद्र</span>
            <small>उज्जैन की पावन सेवा</small>
          </div>
        </NavLink>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-call" href="tel:+919039095999">कॉल करें</a>
          <a className="btn btn-whatsapp" href="https://wa.me/919039095999" target="_blank" rel="noreferrer">व्हाट्सएप</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
