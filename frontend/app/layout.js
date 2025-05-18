import { DM_Sans, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import ReduxProvider from "./providers";
import ToastProvider from "@/components/helper/ToastProvider";

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
  title: "Opt.national",
  description: "A newsletter service platform",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
