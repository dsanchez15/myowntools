/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pomodoro",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
