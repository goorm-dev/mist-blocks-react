import ClientLayout from './client-layout';
import { COURSE_INFORMATION, COURSE_OG_DATA, DEFAULT_OG_DATA } from '../../constants/CourseInformation';

// 정적 생성을 위한 generateStaticParams 함수 추가
export async function generateStaticParams() {
  // COURSE_INFORMATION에서 모든 course keyword를 추출하여 경로 매개변수 생성
  return Object.values(COURSE_INFORMATION).map((course) => ({
    courseKeyword: course.keyword,
  }));
}

// Next.js에서는 server component에서 metadata를 생성하는 generateMetadata 함수를 사용합니다
export async function generateMetadata({ params }) {
  // params를 먼저 await 해야 합니다
  const resolvedParams = await Promise.resolve(params);
  const courseKeyword = resolvedParams.courseKeyword;
  
  // Find the corresponding course from the keyword
  const course = Object.keys(COURSE_INFORMATION).find(
    courseKey => COURSE_INFORMATION[courseKey].keyword === courseKeyword
  );

  if (!course || !COURSE_OG_DATA[course]) {
    return {
      title: DEFAULT_OG_DATA.title,
      description: DEFAULT_OG_DATA.description,
      openGraph: {
        title: DEFAULT_OG_DATA.title,
        description: DEFAULT_OG_DATA.description,
        url: DEFAULT_OG_DATA.baseUrl,
        siteName: 'kt cloud TECH UP',
        images: [
          {
            url: DEFAULT_OG_DATA.image,
            width: 1200,
            height: 630,
            alt: 'kt cloud TECH UP',
          },
        ],
        locale: 'ko_KR',
        type: DEFAULT_OG_DATA.type,
      },
      twitter: {
        card: 'summary_large_image',
        title: DEFAULT_OG_DATA.title,
        description: DEFAULT_OG_DATA.description,
        images: [DEFAULT_OG_DATA.image],
      },
      alternates: {
        canonical: DEFAULT_OG_DATA.baseUrl,
      },
    };
  }

  const ogData = COURSE_OG_DATA[course];
  const courseInfo = COURSE_INFORMATION[course];
  
  return {
    title: ogData.title,
    description: ogData.description,
    keywords: ogData.keywords,
    openGraph: {
      title: ogData.title,
      description: ogData.description,
      url: `${DEFAULT_OG_DATA.baseUrl}/${courseKeyword}`,
      siteName: 'kt cloud TECH UP',
      images: [
        {
          url: DEFAULT_OG_DATA.image,
          width: 1200,
          height: 630,
          alt: `${courseInfo.title} - kt cloud TECH UP`,
        },
      ],
      locale: 'ko_KR',
      type: DEFAULT_OG_DATA.type,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogData.title,
      description: ogData.description,
      images: [DEFAULT_OG_DATA.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${DEFAULT_OG_DATA.baseUrl}/${courseKeyword}`,
    },
  };
}

export default function CourseLayout({ children }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}