import { useMemo, useRef } from "react";
import networkHtml from "./live-network/network.html?raw";
import countryRingsJs from "./live-network/country-rings.js?raw";
import mascotUrl from "./live-network/mascot.png";

export function LiveNetworkEmbed() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const srcDoc = useMemo(() => {
    return networkHtml
      .replace(
        '<script src="country-rings.js"></script>',
        `<script>${countryRingsJs}</script>`
      )
      .replaceAll("assets/mascot.png", mascotUrl);
  }, []);

  // Browsers throttle requestAnimationFrame inside iframes that don't have
  // focus, which causes the WebGL map to run at a low frame rate until the
  // user clicks it. Forwarding focus on hover (and on first pointer entry)
  // gives the iframe focus without requiring a click.
  const focusIframe = () => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      try {
        win.focus();
      } catch {
        /* cross-origin — ignored */
      }
    }
  };

  return (
    <iframe
      ref={iframeRef}
      title="Mad Monkey Live Network"
      srcDoc={srcDoc}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      className="block h-full w-full border-0"
      onMouseEnter={focusIframe}
      onPointerEnter={focusIframe}
      onLoad={focusIframe}
    />
  );
}
