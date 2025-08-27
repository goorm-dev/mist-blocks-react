'use client';

import { useState, useRef, useEffect } from 'react';
import './CourseSectionNew.css';
import { Text, IconButton } from '@vapor-ui/core';
import { ChevronLeftOutlineIcon, ChevronRightOutlineIcon } from '@vapor-ui/icons';
import { debounce } from '../../utils/performanceUtils';
import CourseCardItem from '../CourseCard/CourseCardItem';
import { COURSE_TRACK_LIST } from './CourseSectionNew.constant';

/**
 * CourseSectionNew 컴포넌트
 *
 * 3개의 과정 카테고리별로 구분된 코스 섹션을 표시하는 컴포넌트입니다.
 * - 웹 개발 트랙
 * - 테크 인프라 / 혁신 기술 트랙 (슬라이더 기능 포함)
 * - 프로덕트 운영 / 디자인 트랙
 *
 * CourseCardItem 컴포넌트를 사용하여 개별 카드를 렌더링합니다:
 * - Lottie 애니메이션 썸네일
 * - 비디오 썸네일 (PC/모바일 분기 지원)
 * - 이미지 썸네일
 * - CTA 버튼 기능
 * - 상태별 배지 (모집 중, 모집 마감 등)
 * - 반응형 슬라이더
 * - 커스텀 CTA 클릭 핸들러
 *
 * @example
 * // 기본 사용
 * <CourseSectionNew />
 *
 * @example
 * // 커스텀 CTA 클릭 핸들러 사용
 * <CourseSectionNew
 *   onCtaClick={(link, course) => {
 *     console.log('CTA clicked:', link, course);
 *     // 커스텀 로직 (analytics, modal 등)
 *     window.open(link, '_blank');
 *   }}
 * />
 *
 * @example
 * // 커스텀 데이터로 사용
 * <CourseSectionNew
 *   title="맞춤형 테크 프로그램"
 *   onCtaClick={(link, course) => handleCustomCta(link, course)}
 *   trackCategories={[
 *     {
 *       id: 'web-dev',
 *       title: '웹 개발 트랙',
 *       description: '프론트부터 백엔드까지 웹 개발 전반 교육',
 *       hasSlider: false,
 *       courses: [
 *         {
 *           id: 1,
 *           name: "React 풀스택 개발",
 *           period: "2024.03.15 (월) - 2024.06.15 (목)",
 *           status: "모집 중",
 *           statusType: "open",
 *           tags: ["React", "Node.js", "JavaScript"],
 *           thumbnailType: 'video-with-mobile-image',
 *           videoSrc: "/videos/react-course.mp4",
 *           imageSrc: "/images/react-course.jpg",
 *           mobileImageSrc: "/images/react-mobile.jpg",
 *           ctaButtonLabel: "신청하기",
 *           ctaButtonLink: "https://apply.com/react",
 *           link: "/courses/react-fullstack",
 *           showCtaButton: true
 *         }
 *       ]
 *     }
 *   ]}
 * />
 *
 * @example
 * // 썸네일 타입별 사용 예시
 *
 * // 1. Lottie 애니메이션 썸네일
 * {
 *   thumbnailType: 'lottie',
 *   lottieSrc: "https://lottie.host/animation.lottie",
 *   imageSrc: "/images/fallback.jpg" // Lottie 로드 실패 시 대체 이미지
 * }
 *
 * // 2. 비디오 썸네일 (PC/모바일 모두)
 * {
 *   thumbnailType: 'video',
 *   videoSrc: "/videos/course-intro.mp4",
 *   imageSrc: "/images/video-poster.jpg" // 비디오 포스터
 * }
 *
 * // 3. PC 비디오 + 모바일 이미지
 * {
 *   thumbnailType: 'video-with-mobile-image',
 *   videoSrc: "/videos/course-intro.mp4",
 *   imageSrc: "/images/course-desktop.jpg",
 *   mobileImageSrc: "/images/course-mobile.jpg"
 * }
 *
 * // 4. 이미지만 사용
 * {
 *   thumbnailType: 'image',
 *   imageSrc: "/images/course-thumbnail.jpg"
 * }
 *
 * @example
 * // CTA 버튼 옵션 예시
 *
 * // CTA 버튼 표시
 * {
 *   showCtaButton: true,
 *   ctaButtonLabel: "지금 신청하기",
 *   ctaButtonLink: "https://register.example.com"
 * }
 *
 * // CTA 버튼 숨김 (기본값)
 * {
 *   showCtaButton: false
 * }
 *
 * @example
 * // 상태 배지 타입 예시
 *
 * // 모집 중 (파란색 배지)
 * {
 *   status: "모집 중",
 *   statusType: "open"
 * }
 *
 * // 모집 마감 (회색 배지)
 * {
 *   status: "모집 마감",
 *   statusType: "close"
 * }
 *
 * // 기본 컬러 타입들
 * {
 *   status: "준비 중",
 *   statusType: "primary"    // 파란색
 * }
 * {
 *   status: "모집 예정",
 *   statusType: "contrast"   // 회색
 * }
 * {
 *   status: "마감 임박",
 *   statusType: "warning"    // 주황색
 * }
 *
 * @example
 * // 슬라이더가 있는 트랙 예시
 * {
 *   id: 'tech-infra',
 *   title: '테크 인프라 / 혁신 기술 트랙',
 *   description: '클라우드부터 AI까지 인프라 기술 교육',
 *   hasSlider: true, // 슬라이더 활성화
 *   courses: [
 *     // 4개 이상의 과정 (한 화면에 3개씩 표시, 슬라이더로 이동)
 *     { ... }, { ... }, { ... }, { ... }
 *   ]
 * }
 *
 * @example
 * // 반응형 동작
 * // - 데스크톱 (1201px+): 3개 카드씩 표시
 * // - 태블릿 (769px~1200px): 2개 카드씩 표시
 * // - 모바일 (768px 이하): 1개 카드씩 표시
 * // - 슬라이더는 카드 1개씩 이동
 * // - 더 이상 이동할 수 없으면 버튼 자동 비활성화
 */

