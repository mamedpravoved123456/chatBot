/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Важно: добавьте basePath, если ваш проект будет размещаться не в корне домена
  // (например: https://username.github.io/repository-name/)
  basePath: process.env.NODE_ENV === 'production' ? '/chat-bot-nextjs' : '',
  images: {
    unoptimized: true,
  },
  // Примечание: headers не работают в режиме static export (output: 'export')
  // Заголовки должны быть настроены на уровне вашего хостинга
};

export default nextConfig; 