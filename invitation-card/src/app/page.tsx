"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock,
  Copy,
  GraduationCap,
  MapPin,
  Navigation,
  Phone,
  Send,
  Share2,
  Sparkles,
} from "lucide-react";
import AmbientEffects from "@/components/AmbientEffects";
import "./graduation.css";

const GRAD_INFO = {
  badge: "HÀNH TRÌNH RỰC RỠ · KHÓA 2022 - 2026",
  titleMain: "GRADUATION",
  titleScript: "Ceremony",
  graduateName: "Nguyễn Đoàn Minh Uyên",
  subtitle: "Cử nhân Công nghệ Thông tin · Khoa học Dữ liệu",
  message:
    "Rất vui và vinh hạnh được đón tiếp bạn đến chung vui, chụp ảnh lưu niệm và đánh dấu cột mốc đáng nhớ này.",
  dateText: "Thứ Năm, 26/11/2026",
  timeText: "10:30 - 11:30 AM",
  venueName: "Khuôn viên Trường Khoa học Tự Nhiên",
  venueAddress: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, \n Thành phố Hồ Chí Minh",
  mapUrl: "https://maps.google.com/?q=227+Nguyen+Van+Cu+Ho+Chi+Minh",
  phoneDisplay: "0916598730",
  phoneHref: "tel:+84916598730",
  heroImage: "/grad-cap.jpg",
};

