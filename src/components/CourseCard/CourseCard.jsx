import React from 'react';
import './CourseCard.css';
import { Text, Badge, Button  } from '@vapor-ui/core';
import { CalendarIcon } from '@vapor-ui/icons';

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
 * // 1. 비디오만 사용 (PC/모바일 모두)
 * {
 *   thumbnailType: 'video',
 *   videoSrc: "/videos/course1.mp4",
 *   imageSrc: "/images/fallback.jpg"
 * }
 * 
 * // 2. 이미지만 사용 (PC/모바일 모두)
 * {
 *   thumbnailType: 'image',
 *   imageSrc: "/images/course2.jpg"
 * }
 * 
 * // 3. PC 비디오 + 모바일 이미지
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
  courses = [
    {
      id: 1,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 중",
      statusType: "open", // contrast, primary, warning, open, close
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: PC 비디오 + 모바일 이미지
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 표시 여부
    },
    {
      id: 2,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 마감",
      statusType: "close",
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: 이미지만 사용
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 경로를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 숨김
    },
    {
      id: 3,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 마감",
      statusType: "close",
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: PC 비디오 + 모바일 이미지
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 표시
    },
    {
      id: 4,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 마감",
      statusType: "close",
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: PC 비디오 + 모바일 이미지
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 표시
    },
    {
      id: 5,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 마감",
      statusType: "close",
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: PC 비디오 + 모바일 이미지
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 표시
    },
    {
      id: 6,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 마감",
      statusType: "close",
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: PC 비디오 + 모바일 이미지
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 표시
    },{
      id: 7,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 중",
      statusType: "open",
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: PC 비디오 + 모바일 이미지
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 표시
    },
    {
      id: 8,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 중",
      statusType: "open",
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: PC 비디오 + 모바일 이미지
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 표시
    },
    {
      id: 9,
      name: "프로그램 이름",
      period: "YY.MM.DD (월) - YY.MM.DD (목)",
      status: "모집 마감",
      statusType: "close",
      tags: ["태그1", "태그2", "태그3", "태그4"],
      // 썸네일 타입: PC 비디오 + 모바일 이미지
      thumbnailType: 'image',
      imageSrc: "src/assets/img-default.png",
      ctaButtonLabel: "CTA Button",
      ctaButtonLink: "여기에 링크를 입력하세요",
      link: "fullstack.html",
      showCtaButton: false // CTA 버튼 표시
    }
  ]
}) => {
  const handleCtaClick = (link) => {
    if (link && link !== "여기에 링크를 입력하세요") {
      window.open(link, '_blank');
    }
  };



   /**
   * 썸네일 렌더링 함수
   * @param {Object} course - 과정 데이터
   * @returns {JSX.Element} 썸네일 요소
   */
  const renderCourseThumb = (course) => {
    switch (course.thumbnailType) {
      case 'video':
        // PC/모바일 모두에서 비디오 재생
        return (
          <video 
            className="course-video" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata"
          >
            <source 
              src={course.videoSrc} 
              type="video/mp4" 
            />
          </video>
        );
      
      case 'video-with-mobile-image':
        // PC에서는 비디오, 모바일에서는 이미지 표시
        return (
          <>
            <video 
              className="course-video pc-story-video" 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="metadata"
            >
              <source 
                media="(min-width: 577px)" 
                src={course.videoSrc} 
                type="video/mp4" 
              />
            </video>
            <picture className="mobile-picture">
              <source 
                media="(max-width: 576px)" 
                srcSet={course.mobileImageSrc} 
              />
              <img 
                src={course.imageSrc} 
                alt="course-thumbnail" 
                className="course-video" 
              />
            </picture>
          </>
        );
      
      case 'image':
      default:
        // PC/모바일 모두에서 이미지 표시
        return (
          <img 
            className="course-image" 
            src={course.imageSrc} 
            alt="course-image" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'src/assets/img-default.png';
            }}
          />
        );
    }
  };

  return (
    <section className="content-section course-section">
      <div className="container">
        <Text typography="heading2" className="title">{title}</Text>
        <div className="courses-container">
          {courses.map((course) => (
            <div key={course.id} className="course-common">
              <div className="course-card">
                <a href={course.link} className="course-link">
                  <div className="course-thumb">
                    <div className="course-status-badge">
                      {course.statusType === 'open' ? (
                        <Badge size="lg" color="primary" className="open-badge">
                          {course.status}
                        </Badge>
                      ) : course.statusType === 'close' ? (
                        <Badge size="lg" color="contrast" className="close-badge">
                          {course.status}
                        </Badge>
                      ) : (
                        <Badge size="lg" color={course.statusType}>
                          {course.status}
                        </Badge>
                      )}
                    </div>
                    {renderCourseThumb(course)}
                  </div>
                  <div className="course-info">
                    <div className="course-info-text">
                      <Text typography="heading5" className="course-name">{course.name}</Text>
                      <Text typography="subtitle1" className="course-period">
                        <CalendarIcon />
                        <span>교육 일정 ㅣ {course.period}</span>
                      </Text>
                    </div>
                    <div className="badge-container">
                      {course.tags.map((tag, index) => (
                        <Badge key={index} size="md" color="primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
              {course.showCtaButton && (
                <div className="course-action-container">
                  <Button size="lg" color="primary" block onClick={() => handleCtaClick(course.ctaButtonLink)}>
                    {course.ctaButtonLabel}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCard; 