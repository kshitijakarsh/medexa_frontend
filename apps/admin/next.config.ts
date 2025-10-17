import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  serverActions: {
    bodySizeLimit: "10mb",
  },
}

export default nextConfig
