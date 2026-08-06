import SectionHeading from '../components/common/SectionHeading';
import GalleryCard from '../components/common/GalleryCard';
import { galleryItems } from '../data/siteContent';

function GalleryPage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="झलकियाँ"
          title="पावन अनुष्ठानों की विशेष झलक"
          description="हमारी पूजा और अनुष्ठान सेवाओं के माध्यम से समर्पण, शुद्धता और मंत्रोच्चारण की झलक।"
        />

        <div className="cards-grid gallery-grid">
          {galleryItems.map((item) => (
            <GalleryCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryPage;
