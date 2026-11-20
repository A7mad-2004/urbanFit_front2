"use client";


import { useState, FormEvent, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image"; //
import axios from "axios";
import Link from "next/link";
// import error from "next/dist/api/error";

 function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorapi = searchParams.get("error");

  // 1. إدارة الحالة (State) لكل الحقول
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // دالة لتحديث الحقول عند الكتابة
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // مسح الخطأ الخاص بالحقل عند الكتابة فيه
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // 2. التحقق من المدخلات وإرسال البيانات
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // التحقق الأولي (Client-Side Validation)
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "الاسم الكامل مطلوب";
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formData.phone) newErrors.phone = "رقم الهاتف مطلوب";
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "كلمات المرور غير متطابقة";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        formData,
      );
      console.log("نجاح التسجيل:", response.data);
      alert("تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.");
      localStorage.setItem("token", response.data.data);
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        router.push("/User/landing");
      }, 1200);
    } catch (error: any) {
      // التعامل مع أخطاء الباك اند
      if (error.response && error.response.data.errors) {
        // لارافيل يرجع الأخطاء في مصفوفة اسمها errors
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: error.response?.data?.message || "حدث خطأ أثناء التسجيل",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[#F5EFE6]">
      {/* الحاوية الرئيسية */}
      <div className="flex flex-col md:flex-row max-w-[1050px] w-full bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(45,42,38,0.12)]">
        {/* ── القسم الأيمن: ترحيب ── */}
        <div className="flex-1 bg-[#E8DCC8] flex flex-col items-center justify-center p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute w-64 h-64 rounded-full bg-[#D97757]/10 -top-10 -right-10" />
          <div className="absolute w-40 h-40 rounded-full bg-[#D97757]/15 bottom-10 left-10" />

          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-3 relative z-10">
            انضم إلينا
          </h2>
          <p className="text-[#6B655C] text-base leading-relaxed relative z-10 max-w-xs">
            أحدث الصيحات، أفضل الأسعار
            <br />
            ابدأ رحلتك مع الأناقة
          </p>
        </div>

        {/* ── القسم الأيسر: نموذج التسجيل ── */}
        <div className="flex-1 p-8 md:p-12 bg-white">
          {/* الشعار */}
          <div className="mb-8">
            <div className="text-xl font-black tracking-tight text-[#2D2A26]">
              URBAN<span className="text-[#D97757]">FIT</span>
            </div>
            <div className="h-0.5 w-8 bg-[#D97757] mt-1" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-2">
            إنشاء حساب
          </h1>
          <p className="text-[#6B655C] text-sm mb-7">
            سجل الآن واستمتع بتجربة تسوق مميزة
          </p>

          {/* رسالة خطأ عامة */}
          {errors.general && (
            <div className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-2.5">
              {errors.general}
            </div>
          )}
          {errorapi && (
            <div className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-2.5">
              {errorapi}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* الاسم */}
            <div className="mb-4">
              <label className="block text-[#2D2A26] text-sm font-semibold mb-1.5">
                الاسم الكامل
              </label>
              <input
                type="text"
                name="name"
                placeholder="أحمد محمد"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FAF7F2] text-[#2D2A26] placeholder-[#A8A099] outline-none transition-all focus:border-[#D97757] focus:bg-white focus:ring-4 focus:ring-[#D97757]/10"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* الإيميل */}
            <div className="mb-4">
              <label className="block text-[#2D2A26] text-sm font-semibold mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FAF7F2] text-[#2D2A26] placeholder-[#A8A099] outline-none transition-all focus:border-[#D97757] focus:bg-white focus:ring-4 focus:ring-[#D97757]/10"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* الهاتف */}
            <div className="mb-4">
              <label className="block text-[#2D2A26] text-sm font-semibold mb-1.5">
                رقم الهاتف
              </label>
              <input
                type="text"
                name="phone"
                placeholder="0599123456"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FAF7F2] text-[#2D2A26] placeholder-[#A8A099] outline-none transition-all focus:border-[#D97757] focus:bg-white focus:ring-4 focus:ring-[#D97757]/10"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* كلمة المرور */}
            <div className="mb-4">
              <label className="block text-[#2D2A26] text-sm font-semibold mb-1.5">
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FAF7F2] text-[#2D2A26] placeholder-[#A8A099] outline-none transition-all focus:border-[#D97757] focus:bg-white focus:ring-4 focus:ring-[#D97757]/10"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="mb-5">
              <label className="block text-[#2D2A26] text-sm font-semibold mb-1.5">
                تأكيد كلمة المرور
              </label>
              <input
                type="password"
                name="password_confirmation"
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FAF7F2] text-[#2D2A26] placeholder-[#A8A099] outline-none transition-all focus:border-[#D97757] focus:bg-white focus:ring-4 focus:ring-[#D97757]/10"
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            {/* زر التسجيل */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#2D2A26] text-[#F5EFE6] text-base font-semibold transition-all hover:bg-[#1a1815] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </button>
          </form>

          {/* الفاصل */}
          <div className="flex items-center gap-4 my-6 text-[#A8A099] text-xs">
            <div className="flex-1 h-px bg-[#E8DCC8]" />
            <span>أو</span>
            <div className="flex-1 h-px bg-[#E8DCC8]" />
          </div>

          {/* زر جوجل (تم استخدام الصورة الخاصة بك هنا) */}
          <button
            type="button"
            onClick={() => {
              // eslint-disable-next-line @next/next/no-location-assign-relative-destination
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
            }}
            className="w-full py-3 rounded-xl border border-[#E8DCC8] bg-white text-[#2D2A26] text-base font-medium transition-all flex items-center justify-center gap-3 hover:bg-[#FAF7F2] hover:border-[#D97757]/40"
          >
            <GoogleIcon />
            إنشاء حساب بحساب جوجل
          </button>

          {/* رابط الدخول */}
          <div className="text-center mt-6 text-[#6B655C] text-sm">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/login"
              className="text-[#D97757] font-semibold hover:underline"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
function GoogleIcon() {
  return (
    <Image
      src="/Google_G_logo.svg"
      alt="Google"
      width={22}
      height={22}
      unoptimized
    />
  );
}
export default function Register_Page () {
  return (
    <Suspense fallback={null}>
      <RegisterPage />             
    </Suspense>
  );
}
