"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    _smartsupp: any;
    smartsupp: any;
  }
}

export default function SmartsuppChat() {
  useEffect(() => {
    // Initialize Smartsupp configuration
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = process.env.NEXT_PUBLIC_SMARTSUPP_KEY || 'key';

    // Load Smartsupp script if not already loaded
    if (!window.smartsupp) {
      window.smartsupp = function () {
        window.smartsupp._.push(arguments);
      };
      window.smartsupp._ = [];

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.charset = "utf-8";
      script.async = true;
      script.src = "https://www.smartsuppchat.com/loader.js?";

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    }

    // Cleanup function (optional - removes the chat widget when component unmounts)
    return () => {
      // Note: Smartsupp doesn't provide a built-in cleanup method
      // The chat widget will persist across page navigation
    };
  }, []);

  return (
    <noscript>
      Powered by{" "}
      <a
        href="https://www.smartsupp.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Smartsupp
      </a>
    </noscript>
  );
}


