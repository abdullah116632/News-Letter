
import { DM_Sans, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import ReduxProvider from "./providers";
import ToastProvider from "@/components/ToastProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const centuryGothic = localFont({
  src: "../fonts/CenturyGothic.ttf",
  variable: "--font-gothic",
});

const codeProBlackLC = localFont({
  src: "../fonts/Code Pro Black LC.otf",
  variable: "--font-code-pro-black-lc",
});

export const metadata = {
  viewport: "width=device-width, initial-scale=1.0",
  title: "Opt.national",
  description: "A newslatter service platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <ReduxProvider>
        <body
          className={`${dmSans.variable} ${roboto.variable} ${centuryGothic.variable} ${codeProBlackLC.variable} antialiased overflow-x-hidden`}
        >
          <ToastProvider />
          <header>
            <Navbar />
          </header>
          {children}
          <footer>
            <Footer />
          </footer>
        </body>
      </ReduxProvider>
    </html>
  );
}
