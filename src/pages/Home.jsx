import React, { useState, useEffect } from 'react'
import HeroSection4 from '../components/Hero_4/HeroSection4';
import GridSection1 from '../components/Grid_1/GridSection1';
import AccordionFaq from '../components/AccordionFaq/AccordionFaq';
import FooterFull from '../components/FooterFull/FooterFull';
import Navbar from '../components/NavBar/NavBar';
import CourseCard from '../components/CourseCard/CourseCard';
import CourseSectionNew from '../components/CourseSectionNew/CourseSectionNew';
import { useTheme } from '@vapor-ui/core';
import SpecialProfile from '../components/SpecialProfile/SpecialProfile';

function Home() {
  const { setTheme, appearance } = useTheme();

  const toggleDarkMode = () => {
    setTheme({
      appearance: appearance === 'dark' ? 'light' : 'dark',
    });
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main>
      <Navbar isDarkMode={appearance === 'dark'} toggleDarkMode={() => setTheme({appearance: appearance === 'dark' ? 'light' : 'dark'})} />
      {/* <HeroSection3 /> */}
      <HeroSection4 />
      <CourseSectionNew />
      {/* <CourseCard /> */}
      <SpecialProfile />
      <GridSection1 />
      <AccordionFaq />
      <FooterFull />
    </main>
  )
}

export default Home 