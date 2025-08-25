import { useState, useEffect, useRef } from 'react';
import { Text } from '@vapor-ui/core';
import './DetailNavigation.css';

const DetailNavigation = ({ 
  sections = [],
  activeSection: propActiveSection = 'introduce',
  onSectionClick,
  className = ""
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (navigationRef.current) {
        // 현재 스크롤 위치
        const currentScrollY = window.scrollY;
        
        // 네비게이션 요소가 맨 위에 도달했는지 확인
        const rect = navigationRef.current.getBoundingClientRect();
        const isAtTop = rect.top <= 0;
        setScrolled(isAtTop);

        
        // scrolled 상태일 때만 스크롤 방향에 따라 표시/숨김 처리
        if (isAtTop) {
          if (currentScrollY > lastScrollY.current) {
            setVisible(false); // 아래로 스크롤 시 숨김
          } else {
            setVisible(true); // 위로 스크롤 시 표시
          }
        } else {
          setVisible(true); // scrolled 상태가 아닐 때는 항상 표시
        }
        
        // 현재 스크롤 위치 저장
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 초기 상태 확인
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
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
          if (sectionIds.includes(sectionId)) {
            setActiveSection(sectionId);
          }
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

    return () => observer.disconnect();
  }, [navigationSections]);

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
      style={scrolled ? { transform: visible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease' } : {}}
    >
      <div className="container">
        <div 
          ref={navigationMenuRef}
          className="navigation-menu"
          onScroll={checkScrollable}
        >
          {navigationSections.map((section) => (
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

export default DetailNavigation;