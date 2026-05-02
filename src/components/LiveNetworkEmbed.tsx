import { useMemo } from "react";
import networkHtml from "./live-network/network.html?raw";
import countryRingsJs from "./live-network/country-rings.js?raw";
import mascotUrl from "./live-network/mascot.png";

export function LiveNetworkEmbed() {
  const srcDoc = useMemo(() => {
    return networkHtml
      .replace(
        '<script src="country-rings.js"></script>',
        `<script>${countryRingsJs}</script>`
      )
      .replaceAll("assets/mascot.png", mascotUrl);
  }, []);

  return (
    <iframe
      title="Mad Monkey Live Network"
      srcDoc={srcDoc}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      className="block h-full w-full border-0"
    />
  );
}
