'use client';

import Link from 'next/link';
import { useTheme } from '@vapor-ui/core';
import Navbar from '../components/NavBar/NavBar';
import FooterFull from '../components/FooterFull/FooterFull';

export default function NotFound() {
  const { appearance, setTheme } = useTheme();

  const toggleDarkMode = () => setTheme({ appearance: appearance === 'dark' ? 'light' : 'dark' });

  return (
    <>
      <Navbar isDarkMode={appearance === 'dark'} toggleDarkMode={toggleDarkMode} />
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4">404 - 페이지를 찾을 수 없습니다</h1>
        <p className="mb-8 text-xl">요청하신 페이지를 찾을 수 없습니다.</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
      <FooterFull />
    </>
  );
}
