/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
  },
};

export default nextConfig;
