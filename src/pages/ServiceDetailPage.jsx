import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaWhatsapp,
  FaArrowLeft,
  FaCheckCircle,
  FaOm,
  FaChevronDown,
  FaClock,
  FaUserShield,
  FaGem,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCalendarCheck,
  FaInfoCircle,
  FaShieldAlt,
  FaStar,
  FaListOl,
} from "react-icons/fa";
import { LocaleContext } from "../LocaleContext";
import { serviceDetailsData } from "../data/serviceDetailsData";
import BookingForm from "../components/BookingForm";
import "./ServiceDetailPage.css";

/*
  Sacred Mantras Registry
  ------------------------
  Stores Sanskrit mantras, transliterations, translations, and symbols.
*/
const MANTRA_REGISTRY = {
  "abhishek-ritual": {
    sanskrit:
      "॥ ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॥",
    transliteration:
      "Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat",
    meaningEn:
      "We worship the three-eyed Lord Shiva, who is fragrant and nourishes all beings. May He liberate us from death, like a ripe cucumber easily detaches from its vine.",
    meaningHi:
      "हम भगवान शिव की पूजा करते हैं, जो सुगंधित हैं और सभी जीवों का पोषण करते हैं। जैसे पका हुआ खरबूजा बेल से स्वतः मुक्त हो जाता है, वैसे ही वे हमें मृत्यु के बंधनों से मुक्त करें।",
    symbol: "🕉️",
  },
  "shani-dosh-nivaran": {
    sanskrit: "॥ ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥",
    transliteration: "Om Praam Preem Proum Sah Shanaishcharaya Namah",
    meaningEn:
      "Salutations to Lord Shani (Saturn), the god of justice and discipline. May his blessings bring peace, strength, and remove karmic obstacles.",
    meaningHi:
      "न्याय और अनुशासन के देवता भगवान शनि को सादर प्रणाम। उनकी कृपा हमारे जीवन में शांति लाए और हमारे कर्मों के दोषों का निवारण करे।",
    symbol: "🪐",
  },
  "navagraha-shanti": {
    sanskrit:
      "॥ ॐ ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च । गुरुश्च शुक्रः शनिराहुकेतवः सर्वे ग्रहाः शान्तिकरा भवन्तु ॥",
    transliteration:
      "Om Brahma Murari Stripurantakari Bhanuh Shashi Bhumisuto Budhashcha | Gurushcha Shukrah Shani Rahu Ketavah Sarve Graha Shantikara Bhavantu",
    meaningEn:
      "May the divine Trinity (Brahma, Vishnu, Mahesh) and all nine planetary deities—Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu—grant us peace and auspiciousness.",
    meaningHi:
      "ब्रह्मा, विष्णु, महेश तथा सभी नौ ग्रह—सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु—हमारे जीवन में शांति, समृद्धि और कल्याण लाएं।",
    symbol: "☀️",
  },
  "mahamrityunjay-japa": {
    sanskrit:
      "॥ ॐ हौं जूं सः ॐ भूर्भुवः स्वः ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॐ स्वः भुवः भूः ॐ सः जूं हौं ॐ ॥",
    transliteration:
      "Om Houm Joom Sah | Om Bhur Bhuvah Swah | Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat | Om Swah Bhuvah Bhuh | Om Sah Joom Houm Om",
    meaningEn:
      "The ultimate protective mantra of Lord Shiva. It invokes absolute healing energy, shields from untimely events, and bestows physical and spiritual longevity.",
    meaningHi:
      "भगवान शिव का परम कल्याणकारी मंत्र। यह पूर्ण स्वास्थ्य प्रदान करता है, अकाल मृत्यु से रक्षा करता है और आध्यात्मिक आयु प्रदान करता है।",
    symbol: "🕉️",
  },
  "kalsarp-dosh-shanti": {
    sanskrit:
      "॥ ॐ नवकुलाय विद्यमहे विषदंताय धीमहि तन्नो सर्पः प्रचोदयात ॥",
    transliteration:
      "Om Navakulaya Vidmahe Vishadantaya Dhimahi Tanno Sarpah Prachodayat",
    meaningEn:
      "We meditate on the nine sacred serpent clans. May the great divine serpents guide our intellect and remove snake-dosh (Kalsarp) obstacles from our paths.",
    meaningHi:
      "हम नौ प्रमुख नाग कुलों का ध्यान करते हैं। दिव्य नाग देवता हमारी बुद्धि को सन्मार्ग पर चलाएं और कालसर्प दोष की बाधाओं को दूर करें।",
    symbol: "🐍",
  },
  "mangaldosh-shanti": {
    sanskrit:
      "॥ ॐ धरणीगर्भसंभूतं विद्युतकान्तिसमप्रभम् । कुमारं शक्तिहस्तं च मङ्गलं प्रणमाम्यहम् ॥",
    transliteration:
      "Om Dharani-Garbha-Sambhutam Vidyut Kanti Sama Prabham | Kumaram Shakti-Hastam Cha Mangalam Pranamamyaham",
    meaningEn:
      "I salute the auspicious Lord Mars (Mangal), who is born from the womb of the Earth, shines like lightning, and holds a divine spear. May he remove obstacles in marriage and career.",
    meaningHi:
      "पृथ्वी माता की कोख से जन्मे, विद्युत जैसी कांति वाले, हाथ में शक्ति-अस्त्र धारण करने वाले कुमार मंगल देव को मैं प्रणाम करता हूं। वे विवाह और कार्यक्षेत्र की बाधाएं दूर करें।",
    symbol: "🔥",
  },
  "baglamukhi-anushthan": {
    sanskrit:
      "॥ ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्व्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा ॥",
    transliteration:
      "Om Hleem Bagalamukhi Sarva Dushtanam Vacham Mukham Padam Stambhaya Jihvam Keelaya Buddhim Vinashaya Hleem Om Swaha",
    meaningEn:
      "We pray to Goddess Bagalamukhi. May she paralyze the speech, feet, and intellect of negative forces, rendering all hostility inactive and ensuring victory.",
    meaningHi:
      "माँ बगलामुखी से प्रार्थना है कि वे शत्रुओं व नकारात्मक ऊर्जाओं की वाणी, मुख, पैर तथा बुद्धि को स्तंभित करें और भक्त की रक्षा व विजय सुनिश्चित करें।",
    symbol: "⚡",
  },
};

