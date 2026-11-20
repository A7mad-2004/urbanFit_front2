// app/login/page.tsx
"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. استقبال متغيرات الرابط (لجوجل والأخطاء)
  const errorapi = searchParams.get("error");
  const googleToken = searchParams.get("token");
  const googleRole = searchParams.get("role");

  const [typePassword, setTypePassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const switch_password = () => {
    if (typePassword == "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };
  useEffect(() => {
    // إذا كان الرابط فيه توكن (يعني المستخدم راجع من جوجل)
    if (googleToken) {
      // احفظ التوكن في المتصفح
      localStorage.setItem("token", googleToken);
      localStorage.setItem("role", googleRole || "user");

      // وجهه للداشبورد بعد ثانية
      setTimeout(() => {
        if (googleRole === "admin") {
          router.push("/Admin/dashboard");
        } else {
          router.push("/User/landing");
        }
      }, 1000);
    }
  }, [googleToken, googleRole, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setLoading(true);

    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!password) newErrors.password = "كلمة المرور مطلوبة";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        { email, password },
      );
      console.log("نجاح:", response.data);
      setSuccess("تم تسجيل الدخول بنجاح!");
      if (remember) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.data);
      } else {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.data);
      }

      setTimeout(() => {
        if (response.data.data === "admin") {
          router.push("/Admin/dashboard");
        } else {
          router.push("/User/landing");
        }
      }, 1200);
    } catch (error: any) {
      // 3. التعامل مع الخطأ
      if (error.response) {
        // السيرفر رد بخطأ (مثلاً 401 أو 422)
        setErrors({
          general:
            error.response.data.message || "البريد أو كلمة المرور غير صحيحة",
        });
      } else {
        // السيرفر واقف أو في مشكلة بالشبكة
        setErrors({
          general: "تعذر الاتصال بالسيرفر، تأكد من تشغيل الباك إند.",
        });
      }
      console.error("تفاصيل الخطأ:", error);
    } finally {
      // 4. إيقاف التحميل دائماً (نجح أو فشل)
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[#F5EFE6]">
      {/* ورقة عائمة */}
      <div className="flex flex-col md:flex-row max-w-[1050px] w-full bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(45,42,38,0.12)]">
        <div className="flex-1 bg-[#E8DCC8] flex flex-col items-center justify-center p-10 md:p-14 text-center relative overflow-hidden">
          {/* دائرة ديكور دافئة */}
          <div className="absolute w-64 h-64 rounded-full bg-[#D97757]/10 -top-10 -right-10" />
          <div className="absolute w-40 h-40 rounded-full bg-[#D97757]/15 bottom-10 left-10" />

          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-3 relative z-10">
            أهلاً بك مجدداً
          </h2>
          <p className="text-[#6B655C] text-base leading-relaxed relative z-10 max-w-xs">
            تسوق أحدث تشكيلات Urban Fit واكتشف إطلالتك القادمة
          </p>
        </div>

        {/* ── القسم الأيسر: النموذج ── */}
        <div className="flex-1 p-8 md:p-12 bg-white">
          {/* الشعار */}
          <div className="mb-8">
            <div className="text-xl font-black tracking-tight text-[#2D2A26]">
              URBAN<span className="text-[#D97757]">FIT</span>
            </div>
            <div className="h-0.5 w-8 bg-[#D97757] mt-1" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-2">
            تسجيل الدخول
          </h1>
          <p className="text-[#6B655C] text-sm mb-7">أدخل بياناتك للمتابعة</p>

          {/* رسائل */}
          {errors.general && (
            <div className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-2.5">
              {errors.general}
            </div>
          )}

          {errorapi && (
            <div className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-2.5">
              {errorapi}
            </div>
          )}
          {success && (
            <div className="text-emerald-700 text-sm mb-3 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* البريد */}
            <div className="mb-4">
              <label className="block text-[#2D2A26] text-sm font-semibold mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "", general: "" });
                }}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FAF7F2] text-[#2D2A26] placeholder-[#A8A099] text-base outline-none transition-all focus:border-[#D97757] focus:bg-white focus:ring-4 focus:ring-[#D97757]/10"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* كلمة المرور */}
            <div className="mb-4">
              <label className="block text-[#2D2A26] text-sm font-semibold mb-1.5">
                كلمة المرور
              </label>
              <input
                type={typePassword}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "", general: "" });
                }}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FAF7F2] text-[#2D2A26] placeholder-[#A8A099] text-base outline-none transition-all focus:border-[#D97757] focus:bg-white focus:ring-4 focus:ring-[#D97757]/10"
              />

              <span onClick={switch_password}> switch </span>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* تذكرني */}
            <div className="flex justify-between items-center my-4">
              <label className="text-[#6B655C] text-sm flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  // معناه
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-[#D97757] w-4 h-4 rounded"
                />
                تذكرني
              </label>
              <Link
                href="/forgot-password"
                className="text-[#D97757] text-sm font-semibold hover:text-[#B85C3F] transition-colors"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            {/* زر الدخول */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#2D2A26] text-[#F5EFE6] text-base font-semibold transition-all hover:bg-[#1a1815] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          {/* الفاصل */}
          <div className="flex items-center gap-4 my-6 text-[#A8A099] text-xs">
            <div className="flex-1 h-px bg-[#E8DCC8]" />
            <span>أو</span>
            <div className="flex-1 h-px bg-[#E8DCC8]" />
          </div>

          {/* جوجل */}
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

          {/* التسجيل */}
          <div className="text-center mt-6 text-[#6B655C] text-sm">
            ليس لديك حساب؟{" "}
            <Link
              href="/register"
              className="text-[#D97757] font-semibold hover:underline"
            >
              إنشاء حساب جديد
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
