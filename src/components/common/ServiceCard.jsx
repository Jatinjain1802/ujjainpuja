import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { LocaleContext } from "../../LocaleContext";

function ServiceCard({ id, title, description, details, badge }) {
  const { messages, locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  // Find id if not passed directly
  let targetId = id;
  if (!targetId && messages?.pages?.services?.items) {
    const matched = messages.pages.services.items.find((item) => item.title === title);
    if (matched) targetId = matched.id;
  }
  if (!targetId) targetId = "abhishek-ritual";

  const message = messages.whatsapp.serviceTemplate.replace("{service}", title);
  const whatsappLink = `https://wa.me/919039095999?text=${encodeURIComponent(message)}`;

  const handleCardClick = (e) => {
    if (e.target.closest("a") || e.target.closest("button")) {
      return;
    }
    navigate(`/services/${targetId}`);
  };

  return (
    <article
      className="info-card service-card clickable-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-badge">{badge}</div>
      <h3>
        <Link
          to={`/services/${targetId}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {title}
        </Link>
      </h3>
      <p>{description}</p>
      {details ? <p className="service-detail">{details}</p> : null}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "16px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Link
          to={`/services/${targetId}`}
          className="btn btn-primary"
          style={{ padding: "8px 16px", fontSize: "0.9rem" }}
        >
          {locale === "hi" ? "विवरण देखें" : "View Details"}
        </Link>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary whatsapp-link"
          style={{ padding: "8px 16px", fontSize: "0.9rem" }}
        >
          {messages.whatsapp.bookNow}{" "}
          <FaWhatsapp style={{ marginLeft: "6px", fontSize: "0.95rem" }} />
        </a>
      </div>
    </article>
  );
}

export default ServiceCard;

