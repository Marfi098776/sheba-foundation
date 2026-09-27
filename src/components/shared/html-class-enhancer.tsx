"use client";

import { useEffect } from "react";

/**
 * Adds a `js` class to the `<html>` element to enable progressive enhancement.
 *
 * This allows CSS to distinguish between JavaScript-enabled and JavaScript-disabled states.
 * When JavaScript is disabled, scroll-reveal elements remain visible by default.
 * When JavaScript is enabled, the `js` class is added and scroll-reveal animations activate.
 */
export function HtmlClassEnhancer() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js");

    return () => {
      html.classList.remove("js");
    };
  }, []);

  return null;
}