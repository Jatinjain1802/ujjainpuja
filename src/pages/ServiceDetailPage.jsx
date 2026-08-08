import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaWhatsapp, FaArrowLeft, FaCheckCircle, FaOm, FaChevronDown, FaClock, FaUserShield, FaGem, FaMapMarkerAlt } from "react-icons/fa";
import { LocaleContext } from "../LocaleContext";
import BookingForm from "../components/BookingForm";
import "./ServiceDetailPage.css";

/*
  Sacred Mantras Registry
  ------------------------
  Stores Sanskrit mantras, transliterations, translations, and rules for chanting.
  We look these up dynamically by serviceId.
*/
const MANTRA_REGISTRY = {
  "abhishek-ritual": {
    sanskrit: "॥ ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॥",
    transliteration: "Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat",
    meaningEn: "We worship the three-eyed Lord Shiva, who is fragrant and nourishes all beings. May He liberate us from death, like a ripe cucumber easily detaches from its vine.",
    meaningHi: "हम भगवान शिव की पूजा करते हैं, जो सुगंधित हैं और सभी जीवों का पोषण करते हैं। जैसे पका हुआ खरबूजा बेल से स्वतः मुक्त हो जाता है, वैसे ही वे हमें मृत्यु के बंधनों से मुक्त करें।",
    symbol: "🕉️"
  },
  "shani-dosh-nivaran": {
    sanskrit: "॥ ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥",
    transliteration: "Om Praam Preem Proum Sah Shanaishcharaya Namah",
    meaningEn: "Salutations to Lord Shani (Saturn), the god of justice and discipline. May his blessings bring peace, strength, and remove karmic obstacles.",
    meaningHi: "न्याय और अनुशासन के देवता भगवान शनि को सादर प्रणाम। उनकी कृपा हमारे जीवन में शांति लाए और हमारे कर्मों के दोषों का निवारण करे।",
    symbol: "🪐"
  },
  "navagraha-shanti": {
    sanskrit: "॥ ॐ ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च । गुरुश्च शुक्रः शनिराहुकेतवः सर्वे ग्रहाः शान्तिकरा भवन्तु ॥",
    transliteration: "Om Brahma Murari Stripurantakari Bhanuh Shashi Bhumisuto Budhashcha | Gurushcha Shukrah Shani Rahu Ketavah Sarve Graha Shantikara Bhavantu",
    meaningEn: "May the divine Trinity (Brahma, Vishnu, Mahesh) and all nine planetary deities—Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu—grant us peace and auspiciousness.",
    meaningHi: "ब्रह्मा, विष्णु, महेश तथा सभी नौ ग्रह—सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु—हमारे जीवन में शांति, समृद्धि और कल्याण लाएं।",
    symbol: "☀️"
  },
  "mahamrityunjay-japa": {
    sanskrit: "॥ ॐ हौं जूं सः ॐ भूर्भुवः स्वः ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॐ स्वः भुवः भूः ॐ सः जूं हौं ॐ ॥",
    transliteration: "Om Houm Joom Sah | Om Bhur Bhuvah Swah | Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat | Om Swah Bhuvah Bhuh | Om Sah Joom Houm Om",
    meaningEn: "The ultimate protective mantra of Lord Shiva. It invokes absolute healing energy, shields from untimely events, and bestows physical and spiritual longevity.",
    meaningHi: "भगवान शिव का परम कल्याणकारी मंत्र। यह पूर्ण स्वास्थ्य प्रदान करता है, अकाल मृत्यु से रक्षा करता है और आध्यात्मिक आयु प्रदान करता है।",
    symbol: "🕉️"
  },
  "kalsarp-dosh-shanti": {
    sanskrit: "॥ ॐ नवकुलाय विद्यमहे विषदंताय धीमहि तन्नो सर्पः प्रचोदयात ॥",
    transliteration: "Om Navakulaya Vidmahe Vishadantaya Dhimahi Tanno Sarpah Prachodayat",
    meaningEn: "We meditate on the nine sacred serpent clans. May the great divine serpents guide our intellect and remove snake-dosh (Kalsarp) obstacles from our paths.",
    meaningHi: "हम नौ प्रमुख नाग कुलों का ध्यान करते हैं। दिव्य नाग देवता हमारी बुद्धि को सन्मार्ग पर चलाएं और कालसर्प दोष की बाधाओं को दूर करें।",
    symbol: "🐍"
  },
  "mangaldosh-shanti": {
    sanskrit: "॥ ॐ धरणीगर्भसंभूतं विद्युतकान्तिसमप्रभम् । कुमारं शक्तिहस्तं च मङ्गलं प्रणमाम्यहम् ॥",
    transliteration: "Om Dharani-Garbha-Sambhutam Vidyut Kanti Sama Prabham | Kumaram Shakti-Hastam Cha Mangalam Pranamamyaham",
    meaningEn: "I salute the auspicious Lord Mars (Mangal), who is born from the womb of the Earth, shines like lightning, and holds a divine spear. May he remove obstacles in marriage and career.",
    meaningHi: "पृथ्वी माता की कोख से जन्मे, विद्युत जैसी कांति वाले, हाथ में शक्ति-अस्त्र धारण करने वाले कुमार मंगल देव को मैं प्रणाम करता हूं। वे विवाह और कार्यक्षेत्र की बाधाएं दूर करें।",
    symbol: "🔥"
  },
  "baglamukhi-anushthan": {
    sanskrit: "॥ ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्व्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा ॥",
    transliteration: "Om Hleem Bagalamukhi Sarva Dushtanam Vacham Mukham Padam Stambhaya Jihvam Keelaya Buddhim Vinashaya Hleem Om Swaha",
    meaningEn: "We pray to Goddess Bagalamukhi. May she paralyze the speech, feet, and intellect of negative forces, rendering all hostility inactive and ensuring victory.",
    meaningHi: "माँ बगलामुखी से प्रार्थना है कि वे शत्रुओं व नकारात्मक ऊर्जाओं की वाणी, मुख, पैर तथा बुद्धि को स्तंभित करें और भक्त की रक्षा व विजय सुनिश्चित करें।",
    symbol: "⚡"
  }
};

