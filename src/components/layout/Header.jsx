import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { LocaleContext } from "../../LocaleContext";

function Header() {
  const { locale, setLocale, messages } = useContext(LocaleContext);
  const navItems = [
    { label: messages.header.nav.home, to: "/" },
    { label: messages.header.nav.services, to: "/services" },
    { label: messages.header.nav.features, to: "/gallery" },
    { label: messages.header.nav.contact, to: "/contact" },
  ];
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/">
          <img
            src={logo}
            alt={messages.header.logoAlt}
            className="brand-logo"
          />
          <div className="brand-copy">
            <span className="brand-title">{messages.siteName}</span>
            <small>{messages.header.tagline || "उज्जैन की पावन सेवा"}</small>
          </div>
        </NavLink>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-call" href={`tel:${messages.header.phone}`}>
            {messages.header.callButton}
          </a>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/919039095999?text=${encodeURIComponent(messages.whatsapp.generic)}`}
            target="_blank"
            rel="noreferrer"
          >
            {messages.whatsapp.headerButton}
          </a>
          <div className="language-switcher">
            <div
              className="language-toggle"
              role="tablist"
              aria-label={messages.header.languageLabel}
            >
              <button
                type="button"
                role="tab"
                aria-selected={locale === "hi"}
                className={`lang-btn ${locale === "hi" ? "active" : ""}`}
                onClick={() => setLocale("hi")}
              >
                हिन्दी
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={locale === "en"}
                className={`lang-btn ${locale === "en" ? "active" : ""}`}
                onClick={() => setLocale("en")}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
