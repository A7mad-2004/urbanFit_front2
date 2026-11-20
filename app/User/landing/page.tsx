"use client";
/* eslint-disable */
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import "./landing.css";
import axios from "axios";


export default function LandingPage() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // 1. تشغيل AOS
    // @ts-expect-error
    if (typeof AOS !== "undefined") {
      // @ts-expect-error
      AOS.init({ duration: 900, once: true, offset: 80 });
    }

    // 2. تشغيل Swiper
    let swiper: any;
    // @ts-expect-error
    if (typeof Swiper !== "undefined") {
      // @ts-expect-error
      swiper = new Swiper(".testimonials-slider", {
        loop: true,
        autoplay: { delay: 5000 },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
      });
    }

    // 3. شريط التمرير وتأثير الماوس في الـ Hero
    const handleScroll = () => {
      const header = document.getElementById("header");
      const scrollProgress = document.getElementById("scrollProgress");
      if (header && window.scrollY > 50) header.classList.add("scrolled");
      else if (header) header.classList.remove("scrolled");

      if (scrollProgress) {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        scrollProgress.style.width = pct + "%";
      }
    };
    window.addEventListener("scroll", handleScroll);

    const heroSection = document.getElementById("hero");
    const heroBg = document.getElementById("heroBg");
    const cursorGlow = document.getElementById("heroCursorGlow");

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroSection || !heroBg || !cursorGlow) return;
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursorGlow.style.opacity = "1";
      cursorGlow.style.left = x + "px";
      cursorGlow.style.top = y + "px";
      heroBg.style.transform = `translate(${(x / rect.width - 0.5) * 40}px, ${(y / rect.height - 0.5) * 40}px)`;
    };

    if (heroSection) heroSection.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (heroSection)
        heroSection.removeEventListener("mousemove", handleMouseMove);
      if (swiper) swiper.destroy();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token")|| sessionStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/landing`);
        setData(response.data.data.products);
        console.log("البيانات اللي وصلت لمكون المنتجات:", response.data.data);
      } catch (error: any) {
       console.error(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div className="landing-page" dir="rtl">
        <div className="scroll-progress" id="scrollProgress"></div>

        <Navbar isloggedIn={isloggedIn} />
        <Hero />
        <Features />
        <Products products={data} />
        <Categories />
        <Testimonials />
        <Footer />

        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" async></script>
        <script
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          async
        ></script>
      </div>
    </>
  );
}
