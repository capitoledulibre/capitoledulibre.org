import "bootstrap/dist/css/bootstrap.min.css";

import jQuery from "jquery";

import "../public/css/capitoledulibre.css"
import "../public/css/creative.css"

import React from "react";

export default function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    window.$ = jQuery;
    window.jQuery = jQuery;
  }

  return <Component {...pageProps} />
}
