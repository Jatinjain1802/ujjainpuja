import React, { useContext } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LocaleContext } from "../../LocaleContext";

function ServiceCard({ title, description, details, badge }) {
  const { messages } = useContext(LocaleContext);
  const message = messages.whatsapp.serviceTemplate.replace("{service}", title);
  const whatsappLink = `https://wa.me/919039095999?text=${encodeURIComponent(message)}`;

  return (
    <article className="info-card service-card">
      <div className="card-badge">{badge}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {details ? <p className="service-detail">{details}</p> : null}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary whatsapp-link"
      >
        {messages.whatsapp.bookNow}{" "}
        <FaWhatsapp style={{ marginLeft: "8px", fontSize: "1rem" }} />
      </a>
    </article>
  );
}

export default ServiceCard;
