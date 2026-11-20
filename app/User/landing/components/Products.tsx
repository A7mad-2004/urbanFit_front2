import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 1. تعريف شكل المنتج (حسب ما يرجعه الباك إند)
interface Product {
  id: number;
  name: string;
  price: number;
  size: string;
  image_url: string | null;
}

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null); // لتحديد أي زر يتم تحميله

  const handleAddToCart = async (productId: number) => {
    setLoadingId(productId);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        // إذا لم يكن مسجلاً، وجهه لصفحة الدخول
        router.push("/login");
        return;
      }

      // إرسال طلب POST (لحل مشكلة Method Not Allowed)
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${productId}/add`,
        {}, // Body فارغ
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("تمت إضافة المنتج إلى السلة بنجاح!");
    } catch (error:any) {
      console.error("خطأ في الإضافة:", error);
      alert(error.response?.data?.message || "حدث خطأ أثناء الإضافة للسلة");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="products" id="products">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          منتجات مميزة
        </h2>
        <p className="section-subtitle" data-aos="fade-up">
          أحدث وأفضل المنتجات التي نقدمها لك
        </p>

        <div className="products-grid">
          {products.map((product, i) => (
            <article
              key={product.id}
              className="product-card"
              // data-aos="fade-up"
              // data-aos-delay={i * 100}
            >
              <div className="product-image">
                {product.image_url && (
                  <img src={product.image_url} alt="لا توجد صورة" />
                )}
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="product-price">{product.price} شيكل</div>
                <div className="product-size">المقاس: {product.size}</div>
                <br />
                <Link className="btn-cart" href={`/product/${product.id}`}>
                  تفاصيل
                </Link>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="btn-cart"
                  style={{
                    backgroundColor: "#D97757", 
                    color: "#fff",
                    cursor: "pointer",
                    border: "none",
                  }}
                  disabled={loadingId === product.id}
                >
                  {loadingId === product.id
                    ? "جاري الإضافة..."
                    : "أضف إلى السلة"}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="products-cta">
          <Link href="/shop" className="btn-primary">
            <i className="fas fa-store"></i> عرض جميع المنتجات
          </Link>
        </div>
      </div>
    </section>
  );
}
