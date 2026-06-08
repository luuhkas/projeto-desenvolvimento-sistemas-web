/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // fixa a raiz do projeto: existe um package-lock.json solto na home
  // do usuario e sem isso o Next/Turbopack escolhe a pasta errada
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
