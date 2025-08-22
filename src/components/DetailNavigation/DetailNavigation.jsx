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
  
  // 기본 섹션들 정의
  const defaultSections = [
    { id: 'introduce', label: '과정 소개' },
    { id: 'curriculum', label: '커리큘럼' },
    { id: 'carrier_support', label: '커리어 지원' },
    { id: 'benefit', label: '혜택' },
    { id: 'faq', label: '자주 묻는 질문' }
  ];

  // 섹션 배열 결정
  const navigationSections = sections.length > 0 ? sections : defaultSections;
  
  // 스크롤 및 클릭 관련 상태
  const [isUserScrolling, setIsUserScrolling] = useState(false); // 사용자가 스크롤하는지 표시
  const [isClickNavigation, setIsClickNavigation] = useState(false); // 클릭에 의한 네비게이션인지 표시
  const scrollTimeout = useRef(null);
  const clickTimeout = useRef(null); // 클릭 타임아웃 추적용
  
  // 사용자 선택 혹은 기본값으로 초기화
  const initialActiveSection = propActiveSection || (navigationSections[0] ? navigationSections[0].id : 'introduce');
  const [activeSection, setActiveSection] = useState(initialActiveSection);

  console.log(activeSection);

  // 스크롤 감지용 효과 처리
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 사용자 스크롤 감지
  useEffect(() => {
    const handleUserScroll = () => {
      // 네비게이션 클릭 이후 스크롤 중이면 무시
      if (isClickNavigation) return;
      
      setIsUserScrolling(true);
      
      // 이전 타이머 취소
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // 0.2초 후 스크롤 종료 확인
      scrollTimeout.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 200);
    };
    
    window.addEventListener('scroll', handleUserScroll);
    
    return () => {
      window.removeEventListener('scroll', handleUserScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    };
  }, [isClickNavigation]);

  // Intersection Observer를 사용하여 화면에 보이는 섹션 감지
  useEffect(() => {
    const sectionIds = navigationSections.map(section => section.id);
    
    const observer = new IntersectionObserver(
      (entries) => {
        // 클릭 후 스크롤 중에는 Intersection Observer가 작동하지 않도록
        if (isClickNavigation) return;
        
        // 현재 관찰되는 모든 섹션들의 ID
        const currentEntryIds = entries.map(entry => entry.target.id);
        
        // 현재 액티브 섹션이 관찰 섹션에 포함되어 있는지 확인
        const activeIsObserved = currentEntryIds.includes(activeSection);
        
        // 보이는 섹션들만 필터링
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        // 보이는 섹션이 있을 경우
        if (visibleEntries.length > 0) {
          // 가장 먼저 나타나는 섹션 (상단에 가까운 섹션)
          const topVisibleSection = visibleEntries
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          
          const sectionId = topVisibleSection.target.id;
          if (sectionIds.includes(sectionId)) {
            setActiveSection(sectionId);
          }
        } else if (activeIsObserved && entries.length > 0) {
          // 현재 보이는 섹션이 없고 액티브 섹션이 관찰 대상일 경우 리셋
          setActiveSection(initialActiveSection);
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

    return () => observer.disconnect();
  }, [navigationSections, isClickNavigation]);

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
    
    // 클릭 후 스크롤 중임을 표시
    setIsClickNavigation(true);
    
    // 이전 타이머가 있으면 취소
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }
    
    // 1초 후에 다시 스크롤 감지 활성화
    clickTimeout.current = setTimeout(() => {
      setIsClickNavigation(false);
    }, 1000);
    
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

  return (
    <section className={`detail-navigation-section ${scrolled ? 'scrolled' : ''} ${className}`.trim()}>
      <div className="container">
        <div className="detail-navigation-wrap">
          <nav className="navigation-inner">
            <div className="navigation-menu">
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
          </nav>
        </div>
      </div>
    </section>
  );
};

export default DetailNavigation;