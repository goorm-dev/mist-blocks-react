import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar/NavBar';
import FooterFull from '../components/FooterFull/FooterFull';
import './FullstackDetail.css';
import { useTheme } from '@vapor-ui/core';

function FullstackDetail() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { setTheme, appearance } = useTheme();
  
    useEffect(() => {
      // HTML 요소에 data-theme 속성 설정
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
  
    const toggleDarkMode = () => {
      setTheme({
        appearance: appearance === 'dark' ? 'light' : 'dark',
      });
      setIsDarkMode(!isDarkMode);
    };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="fullstack-body">
        {/* 여기에 상세 페이지 내용이 들어갈 예정입니다 */}
      </main>
      <FooterFull />
    </>
  );
}

export default FullstackDetail; 