/** @type {import('next').NextConfig} */

const rewrites = () => {
  return [
    {
      source: "/api/:path*",
      destination: "https://powerbi.corp.kmwe.com:6443/:path*",
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
  trailingSlash: true,
  // swcMinify: true,
}


module.exports = nextConfig
