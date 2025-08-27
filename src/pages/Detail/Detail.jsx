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
import DetailCurriculum from '../../components/DetailCurriculum/DetailCurriculum';
import DetailBenefit from '../../components/DetailBenefit/DetailBenefit';
import DetailLearningPlace from '../../components/DetailLearningPlace/DetailLearningPlace';
import DetailRecruitmentProcess from '../../components/DetailRecruitmentProcess/DetailRecruitmentProcess';
import DetailCareer from '../../components/DetailCareer/DetailCareer';
import OpenAlert from '../../components/OpenAlert/OpenAlert';

import { COURSE, COURSE_INFORMATION } from '../../constants/CourseInformation';
import { useInitializeChannelTalk } from '../../hooks/useInitializeChannelTalk';

function Detail({ course }) {
  const { setTheme, appearance } = useTheme();

  const handleToggleTheme = () => {
    setTheme({appearance: appearance === 'dark' ? 'light' : 'dark'})
  }

  useInitializeChannelTalk();

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
        <DetailCareer course={course} />
        <DetailBenefit />
        <DetailLearningPlace/>
        <DetailRecruitmentProcess />
        <AccordionFaq />
      </main>
      <OpenAlert courseType={course} />
      <FooterFull />
    </>
  );
}

export default Detail; 