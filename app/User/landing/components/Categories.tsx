import Link from "next/link";

export default function Categories() {
  const categories = [
  { id: 1, name: "ملابس رجالية", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop", link: "/shop?category=men" },
  { id: 2, name: "ملابس نسائية", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop", link: "/shop?category=women" },
  { id: 3, name: "أحذية", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop", link: "/shop?category=shoes" },
  { id: 4, name: "إكسسوارات", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop", link: "/shop?category=accessories" },
];

  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">تسوق حسب الفئة</h2>
        <p className="section-subtitle" data-aos="fade-up">اختر الفئة المفضلة لديك وابدأ التسوق</p>

        <div className="categories-wrapper">
          {categories.map((cat, index) => (
            <Link 
              key={cat.id} 
              href={cat.link} 
              className="category-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img src={cat.image} alt={cat.name} />
              <div className="category-content">
                <h3>{cat.name}</h3>
                <span>اكتشف المزيد &larr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}