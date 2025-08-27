'use client';

import Script from 'next/script';

export default function AmplitudeScript() {
  return (
    <>
      <Script
        id="amplitude-sdk"
        strategy="afterInteractive"
        src="https://cdn.amplitude.com/libs/amplitude-8.18.1-min.js"
        onLoad={() => {
          // 클라이언트 사이드에서만 실행
          if (typeof window !== 'undefined' && window.amplitude) {
            // Amplitude API 키가 있다면 여기에 초기화
            // window.amplitude.getInstance().init("YOUR_AMPLITUDE_API_KEY");
            console.log('Amplitude SDK loaded successfully');
          }
        }}
      />
    </>
  );
}