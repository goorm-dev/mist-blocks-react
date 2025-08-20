import Navbar from '../../components/NavBar/NavBar';
import FooterFull from '../../components/FooterFull/FooterFull';
import DetailHero from '../../components/DetailHero/DetailHero';
import AccordionFaq from '../../components/AccordionFaq/AccordionFaq';
import { useTheme } from '@vapor-ui/core';
import ProjectCultureSection from '../../components/ProjectCulture/ProjectCultureSection';
import PreBannerSection from '../../components/PreBanner/PreBannerSection';

import { COURSE, COURSE_INFORMATION } from '../../constants/CourseInformation';

function Detail({ course }) {
  const { setTheme, appearance } = useTheme();

  const handleToggleTheme = () => {
    setTheme({appearance: appearance === 'dark' ? 'light' : 'dark'})
  }

  const courseData = COURSE_INFORMATION[course];

  return (
    <>
      <Navbar isDarkMode={appearance === 'dark'} toggleDarkMode={handleToggleTheme} />
      <main>
        <DetailHero data={courseData} />
        <PreBannerSection />
        <ProjectCultureSection />
        <AccordionFaq />
      </main>
      <FooterFull />
    </>
  );
}

export default Detail; 