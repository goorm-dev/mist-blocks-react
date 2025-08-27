/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  compress: true,
  poweredByHeader: false,

  images: {
    unoptimized: true,
  },

  // 정적 내보내기 시 브라우저 전용 코드가 서버에서 실행되지 않도록 환경 변수 설정
  env: {
    IS_STATIC_EXPORT: 'true',
  },
  
  // @vapor-ui/icons 패키지를 트랜스파일하여 CSS 파일 처리 문제 해결
  transpilePackages: ['@vapor-ui/icons'],
};

export default nextConfig;