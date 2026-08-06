import SectionHeading from '../components/common/SectionHeading';
import { trustHighlights } from '../data/siteContent';

function AboutPage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="परिचय"
          title="वैदिक परंपरा और अनुभवी सेवा"
          description="पंडित पवन शास्त्री जी उज्जैन के पुरखों की परंपरा से जुड़े हुए हैं और शुद्ध मंत्रोच्चारण के साथ वैदिक पूजा-अनुष्ठान कराते हैं।"
        />

        <div className="split-grid page-grid">
          <div className="info-card">
            <h3>हमारी परंपरा</h3>
            <p>
              पंडित पवन शास्त्री जी को वैदिक अनुष्ठानों एवं धार्मिक संस्कारों का गहन ज्ञान परिवार से विरासत में प्राप्त है। उनकी सेवा उज्जैन की पवित्र धरती से जुड़ी है और प्रत्येक पूजा को शुद्धता एवं आत्मीयता के साथ संपन्न किया जाता है।
            </p>
            <p>
              घर, मंदिर, बुद्धि पूजा, नवग्रह शांति, शनि दोष निवारण और महामृत्युंजय जप सहित सभी प्रकार के अनुष्ठान पूर्ण निष्ठा के साथ कराए जाते हैं।
            </p>
          </div>

          <div className="info-card highlight-card">
            <h3>हमारी प्रमुख विशेषताएँ</h3>
            <ul>
              {trustHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
