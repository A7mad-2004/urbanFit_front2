export default function Testimonials() {
  const reviews = [
    { name: "أحمد القوصي", role: "عميل دائم", text: "أفضل متجر إلكتروني تسوقت منه! المنتجات جودتها عالية والتوصيل سريع جداً. أنصح الجميع بتجربة UrbanFit.", avatar: "أ" },
    { name: "سارة محمد", role: "مصممة أزياء", text: "تشكيلة رائعة وأسعار منافسة. طلبت أكثر من مرة وكانت التجربة ممتازة. شكراً UrbanFit على هذا المتجر المميز.", avatar: "س" },
    { name: "خالد العتيبي", role: "رياضي محترف", text: "جودة المنتجات تفوق التوقعات! التعامل مع فريق الدعم كان رائعاً وساعدوني في اختيار المقاس المناسب. تجربة ممتازة.", avatar: "خ" },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">ماذا يقول عملاؤنا؟</h2>
        <p className="section-subtitle" data-aos="fade-up">آراء حقيقية من أشخاص يحبون UrbanFit</p>

        <div className="testimonials-wrapper" data-aos="fade-up">
          <div className="swiper testimonials-slider">
            <div className="swiper-wrapper">
              {reviews.map((r, i) => (
                <div className="swiper-slide" key={i}>
                  <div className="testimonial-card">
                    <div className="testimonial-stars">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                    <p className="testimonial-text">{r.text}</p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">{r.avatar}</div>
                      <div className="testimonial-info">
                        <h4>{r.name}</h4>
                        <p>{r.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      </div>
    </section>
  );
}