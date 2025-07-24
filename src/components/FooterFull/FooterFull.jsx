import React, { useEffect } from 'react';
import { Text, Button } from '@vapor-ui/core';
import { DiscussionIcon, InstagramIcon, YoutubeIcon, BlogIcon, ArrowUpOutlineIcon } from '@vapor-ui/icons';
import './FooterFull.css';

const FooterFull = () => {
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
            <div className="footer-section footer-section-vertical">
              <Text typography="subtitle1" className="footer-title" foreground="hint">{'고객센터'}</Text>
              <Text typography="body1" className="footer-text" foreground="normal">{'고객센터 설명'}</Text>
              <a href="{{service1 link}}" className="footer-link-chat"><DiscussionIcon style={{ width: '20px', height: '20px', color: 'inherit' }} /><Text typography="heading6" foreground="inherit">{'서비스1'}</Text></a>
            </div>
            <div className="footer-section footer-section-vertical">
              <Text typography="subtitle1" className="footer-title" foreground="hint">{'운영시간'}</Text>
              <Text typography="body1" className="footer-text" foreground="normal">{'운영시간 설명'}</Text>
            </div>
          </div>
          <div className="footer-links-column">
            <div className="footer-links-wrapper">
              <div className="footer-links-block footer-section-vertical">
                <Text typography="subtitle1" className="footer-title" foreground="hint">{'서비스'}</Text>
                <ul className="footer-links">
                  <li><a href="{{service1 link}}" className="footer-link"><Text as="span" typography="heading6" foreground="inherit">{'서비스1'}</Text></a></li>
                  <li><a href="{{service2 link}}" className="footer-link"><Text as="span" typography="heading6" foreground="inherit">{'서비스2'}</Text></a></li>
                  <li><a href="{{service3 link}}" className="footer-link"><Text as="span" typography="heading6" foreground="inherit">{'서비스3'}</Text></a></li>
                </ul>
              </div>
              <div className="footer-links-block footer-section-vertical">
                <Text typography="subtitle1" className="footer-title" foreground="hint">{'외부링크'}</Text>
                <ul className="footer-links">
                  <li><a href="{{external1 link}}" className="footer-link" target="_blank"><Text as="span" typography="heading6" foreground="inherit">{'외부링크1'}</Text></a></li>
                  <li><a href="{{external2 link}}" className="footer-link" target="_blank"><Text as="span" typography="heading6" foreground="inherit">{'외부링크2'}</Text></a></li>
                  <li><a href="{{external3 link}}" className="footer-link" target="_blank"><Text as="span" typography="heading6" foreground="inherit">{'외부링크3'}</Text></a></li>
                </ul>
              </div>
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
            <Text as="p" typography="body2" foreground="normal">{'대표  류성태 ㅣ  개인정보보호책임자  곽경주 ㅣ  사업자 등록번호  124-87-39200'}</Text>
            <Text as="p" typography="body2" foreground="normal">{'주소  경기도 성남시 분당구 판교로 242 PDC A동 9층 ㅣ 전화  031-600-8586 ㅣ 이메일  contact@goorm.io'}</Text>
            <Text as="p" typography="body2" foreground="normal">{'ⓒ goorm Inc. All rights reserved.'}</Text>
          </div>
          {/* 소셜 미디어 아이콘 */}
          <div className="social-icons">
            <a href="{{instagram link}}" target="_blank" className="social-icon" aria-label="Instagram">
              {/* 인스타그램 아이콘 */}
              <InstagramIcon style={{ width: '20px', height: '20px', color: 'inherit' }} />
            </a>
            <a href="{{youtube link}}" target="_blank" className="social-icon" aria-label="YouTube">
              {/* 유튜브 아이콘 */}
              <YoutubeIcon style={{ width: '20px', height: '20px', color: 'inherit' }} />
            </a>
            <a href="{{blog link}}" target="_blank" className="social-icon" aria-label="Blog">
              {/* 블로그 아이콘 */}
              <BlogIcon style={{ width: '20px', height: '20px', color: 'inherit' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFull; 