/*
  Default/General Vedic Mantra if no specific matches are found
*/
const GENERAL_MANTRA = {
  sanskrit: "॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
  transliteration: "Om Bhur Bhuvah Swah | Tat Savitur Varenyam | Bhargo Devasya Dhimahi | Dhiyo Yo Nah Prachodayat",
  meaningEn: "We meditate on the divine light of the Sun, the source of all energy and creation. May it illuminate our intellect and guide us on the righteous path.",
  meaningHi: "हम सभी ऊर्जा और सृष्टि के स्रोत सविता (सूर्य देव) के दिव्य प्रकाश का ध्यान करते हैं। वे हमारी बुद्धि को जागृत करें और सन्मार्ग की ओर प्रेरित करें।",
  symbol: "ॐ"
};

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const { locale, messages } = useContext(LocaleContext);
  const services = messages?.pages?.services;

  // Ref for the page article to wire up scroll reveal observer
  const pageRef = useRef(null);

  // React State 1: For switching tabs
  const [activeTab, setActiveTab] = useState(0);

  // React State 2: Object representing open states of FAQ items
  const [openFaq, setOpenFaq] = useState({});

  // Scroll to the top of the page and trigger reveal animations when serviceId changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab(0);
    setOpenFaq({});
  }, [serviceId]);

  // Intersection Observer: fires .reveal-active on scroll for all .reveal elements
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

  // Find the service that matches the URL slug
  const service = services.items.find((item) => item.id === serviceId);

  // Fallback if the service ID is not found in our locale content
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const buildWhatsAppLink = (serviceTitle) => {
    const template = messages.whatsapp?.serviceTemplate || "Hello, I would like to book the service: {service}.";
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
  const isHindi = locale === "hi";

  // Dynamic placeholders for puja features/details to make it look premium
  const durationText = isHindi ? "समय अवधि: २ से ४ घंटे" : "Duration: 2 to 4 Hours";
  const priestText = isHindi ? "अनुभवी वैदिक पंडित" : "Experienced Vedic Priests";
  const materialText = isHindi ? "संपूर्ण पूजा सामग्री उपलब्ध" : "All Puja Samagri Included";
  const locationText = isHindi ? "उज्जैन (गृह, घाट या मंदिर)" : "Ujjain (Home, Ghat, or Temple)";

  // Lookup mantra for the current service, default to General Mantra
  const mantra = MANTRA_REGISTRY[serviceId] || GENERAL_MANTRA;

  // Stepper timeline items for procedure tab
  const stepperSteps = [
    {
      titleEn: "Sankalp (संकल्प)",
      titleHi: "संकल्प",
      descEn: "Initial resolution where the devotee states their name, gotra, and wishes to the deity, channeling focused intention.",
      descHi: "पूजा की शुरुआत में भक्त द्वारा अपना नाम, गोत्र और मनोकामना का उच्चारण कर जल व अक्षत लेकर संकल्प लिया जाता है।"
    },
    {
      titleEn: "Dhyana & Avahanam (ध्यान और आवाहन)",
      titleHi: "ध्यान और आवाहन",
      descEn: "Meditation on the deity's divine form followed by invoking their presence into the sacred space or idol.",
      descHi: "मंत्रोच्चारण के साथ संबंधित देवी-देवताओं का ध्यान किया जाता है और वेदी या मूर्ति में उनकी उपस्थिति का आवाहन होता है।"
    },
    {
      titleEn: "Shodash Upachara (षोडशोपचार पूजन)",
      titleHi: "षोडशोपचार पूजन",
      descEn: "Offering 16 traditional services including bathing (abhishek), clothing, sacred thread, sandalwood, flowers, incense, and lamps.",
      descHi: "१६ दिव्य उपचारों (पंचामृत अभिषेक, वस्त्र, यज्ञोपवीत, रोली, चंदन, अक्षत, पुष्प, धूप और नैवेद्य) के साथ पूजन संपन्न होता है।"
    },
    {
      titleEn: "Havan & Aarti (हवन एवं आरती)",
      titleHi: "हवन एवं आरती",
      descEn: "Offering sacred herbs into the fire (homa) to purify the surroundings, followed by singing hymns with light offerings.",
      descHi: "पवित्र अग्नि में आहुतियां देकर हवन किया जाता है जिससे वातावरण में सकारात्मकता फैलती है, तत्पश्चात आरती की जाती है।"
    },
    {
      titleEn: "Prasad & Ashirwad (प्रसाद एवं आशीर्वाद)",
      titleHi: "प्रसाद एवं आशीर्वाद",
      descEn: "Distribution of energized offerings (prasad) and receiving blessings and protection threads from the Acharya.",
      descHi: "अंतिम चरण में प्रसाद का भोग लगाकर वितरण होता है, और पंडित जी द्वारा कलावा (रक्षा सूत्र) बांधकर आशीर्वाद दिया जाता है।"
    }
  ];

  // Preparation guidelines for the preparation tab
  const preparationGuidelines = isHindi ? [
    "पूजा के दिन प्रातःकाल उठकर पवित्र स्नान करें और स्वच्छ पारंपरिक वस्त्र (धोती-कुर्ता या साड़ी) पहनें।",
    "यदि संभव हो, तो पूजन के पूर्ण होने तक निर्जला या फलाहारी व्रत (उपवास) का पालन करें।",
    "अपने पास जन्म कुंडली का विवरण, गोत्र का नाम और परिवार के सदस्यों के नाम तैयार रखें।",
    "पूजा स्थल पर सकारात्मक विचार बनाए रखें और निरंतर इष्टदेव के मंत्र का मन ही मन जप करें।"
  ] : [
    "Wake up early on the day of the puja, take a sacred bath, and wear clean traditional attire (Dhoti-Kurta for men, Saree/suit for women).",
    "If possible, observe a fast (only water or fruits) until the completion of the ritual.",
    "Keep your birth details, gotra name, and family members' names ready for the Sankalp.",
    "Maintain positive thoughts during the ceremony and continuously chant the deity's name or mantra in your mind."
  ];

  // FAQ list
  const faqData = isHindi ? [
    {
      q: "पूजा के लिए उज्जैन का क्या महत्व है और इसे यहाँ क्यों कराना चाहिए?",
      a: "उज्जैन (अवंतिका) को मोक्षदायिनी सप्तपुरियों में से एक और भगवान महाकाल की पावन नगरी माना जाता है। यहाँ शिप्रा नदी के घाट, सिद्धवट और मंगलनाथ मंदिर जैसे अति सिद्ध स्थल हैं। यहाँ किए गए अनुष्ठान, विशेष रूप से कालसर्प, मंगल शांति, और महामृत्युंजय जप अत्यंत प्रभावशाली और शीघ्र फलदायी होते हैं।"
    },
    {
      q: "क्या मैं इस पूजा में ऑनलाइन / दूर बैठकर भी भाग ले सकता हूँ?",
      a: "हाँ, यदि आप उज्जैन आने में असमर्थ हैं, तो पंडित जी द्वारा 'वीडियो कॉल पूजा' (Virtual Puja) की व्यवस्था की जाती है। इसमें आपका संकल्प वीडियो कॉल पर लाइव कराया जाता है और आपके नाम से यहाँ पूरी विधि के साथ पूजन और हवन संपन्न होता है।"
    },
    {
      q: "पूजा सामग्री की व्यवस्था कौन करेगा?",
      a: "पूजा के लिए आवश्यक सभी शुद्ध सामग्री (जैसे जड़ी-बूटियाँ, हवन समिधा, पंचामृत, वस्त्र, फूल आदि) की व्यवस्था पंडित जी और हमारी टीम द्वारा की जाती है। आपको कोई अतिरिक्त सामग्री लाने की आवश्यकता नहीं होती।"
    },
    {
      q: "पूजा की तिथि और शुभ मुहूर्त का निर्धारण कैसे होता है?",
      a: "पंडित पवन शास्त्री जी आपकी जन्म कुंडली, राशि और शुभ हिंदू पंचांग के अनुसार तिथि एवं विशेष चौघड़िया मुहूर्त का निर्धारण करते हैं ताकि पूजा का पूर्ण आध्यात्मिक फल प्राप्त हो सके।"
    }
  ] : [
    {
      q: "What is the spiritual significance of performing puja in Ujjain?",
      a: "Ujjain (Avantika) is one of the seven sacred cities (Sapta Puri) of India and the abode of Lord Mahakaleshwar Jyotirlinga. The presence of powerful energy portals like the Shipra River, Siddhawat, and Mangalनाथ temple makes any ritual performed here highly potent, offering swift spiritual relief and resolving horoscope doshas."
    },
    {
      q: "Can I participate in this puja remotely/online?",
      a: "Yes, if you cannot visit Ujjain in person, we arrange 'Online Video Call Puja'. You will join the live stream where your Sankalp (intent setting) is conducted interactively, and the priests perform the rest of the puja, mantras, and havan in your name."
    },
    {
      q: "Who arranges the Puja materials (Samagri)?",
      a: "Our team takes care of the complete arrangements, including all pure and premium materials (holy water, herbs, grains, ghee, fresh flowers, and offering clothes). Devotees do not need to worry about sourcing any items."
    },
    {
      q: "How are the auspicious date and timings (Muhurat) chosen?",
      a: "Pandit Pawan Shastri Ji analyzes your birth chart (Janam Kundli) and planetary transits against the Hindu lunar calendar (Panchang) to calculate the most auspicious Muhurat for maximum spiritual benefit."
    }
  ];

  return (
    <article className="service-detail-page" ref={pageRef}>
      {/* Hero Banner — Split Layout */}
      <header className="service-detail-hero">
        <div className="container service-detail-hero-inner">
          {/* Left: Text Content */}
          <div className="service-detail-hero-content">
            <Link to="/services" className="back-link">
              <FaArrowLeft style={{ marginRight: "8px" }} />
              {isHindi ? "सभी सेवाएँ" : "Back to Services"}
            </Link>
            <h1>{service.title}</h1>
            <p className="hero-subtitle">{service.description}</p>
            <a
              href={buildWhatsAppLink(service.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary hero-whatsapp-btn"
            >
              <FaWhatsapp style={{ marginRight: "10px" }} />
              {messages.whatsapp?.bookNow || (isHindi ? "बुक करें" : "Book Now")}
            </a>
          </div>

          {/* Right: Full Image */}
          <div className="service-detail-hero-image-wrap">
            <img
              src={imageSrc}
              alt={service.title}
              className="service-detail-hero-img"
            />
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="service-detail-body section">
        <div className="container">
          <div className="service-detail-grid">
            
            {/* Left Column: Interactive Content Area */}
            <div className="service-detail-main">
              
              {/* Dynamic Sanskrit Mantra Card */}
              <div className="mantra-showcase-card reveal reveal-up">
                <div className="mantra-card-bg-symbol">{mantra.symbol}</div>
                <div className="mantra-card-header">
                  <span className="mantra-badge">{isHindi ? "पवित्र मंत्र" : "Sacred Mantra"}</span>
                  <FaOm className="mantra-header-om" />
                </div>
                <div className="mantra-sanskrit-text">{mantra.sanskrit}</div>
                <div className="mantra-transliteration">{mantra.transliteration}</div>
                <div className="mantra-translation">
                  <strong>{isHindi ? "मंत्र का अर्थ: " : "Meaning: "}</strong>
                  {isHindi ? mantra.meaningHi : mantra.meaningEn}
                </div>
              </div>

              {/* Interactive Tabs Section */}
              <div className="tabs-container reveal reveal-up">
                <div className="tabs-header-bar" role="tablist" aria-label="Service Details Tabs">
                  <button
                    className={`tab-btn ${activeTab === 0 ? "active" : ""}`}
                    onClick={() => setActiveTab(0)}
                    role="tab"
                    aria-selected={activeTab === 0}
                    id="tab-significance"
                  >
                    {isHindi ? "महत्व एवं विवरण" : "Significance"}
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 1 ? "active" : ""}`}
                    onClick={() => setActiveTab(1)}
                    role="tab"
                    aria-selected={activeTab === 1}
                    id="tab-procedure"
                  >
                    {isHindi ? "पूजन विधि (चरण)" : "Procedure Steps"}
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 2 ? "active" : ""}`}
                    onClick={() => setActiveTab(2)}
                    role="tab"
                    aria-selected={activeTab === 2}
                    id="tab-preparation"
                  >
                    {isHindi ? "भक्तों के लिए तैयारी" : "Preparation"}
                  </button>
                </div>

                <div className="tab-content-panel">
                  {/* Tab Panel 1: Significance */}
                  {activeTab === 0 && (
                    <div className="tab-pane animate-fade-in" role="tabpanel" aria-labelledby="tab-significance">
                      <p className="detailed-paragraph">{service.details}</p>
                      <div className="panel-highlight-box">
                        <h4>{isHindi ? "यह अनुष्ठान क्यों महत्वपूर्ण है?" : "Why is this ritual important?"}</h4>
                        <p>
                          {isHindi
                            ? "शास्त्रों के अनुसार, उज्जैन की पवित्र भूमि पर किए गए इस अनुष्ठान से नकारात्मक ऊर्जाओं का शमन होता है, कुंडली के दोषों की शांति होती है और परिवार में सुख, स्वास्थ्य व समृद्धि का संचार होता है।"
                            : "According to sacred scriptures, performing this ritual in the holy land of Ujjain neutralizes negative energies, calms planetary defects, and fills the household with health, happiness, and peace."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tab Panel 2: Step-by-step timeline */}
                  {activeTab === 1 && (
                    <div className="tab-pane animate-fade-in" role="tabpanel" aria-labelledby="tab-procedure">
                      <p className="tab-intro-text">
                        {isHindi
                          ? "पंडित पवन शास्त्री जी के मार्गदर्शन में अनुष्ठान मुख्य रूप से निम्नलिखित ५ चरणों में संपन्न किया जाता है:"
                          : "Under the direct guidance of Pandit Pawan Shastri Ji, the ritual is completed in these 5 sacred stages:"}
                      </p>
                      <div className="puja-stepper-timeline">
                        {stepperSteps.map((step, idx) => (
                          <div className="timeline-step-item" key={idx}>
                            <div className="timeline-badge-node">{idx + 1}</div>
                            <div className="timeline-step-content">
                              <h4>{isHindi ? step.titleHi : step.titleEn}</h4>
                              <p>{isHindi ? step.descHi : step.descEn}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab Panel 3: Devotee Preparation */}
                  {activeTab === 2 && (
                    <div className="tab-pane animate-fade-in" role="tabpanel" aria-labelledby="tab-preparation">
                      <p className="tab-intro-text">
                        {isHindi
                          ? "पूजा के श्रेष्ठ आध्यात्मिक प्रभाव के लिए भक्तों को निम्नलिखित बातों का ध्यान रखना चाहिए:"
                          : "To receive the maximum spiritual merit, devotees are advised to observe the following guidelines:"}
                      </p>
                      <ul className="guidelines-check-list">
                        {preparationGuidelines.map((guideline, idx) => (
                          <li key={idx}>
                            <FaCheckCircle className="check-bullet" />
                            <span>{guideline}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* FAQs Accordion Section */}
              <div className="faq-accordion-section reveal reveal-up">
                <h3 className="section-subtitle-small">
                  {isHindi ? "अक्सर पूछे जाने वाले प्रश्न (FAQs)" : "Frequently Asked Questions"}
                </h3>
                <div className="faq-accordion-container">
                  {faqData.map((faq, idx) => {
                    const isOpen = !!openFaq[idx];
                    return (
                      <div className={`faq-item-card ${isOpen ? "open" : ""}`} key={idx}>
                        <button
                          className="faq-question-trigger"
                          onClick={() => toggleFaq(idx)}
                          aria-expanded={isOpen}
                          id={`faq-btn-${idx}`}
                        >
                          <span>{faq.q}</span>
                          <FaChevronDown className="faq-chevron" />
                        </button>
                        <div className="faq-answer-pane" id={`faq-pane-${idx}`} role="region" aria-labelledby={`faq-btn-${idx}`}>
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Specifications & WhatsApp CTA Sidebar */}
            <aside className="service-detail-sidebar">
              
              {/* Specs Card */}
              <div className="sidebar-card quick-specs-card reveal reveal-up">
                <h3>{isHindi ? "पूजा विवरण संक्षेप में" : "Puja Information"}</h3>
                <div className="specs-list">
                  <div className="spec-item">
                    <span className="spec-icon-label-wrap">
                      <FaClock className="spec-icon" />
                      <span className="spec-label">{isHindi ? "अवधि" : "Duration"}</span>
                    </span>
                    <span className="spec-value">{durationText}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon-label-wrap">
                      <FaUserShield className="spec-icon" />
                      <span className="spec-label">{isHindi ? "पुरोहित" : "Priests"}</span>
                    </span>
                    <span className="spec-value">{priestText}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon-label-wrap">
                      <FaGem className="spec-icon" />
                      <span className="spec-label">{isHindi ? "सामग्री" : "Puja Samagri"}</span>
                    </span>
                    <span className="spec-value">{materialText}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon-label-wrap">
                      <FaMapMarkerAlt className="spec-icon" />
                      <span className="spec-label">{isHindi ? "स्थान विकल्प" : "Location"}</span>
                    </span>
                    <span className="spec-value">{locationText}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick CTA Card */}
              <div className="sidebar-card whatsapp-cta-card reveal reveal-up">
                <h3>{isHindi ? "त्वरित पूछताछ एवं बुकिंग" : "Quick Inquiry & Booking"}</h3>
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
                  <FaWhatsapp style={{ marginRight: "10px", fontSize: "1.3rem" }} />
                  {messages.whatsapp?.bookNow || (isHindi ? "व्हाट्सएप पर बुक करें" : "Book on WhatsApp")}
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
