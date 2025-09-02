import "./globals.css";
import Sidebar from "@components/sidebar";
import Menu from "@components/menu";
import Footer from "@components/footer";
import Loading from "./loading";
import Script from 'next/script';
import { Suspense } from "react";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <div className="sidebar">
            <Suspense fallback={<Loading />}>
              <Sidebar />
            </Suspense>
          </div>
          <div className="content">
            <Menu />
            <div className="container bg-white pt-5">
              {children}
            </div>
            <Footer />
          </div>
        </div>
        <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy="beforeInteractive" />
        <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/easing/easing.min.js" strategy="afterInteractive" />
        <Script src="/waypoints/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}