const GENERAL_MANTRA = {
  sanskrit:
    "॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
  transliteration:
    "Om Bhur Bhuvah Swah | Tat Savitur Varenyam | Bhargo Devasya Dhimahi | Dhiyo Yo Nah Prachodayat",
  meaningEn:
    "We meditate on the divine light of the Sun, the source of all energy and creation. May it illuminate our intellect and guide us on the righteous path.",
  meaningHi:
    "हम सभी ऊर्जा और सृष्टि के स्रोत सविता (सूर्य देव) के दिव्य प्रकाश का ध्यान करते हैं। वे हमारी बुद्धि को जागृत करें और सन्मार्ग की ओर प्रेरित करें।",
  symbol: "ॐ",
};

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const { locale, messages } = useContext(LocaleContext);
  const services = messages?.pages?.services;

  const pageRef = useRef(null);

  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab(0);
    setOpenFaq({});
  }, [serviceId]);

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll(".reveal");
    if (!elements?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [serviceId]);

  if (!services || !services.items) {
    return <Navigate to="/services" replace />;
  }

  const service = services.items.find((item) => item.id === serviceId);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const isHindi = locale === "hi";
  const currentLang = isHindi ? "hi" : "en";

  // Lookup localized detailed SEO content for the 20 landing page points
  const detailedData =
    serviceDetailsData[serviceId]?.[currentLang] ||
    serviceDetailsData[serviceId]?.hi ||
    serviceDetailsData[serviceId]?.en;

  const buildWhatsAppLink = (serviceTitle) => {
    const template =
      messages.whatsapp?.serviceTemplate ||
      "Hello, I would like to book the service: {service}.";
    const msg = template.replace("{service}", serviceTitle);
    return `https://wa.me/919039095999?text=${encodeURIComponent(msg)}`;
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const imageSrc = service.image || "/images/vaidikanushthan/03/divine.webp";

  const durationText = isHindi ? "अवधि: २ से ४ घंटे" : "Duration: 2 to 4 Hours";
  const priestText = isHindi
    ? "अनुभवी वैदिक आचार्य"
    : "Experienced Vedic Acharya";
  const materialText = isHindi
    ? "संपूर्ण पूजा सामग्री शामिल"
    : "All Puja Samagri Included";
  const locationText = isHindi
    ? "उज्जैन (गृह, घाट या मंदिर)"
    : "Ujjain (Home, Ghat, or Temple)";

  const mantra = MANTRA_REGISTRY[serviceId] || GENERAL_MANTRA;

  const seoTitle =
    detailedData?.seo?.metaTitle ||
    `${service.title} | ${isHindi ? "वैदिक अनुष्ठान केंद्र उज्जैन" : "Vedic Anushthan Kendra Ujjain"}`;
  const seoDescription =
    detailedData?.seo?.metaDescription || service.description;
  const canonicalPath =
    detailedData?.seo?.canonicalUrl || `/services/${serviceId}`;
  const focusKeywords = Array.isArray(detailedData?.seo?.focusKeywords)
    ? detailedData.seo.focusKeywords.join(", ")
    : detailedData?.seo?.focusKeywords || "";

  const faqsToDisplay =
    detailedData?.faqs && detailedData.faqs.length > 0
      ? detailedData.faqs.map((f) => ({ q: f.question, a: f.answer }))
      : isHindi
        ? [
            {
              q: "पूजा के लिए उज्जैन का क्या महत्व है और इसे यहाँ क्यों कराना चाहिए?",
              a: "उज्जैन (अवंतिका) को मोक्षदायिनी सप्तपुरियों में से एक और भगवान महाकाल की पावन नगरी माना जाता है। यहाँ किए गए अनुष्ठान अत्यंत प्रभावशाली और शीघ्र फलदायी होते हैं।",
            },
            {
              q: "क्या मैं इस पूजा में ऑनलाइन / दूर बैठकर भी भाग ले सकता हूँ?",
              a: "हाँ, यदि आप उज्जैन आने में असमर्थ हैं, तो संकल्प एवं ऑनलाइन वीडियो पूजा की सुविधा उपलब्ध है।",
            },
          ]
        : [
            {
              q: "What is the spiritual significance of performing puja in Ujjain?",
              a: "Ujjain is one of the seven sacred cities of India and the abode of Mahakaleshwar Jyotirlinga, making rituals performed here highly potent.",
            },
            {
              q: "Can I participate in this puja remotely/online?",
              a: "Yes, online video sankalp and puja services are available if you are unable to visit in person.",
            },
          ];

  return (
    <article className="service-detail-page" ref={pageRef}>
      {/* 17. SEO Meta Title, Description, Keywords, Canonical URL */}
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {focusKeywords && <meta name="keywords" content={focusKeywords} />}
        <link
          rel="canonical"
          href={`https://vaidikanushthanujjain.com${canonicalPath}`}
        />
      </Helmet>

      {/* 1. H1 / Main SEO Title & Hero Banner */}
      <header className="service-detail-hero">
        <div className="container service-detail-hero-inner">
          <div className="service-detail-hero-content">
            <Link to="/services" className="back-link">
              <FaArrowLeft style={{ marginRight: "8px" }} />
              {isHindi ? "सभी सेवाएँ" : "Back to Services"}
            </Link>
            <h1>{detailedData?.hero?.h1Title || service.title}</h1>
            <p className="hero-subtitle">
              {detailedData?.hero?.subtitle || service.description}
            </p>
            {detailedData?.hero?.introText && (
              <p className="hero-intro-lead">{detailedData.hero.introText}</p>
            )}
            <div className="hero-action-buttons">
              <a
                href={buildWhatsAppLink(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary hero-whatsapp-btn"
              >
                <FaWhatsapp style={{ marginRight: "10px" }} />
                {messages.whatsapp?.bookNow ||
                  (isHindi ? "पूजा बुक करें" : "Book Now")}
              </a>
              <a href="tel:+91919039095999" className="btn hero-call-btn">
                <FaPhoneAlt style={{ marginRight: "8px" }} />
                {isHindi ? "पंडित जी से संपर्क करें" : "Call Pandit Ji"}
              </a>
            </div>
          </div>

          <div className="service-detail-hero-image-wrap">
            <img
              src={imageSrc}
              alt={service.title}
              className="service-detail-hero-img"
            />
          </div>
        </div>
      </header>

      {/* Main SEO Content Body */}
      <section className="service-detail-body section">
        <div className="container">
          <div className="service-detail-grid">
            {/* Left Main Column: Detailed SEO Sections */}
            <div className="service-detail-main">
              {/* Mantra Showcase */}
              <div className="mantra-showcase-card reveal reveal-up">
                <div className="mantra-card-bg-symbol">{mantra.symbol}</div>
                <div className="mantra-card-header">
                  <span className="mantra-badge">
                    {isHindi ? "पवित्र वैदिक मंत्र" : "Sacred Vedic Mantra"}
                  </span>
                  <FaOm className="mantra-header-om" />
                </div>
                <div className="mantra-sanskrit-text">{mantra.sanskrit}</div>
                <div className="mantra-transliteration">
                  {mantra.transliteration}
                </div>
                <div className="mantra-translation">
                  <strong>{isHindi ? "मंत्र का अर्थ: " : "Meaning: "}</strong>
                  {isHindi ? mantra.meaningHi : mantra.meaningEn}
                </div>
              </div>

              {/* 3. What is the service/puja? */}
              {detailedData?.whatIs && (
                <div className="seo-section-card detail-card reveal reveal-up">
                  <div className="seo-card-header">
                    <FaInfoCircle className="seo-icon" />
                    <h2>
                      {detailedData.whatIs.title ||
                        (isHindi
                          ? "यह पूजा / सेवा क्या है?"
                          : "What is this Service?")}
                    </h2>
                  </div>
                  <p className="detailed-paragraph">
                    {detailedData.whatIs.description}
                  </p>
                </div>
              )}

              {/* 4. Religious Significance & 5. Why perform in Ujjain */}
              {(detailedData?.significance || detailedData?.whyUjjain) && (
                <div className="seo-section-card detail-card reveal reveal-up">
                  {detailedData.significance && (
                    <div className="seo-subblock">
                      <h2>
                        {detailedData.significance.title ||
                          (isHindi
                            ? "धार्मिक एवं ज्योतिषीय महत्व"
                            : "Religious Significance")}
                      </h2>
                      <p className="detailed-paragraph">
                        {detailedData.significance.description}
                      </p>
                    </div>
                  )}

                  {detailedData.whyUjjain && (
                    <div className="seo-subblock panel-highlight-box">
                      <div className="subblock-header">
                        <FaMapMarkerAlt className="highlight-icon" />
                        <h4>
                          {detailedData.whyUjjain.title ||
                            (isHindi
                              ? "उज्जैन में यह पूजा क्यों कराएं?"
                              : "Why perform this Puja in Ujjain?")}
                        </h4>
                      </div>
                      <p>{detailedData.whyUjjain.description}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 6. Different types of rituals/services related to this service */}
              {detailedData?.types && detailedData.types.length > 0 && (
                <div className="seo-section-card detail-card reveal reveal-up">
                  <h2>
                    {isHindi
                      ? "विभिन्न प्रकार की पूजा एवं अनुष्ठान सेवाएँ"
                      : "Types of Rituals & Services"}
                  </h2>
                  <div className="seo-types-grid">
                    {detailedData.types.map((type, idx) => (
                      <div className="seo-type-item" key={idx}>
                        <div className="type-badge-num">0{idx + 1}</div>
                        <div className="type-content">
                          <h3>{type.title}</h3>
                          <p>{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Detailed Puja/Ritual Process & Tabs */}
              <div className="tabs-container reveal reveal-up">
                <div
                  className="tabs-header-bar"
                  role="tablist"
                  aria-label="Puja Details Tabs"
                >
                  <button
                    className={`tab-btn ${activeTab === 0 ? "active" : ""}`}
                    onClick={() => setActiveTab(0)}
                    role="tab"
                    id="tab-procedure"
                  >
                    {isHindi ? "विधिवत पूजन प्रक्रिया" : "Ritual Process"}
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 1 ? "active" : ""}`}
                    onClick={() => setActiveTab(1)}
                    role="tab"
                    id="tab-suitable"
                  >
                    {isHindi ? "पात्रता एवं जानकारी" : "Suitability & Details"}
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 2 ? "active" : ""}`}
                    onClick={() => setActiveTab(2)}
                    role="tab"
                    id="tab-benefits"
                  >
                    {isHindi
                      ? "धार्मिक मान्यता लाभ"
                      : "Belief-based Benefits"}
                  </button>
                </div>

                <div className="tab-content-panel">
                  {/* Tab 0: Detailed Ritual Process */}
                  {activeTab === 0 && (
                    <div className="tab-pane animate-fade-in">
                      <p className="tab-intro-text">
                        {detailedData?.ritualProcess?.description ||
                          (isHindi
                            ? "पंडित पवन शास्त्री जी के मार्गदर्शन में पूजा मुख्य रूप से निम्नलिखित चरणों में संपन्न की जाती है:"
                            : "Under Pandit Pawan Shastri Ji's guidance, the ritual follows these traditional stages:")}
                      </p>
                      <div className="puja-stepper-timeline">
                        {(
                          detailedData?.ritualProcess?.steps || [
                            "संकल्प",
                            "गणेश पूजन",
                            "मुख्य मंत्र जाप व अभिषेक",
                            "हवन एवं आहुति",
                            "पूर्णाहुति एवं प्रसाद",
                          ]
                        ).map((stepText, idx) => (
                          <div className="timeline-step-item" key={idx}>
                            <div className="timeline-badge-node">
                              {idx + 1}
                            </div>
                            <div className="timeline-step-content">
                              <h4>
                                {isHindi ? `चरण 0${idx + 1}` : `Step 0${idx + 1}`}
                              </h4>
                              <p>{stepText}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 1: Who can perform / required info */}
                  {activeTab === 1 && (
                    <div className="tab-pane animate-fade-in">
                      {detailedData?.suitableFor && (
                        <div className="guideline-sub-card">
                          <h4>
                            {isHindi
                              ? "कौन करा सकता है यह पूजा?"
                              : "Who can perform / suitable for"}
                          </h4>
                          <ul className="guidelines-check-list">
                            {detailedData.suitableFor.map((item, idx) => (
                              <li key={idx}>
                                <FaCheckCircle className="check-bullet" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {detailedData?.requiredInfo && (
                        <div
                          className="guideline-sub-card"
                          style={{ marginTop: "24px" }}
                        >
                          <h4>
                            {isHindi
                              ? "पूजा के लिए आवश्यक जानकारी:"
                              : "Required Details for Puja:"}
                          </h4>
                          <div className="required-tags-wrap">
                            {detailedData.requiredInfo.map((info, idx) => (
                              <span className="req-tag" key={idx}>
                                <FaCheckCircle style={{ marginRight: "6px" }} />
                                {info}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 2: Religious-belief-based benefits */}
                  {activeTab === 2 && (
                    <div className="tab-pane animate-fade-in">
                      <h4>
                        {isHindi
                          ? "धार्मिक मान्यताओं के अनुसार संभावित आध्यात्मिक लाभ"
                          : "Belief-based Spiritual Benefits"}
                      </h4>
                      <p className="disclaimer-note">
                        {isHindi
                          ? "नोट: ये लाभ सनातन शास्त्रीय एवं ज्योतिषीय धार्मिक मान्यताओं पर आधारित हैं।"
                          : "Note: Benefits are based on Hindu scriptural beliefs and traditions."}
                      </p>
                      <ul className="guidelines-check-list">
                        {(
                          detailedData?.benefits || [
                            isHindi
                              ? "धार्मिक मान्यताओं के अनुसार मानसिक एवं आध्यात्मिक शांति"
                              : "Spiritual peace based on traditional beliefs",
                          ]
                        ).map((benefit, idx) => (
                          <li key={idx}>
                            <FaCheckCircle className="check-bullet" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* 12. Online Puja / Sankalp Section */}
              {detailedData?.onlineSankalp && (
                <div className="seo-section-card detail-card online-sankalp-card reveal reveal-up">
                  <div className="sankalp-header">
                    <FaCalendarCheck className="sankalp-icon" />
                    <h2>
                      {isHindi
                        ? "ऑनलाइन पूजा एवं संकल्प सेवा"
                        : "Online Puja & Remote Sankalp Service"}
                    </h2>
                  </div>
                  <p>{detailedData.onlineSankalp}</p>
                  <a
                    href={buildWhatsAppLink(
                      `${service.title} - Online Sankalp`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary online-btn"
                  >
                    <FaWhatsapp style={{ marginRight: "8px" }} />
                    {isHindi ? "ऑनलाइन संकल्प जानकारी" : "Online Sankalp Inquiry"}
                  </a>
                </div>
              )}

              {/* 13. Why choose Pandit Ji & 14. Step-by-step booking process */}
              <div className="seo-section-card detail-card reveal reveal-up">
                {detailedData?.whyChoosePanditJi && (
                  <div className="why-panditji-block">
                    <h2>
                      {isHindi
                        ? "क्यों चुनें पंडित जी?"
                        : "Why Choose Pandit Ji?"}
                    </h2>
                    <ul className="guidelines-check-list">
                      {detailedData.whyChoosePanditJi.map((item, idx) => (
                        <li key={idx}>
                          <FaStar className="check-bullet star-bullet" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {detailedData?.bookingProcess && (
                  <div className="booking-steps-block">
                    <div className="subblock-header">
                      <FaListOl className="highlight-icon" />
                      <h3>
                        {isHindi
                          ? "पूजा बुकिंग की सरल चरणबद्ध प्रक्रिया"
                          : "Step-by-step Booking Process"}
                      </h3>
                    </div>
                    <div className="booking-steps-grid">
                      {detailedData.bookingProcess.map((step, idx) => (
                        <div className="booking-step-chip" key={idx}>
                          <span className="step-num">{idx + 1}</span>
                          <span className="step-text">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 15. FAQ Section (5–7 relevant questions) */}
              <div className="faq-accordion-section reveal reveal-up">
                <h3 className="section-subtitle-small">
                  {isHindi
                    ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)"
                    : "Frequently Asked Questions"}
                </h3>
                <div className="faq-accordion-container">
                  {faqsToDisplay.map((faq, idx) => {
                    const isOpen = !!openFaq[idx];
                    return (
                      <div
                        className={`faq-item-card ${isOpen ? "open" : ""}`}
                        key={idx}
                      >
                        <button
                          className="faq-question-trigger"
                          onClick={() => toggleFaq(idx)}
                          aria-expanded={isOpen}
                          id={`faq-btn-${idx}`}
                        >
                          <span>{faq.q}</span>
                          <FaChevronDown className="faq-chevron" />
                        </button>
                        <div
                          className="faq-answer-pane"
                          id={`faq-pane-${idx}`}
                          role="region"
                          aria-labelledby={`faq-btn-${idx}`}
                        >
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 16. Strong CTA Section */}
              <div className="strong-cta-card reveal reveal-up">
                <h2>
                  {detailedData?.cta?.title ||
                    (isHindi
                      ? `${service.title} के लिए आज ही संपर्क करें`
                      : `Book ${service.title} Today`)}
                </h2>
                <p>
                  {detailedData?.cta?.text ||
                    (isHindi
                      ? "अपनी आवश्यकता और धार्मिक संकल्प के अनुसार शुभ मुहूर्त में पूजा संपन्न कराने हेतु पंडित जी से परामर्श लें।"
                      : "Consult Pandit Ji for performing the ritual with full Vedic traditions and auspicious muhurat.")}
                </p>
                <p className="cta-devotional-tagline">
                  ॥ जय महाकाल | जय अवंतिका धाम ॥
                </p>
                <div className="strong-cta-buttons">
                  <a
                    href={buildWhatsAppLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary cta-btn-wa"
                  >
                    <FaWhatsapp style={{ marginRight: "8px" }} />
                    {isHindi ? "पूजा बुक करें" : "Book on WhatsApp"}
                  </a>
                  <a
                    href="tel:+91919039095999"
                    className="btn cta-btn-call"
                  >
                    <FaPhoneAlt style={{ marginRight: "8px" }} />
                    {isHindi ? "कॉल करें" : "Call Now"}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Quick Info & WhatsApp CTA */}
            <aside className="service-detail-sidebar">
              <div className="sidebar-card quick-specs-card reveal reveal-up">
                <h3>{isHindi ? "पूजा विवरण संक्षेप में" : "Puja Overview"}</h3>
                <div className="specs-list">
                  <div className="spec-item">
                    <span className="spec-icon-label-wrap">
                      <FaClock className="spec-icon" />
                      <span className="spec-label">
                        {isHindi ? "अवधि" : "Duration"}
                      </span>
                    </span>
                    <span className="spec-value">{durationText}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon-label-wrap">
                      <FaUserShield className="spec-icon" />
                      <span className="spec-label">
                        {isHindi ? "पुरोहित" : "Priests"}
                      </span>
                    </span>
                    <span className="spec-value">{priestText}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon-label-wrap">
                      <FaGem className="spec-icon" />
                      <span className="spec-label">
                        {isHindi ? "सामग्री" : "Samagri"}
                      </span>
                    </span>
                    <span className="spec-value">{materialText}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon-label-wrap">
                      <FaMapMarkerAlt className="spec-icon" />
                      <span className="spec-label">
                        {isHindi ? "स्थान" : "Location"}
                      </span>
                    </span>
                    <span className="spec-value">{locationText}</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-card whatsapp-cta-card reveal reveal-up">
                <h3>
                  {isHindi ? "त्वरित पूछताछ एवं बुकिंग" : "Quick Inquiry"}
                </h3>
                <p>
                  {isHindi
                    ? "पंडित पवन शास्त्री जी से सीधे व्हाट्सएप पर बात करें और शुभ मुहूर्त के अनुसार पूजा की तिथि निर्धारित करें।"
                    : "Directly chat with Pandit Pawan Shastri Ji on WhatsApp to schedule your puja according to auspicious timings."}
                </p>
                <a
                  href={buildWhatsAppLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary whatsapp-large-btn"
                >
                  <FaWhatsapp
                    style={{ marginRight: "10px", fontSize: "1.3rem" }}
                  />
                  {messages.whatsapp?.bookNow ||
                    (isHindi ? "व्हाट्सएप पर बुक करें" : "Book on WhatsApp")}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Booking Form section */}
      <div className="service-detail-booking-wrap reveal reveal-up">
        <BookingForm initialPuja={service.title} />
      </div>
    </article>
  );
}

export default ServiceDetailPage;
