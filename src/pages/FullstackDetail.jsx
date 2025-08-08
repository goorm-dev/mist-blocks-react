import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar/NavBar';
import FooterFull from '../components/FooterFull/FooterFull';
import './FullstackDetail.css';
import { useTheme } from '@vapor-ui/core';

function FullstackDetail() {
  const { setTheme, appearance } = useTheme();

  const toggleDarkMode = () => {
    setTheme({
      appearance: appearance === 'dark' ? 'light' : 'dark',
    });
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <Navbar isDarkMode={appearance === 'dark'} toggleDarkMode={() => setTheme({appearance: appearance === 'dark' ? 'light' : 'dark'})} />
      <main className="fullstack-body">
        {/* 여기에 상세 페이지 내용이 들어갈 예정입니다 */}
      </main>
      <FooterFull />
    </>
  );
}

export default FullstackDetail; 