import './CourseCard.css';
import { Text } from '@vapor-ui/core';
import CourseCardItem from './CourseCardItem';

/**
 * CourseCard 컴포넌트
 * 
 * 과정 카드를 그리드 형태로 표시하는 컴포넌트입니다.
 * 각 카드는 썸네일, 제목, 기간, 태그, CTA 버튼을 포함합니다.
 * 
 * @example
 * // 기본 사용
 * <CourseCard />
 * 
 * // 커스텀 데이터로 사용
 * <CourseCard 
 *   title="추천 과정"
 *   courses={[
 *     {
 *       id: 1,
 *       name: "React 풀스택 개발",
 *       period: "2024.01.15 (월) - 2024.02.15 (목)",
 *       status: "모집 중",
 *       statusType: "primary",
 *       tags: ["React", "Node.js", "MongoDB"],
 *       thumbnailType: 'video-with-mobile-image',
 *       videoSrc: "/videos/react-course.mp4",
 *       imageSrc: "/images/react-course.jpg",
 *       mobileImageSrc: "/images/react-course-mobile.jpg",
 *       ctaButtonLabel: "신청하기",
 *       ctaButtonLink: "https://example.com/apply",
 *       link: "/course/react-fullstack"
 *     }
 *   ]}
 * />
 * 
 * @example
 * // 썸네일 타입별 사용 예시
 * 
 * // 1. Lottie 애니메이션 사용
 * {
 *   thumbnailType: 'lottie',
 *   lottieSrc: "https://lottie.host/1e1721d6-d785-4fa6-875f-d19e9c249439/rsJD4klMRl.lottie",
 *   imageSrc: "/images/fallback.jpg"
 * }
 * 
 * // 2. 비디오만 사용 (PC/모바일 모두)
 * {
 *   thumbnailType: 'video',
 *   videoSrc: "/videos/course1.mp4",
 *   imageSrc: "/images/fallback.jpg"
 * }
 * 
 * // 3. 이미지만 사용 (PC/모바일 모두)
 * {
 *   thumbnailType: 'image',
 *   imageSrc: "/images/course2.jpg"
 * }
 * 
 * // 4. PC 비디오 + 모바일 이미지
 * {
 *   thumbnailType: 'video-with-mobile-image',
 *   videoSrc: "/videos/course3.mp4",
 *   imageSrc: "/images/course3.jpg",
 *   mobileImageSrc: "/images/course3-mobile.jpg"
 * }
 * 
 * @example
 * // CTA 버튼 옵션 사용 예시
 * 
 * // CTA 버튼 표시
 * {
 *   showCtaButton: true,
 *   ctaButtonLabel: "신청하기",
 *   ctaButtonLink: "https://example.com/apply"
 * }
 * 
 * // CTA 버튼 숨김
 * {
 *   showCtaButton: false
 * }
 * 
 * @example
 * // statusType 옵션 사용 예시
 * 
 * // 기본 컬러 타입
 * {
 *   statusType: "primary",    // 파란색
 *   statusType: "contrast",   // 회색
 *   statusType: "warning"     // 주황색
 * }
 * 
 * // open 타입
 * {
 *   statusType: "open",       // KTC 그라디언트 (보라색 → 청록색)
 *   status: "모집 중"
 * }
 * 
 * // close 타입
 * {
 *   statusType: "close",      // 배경: secondary, 텍스트: hint
 *   status: "모집 마감"
 * }
 */


const CourseCard = ({ 
  title = "Course Card",
  onCtaClick,
  courses = [
    {
      id: 1,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 중",
      statusType: "open", // contrast, primary, warning, open, close
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: Lottie 애니메이션
      thumbnailType: 'image',
      imageSrc: "/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "/fullstack",
      showCtaButton: false // CTA 버튼 표시 여부
    }
  ]
}) => {
  return (
    <section className="content-section course-section">
      <div className="container">
        <Text typography="heading2" className="title">{title}</Text>
        <div className="courses-container">
          {courses.map((course) => (
            <CourseCardItem 
              key={course.id} 
              course={course} 
              onCtaClick={onCtaClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCard; 