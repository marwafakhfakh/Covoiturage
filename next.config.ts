// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "randomuser.me" },
//       { protocol: "https", hostname: "images.unsplash.com" },
//       { protocol: "https", hostname: "static.vecteezy.com" },
//       { protocol: "https", hostname: "t3.ftcdn.net" },
//       { protocol: "https", hostname: "dev.namlaa.com" },
//       { protocol: "http", hostname: "localhost" },
//       { protocol: "http", hostname: "localhost", port: "8000" },
//       { protocol: "https", hostname: "www.namlaa.com" },
//       // ➜ ajout pour tes images de voitures
//       {
//         protocol: "https",
//         hostname: "dev.namlaa.com",
//         port: "",
//         pathname: "/media/**",   // couvre /media/car_images/...
//       },
//     ],
//   },
// };

// export default nextConfig;
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https" as const, hostname: "randomuser.me" },
      { protocol: "https" as const, hostname: "images.unsplash.com" },
      { protocol: "https" as const, hostname: "static.vecteezy.com" },
      { protocol: "https" as const, hostname: "t3.ftcdn.net" },
      { protocol: "https" as const, hostname: "dev.namlaa.com" },
      { protocol: "http" as const, hostname: "localhost" },
      { protocol: "http" as const, hostname: "localhost", port: "8000" },
      {
        protocol: "https" as const,
        hostname: "dev.namlaa.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default withPWA(nextConfig);
