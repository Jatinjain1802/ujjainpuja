import { useContext } from "react";
import SectionHeading from "../components/common/SectionHeading";
import GalleryCard from "../components/common/GalleryCard";
import { LocaleContext } from "../LocaleContext";

function GalleryPage() {
  const { messages } = useContext(LocaleContext);
  const gallery = messages.pages.gallery;

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          description={gallery.description}
        />

        <div className="cards-grid gallery-grid">
          {gallery.items.map((item) => (
            <GalleryCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryPage;
