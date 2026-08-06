import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import { LocaleProvider } from "./LocaleContext";
import logoImage from "./assets/logo.png";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

function AppLoader() {
  return (
    <div className="app-loading-screen" role="status" aria-live="polite">
      <div className="loading-card">
        <img
          src={logoImage}
          alt="वैदिक अनुष्ठान केंद्र"
          className="loading-logo"
        />
        <h1>वैदिक अनुष्ठान केंद्र</h1>
        <p>उज्जैन में वैदिक परंपरा अनुसार पूजा, हवन और अनुष्ठान</p>
        <div className="loading-bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = window.setTimeout(() => setIsLoading(false), 1400);
    const handleLoad = () => setIsLoading(false);

    window.addEventListener("load", handleLoad);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isLoading) {
    return (
      <LocaleProvider>
        <AppLoader />
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider>
      <div className="app-container">
        <Header />
        <ScrollToTop />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}

export default App;
