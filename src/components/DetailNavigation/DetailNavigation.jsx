import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { Text } from '@vapor-ui/core';
import './DetailNavigation.css';

const DetailNavigationComponent = ({ 
  sections = [],
  activeSection: propActiveSection = 'introduce',
  onSectionClick,
  className = ""
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const scrollThreshold = 5; // 스크롤 변화량 임계값
  
  // 기본 섹션들 정의
  const defaultSections = [
    { id: 'introduce', label: '과정 소개' },
    { id: 'curriculum', label: '커리큘럼' },
    { id: 'career_support', label: '커리어 지원' },
    { id: 'benefit', label: '혜택' },
    { id: 'faq', label: '자주 묻는 질문' }
  ];

  // 섹션 배열 결정
  const navigationSections = sections.length > 0 ? sections : defaultSections;
  
  // 사용자 선택 혹은 기본값으로 초기화
  const initialActiveSection = propActiveSection || (navigationSections[0] ? navigationSections[0].id : 'introduce');
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  // 스크롤 감지용 효과 처리
  const navigationRef = useRef(null);
  
  // 디바운스된 스크롤 핸들러 함수
  const debounceScroll = useCallback((callback) => {
    return function() {
      if (scrollTimeout.current) {
        cancelAnimationFrame(scrollTimeout.current);
      }
      scrollTimeout.current = requestAnimationFrame(() => {
        callback();
      });
    };
  }, []);

  // 스크롤 상태 업데이트 함수
  const updateScrollState = useCallback(() => {
    if (!navigationRef.current) return;
    
    // 현재 스크롤 위치
    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
    
    // 네비게이션 요소가 맨 위에 도달했는지 확인
    const rect = navigationRef.current.getBoundingClientRect();
    const isAtTop = rect.top <= 0;
    
    // 임계값 이상 스크롤되었을 때만 상태 업데이트
    if (scrollDifference > scrollThreshold) {
      setScrolled(isAtTop);
      
      // scrolled 상태일 때만 스크롤 방향에 따라 표시/숨김 처리
      if (isAtTop) {
        if (currentScrollY > lastScrollY.current + scrollThreshold) {
          setVisible(false); // 아래로 스크롤 시 숨김
        } else if (currentScrollY < lastScrollY.current - scrollThreshold) {
          setVisible(true); // 위로 스크롤 시 표시
        }
      } else {
        setVisible(true); // scrolled 상태가 아닐 때는 항상 표시
      }
      
      // 현재 스크롤 위치 저장
      lastScrollY.current = currentScrollY;
    }
  }, []);

  useEffect(() => {
    const handleScroll = debounceScroll(updateScrollState);

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 초기 상태 확인
    updateScrollState();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        cancelAnimationFrame(scrollTimeout.current);
      }
    };
  }, [debounceScroll, updateScrollState]);
  
  // Intersection Observer 콜백 디바운싱을 위한 상태 변수
  const observerTimeout = useRef(null);
  const lastActiveSectionUpdate = useRef(0);
  const observerUpdateDelay = 100; // 업데이트 사이의 최소 지연시간(ms)
  
  // 섹션 변경 디바운스 함수
  const debounceSectionChange = useCallback((sectionId, sectionIds) => {
    const now = Date.now();
    // 마지막 업데이트 이후 일정 시간이 지났을 때만 업데이트 수행
    if (now - lastActiveSectionUpdate.current > observerUpdateDelay && sectionIds.includes(sectionId)) {
      setActiveSection(sectionId);
      lastActiveSectionUpdate.current = now;
    } else {
      // 디바운싱: 연속된 업데이트 요청 취소 및 새로운 요청 설정
      if (observerTimeout.current) {
        clearTimeout(observerTimeout.current);
      }
      observerTimeout.current = setTimeout(() => {
        if (sectionIds.includes(sectionId)) {
          setActiveSection(sectionId);
          lastActiveSectionUpdate.current = Date.now();
        }
      }, observerUpdateDelay);
    }
  }, []);
  
  // Intersection Observer를 사용하여 화면에 보이는 섹션 감지
  useEffect(() => {
    const sectionIds = navigationSections.map(section => section.id);
    
    const observer = new IntersectionObserver(
      (entries) => {
        // 보이는 섹션들만 필터링
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // 가장 상단에 위치한 섹션을 Active로 설정
          const topSection = visibleEntries
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          
          const sectionId = topSection.target.id;
          // 디바운스된 섹션 변경 함수 호출
          debounceSectionChange(sectionId, sectionIds);
        }
        // ID에 부합하는 요소가 없으면 현재 상태 유지 (아무것도 하지 않음)
      },
      {
        rootMargin: '-15% 0px -75% 0px', // 상단 15%, 하단 75% 여백으로 감지 영역 조정
        threshold: 0.05 // 5% 노출되면 감지
      }
    );

    // 각 섹션 요소를 관찰 대상으로 등록
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (observerTimeout.current) {
        clearTimeout(observerTimeout.current);
      }
    };
  }, [navigationSections, debounceSectionChange]);

  // props로 전달된 activeSection 변경 시 적용
  useEffect(() => {
    if (propActiveSection) {
      setActiveSection(propActiveSection);
    }
  }, [propActiveSection]);

  // 섹션 클릭 핸들러
  const handleSectionClick = (sectionId) => {
    // 클릭한 섹션을 활성화로 설정
    setActiveSection(sectionId);
    
    if (onSectionClick) {
      onSectionClick(sectionId);
    } else {
      // 기본 스크롤 동작
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 100; // 네비게이션 바 높이만큼 오프셋
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  // 네비게이션 메뉴 참조
  const navigationMenuRef = useRef(null);
  
  // 네비게이션 섹션 메모이제이션
  const memoizedSections = useMemo(() => navigationSections, [navigationSections]);
  
  // 스크롤 상태 감지
  const [, setScrollable] = useState({
    canScrollLeft: false,
    canScrollRight: false
  });

  // 스크롤 여부 확인
  const checkScrollable = () => {
    if (navigationMenuRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navigationMenuRef.current;
      setScrollable({
        canScrollLeft: scrollLeft > 0,
        canScrollRight: scrollLeft < scrollWidth - clientWidth - 1
      });
    }
  };

  // 스크롤 이벤트 처리
  useEffect(() => {
    const menuElement = navigationMenuRef.current;
    if (menuElement) {
      checkScrollable();
      menuElement.addEventListener('scroll', checkScrollable);
      window.addEventListener('resize', checkScrollable);
      
      return () => {
        menuElement.removeEventListener('scroll', checkScrollable);
        window.removeEventListener('resize', checkScrollable);
      };
    }
  }, []);
  
  return (
    <section 
      ref={navigationRef}
      className={`detail-navigation-section ${scrolled ? 'scrolled' : ''} ${className}`.trim()}
      style={scrolled ? { transform: visible ? 'translateY(0)' : 'translateY(-100%)' } : {}}
    >
      <div className="container">
        <div 
          ref={navigationMenuRef}
          className="navigation-menu"
          onScroll={checkScrollable}
        >
          {memoizedSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`navigation-item ${activeSection === section.id ? 'active' : ''}`}
            >
              <Text typography='heading6' className='text-inherit'>
                {section.label}
              </Text>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
const DetailNavigation = memo(DetailNavigationComponent);

export default DetailNavigation;