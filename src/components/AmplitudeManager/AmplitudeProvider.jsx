'use client';

import { useEffect } from 'react';
import initializeAmplitude from '../../utils/amplitude';
import AmplitudeScript from './AmplitudeScript';

export default function AmplitudeProvider({ children }) {
  useEffect(() => {
    // Amplitude 더미 객체 초기화
    initializeAmplitude();
  }, []);

  return (
    <>
      <AmplitudeScript />
      {children}
    </>
  );
}
