import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" id="hero">
   
      <div className="cursor-glow" id="heroCursorGlow"></div>

      <div className="container hero-content">
        {/* النصف الأيسر: النص */}
        <div className="hero-text" data-aos="fade-up">
        
          <h1 className="hero-title">
            اكتشف أناقتك مع<br />
            <span className="gradient">UrbanFit</span>
          </h1>
          <p className="hero-desc">
            تشكيلة مميزة من الملابس والأحذية والإكسسوارات بأحدث الصيحات العالمية.
          </p>

          <div className="hero-buttons">
            <Link href="/shop" className="btn-primary">
              <i className="fas fa-shopping-bag"></i> تسوق الآن
            </Link>
            <Link href="#features" className="btn-outline">
              <i className="fas fa-play-circle"></i> اكتشف المزيد
            </Link>
          </div>
        </div>

        {/*  النصف الأيمن: صور المنتجات (الشكل الجديد) */}
        <div className="hero-image" data-aos="fade-left">
          
          {/* الصورة الكبيرة (تيشيرت) */}
          <div className="hero-img-card hero-img-main">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" 
              alt="حذاء رياضي" 
            />
            {/* <img src="/images/tshirt.jpg" alt="تيشيرت" /> */}
            <div className="hero-img-tag">
              <span>New</span>
            </div>
          </div>

          {/* الصورة الصغيرة (بنطال) */}
          <div className="hero-img-card hero-img-secondary">
           <img 
              src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop" 
              alt="بنطال جينز" 
            />
            {/* <img src="/images/pants.jpg" alt="بنطال" /> */}
          </div>

          {/* الصورة الصغيرة (حذاء) */}
          <div className="hero-img-card hero-img-tertiary">
            <img 
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop" 
              alt="تيشيرت رجالي" 
            />
            {/* <img src="/images/shoes.jpg" alt="حذاء" /> */}
          </div>
          
          {/* بطاقات صغيرة (Tags) */}
          <div className="hero-card hero-card-top">
            <div className="hero-card-icon"><i className="fas fa-truck"></i></div>
            <div>
              <h4>توصيل مجاني</h4>
              <p>للطلبات فوق 250 شيكل</p>
            </div>
          </div>
          
          <div className="hero-card hero-card-bottom">
            <div className="hero-card-icon"><i className="fas fa-tag"></i></div>
            <div>
              <h4>شيكل 20</h4>
              <p>على أول طلب</p>
            </div>
          </div>
          
        </div>
      </div>

      <Link href="#features" className="scroll-cue" aria-label="مرر للأسفل">
        <i className="fas fa-chevron-down"></i>
      </Link>
    </section>
  );
}