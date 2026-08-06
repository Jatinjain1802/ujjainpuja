function ServiceCard({ title, description, badge }) {
  return (
    <article className="info-card service-card">
      <div className="card-badge">{badge}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default ServiceCard;
