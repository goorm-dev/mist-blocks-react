import Navbar from '../../components/NavBar/NavBar';
import FooterFull from '../../components/FooterFull/FooterFull';
import DetailHero from '../../components/DetailHero/DetailHero';
import AccordionFaq from '../../components/AccordionFaq/AccordionFaq';
import { useTheme } from '@vapor-ui/core';
import ProjectCultureSection from '../../components/ProjectCulture/ProjectCultureSection';
import PreBannerSection from '../../components/PreBanner/PreBannerSection';
import DetailLearnCation from '../../components/DetailLearnCation/DetailLearnCation';
import DetailNavigation from '../../components/DetailNavigation/DetailNavigation';
import DetailIntroduceCourse from '../../components/DetailIntroduceCourse/DetailIntroduceCourse';
// import DetailCarrierSupport from '../../components/DetailCarrierSupport/DetailCarrierSupport';
import DetailCurriculum from '../../components/DetailCurriculum/DetailCurriculum';
import DetailBenefit from '../../components/DetailBenefit/DetailBenefit';
import DetailLearningPlace from '../../components/DetailLearningPlace/DetailLearningPlace';
import DetailRecruitmentProcess from '../../components/DetailRecruitmentProcess/DetailRecruitmentProcess';
import DetailCareer from '../../components/DetailCareer/DetailCareer';
import FloatingMenu from '../../components/FloatingMenu/FloatingMenu';

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
        <DetailNavigation />
        <DetailIntroduceCourse course={course} />
        <DetailLearnCation />
        <ProjectCultureSection />
        <DetailCurriculum course={course} />
        {/* <DetailCarrierSupport /> */}
        <DetailCareer />
        <DetailBenefit />
        <DetailLearningPlace/>
        <DetailRecruitmentProcess />
        <AccordionFaq />
      </main>
      <FloatingMenu />
      <FooterFull />
    </>
  );
}

export default Detail; 