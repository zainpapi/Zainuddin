import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zain Uddin — Future Front-End Developer",
    short_name: "ZU.dev",
    description:
      "9th-grade aspiring front-end developer & copywriter. Building interactive, premium web experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0d",
    theme_color: "#e8a33d",
    icons: [
      {
        src: "/zain.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
