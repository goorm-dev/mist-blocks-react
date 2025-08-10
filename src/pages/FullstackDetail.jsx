import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar/NavBar';
import FooterFull from '../components/FooterFull/FooterFull';
import DetailHero from '../components/DetailHero/DetailHero';
import AccordionFaq from '../components/AccordionFaq/AccordionFaq';
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
      <main>
        <DetailHero />
        <AccordionFaq />
      </main>
      <FooterFull />
    </>
  );
}

export default FullstackDetail; 