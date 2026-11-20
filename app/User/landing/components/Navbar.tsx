"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isloggedIn: boolean;
}
export default function Navbar({ isloggedIn }: NavbarProps) {
  const router = useRouter();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("حدث خطأ أثناء تسجيل الخروج من السيرفر:", error);
    }
  }

  return (
    <header className="header" id="header">
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            Urban<span>Fit</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="#hero">الرئيسية</Link>
            </li>
            <li>
              <Link href="#features">المميزات</Link>
            </li>
            <li>
              <Link href="#products">المنتجات</Link>
            </li>
            <li>
              <Link href="/shop">المتجر</Link>
            </li>
            <li>
              <Link href="#testimonials">آراء العملاء</Link>
            </li>
          </ul>
          <div className="nav-actions">
            <Link href="/cart" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </Link>
            {isloggedIn ? (
              <Link href="/profile" className="btn-login">
                <i className="fas fa-user"></i> الملف الشخصي
              </Link>
            ) : (
              <Link href="/login" className="btn-login">
                <i className="fas fa-user"></i> تسجيل الدخول
              </Link>
            )}
            {isloggedIn && (
              <button
                onClick={handleLogout}
                className="btn-logout"
                style={{ marginRight: "10px" }}
              >
                <i className="fas fa-sign-out-alt"></i> تسجيل خروج
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
