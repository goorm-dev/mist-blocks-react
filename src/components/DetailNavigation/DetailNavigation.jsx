'use client';

import { useState, useEffect, useRef } from 'react';
import { Text } from '@vapor-ui/core';
import './DetailNavigation.css';

// 기본 섹션들 정의
const navigationSections = [
  { id: 'introduce', label: '과정 소개' },
  { id: 'curriculum', label: '커리큘럼' },
  { id: 'career_support', label: '커리어 지원' },
  { id: 'process', label: '지원 과정' },
  { id: 'faq', label: '자주 묻는 질문' },
];

const scrollThreshold = 30; // 스크롤 변화량 임계값 30px로 설정

const DetailNavigation = ({ className = '' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // 사용자 선택 혹은 기본값으로 초기화
  const [activeSection, setActiveSection] = useState('introduce');
  // 스크롤 감지용 효과 처리
  const navigationRef = useRef(null);
  const navigationMenuRef = useRef(null);

  // IntersectionObserver 관련 리턴이 발생하는 경우 중복 업데이트 방지를 위한 플래그
  const isObserverUpdating = useRef(false);

  // IntersectionObserver를 사용하여 화면에 보이는 섹션 감지
  useEffect(() => {
    const sectionIds = navigationSections.map(section => section.id);

    const observer = new IntersectionObserver(
      entries => {
        if (isObserverUpdating.current) return;

        // 보이는 섹션들만 필터링
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // 가장 상단에 위치한 섹션을 Active로 설정
          const topSection = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];

          const sectionId = topSection.target.id;
          // 가장 먼저 관측된 요소가 navigationSections에 있는지 확인
          if (sectionIds.includes(sectionId) && sectionId !== activeSection) {
            isObserverUpdating.current = true;
            setActiveSection(sectionId);

            // 연속 업데이트 방지를 위해 지연 처리
            setTimeout(() => {
              isObserverUpdating.current = false;
            }, 100);
          }
        }
      },
      {
        rootMargin: '-15% 0px -75% 0px', // 상단 15%, 하단 75% 여백으로 감지 영역 조정
        threshold: 0.03, // 3% 노출되면 감지
      }
    );

    // 각 섹션 요소를 관찰 대상으로 등록
    sectionIds.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeSection]);

  useEffect(() => {
    // 스크롤 이벤트 핸들러 함수
    const handleScroll = () => {
      if (!navigationRef.current) return;

      // 현재 스크롤 위치
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

      // 네비게이션 요소가 맨 위에 도달했는지 확인
      const rect = navigationRef.current.getBoundingClientRect();
      const isAtTop = rect.top <= 0;

      // 1. Navigation 영역이 Top(최상단)에 있는 경우 고정
      if (isAtTop !== scrolled) {
        setScrolled(isAtTop);
      }

      // 2&3. 고정된 상태에서 스크롤 방향에 따라 표시/숨김 처리
      if (isAtTop && scrollDifference > scrollThreshold) {
        if (currentScrollY > lastScrollY.current) {
          // 아래로 스크롤 시 숨김
          setVisible(false);
        } else {
          // 위로 스크롤 시 표시
          setVisible(true);
        }

        // 현재 스크롤 위치 저장
        lastScrollY.current = currentScrollY;
      } else if (!isAtTop) {
        // 4. isAtTop이 아닐 경우 항상 보이게 설정
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 상태 확인
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, visible]);

  // 섹션 클릭 핸들러
  const handleSectionClick = sectionId => {
    // 기본 스크롤 동작
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // 네비게이션 바 높이만큼 오프셋
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={navigationRef}
      className={`detail-navigation-section ${scrolled ? 'scrolled' : ''} ${
        !visible ? '' : 'visible'
      } ${className}`.trim()}
    >
      <div className="container">
        <div ref={navigationMenuRef} className="navigation-menu">
          {navigationSections.map(section => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`navigation-item ${activeSection === section.id ? 'active' : ''}`}
            >
              <Text typography="heading6" className="text-inherit">
                {section.label}
              </Text>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailNavigation;