export default function GraduationInvitationPage() {
  const [opened, setOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Form xác nhận tham dự (không còn ô lời chúc)
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("Tham dự");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [opened]);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setOpened(true);
      setIsOpening(false);
    }, 900);
  };

  const handleCloseCard = () => {
    setOpened(false);
    setIsOpening(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Thiệp mời tốt nghiệp - ${GRAD_INFO.graduateName}`,
      text: `Mời bạn tham dự lễ tốt nghiệp của ${GRAD_INFO.graduateName} vào ${GRAD_INFO.dateText} lúc ${GRAD_INFO.timeText}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch {
        setCopiedLink(false);
      }
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(GRAD_INFO.phoneDisplay);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      setCopiedPhone(false);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setGuestName("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[#F4F8FC] text-[#536D91]">
      {/* Hiệu ứng hạt ánh sáng Champagne Gold & Baby Blue */}
      <AmbientEffects />

      {!opened ? (
        /* TRANG MỞ PHONG BÌ */
        <section className="relative z-10 flex min-h-svh items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(201,220,241,0.55),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(201,173,127,0.22),transparent_42%),#F4F8FC] px-4 py-8">
          <div
            className={`w-full max-w-md rounded-4xl border border-[#A9C5E5]/70 bg-white/90 px-5 py-8 text-center shadow-[0_22px_60px_rgba(83,109,145,0.14)] backdrop-blur-md sm:px-6 sm:py-9 ${
              isOpening ? "cover-leaving" : ""
            }`}
          >
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-[#536D91]">
              THƯ MỜI THAM DỰ LỄ TỐT NGHIỆP
            </p>

            <button
              type="button"
              onClick={handleOpenEnvelope}
              disabled={isOpening}
              aria-label="Mở thiệp mời tốt nghiệp"
              className="group mx-auto block border-0 bg-transparent p-0 disabled:cursor-not-allowed"
            >
              <div
                className={`envelope relative mx-auto h-52 w-72 transition duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.02] sm:h-56 sm:w-80 ${
                  isOpening ? "envelope-opened" : ""
                }`}
              >
                {/* Tấm thiệp nằm phía sau phong bì (z-10) */}
                <div className="envelope-letter absolute inset-x-6 top-0 z-10 flex h-44 flex-col items-center justify-start rounded-2xl border border-[#C9AD7F]/70 bg-[#F4F8FC] px-3 pt-3.5 text-center shadow-md sm:inset-x-7 sm:h-48 sm:px-4 sm:pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9AD7F] bg-[#C9DCF1]/45 text-[#536D91] sm:h-11 sm:w-11">
                    <GraduationCap size={20} strokeWidth={2} />
                  </div>

                  <p className="mt-1.5 text-[10px] font-medium leading-3.5 text-[#536D91]/85 sm:text-[11px]">
                    Trân trọng kính mời tham dự lễ tốt nghiệp của
                  </p>

                  <p className="mt-1 px-1 text-base font-extrabold leading-tight tracking-normal text-[#536D91] sm:text-lg">
                    {GRAD_INFO.graduateName}
                  </p>
                </div>

                {/* Thân phong bì nằm đè lên nửa dưới tấm thiệp (z-20) */}
                <div className="envelope-body pointer-events-none absolute inset-x-0 bottom-0 top-14 z-20 overflow-hidden rounded-b-3xl border border-[#A9C5E5] bg-gradient-to-br from-[#C9DCF1] to-[#e4effa] shadow-[0_14px_32px_rgba(83,109,145,0.16)]" />

                {/* Nắp phong bì (z-30) */}
                <div className="envelope-flap pointer-events-none absolute inset-x-0 top-14 z-30 h-32 border border-[#A9C5E5] bg-[#b8d1ed]" />

                {/* Dấu niêm phong Champagne Gold (z-[35]) */}
                <span className="pointer-events-none absolute bottom-9 left-1/2 z-[35] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-white/70 bg-[#C9AD7F] text-white shadow-sm">
                  <Sparkles size={15} />
                </span>
              </div>
            </button>

            <h1 className="font-playfair mt-6 text-3xl font-bold tracking-tight text-[#536D91] sm:text-4xl">
              Chạm để mở
            </h1>

            <p className="mx-auto mt-2.5 max-w-xs text-sm leading-6 text-[#536D91]/80">
              Bấm vào phong bì để xem thông tin thời gian, địa điểm và xác nhận
              tham dự nhé.
            </p>
          </div>
        </section>
      ) : (
        /* NỘI DUNG THIỆP CHÍNH (1 CỘT GỌN NHẸ CHUẨN MOBILE) */
        <section className="relative z-10 min-h-svh px-3.5 py-5 sm:px-4 sm:py-8">
          <div className="card-enter mx-auto w-full max-w-lg rounded-3xl border border-[#A9C5E5]/70 bg-white/95 p-4 shadow-[0_20px_55px_rgba(83,109,145,0.12)] backdrop-blur-sm sm:p-6">
            {/* Header chữ xếp lớp phong cách V1 */}
            <header className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9AD7F] sm:text-[11px]">
                {GRAD_INFO.badge}
              </p>

              <div className="relative mt-1.5 select-none">
                <h1 className="text-3xl font-extrabold tracking-wider text-[#536D91] sm:text-5xl">
                  {GRAD_INFO.titleMain}
                </h1>
                <p className="name-text -mt-2.5 text-4xl text-[#C9AD7F] sm:-mt-3 sm:text-5xl">
                  {GRAD_INFO.titleScript}
                </p>
              </div>
            </header>

            {/* Hình minh họa mũ cử nhân & Lời mời */}
            <div className="mt-3.5 overflow-hidden rounded-2xl border border-[#C9DCF1] bg-[#F4F8FC] p-3 text-center">
              {!imgError ? (
                <div className="relative mx-auto h-52 w-full max-w-sm overflow-hidden rounded-xl sm:h-60">
                  <Image
                    src={GRAD_INFO.heroImage}
                    alt="Mũ cử nhân và bằng tốt nghiệp"
                    fill
                    sizes="(max-width: 640px) 100vw, 384px"
                    onError={() => setImgError(true)}
                    className="object-contain mix-blend-multiply"
                  />
                </div>
              ) : (
                <div className="mx-auto flex h-32 w-full max-w-xs flex-col items-center justify-center rounded-xl border border-dashed border-[#A9C5E5] bg-[#C9DCF1]/25 text-[#536D91]">
                  <GraduationCap size={34} className="text-[#C9AD7F]" />
                  <span className="mt-1 text-xs font-semibold">
                    Graduation Class of 2026
                  </span>
                </div>
              )}

              <h2 className="mt-2.5 text-lg font-bold text-[#536D91] sm:text-2xl">
                {GRAD_INFO.graduateName}
              </h2>
              <p className="mt-0.5 text-xs font-medium text-[#536D91]/75 sm:text-sm">
                {GRAD_INFO.subtitle}
              </p>
              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#536D91]/85 sm:text-sm">
                {GRAD_INFO.message}
              </p>
            </div>

            {/* Ngày & Giờ */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-2xl border border-[#A9C5E5]/60 bg-[#C9DCF1]/35 p-2.5 text-center sm:p-3">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#536D91]/75 sm:text-[11px]">
                  <CalendarDays size={13} className="text-[#C9AD7F]" />
                  Date
                </div>
                <p className="mt-1 text-xs font-bold text-[#536D91] sm:text-sm">
                  {GRAD_INFO.dateText}
                </p>
              </div>

              <div className="rounded-2xl border border-[#A9C5E5]/60 bg-[#C9DCF1]/35 p-2.5 text-center sm:p-3">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#536D91]/75 sm:text-[11px]">
                  <Clock size={13} className="text-[#C9AD7F]" />
                  Time
                </div>
                <p className="mt-1 text-xs font-bold text-[#536D91] sm:text-sm">
                  {GRAD_INFO.timeText}
                </p>
              </div>
            </div>

            {/* Địa điểm & Chỉ đường */}
            <div className="mt-2.5 rounded-2xl border border-[#A9C5E5]/60 bg-[#C9DCF1]/25 p-3 text-center sm:p-3.5">
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#536D91]/75 sm:text-[11px]">
                <MapPin size={13} className="text-[#C9AD7F]" />
                Location
              </div>
              <p className="mt-1 text-xs font-bold text-[#536D91] sm:text-sm">
                {GRAD_INFO.venueName}
              </p>
              <p className="mt-0.5 whitespace-pre-line text-xs leading-5 text-[#536D91]/90">
                {GRAD_INFO.venueAddress}
              </p>

              <a
                href={GRAD_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#A9C5E5] bg-white px-4 py-1.5 text-xs font-bold text-[#536D91] shadow-xs transition hover:bg-[#C9DCF1]/50"
              >
                <Navigation size={13} className="text-[#536D91]" />
                Chỉ đường (Open Map)
              </a>
            </div>

            {/* SĐT liên hệ */}
            <div className="mt-2.5 flex items-center justify-between gap-2 rounded-2xl border border-[#C9AD7F]/50 bg-[#F4F8FC] px-3.5 py-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Phone size={14} className="text-[#C9AD7F]" />
                <span className="font-semibold text-[#536D91]/80">Liên hệ:</span>
                <a
                  href={GRAD_INFO.phoneHref}
                  className="font-bold text-[#536D91] underline decoration-[#A9C5E5] underline-offset-4"
                >
                  {GRAD_INFO.phoneDisplay}
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-1 rounded-full bg-[#C9DCF1]/60 px-2.5 py-1 text-[11px] font-bold text-[#536D91] transition hover:bg-[#A9C5E5]/60"
              >
                {copiedPhone ? <Check size={12} /> : <Copy size={12} />}
                {copiedPhone ? "Đã copy" : "Copy"}
              </button>
            </div>

            {/* Form xác nhận tham dự (gọn nhẹ, không có ô lời chúc) */}
            <div className="mt-4 border-t border-[#C9DCF1] pt-3.5">
              <h3 className="text-center text-sm font-bold text-[#536D91] sm:text-base">
                Xác nhận tham dự
              </h3>

              <form onSubmit={handleRsvpSubmit} className="mt-2.5 space-y-2">
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Tên của bạn..."
                  className="w-full rounded-xl border border-[#A9C5E5] bg-[#F4F8FC] px-3.5 py-2 text-sm text-[#536D91] placeholder-[#536D91]/65 focus:border-[#536D91] focus:outline-none"
                />

                <div className="grid grid-cols-2 gap-2">
                  {["Tham dự", "Gửi cái ôm nha"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAttendance(option)}
                      className={`rounded-xl border px-2.5 py-2 text-xs font-bold transition ${
                        attendance === option
                          ? "border-[#536D91] bg-[#A9C5E5]/55 text-[#536D91]"
                          : "border-[#C9DCF1] bg-white text-[#536D91]/70 hover:bg-[#F4F8FC]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#536D91] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(83,109,145,0.25)] transition hover:opacity-95 sm:text-sm"
                >
                  {submitted ? (
                    <>
                      <Check size={15} />
                      Cảm ơn bạn đã xác nhận!
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Gửi xác nhận
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Nút Share & Đóng thiệp */}
            <div className="mt-4 flex items-center justify-center gap-3 border-t border-[#C9DCF1] pt-3.5">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#A9C5E5]/65 px-4 py-2 text-xs font-bold text-[#536D91] transition hover:bg-[#A9C5E5]"
              >
                <Share2 size={13} />
                {copiedLink ? "Đã sao chép link!" : "Chia sẻ thiệp"}
              </button>

              <button
                type="button"
                onClick={handleCloseCard}
                className="rounded-full border border-[#A9C5E5] bg-white px-4 py-2 text-xs font-bold text-[#536D91] transition hover:bg-[#F4F8FC]"
              >
                Đóng thiệp
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}