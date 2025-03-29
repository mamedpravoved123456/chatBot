/** @type {import('next').NextConfig} */
const nextConfig = {
  // Оптимизации для Vercel
  reactStrictMode: true,
  swcMinify: true,
  // Конфигурация для изображений
  images: {
    domains: ['yandex.ru'],
  },
};

export default nextConfig; 