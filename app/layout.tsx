import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Motion } from "./components/site-shell";
import { Footer } from "./components/sections";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/geist.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "RC7 | Remodeling & Construction", template: "%s | RC7" },
  description:
    "Build better. Live better. Explore remodeling and construction services from RC7 and discuss your project with owner Isaid Rangel.",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