const CourseSectionNew = ({ title = '개발부터 제품 운영까지,\n테크업 프로그램', onCtaClick }) => {
  const [currentSlides, setCurrentSlides] = useState({}); // 각 트랙별 현재 슬라이드 인덱스
  const sliderRefs = useRef({}); // 슬라이더 참조

  /**
   * 화면 크기 변경 시 슬라이더 위치 재조정 (디바운스 적용)
   */
  useEffect(() => {
    // 원본 리사이즈 처리 함수
    const handleResizeOriginal = () => {
      // 1200px 이하에서는 슬라이더를 리셋하고 그리드로 표시
      if (typeof window !== 'undefined' && window.innerWidth <= 1200) {
        Object.keys(sliderRefs.current).forEach(trackId => {
          const slider = sliderRefs.current[trackId];
          if (slider) {
            slider.style.transform = 'translateX(0%)';
          }
        });
        setCurrentSlides({});
        return;
      }

      // 1200px 이상에서만 슬라이더 로직 적용
      setCurrentSlides(prev => {
        const newSlides = { ...prev };
        Object.keys(sliderRefs.current).forEach(trackId => {
          const track = COURSE_TRACK_LIST.find(t => t.id === trackId);
          if (track && track.hasSlider) {
            const totalCourses = track.courses.length;
            const coursesPerView = getCoursesPerView();
            const maxSlide = Math.max(0, totalCourses - coursesPerView);
            const currentSlide = prev[trackId] || 0;

            // 현재 슬라이드가 새로운 최대값을 넘으면 조정
            const adjustedSlide = Math.min(currentSlide, maxSlide);
            newSlides[trackId] = adjustedSlide;

            // 슬라이더 위치 업데이트
            const slider = sliderRefs.current[trackId];
            if (slider) {
              // 1200px 이상에서는 364px 고정 너비로 픽셀 단위 계산
              if (typeof window !== 'undefined' && window.innerWidth > 1200) {
                const cardWidth = 364; // 고정 카드 너비
                const gap = 24; // 실제 적용되는 gap 값으로 수정

                // 간단한 카드 단위 이동: 한 카드씩 정확히 이동 (364 + 24 = 388px)
                const moveDistance = (cardWidth + gap) * adjustedSlide;
                slider.style.transform = `translateX(-${moveDistance}px)`;
              } else {
                const moveRatio = (100 / totalCourses) * adjustedSlide;
                const translateX = -moveRatio;
                slider.style.transform = `translateX(${translateX}%)`;
              }
            }
          }
        });
        return newSlides;
      });
    };

    // 디바운스 적용된 리사이즈 핸들러 (250ms 지연)
    const handleResize = debounce(handleResizeOriginal, 250);

    window.addEventListener('resize', handleResize);

    // 초기 로드 시 1번 실행
    handleResizeOriginal();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * 반응형 화면 크기에 따른 보이는 카드 수 계산
   */
  const getCoursesPerView = () => {
    if (typeof window === 'undefined') return 3; // Default for server-side rendering
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;

    // 1200px 이상에서는 364px 고정 카드 기준으로 계산
    // container max-width: 1172px (App.css 참조)
    const containerWidth = Math.min(window.innerWidth - 32, 1172); // 32px = padding-left + padding-right
    const cardWidth = 364;
    const gap = 24; // 실제 적용되는 gap 값

    // 카드와 gap을 고려한 실제 들어갈 수 있는 카드 수 계산
    const availableWidth = containerWidth;
    const cardWithGap = cardWidth + gap;
    const maxCards = Math.floor((availableWidth + gap) / cardWithGap);

    return Math.max(1, Math.min(maxCards, 3)); // 최소 1개, 최대 3개
  };

  /**
   * 슬라이더 이동 함수
   */
  const moveSlider = (trackId, direction) => {
    const track = COURSE_TRACK_LIST.find(t => t.id === trackId);
    if (!track || !track.hasSlider) return;

    const totalCourses = track.courses.length;
    const coursesPerView = getCoursesPerView(); // 반응형 카드 수
    const maxSlide = Math.max(0, totalCourses - coursesPerView); // 최대 슬라이드 위치
    const currentSlide = currentSlides[trackId] || 0;

    let newSlide;
    if (direction === 'prev') {
      newSlide = Math.max(0, currentSlide - 1); // 0보다 작아지지 않도록
    } else {
      newSlide = Math.min(maxSlide, currentSlide + 1); // 최대값을 넘지 않도록
    }

    // 현재 슬라이드와 같으면 이동하지 않음
    if (newSlide === currentSlide) return;

    setCurrentSlides(prev => ({
      ...prev,
      [trackId]: newSlide,
    }));

    // 슬라이더 이동 애니메이션 (카드 한 개씩 이동)
    const slider = sliderRefs.current[trackId];
    if (slider) {
      // 1200px 이상에서는 364px 고정 너비로 픽셀 단위 계산
      if (typeof window !== 'undefined' && window.innerWidth > 1200) {
        const cardWidth = 364; // 고정 카드 너비
        const gap = 24; // 실제 적용되는 gap 값으로 수정

        // 간단한 카드 단위 이동: 한 카드씩 정확히 이동 (364 + 24 = 388px)
        const moveDistance = (cardWidth + gap) * newSlide;
        slider.style.transform = `translateX(-${moveDistance}px)`;
      } else {
        // 1200px 이하에서는 백분율 계산 (그리드 모드에서는 사용되지 않음)
        const totalCards = track.courses.length;
        const moveRatio = (100 / totalCards) * newSlide;
        const translateX = -moveRatio;
        slider.style.transform = `translateX(${translateX}%)`;
      }
    }
  };

  /**
   * 코스 카드 렌더링 함수
   */
  const renderCourseCard = course => {
    return <CourseCardItem key={course.id} course={course} onCtaClick={onCtaClick} />;
  };

  /**
   * 버튼 disabled 상태 확인 함수
   */
  const isButtonDisabled = (trackId, direction) => {
    const track = COURSE_TRACK_LIST.find(t => t.id === trackId);
    if (!track || !track.hasSlider) return true;

    const totalCourses = track.courses.length;
    const coursesPerView = getCoursesPerView();
    const maxSlide = Math.max(0, totalCourses - coursesPerView);
    const currentSlide = currentSlides[trackId] || 0;

    if (direction === 'prev') {
      return currentSlide === 0;
    } else {
      return currentSlide >= maxSlide;
    }
  };

  /**
   * 화면 크기가 1200px 이하인지 확인
   */
  const isMobile = () => {
    return typeof window !== 'undefined' && window.innerWidth <= 1200;
  };

  /**
   * 트랙 카테고리 렌더링 함수
   */
  const renderTrackCategory = track => {
    const showSlider = track.hasSlider && !isMobile();

    return (
      <div key={track.id} className="track-category">
        <div className="track-header">
          <div className="track-text">
            <Text typography="heading3" foreground="normal" className="track-title">
              {track.title}
            </Text>
            <Text typography="heading6" foreground="hint-darker" className="track-description">
              {track.description}
            </Text>
          </div>
          {showSlider && (
            <div className="course-control">
              <IconButton
                size="md"
                color="secondary"
                onClick={() => moveSlider(track.id, 'prev')}
                disabled={isButtonDisabled(track.id, 'prev')}
              >
                <ChevronLeftOutlineIcon />
              </IconButton>
              <IconButton
                size="md"
                color="secondary"
                onClick={() => moveSlider(track.id, 'next')}
                disabled={isButtonDisabled(track.id, 'next')}
              >
                <ChevronRightOutlineIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div className="course-container">
          {showSlider ? (
            <div className="slider-wrapper">
              <div
                className="slider-track-individual"
                ref={ref => (sliderRefs.current[track.id] = ref)}
              >
                {track.courses.map(course => renderCourseCard(course))}
              </div>
            </div>
          ) : (
            <div className="courses-grid">
              {track.courses.map(course => renderCourseCard(course))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="content-section course-section-new">
      <div className="container">
        <Text typography="heading2" className="title">
          {title}
        </Text>
        <div className="track-group">
          {COURSE_TRACK_LIST.map(track => renderTrackCategory(track))}
        </div>
      </div>
    </section>
  );
};

export default CourseSectionNew;
