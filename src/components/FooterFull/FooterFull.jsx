import React, { useEffect } from 'react';
import { Text, Button } from '@vapor-ui/core';
import { DiscussionIcon } from '@vapor-ui/icons';
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
              <Text typography="subtitle1" className="footer-title">{'고객센터'}</Text>
              <Text typography="body1" className="footer-text">{'고객센터 설명'}</Text>
              <a href="{{customer center link}}" target="_blank" className="text-button text-button-lg text-button-primary btn-text-button">
                {/* 아이콘 */}
                <DiscussionIcon style={{ width: '20px', height: '20px', color: 'var(--vapor-color-foreground-normal)' }} />
                <Text as="span" typography="button1">{'채팅 상담 바로가기'}</Text>
              </a>
            </div>
            <div className="footer-section footer-section-vertical">
              <Text typography="subtitle1" className="footer-title">{'운영시간'}</Text>
              <Text typography="body1" className="footer-text">{'운영시간 설명'}</Text>
            </div>
          </div>
          <div className="footer-links-column">
            <div className="footer-links-wrapper">
              <div className="footer-links-block footer-section-vertical">
                <Text typography="subtitle1" className="footer-title">{'서비스'}</Text>
                <ul className="footer-links">
                  <li><a href="{{service1 link}}" className="footer-link text-button text-button-lg text-button-secondary"><Text as="span" typography="button2">{'서비스1'}</Text></a></li>
                  <li><a href="{{service2 link}}" className="footer-link text-button text-button-lg text-button-secondary"><Text as="span" typography="button2">{'서비스2'}</Text></a></li>
                  <li><a href="{{service3 link}}" className="footer-link text-button text-button-lg text-button-secondary"><Text as="span" typography="button2">{'서비스3'}</Text></a></li>
                </ul>
              </div>
              <div className="footer-links-block footer-section-vertical">
                <Text typography="subtitle1" className="footer-title">{'외부링크'}</Text>
                <ul className="footer-links">
                  <li><a href="{{external1 link}}" target="_blank" className="footer-link text-button text-button-lg text-button-secondary"><Text as="span" typography="button2">{'외부링크1'}</Text></a></li>
                  <li><a href="{{external2 link}}" target="_blank" className="footer-link text-button text-button-lg text-button-secondary"><Text as="span" typography="button2">{'외부링크2'}</Text></a></li>
                  <li><a href="{{external3 link}}" target="_blank" className="footer-link text-button text-button-lg text-button-secondary"><Text as="span" typography="button2">{'외부링크3'}</Text></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-top-button">
            <button id="top-button" className="text-button text-button-lg text-button-secondary" aria-label="페이지 상단으로 이동">
              <Text as="span" typography="button2">{'TOP'}</Text>
              <svg className="top-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9961 3.375C11.8838 3.375 11.7784 3.3945 11.6801 3.43351C11.5818 3.47252 11.4937 3.53104 11.4156 3.60906L6.43008 8.59462C6.25843 8.76627 6.17261 8.96522 6.17261 9.19148C6.17261 9.41774 6.25843 9.6167 6.43008 9.78835C6.60172 9.95999 6.79678 10.0497 7.01524 10.0575C7.2337 10.0653 7.42672 9.98496 7.59431 9.81643L11.1582 6.25398V20.1574C11.1582 20.3961 11.2385 20.5962 11.399 20.7577C11.5596 20.9192 11.7585 21 11.9959 21C12.2332 21 12.4338 20.9192 12.5977 20.7577C12.7615 20.5962 12.8434 20.3961 12.8434 20.1574V6.25398L16.4012 9.81175C16.5677 9.9834 16.7653 10.0692 16.9941 10.0692C17.223 10.0692 17.427 9.9834 17.6062 9.81175C17.7703 9.6401 17.8524 9.44115 17.8524 9.21489C17.8524 8.98863 17.7666 8.78967 17.5949 8.61803L12.586 3.60906C12.5017 3.53104 12.4104 3.47252 12.3121 3.43351C12.2138 3.3945 12.1085 3.375 11.9961 3.375Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
        <div className="footer-bottom-content">
          <div className="footer-info-text">
            <Text as="p" typography="body2" className="company-info paragraph">{'회사 정보'}</Text>
            <Text as="p" typography="caption1" className="copyright paragraph">{'저작권 정보'}</Text>
          </div>
          {/* 소셜 미디어 아이콘 */}
          <div className="social-icons">
            <a href="{{instagram link}}" target="_blank" className="social-icon" aria-label="Instagram">
              {/* 인스타그램 아이콘 */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.9995 2.82694C12.3359 2.82694 12.6123 2.83597 13.5351 2.87799C14.3881 2.91689 14.8515 3.05929 15.1599 3.17911C15.5683 3.33784 15.8597 3.52747 16.166 3.83345C16.4724 4.13978 16.662 4.43118 16.8204 4.83962C16.9402 5.14803 17.0826 5.61134 17.1215 6.46434C17.1635 7.38681 17.1725 7.66361 17.1725 9.99999C17.1725 12.3364 17.1635 12.6128 17.1215 13.5356C17.0826 14.3886 16.9402 14.8519 16.8204 15.1604C16.6616 15.5688 16.472 15.8602 16.166 16.1665C15.8597 16.4728 15.5683 16.6625 15.1599 16.8209C14.8515 16.9407 14.3881 17.0831 13.5351 17.122C12.6127 17.164 12.3359 17.173 9.9995 17.173C7.66313 17.173 7.38632 17.164 6.46386 17.122C5.61086 17.0831 5.14754 16.9407 4.83913 16.8209C4.43069 16.6621 4.13929 16.4725 3.83296 16.1665C3.52663 15.8602 3.337 15.5688 3.17863 15.1604C3.0588 14.8519 2.91641 14.3886 2.87751 13.5356C2.83548 12.6132 2.82645 12.3364 2.82645 9.99999C2.82645 7.66361 2.83548 7.38715 2.87751 6.46434C2.91641 5.61134 3.0588 5.14803 3.17863 4.83962C3.33735 4.43118 3.52698 4.13978 3.83296 3.83345C4.13929 3.52712 4.43069 3.33749 4.83913 3.17911C5.14754 3.05929 5.61086 2.91689 6.46386 2.87799C7.38666 2.83597 7.66313 2.82694 9.9995 2.82694ZM9.9995 1.25049C7.62318 1.25049 7.32519 1.26056 6.39196 1.30328C5.46082 1.34565 4.82489 1.49361 4.26815 1.70998C3.69265 1.93365 3.20467 2.23269 2.71844 2.71927C2.2322 3.20551 1.93282 3.69348 1.70949 4.26863C1.49312 4.82538 1.34516 5.46131 1.30279 6.39245C1.26007 7.32568 1.25 7.62367 1.25 9.99999C1.25 12.3763 1.26007 12.6743 1.30279 13.6075C1.34516 14.5387 1.49312 15.1746 1.70949 15.7313C1.93316 16.3068 2.2322 16.7948 2.71878 17.281C3.20537 17.7676 3.693 18.0667 4.26849 18.2903C4.82489 18.5067 5.46116 18.6547 6.39231 18.697C7.32554 18.7398 7.62353 18.7498 9.99984 18.7498C12.3762 18.7498 12.6741 18.7398 13.6074 18.697C14.5385 18.6547 15.1748 18.5067 15.7312 18.2903C16.3067 18.0667 16.7947 17.7676 17.2809 17.281C17.7675 16.7945 18.0665 16.3068 18.2902 15.7313C18.5066 15.1749 18.6545 14.5387 18.6969 13.6075C18.7396 12.6743 18.7497 12.3763 18.7497 9.99999C18.7497 7.62367 18.7396 7.32568 18.6969 6.39245C18.6545 5.46131 18.5066 4.82503 18.2902 4.26863C18.0665 3.69314 17.7675 3.20516 17.2809 2.71893C16.7943 2.23234 16.3067 1.9333 15.7312 1.70964C15.1741 1.49361 14.5382 1.34565 13.607 1.30328C12.6738 1.26056 12.3758 1.25049 9.9995 1.25049Z" fill="currentColor"></path>
                <path d="M9.99943 5.50708C7.51788 5.50708 5.50659 7.51871 5.50659 9.99991C5.50659 12.4811 7.51823 14.4927 9.99943 14.4927C12.4806 14.4927 14.4923 12.4811 14.4923 9.99991C14.4923 7.51871 12.481 5.50708 9.99943 5.50708ZM9.99943 12.9163C8.38859 12.9163 7.08304 11.6104 7.08304 9.99991C7.08304 8.38908 8.38894 7.08353 9.99943 7.08353C11.6099 7.08353 12.9158 8.38943 12.9158 9.99991C12.9158 11.6107 11.6103 12.9163 9.99943 12.9163Z" fill="currentColor"></path>
                <path d="M14.67 6.37915C15.2499 6.37915 15.72 5.90908 15.72 5.32922C15.72 4.74936 15.2499 4.2793 14.67 4.2793C14.0902 4.2793 13.6201 4.74936 13.6201 5.32922C13.6201 5.90908 14.0902 6.37915 14.67 6.37915Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="{{youtube link}}" target="_blank" className="social-icon" aria-label="YouTube">
              {/* 유튜브 아이콘 */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.8136 3.38286C18.6739 3.61468 19.3523 4.29649 19.5818 5.1624C20 6.73286 20 10.0079 20 10.0079C20 10.0079 20 13.284 19.5818 14.8533C19.3523 15.7192 18.6739 16.401 17.8136 16.6329C16.2545 17.0533 10 17.0533 10 17.0533C10 17.0533 3.74659 17.0533 2.18636 16.6329C1.32614 16.401 0.647727 15.7192 0.418182 14.8533C0 13.2829 0 10.0079 0 10.0079C0 10.0079 0 6.73286 0.418182 5.1624C0.647727 4.29649 1.32614 3.61468 2.18636 3.38286C3.74545 2.9624 10 2.9624 10 2.9624C10 2.9624 16.2545 2.9624 17.8136 3.38286ZM13.1818 10.0078L7.95456 12.9817V7.03398L13.1818 10.0078Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="{{blog link}}" target="_blank" className="social-icon" aria-label="Blog">
              {/* 블로그 아이콘 */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7139 2.5C13.7751 2.5 15.6631 4.03099 15.6631 6.37793C15.6786 7.04886 15.5022 7.71029 15.1543 8.28418C14.8063 8.85812 14.3013 9.32064 13.6992 9.61719C14.5192 9.81119 15.2463 10.2835 15.7578 10.9531C16.2694 11.6228 16.5334 12.4488 16.5049 13.291V13.3926C16.5049 16.1222 14.2854 17.5 10.8926 17.5H3.75V2.5H10.7139ZM7.08008 14.502H10.8604C12.2779 14.5019 13.1483 14.0043 13.1484 12.9102C13.1484 11.8904 12.4023 11.2686 10.7607 11.2686H7.08008V14.502ZM7.0791 8.60742H10.0645C11.4321 8.60736 12.3269 8.13453 12.3271 7.06543C12.3271 6.09551 11.5816 5.54797 10.2139 5.54785H7.0791V8.60742Z" fill="currentColor"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFull; 