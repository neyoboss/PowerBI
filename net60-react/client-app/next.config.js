/** @type {import('next').NextConfig} */

const rewrites = () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:5075/:path*",
    },
  ];
};

const nextConfig = {
  reactStrictMode: false,
  webpack: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
  rewrites,

  // swcMinify: true,
}


module.exports = nextConfig
