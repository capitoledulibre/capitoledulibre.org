"use client"

import { useEffect } from "react";

/**
 * The purpose of this component is to load the bootstrap JS files.
 * It must run client-side.
 */
export const BootstrapLoader = () => {
  useEffect(() => {
    require('bootstrap/js/dist/collapse.js');
  }, []);

  return null;
}
