import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { Text } from '@vapor-ui/core';
import { YoutubeIcon, BlogIcon, ArrowUpOutlineIcon } from '@vapor-ui/icons';
import { debounce } from '../../utils/performanceUtils';
import './FooterFull.css';

import { COURSE_INFORMATION, COURSE_AREA_INFORMATION, COURSE_AREA_LIST } from '../../constants/CourseInformation';

const FooterCourseLink = ({ course }) => {
  const { keyword } = COURSE_INFORMATION[course];
  const hrefLink = `/${keyword}`;

  return (
      <li key={course}>
        <Link to={hrefLink} className="footer-link">
          <Text as="span" typography="heading6" foreground="inherit">{COURSE_INFORMATION[course].title}</Text>
        </Link>
      </li>
  )
}

const FooterCourseList = ({ area }) => {
 const { title, courses } = COURSE_AREA_INFORMATION[area];

 return (
  <div className="footer-links-block footer-section-vertical">
      <Text typography="subtitle1" className="footer-title" foreground="hint">{title}</Text>
      <ul className="footer-links">
        {courses.map((course) => (
          <FooterCourseLink key={course} course={course} />
        ))}
      </ul>
    </div>
  )
} 

const FooterFull = ({ logoUrl = "https://tech.ktcloud.com" }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // 테마 감지 함수
    const detectThemeOriginal = () => {
      // CSS 변수로 테마 확인
      const backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--vapor-color-background-normal');
      
      // 배경색이 어두우면 다크 테마로 판단
      const isDark = backgroundColor.includes('#') && 
        backgroundColor.trim() !== '#ffffff' && 
        backgroundColor.trim() !== '#FFFFFF';
      
      setIsDarkTheme(isDark);
    };
    
    // 디바운스된 테마 감지 함수
    const detectTheme = debounce(detectThemeOriginal, 200);

    // 초기 테마 감지
    detectThemeOriginal();

    // 테마 변경 감지를 위한 MutationObserver
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // 윈도우 리사이즈 시에도 테마 재감지 (디바운스 적용)
    window.addEventListener('resize', detectTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', detectTheme);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const topButton = document.getElementById('top-button');
      if (topButton) {
        const handleClick = (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        topButton.addEventListener('click', handleClick);
        return () => topButton.removeEventListener('click', handleClick);
      }
    }
  }, []);

  return (
    <footer className="content-section footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info-column">
            {/* 로고 섹션 */}
            <div className="footer-section footer-section-vertical">
              <div className="footer-logo">
                <a 
                  href={logoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-logo-link"
                  aria-label="KT Cloud Tech Up 홈페이지로 이동"
                >
                  <img 
                    src={isDarkTheme ? "https://statics.goorm.io/ktcloud-techup/logo/techup_dark.svg" : "https://statics.goorm.io/ktcloud-techup/logo/techup_light.svg"}
                    alt="KT Cloud Tech Up"
                    className="footer-logo-img"
                  />
                </a>
              </div>
              <div className="social-icons">
                <a href="https://www.youtube.com/@ktcloud" target="_blank" className="social-icon" aria-label="YouTube">
                  <YoutubeIcon style={{ width: '24px', height: '24px', color: 'inherit' }} />
                </a>
                <a href="https://tech.ktcloud.com" target="_blank" className="social-icon" aria-label="Blog">
                  <BlogIcon style={{ width: '24px', height: '24px', color: 'inherit' }} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-links-column">
            <div className="footer-links-wrapper">
              {COURSE_AREA_LIST.map((area) => <FooterCourseList key={area} area={area} />)}
            </div>
          </div>
          <div className="footer-top-button">
            <a id="top-button" className="footer-link" aria-label="페이지 상단으로 이동">
              <Text as="span" typography="heading6" foreground="inherit">{'TOP'}</Text>
              <ArrowUpOutlineIcon style={{ width: '24px', height: '24px', color: 'inherit' }} />
            </a>
          </div>
        </div>
        <div className="footer-bottom-content">
          <div className="footer-info-text">
            <div className="footer-info-group">
              <Link to={'https://vivid-thyme-ac6.notion.site/kt-cloud-TECH-UP-2479e3e335cc80dbb7fae14d3c6040d4'} className="footer-link" target="_blank" rel="noopener noreferrer">
                <Text as="span" typography="subtitle1" foreground="secondary">{'개인정보처리방침'}</Text>
              </Link>
              <Text as="p" typography="subtitle1" foreground="secondary">{'고객센터 ㅣ 평일 10:30 - 17:00 (휴게 시간 12:00 - 13:30, 주말 및 공휴일 휴무)'}</Text>
            </div>
            <div className="footer-info-text-copyright">
              <Text as="p" typography="body2" foreground="hint">{'TECH UP은 kt cloud가 만든 디지털 실무 인재 육성 프로그램 입니다.'}</Text>
              <Text as="p" typography="body2" foreground="hint">{'Copyright© 2025 kt cloud corp. All rights reserved.'}</Text>
            </div>
          </div>
          {/* KT Cloud 로고 */}
          <div className="footer-ktcloud-logo">
            <a href="https://www.ktcloud.com" target="_blank" className="footer-ktcloud-logo-link" aria-label="kt cloud 홈페이지 이동">
              <img 
                src={isDarkTheme ? "https://statics.goorm.io/ktcloud-techup/logo/ktcloud_dark.svg" : "https://statics.goorm.io/ktcloud-techup/logo/ktcloud_light.svg"}
                alt="kt cloud"
                style={{ height: 'var(--vapor-size-space-300)', width: 'auto' }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default FooterFull; 