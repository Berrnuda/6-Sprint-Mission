import type { AppProps } from "next/app";
import Head from "next/head";

import NavBar from "@/components/header";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head><title>판다마켓</title></Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
