import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { Text, Button } from '@vapor-ui/core';
import { DiscussionIcon, InstagramIcon, YoutubeIcon, BlogIcon, ArrowUpOutlineIcon } from '@vapor-ui/icons';
import './FooterFull.css';

import { COURSE_INFORMATION, COURSE_AREA_INFORMATION, COURSE_AREA_LIST } from '../../constants/CourseInformation';

const FooterCourseLink = ({ course }) => {
  const { keyword } = COURSE_INFORMATION[course];
  const hrefLink = `/detail/${keyword}`;

  return (
      <li key={course}>
        <a href={hrefLink} className="footer-link">
          <Text as="span" typography="heading6" foreground="inherit">{`kt cloud ${COURSE_INFORMATION[course].title}`}</Text>
        </a>
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
    const detectTheme = () => {
      // CSS 변수로 테마 확인
      const backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--vapor-color-background-normal');
      
      // 배경색이 어두우면 다크 테마로 판단
      const isDark = backgroundColor.includes('#') && 
        backgroundColor.trim() !== '#ffffff' && 
        backgroundColor.trim() !== '#FFFFFF';
      
      setIsDarkTheme(isDark);
    };

    // 초기 테마 감지
    detectTheme();

    // 테마 변경 감지를 위한 MutationObserver
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // 윈도우 리사이즈 시에도 테마 재감지
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
                    src={isDarkTheme ? "/src/assets/logo_ktc_dark.svg" : "/src/assets/logo_ktc_light.svg"}
                    alt="KT Cloud Tech Up"
                    className="footer-logo-img"
                  />
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
            <Text as="p" typography="body2" foreground="normal">{'고객센터 ㅣ 평일 10:30 - 17:00 (휴게 시간 12:00 - 13:30, 주말 및 공휴일 휴무)'}</Text>
            <div className="footer-info-text-copyright">
              <Text as="p" typography="body2" foreground="hint">{'TECH UP은 kt cloud가 만든 차세대 인재 양성을 위한 기술 교육 전문 브랜드입니다.'}</Text>
              <Text as="p" typography="body2" foreground="hint">{'Copyright© 2025 kt cloud corp. All rights reserved.'}</Text>
            </div>
          </div>
          {/* 소셜 미디어 아이콘 */}
          <div className="social-icons">
            {/* <a href="{{instagram link}}" target="_blank" className="social-icon" aria-label="Instagram">
              <InstagramIcon style={{ width: '20px', height: '20px', color: 'inherit' }} />
            </a> */}
            <a href="https://www.youtube.com/@ktcloud" target="_blank" className="social-icon" aria-label="YouTube">
              <YoutubeIcon style={{ width: '20px', height: '20px', color: 'inherit' }} />
            </a>
            <a href="https://tech.ktcloud.com" target="_blank" className="social-icon" aria-label="Blog">
              <BlogIcon style={{ width: '20px', height: '20px', color: 'inherit' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default FooterFull; 