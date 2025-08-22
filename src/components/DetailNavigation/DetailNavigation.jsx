import { useState, useEffect } from 'react';
import { Text } from '@vapor-ui/core';
import './DetailNavigation.css';

const DetailNavigation = ({ 
  sections = [],
  activeSection: propActiveSection = '',
  onSectionClick,
  className = ""
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(propActiveSection);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 기본 섹션들 (props로 전달되지 않은 경우)
  const defaultSections = [
    { id: 'introduce', label: '과정 소개' },
    { id: 'curriculum', label: '커리큘럼' },
    { id: 'carrier_support', label: '커리어 지원' },
    { id: 'benefit', label: '혜택' },
    { id: 'faq', label: '자주 묻는 질문' }
  ];

  const navigationSections = sections.length > 0 ? sections : defaultSections;

  console.log('Navigation Sections:', activeSection);

  // Intersection Observer를 사용하여 뷰포트에 노출된 섹션 감지
  useEffect(() => {
    const sectionIds = navigationSections.map(section => section.id);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionIds.includes(sectionId)) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px', // 상단 20%, 하단 40% 여백으로 감지 영역 조정
        threshold: 0.1 // 10% 노출되면 감지
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
    };
  }, [navigationSections]);

  // propActiveSection이 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setActiveSection(propActiveSection);
  }, [propActiveSection]);

  // 섹션 클릭 핸들러
  const handleSectionClick = (sectionId) => {
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
            
            {/* <div className="navigation-actions">
              <Button 
                variant="primary" 
                size="small" 
                className="navigation-cta"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                맨 위로
              </Button>
            </div> */}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default DetailNavigation;