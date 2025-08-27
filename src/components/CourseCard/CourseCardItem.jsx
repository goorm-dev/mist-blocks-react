'use client';

import Link from 'next/link';
import { Text, Badge, Button } from '@vapor-ui/core';
import { CalendarIcon } from '@vapor-ui/icons';
import './CourseCard.css';
import { formatPeriod, getRecruitmentStatus } from '../../utils/courseUtils';

/**
 * CourseCardItem 컴포넌트
 * 
 * 개별 과정 카드를 표시하는 재사용 가능한 컴포넌트입니다.
 * CourseCard와 CourseSectionNew에서 공통으로 사용됩니다.
 * 
 * @example
 * // 기본 사용
 * <CourseCardItem 
 *   course={{
 *     id: 1,
 *     name: "React 풀스택 개발",
 *     period: "2024.03.15 (월) - 2024.06.15 (목)",
 *     status: "모집 중",
 *     statusType: "open",
 *     tags: ["React", "Node.js", "JavaScript"],
 *     thumbnailType: 'image',
 *     imageSrc: "/images/react-course.jpg",
 *     link: "/courses/react-fullstack",
 *     showCtaButton: false
 *   }}
 * />
 * 
 * @example
 * // CTA 버튼이 있는 카드
 * <CourseCardItem 
 *   course={{
 *     ...courseData,
 *     showCtaButton: true,
 *     ctaButtonLabel: "신청하기",
 *     ctaButtonLink: "https://apply.com"
 *   }}
 * />
 * 
 * @example
 * // 썸네일 타입별 예시
 * 
 * // Lottie 애니메이션
 * <CourseCardItem course={{
 *   ...courseData,
 *   thumbnailType: 'lottie',
 *   lottieSrc: "https://lottie.host/animation.lottie"
 * }} />
 * 
 * // 비디오 썸네일
 * <CourseCardItem course={{
 *   ...courseData,
 *   thumbnailType: 'video',
 *   videoSrc: "/videos/course-intro.mp4"
 * }} />
 * 
 * // PC 비디오 + 모바일 이미지
 * <CourseCardItem course={{
 *   ...courseData,
 *   thumbnailType: 'video-with-mobile-image',
 *   videoSrc: "/videos/course.mp4",
 *   imageSrc: "/images/course.jpg",
 *   mobileImageSrc: "/images/course-mobile.jpg"
 * }} />
 */

const CourseCardItem = ({ course, onCtaClick }) => {
  const period = formatPeriod(course.eventStartAt, course.eventEndAt);
  const { status, statusType } = getRecruitmentStatus(course.startAt, course.endAt);

  /**
   * CTA 버튼 클릭 핸들러
   */
  const handleCtaClick = (link) => {
    if (onCtaClick) {
      onCtaClick(link, course);
    } else if (link && link !== "여기에 링크를 입력하세요") {
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
      case 'lottie':
        // Lottie 애니메이션 표시
        return (
          <dotlottie-wc
            src={course.lottieSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            speed="1"
            autoplay
            loop
          />
        );
      
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
              e.target.src = '/assets/img-default.png';
            }}
          />
        );
    }
  };

  return (
    <div className="course-common">
      <div className="course-card">
        <Link href={course.link} className="course-link">
          <div className="course-thumb">
            <div className="course-status-badge">
              {statusType === 'open' ? (
                <Badge size="lg" color="primary" className="open-badge">
                  {status}
                </Badge>
              ) : statusType === 'close' ? (
                <Badge size="lg" color="contrast" className="close-badge">
                  {status}
                </Badge>
              ) : (
                <Badge size="lg" color="contrast" className="pre-open-badge">
                  {status}
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
                <span>교육 일정 ㅣ {period}</span>
              </Text>
            </div>
            <div className="badge-container">
              {course.tags && course.tags.map((tag, index) => (
                <Badge key={index} size="md" color="danger">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Link>
      </div>
      {course.showCtaButton && (
        <div className="course-action-container">
          <Button 
            size="lg" 
            color="primary" 
            block 
            onClick={() => handleCtaClick(course.ctaButtonLink)}
          >
            {course.ctaButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseCardItem;
