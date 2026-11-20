"use client";
import { useEffect } from "react";

export default function Features() {
  useEffect(() => {
    // حركة العدادات
    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target as HTMLElement;
            const target = parseFloat(counter.getAttribute("data-target") || "0");
            const isFloat = target % 1 !== 0;
            let current = 0;
            const increment = target / 60;

            const update = () => {
              current += increment;
              if (current < target) {
                counter.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toString();
                requestAnimationFrame(update);
              } else {
                counter.textContent = isFloat ? target.toFixed(1) : target.toString();
              }
            };
            update();
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
  }, []);

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">لماذا UrbanFit؟</h2>
        <p className="section-subtitle" data-aos="fade-up">نقدم لك تجربة تسوق فريدة</p>

        <div className="features-grid">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <i className="fas fa-tshirt"></i>
            <h3>أكثر من 200 منتج</h3>
            <p>تشكيلة متنوعة من أحدث الصيحات</p>
            <div className="feature-number"><span className="counter" data-target="500">0</span>+</div>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <i className="fas fa-truck-fast"></i>
            <h3>شحن سريع</h3>
            <p>توصيل خلال 2-3 أيام</p>
            <div className="feature-number"><span className="counter" data-target="99">0</span>%</div>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <i className="fas fa-shield-halved"></i>
            <h3>دفع آمن</h3>
            <p>طرق دفع متعددة ومأمونة</p>
            <div className="feature-number"><span className="counter" data-target="100">0</span>%</div>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
            <i className="fas fa-star"></i>
            <h3>جودة عالية</h3>
            <p>منتجات أصلية بضمان الجودة</p>
            <div className="feature-number"><span className="counter" data-target="4.8">0</span>★</div>
          </div>
        </div>
      </div>
    </section>
  );
}