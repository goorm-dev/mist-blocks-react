import HeroSection3 from '../components/Hero_3/HeroSection3';
import FooterFull from '../components/FooterFull/FooterFull';
import Navbar from '../components/NavBar/NavBar';
import CourseSectionNew from '../components/CourseSectionNew/CourseSectionNew';
import { useTheme } from '@vapor-ui/core';
import SpecialProfile from '../components/SpecialProfile/SpecialProfile';
import CeoInterviewSection from '../components/CeoSection/CeoInterviewSection';
import PreBannerSection from '../components/PreBanner/PreBannerSection';
import DetailLearnCation from '../components/DetailLearnCation/DetailLearnCation';
import ProjectCultureSection from '../components/ProjectCulture/ProjectCultureSection';

function Home() {
  const { setTheme, appearance } = useTheme();

  const toggleDarkMode = () => setTheme({appearance: appearance === 'dark' ? 'light' : 'dark'})

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
  )
}

export default Home 