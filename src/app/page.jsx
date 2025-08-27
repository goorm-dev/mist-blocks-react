'use client';

import { useTheme } from '@vapor-ui/core';

import HeroSection3 from '../components/Hero_3/HeroSection3';
import FooterFull from '../components/FooterFull/FooterFull';
import Navbar from '../components/NavBar/NavBar';
import CourseSectionNew from '../components/CourseSectionNew/CourseSectionNew';
import SpecialProfile from '../components/SpecialProfile/SpecialProfile';
import CeoInterviewSection from '../components/CeoSection/CeoInterviewSection';
import PreBannerSection from '../components/PreBanner/PreBannerSection';
import DetailLearnCation from '../components/DetailLearnCation/DetailLearnCation';
import ProjectCultureSection from '../components/ProjectCulture/ProjectCultureSection';
import { useInitializeChannelTalk } from '../hooks/useInitializeChannelTalk';

// 정적 내보내기 설정
export const dynamic = 'force-static';

export default function Page() {
  const { setTheme, appearance } = useTheme();

  // Toggle dark mode if theme API is available
  const toggleDarkMode = () => {
    setTheme({ appearance: appearance === 'dark' ? 'light' : 'dark' });
  };

  useInitializeChannelTalk();

  return (
    <>
      <Navbar isDarkMode={appearance === 'dark'} toggleDarkMode={toggleDarkMode} />
      <main>
        <HeroSection3 />
        <PreBannerSection />
        <CeoInterviewSection />
        <DetailLearnCation />
        <ProjectCultureSection />
        <SpecialProfile />
        <CourseSectionNew />
      </main>
      <FooterFull />
    </>
  );
}
