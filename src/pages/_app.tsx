import type { AppProps } from "next/app";

import "@/styles/index.scss";
// todo remove this completing feature
import "@robur_/ui-kit/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
