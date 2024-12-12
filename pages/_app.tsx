import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ToastNotify from "./components/ToastNotify";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return (
    <>
      {/* Include ToastNotify to render toasts globally */}
      <ToastNotify />
      
      {/* Render the page component */}
      <Component {...pageProps} />
    </>
  );
}
