import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.vecteezy.com" },
      { protocol: "https", hostname: "t3.ftcdn.net" },
      { protocol: "https", hostname: "dev.namiaa.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "localhost", port: "8000" },
      // ➜ ajout pour tes images de voitures
      {
        protocol: "https",
        hostname: "dev.namlaa.com",
        port: "",
        pathname: "/media/**",   // couvre /media/car_images/...
      },
    ],
  },
};

export default nextConfig;
