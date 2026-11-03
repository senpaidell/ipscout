import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Send /api/ip to ipapi.co during npm run dev (Vercel uses api/ip.js instead)
function buildIpapiPath(path) {
  const ip = new URL(path, "http://localhost").searchParams.get("ip");
  return ip ? "/" + ip + "/json/" : "/json/";
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/ip": {
        target: "https://ipapi.co",
        changeOrigin: true,
        rewrite: buildIpapiPath,
      },
    },
  },
});
