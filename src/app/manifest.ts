import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yashodhan Kalia — Senior Software Developer",
    short_name: "YK Portfolio",
    description:
      "Senior Software Developer who gets things done. MERN Stack, AI Systems, Scalable Architecture.",
    start_url: "/",
    display: "standalone",
    background_color: "#080608",
    theme_color: "#c9a84c",
    orientation: "portrait",
    categories: ["portfolio", "technology", "developer"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
