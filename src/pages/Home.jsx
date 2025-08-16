import React, { useState, useEffect } from 'react'
import HeroSection3 from '../components/Hero_3/HeroSection3';
import FooterFull from '../components/FooterFull/FooterFull';
import Navbar from '../components/NavBar/NavBar';
import CourseSectionNew from '../components/CourseSectionNew/CourseSectionNew';
import { useTheme } from '@vapor-ui/core';
import SpecialProfile from '../components/SpecialProfile/SpecialProfile';
import CeoInterviewSection from '../components/CeoSection/CeoInterviewSection';
import PreBannerSection from '../components/PreBanner/PreBannerSection';
import ProjectCultureSection from '../components/ProjectCulture/ProjectCultureSection';

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
      <HeroSection3 />
      <PreBannerSection />
      <CourseSectionNew />
      <CeoInterviewSection />
      <ProjectCultureSection />
      <SpecialProfile />
      <FooterFull />
    </main>
  )
}

export default Home 