function GalleryCard({ title, description, icon }) {
  return (
    <article className="gallery-card">
      <div className="gallery-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default GalleryCard;
