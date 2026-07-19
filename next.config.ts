import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    viewTransition: true,
  },
  // Allow local-network devices (e.g. phone on same Wi-Fi) to connect to the
  // dev server. Without this, Next.js blocks HMR/JS delivery from non-localhost
  // origins and React never hydrates — timers, interactivity etc. all break.
  allowedDevOrigins: ["10.0.0.4"],
  // Apple fetches the AASA file to validate universal links. It has no file
  // extension, so hosts may serve it as octet-stream/text; force JSON so
  // onboardapp.org links reliably open the iOS app.
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
