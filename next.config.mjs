/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
          },
        ],
      },
      allowedDevOrigins: [
        'http://192.168.128.155:3000', // your actual local network IP + port
        'http://localhost:3000',       // just in case you're using localhost too
      ],
};

export default nextConfig;
