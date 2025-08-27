'use client';

// Amplitude 초기화 또는 더미 객체 제공
const initializeAmplitude = () => {
  // 전역 객체가 이미 존재하면 그대로 사용
  if (typeof window !== 'undefined' && window.amplitude) {
    return window.amplitude;
  }

  // amplitude가 없으면 더미 객체 제공
  const dummyAmplitude = {
    getInstance: () => ({
      init: () => {},
      logEvent: () => {},
      setUserId: () => {},
      setUserProperties: () => {},
      clearUserProperties: () => {},
      // 다른 필요한 메서드들을 추가할 수 있습니다
    }),
    // 다른 필요한 메서드들을 추가할 수 있습니다
  };

  // 전역 객체로 설정
  if (typeof window !== 'undefined') {
    window.amplitude = dummyAmplitude;
  }

  return dummyAmplitude;
};

export default initializeAmplitude;