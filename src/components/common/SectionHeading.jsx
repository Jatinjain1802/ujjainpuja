function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
