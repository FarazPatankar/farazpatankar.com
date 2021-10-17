/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["s3.us-west-2.amazonaws.com"],
  },
  redirects: async () => [
    {
      source: "/side-projects",
      destination: "/projects",
      permanent: true,
    },
    {
      source: "/how-i-travel",
      destination: "/post/nomad",
      permanent: true,
    },
  ],
};
