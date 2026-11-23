import type { Metadata } from "next";
import {
  Be_Vietnam_Pro,
  Dancing_Script,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const scriptFont = Dancing_Script({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thiệp Mời Lễ Tốt Nghiệp",
  description:
    "Thiệp mời tham dự lễ tốt nghiệp — xem thời gian, địa điểm và gửi lời chúc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${beVietnam.variable} ${playfair.variable} ${scriptFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}