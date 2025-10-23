import "./globals.css";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";

export const metadata = {
  title: "Satu Peta Teluk Bintuni",
  description: "Platform geospasial terintegrasi Kabupaten Teluk Bintuni",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Preloader />
          <Navbar />
          {children}
          <ScrollToTop />
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>

  );
}

