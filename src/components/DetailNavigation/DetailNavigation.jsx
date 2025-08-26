import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { Text } from '@vapor-ui/core';
import { throttle, debounce, rafThrottle } from '../../utils/performanceUtils';
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
  const ticking = useRef(false); // rAF 최적화를 위한 플래그
  const scrollThreshold = 10; // 스크롤 변화량 임계값 증가
  
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
  
  // 스크롤 핸들러 최적화 - rafThrottle 사용
  const optimizedScrollHandler = useCallback((callback) => {
    return rafThrottle(callback, 100); // 100ms 간격으로 제한
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
    
    // 이전 상태와 비교하여 변화가 있을 때만 상태 업데이트
    const wasScrolled = scrolled;
    const newScrolled = isAtTop;
    
    // 최적화: 상태가 변경될 때만 업데이트
    if (wasScrolled !== newScrolled) {
      setScrolled(newScrolled);
    }
    
    // 스크롤 방향에 따라 표시/숨김 처리 (임계값 이상일 때만)
    if (scrollDifference > scrollThreshold) {
      if (isAtTop) {
        if (currentScrollY > lastScrollY.current + scrollThreshold) {
          setVisible(false); // 아래로 스크롤 시 숨김
        } else if (currentScrollY < lastScrollY.current - scrollThreshold) {
          setVisible(true); // 위로 스크롤 시 표시
        }
      } else if (!visible) {
        setVisible(true); // scrolled 상태가 아닐 때는 항상 표시
      }
      
      // 현재 스크롤 위치 저장
      lastScrollY.current = currentScrollY;
    }
  }, [scrolled, visible]);

  // 스크롤 이벤트 상태 디바운스 용도
  const debouncedUpdateScrollOnIdle = useMemo(
    () => debounce(updateScrollState, 150),
    [updateScrollState]
  );

  useEffect(() => {
    // 스크롤 중 범용적인 상태 업데이트는 rafThrottle 사용
    const handleScroll = optimizedScrollHandler(updateScrollState);
    // 스크롤 종료 후 디바운스된 상태 확인
    const handleScrollEnd = () => debouncedUpdateScrollOnIdle();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScrollEnd, { passive: true });
    
    // 초기 상태 확인
    updateScrollState();
    
    // 브라우저 탭 전환 시 상태 재설정을 위한 이벤트 리스너
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // 탭이 다시 활성화되었을 때 상태 재확인
        updateScrollState();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [optimizedScrollHandler, updateScrollState, debouncedUpdateScrollOnIdle]);
  
  // Intersection Observer 콜백 디바운싱을 위한 상태 변수
  const observerTimeout = useRef(null);
  const lastActiveSectionUpdate = useRef(0);
  const observerUpdateDelay = 100; // 업데이트 사이의 최소 지연시간(ms)
  
  // 섹션 변경 함수 - utils의 debounce 활용
  const debouncedSetActiveSection = useCallback(
    debounce((sectionId) => {
      setActiveSection(sectionId);
      lastActiveSectionUpdate.current = Date.now();
    }, observerUpdateDelay),
    []
  );

  // 섹션 변경 처리 함수
  const debounceSectionChange = useCallback((sectionId, sectionIds) => {
    const now = Date.now();
    // 마지막 업데이트 이후 일정 시간이 지났을 때만 업데이트 수행
    if (now - lastActiveSectionUpdate.current > observerUpdateDelay && sectionIds.includes(sectionId)) {
      setActiveSection(sectionId);
      lastActiveSectionUpdate.current = now;
    } else if (sectionIds.includes(sectionId)) {
      // 유틸리티의 debounce 함수 사용
      debouncedSetActiveSection(sectionId);
    }
  }, [debouncedSetActiveSection]);
  
  // Intersection Observer를 사용하여 화면에 보이는 섹션 감지
  useEffect(() => {
    const sectionIds = navigationSections.map(section => section.id);
    // 최근 클릭된 섹션 추적을 위한 변수
    let lastClickedTime = 0;
    let isUserScrolling = false;
    const clickCooldown = 1000; // 클릭 후 스크롤 감지 무시 시간 (ms)

    // 스크롤 이벤트 핸들러 - 사용자 스크롤 시작 감지
    const handleUserScroll = () => {
      const now = Date.now();
      // 클릭 후 일정 시간이 지난 뒤에만 스크롤 감지
      if (now - lastClickedTime > clickCooldown) {
        isUserScrolling = true;
      }
    };

    // 스크롤 이벤트 연결
    window.addEventListener('scroll', handleUserScroll, { passive: true });
    
    const observer = new IntersectionObserver(
      (entries) => {
        // 사용자가 클릭 상태에서 발생한 스크롤은 무시
        if (!isUserScrolling && Date.now() - lastClickedTime < clickCooldown) {
          return;
        }

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

    // 클릭 및 스크롤 상태 업데이트
    const updateClickState = (sectionId) => {
      lastClickedTime = Date.now();
      isUserScrolling = false;
    };

    // 클릭 이벤트 수신 함수
    const handleMenuClick = () => updateClickState();
    
    // 메뉴 클립 감지 이벤트 리스너 추가
    const menuElement = navigationMenuRef.current;
    if (menuElement) {
      menuElement.addEventListener('click', handleMenuClick);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleUserScroll);
      if (menuElement) {
        menuElement.removeEventListener('click', handleMenuClick);
      }
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
        // 클릭 상태에서는 다른 섹션으로의 자동 전환을 일정 시간 동안 방지
        const clickTime = Date.now();
        const lastClickedSection = sectionId;
        
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

  // 네비게이션 메뉴 스크롤 이벤트 처리 - throttle 적용
  const throttledCheckScrollable = useMemo(
    () => throttle(checkScrollable, 100),
    []
  );

  // 화면 리사이즈 이벤트 처리 - debounce 적용
  const debouncedCheckScrollable = useMemo(
    () => debounce(checkScrollable, 200),
    []
  );

  useEffect(() => {
    const menuElement = navigationMenuRef.current;
    if (menuElement) {
      // 초기 상태 확인
      checkScrollable();
      
      // 스크롤 이벤트는 throttle 적용
      menuElement.addEventListener('scroll', throttledCheckScrollable);
      // 리사이즈 이벤트는 debounce 적용
      window.addEventListener('resize', debouncedCheckScrollable);
      
      return () => {
        menuElement.removeEventListener('scroll', throttledCheckScrollable);
        window.removeEventListener('resize', debouncedCheckScrollable);
      };
    }
  }, [throttledCheckScrollable, debouncedCheckScrollable]);
  
  return (
    <section 
      ref={navigationRef}
      className={`detail-navigation-section ${scrolled ? 'scrolled' : ''} ${className}`.trim()}
      style={{
        transform: scrolled ? (visible ? 'translateY(0)' : 'translateY(-100%)') : 'translateY(0)',
        backfaceVisibility: 'hidden', // 렌더링 성능 향상
        willChange: scrolled ? 'transform' : 'auto' // 애니메이션이 발생할 때만 will-change 적용
      }}
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