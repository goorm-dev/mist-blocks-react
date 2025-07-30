import React, { useState, useEffect } from 'react'
import './App.css'
import HeroSection2 from './components/Hero_2/HeroSection2';
import HeroSection1 from './components/Hero_1/HeroSection1'
import GridSection1 from './components/Grid_1/GridSection1';
import AccordionFaq from './components/AccordionFaq/AccordionFaq';
import FooterFull from './components/FooterFull/FooterFull';
import Navbar from './components/NavBar/NavBar';
import CourseCard from './components/CourseCard/CourseCard';
import { useTheme } from '@vapor-ui/core';

function App() {
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
    <main>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {/* <HeroSection2 /> */}
      <HeroSection1 />
      <CourseCard />
      <GridSection1 />
      <AccordionFaq />
      <FooterFull />
    </main>
  )
}

export default App
