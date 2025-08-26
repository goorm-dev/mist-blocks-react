import { useState, useEffect, useRef } from 'react';
import { Text, Button, IconButton } from '@vapor-ui/core';
import { LinkOutlineIcon } from '@vapor-ui/icons';
import { COURSE, COURSE_INFORMATION } from '../../constants/CourseInformation';
import './OpenAlert.css';

const OpenAlert = ({ 
  courseType = COURSE.FULLSTACK,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCopied, setIsCopied] = useState(false);
  const shareLink = typeof window !== 'undefined' ? window.location.href : '';

  // 실시간 시간 업데이트 (1초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Intersection Observer 참조 저장
  const observerRef = useRef(null);
  
  // Intersection Observer 설정
  useEffect(() => {
    // 초기 상태는 숨김
    setIsVisible(false);
    
    // Intersection Observer 콜백 함수
    const observerCallback = (entries) => {
      // cta-enroll 요소가 화면에 보이는지 여부에 따라 상태 변경
      const isCtaVisible = entries[0].isIntersecting;
      setIsVisible(!isCtaVisible); // 보이지 않을 때만 OpenAlert 표시
    };
    
    // 페이지가 로드된 후에 Observer 초기화 함수
    const initObserver = () => {
      // DetailHero에 있는 버튼 클래스명이 정확히 'cta-enroll'임
      const ctaElement = document.querySelector('.cta-enroll');
      
      if (ctaElement) {
        // Observer 생성 및 설정
        observerRef.current = new IntersectionObserver(observerCallback, {
          threshold: 0.1, // 10% 이상 보이면 보이는 것으로 간주
          rootMargin: '0px' // 뷰포트에 대한 마진 설정
        });
        
        // 요소 관찰 시작
        observerRef.current.observe(ctaElement);
      } else {
        // cta-enroll 요소가 없으면 항상 표시
        setIsVisible(true);
      }
    };
    
    // DOM이 완전히 로드된 후에 초기화
    if (document.readyState === 'complete') {
      initObserver();
    } else {
      window.addEventListener('load', initObserver, { once: true });
    }
    
    // 컴포넌트 언마운트 시 클린업
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('load', initObserver);
    };
  }, []);

  // 코스 정보 가져오기
  const courseInfo = COURSE_INFORMATION[courseType];
  // 상태 계산 함수들
  const getCourseStatus = () => {
    const now = currentTime;
    const startAt = new Date(courseInfo.startAt);
    const endAt = new Date(courseInfo.endAt);
    
    if (now < startAt) return 'beforeOpen';
    if (now >= startAt && now <= endAt) return 'open';
    return 'closed';
  };

  const getDaysLeft = (targetDate) => {
    const now = currentTime;
    const diff = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const getTimeLeft = (targetDate) => {
    const now = currentTime;
    const diff = targetDate - now;
    
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
  };

  // 계산된 값들
  const status = getCourseStatus();
  const courseTitle = courseInfo.title.replace('kt cloud ', '');
  const daysLeft = getDaysLeft(new Date(courseInfo.startAt));
  const timeLeft = getTimeLeft(new Date(courseInfo.endAt));
  
  // 코스별 지원 버튼 텍스트 생성
  const getApplyButtonText = () => {
    const courseMap = {
      [COURSE.FULLSTACK]: '풀스택',
      [COURSE.FRONTEND]: '프론트엔드',
      [COURSE.BACKEND]: '백엔드',
      [COURSE.GEN_AI]: '생성형 AI',
      [COURSE.INFORMATION_SECURITY]: '사이버 보안',
      [COURSE.CLOUD_NATIVE]: '클라우드 네이티브',
      [COURSE.CLOUD_INFRASTRUCTURE]: '클라우드 인프라',
      [COURSE.PRODUCT_DESIGN]: '프로덕트 디자인',
      [COURSE.PRODUCT_MANAGEMENT]: '프로덕트 매니지먼트'
    };
    
    return `${courseMap[courseType] || courseTitle} 지원하기`;
  };
  
  // 상태에 따른 버튼 설정
  const getButtonConfig = () => {
    switch (status) {
      case 'beforeOpen':
        return {
          text: '오픈 알림 신청하기',
          disabled: false,
          link: `https://gem.goorm.io/submissions/ktcloudtechup/openalarm`
        };
      case 'open':
        return {
          text: getApplyButtonText(),
          disabled: false,
          link: `https://gem.goorm.io/submissions/ktcloudtechup/${courseInfo.keyword}`
        };
      case 'closed':
        return {
          text: '모집 마감',
          disabled: true,
          link: null
        };
      default:
        return {
          text: '오픈 알림 신청하기',
          disabled: false,
          link: `https://gem.goorm.io/submissions/ktcloudtechup/openalarm`
        };
    }
  };

  const buttonConfig = getButtonConfig();

  // 공유 링크 복사 처리 (모바일 호환성 개선)
  const handleShareClick = async () => {
    try {
      // 모바일에서 더 안정적인 복사 방법
      if (navigator.clipboard && window.isSecureContext) {
        // HTTPS 환경에서 clipboard API 사용
        await navigator.clipboard.writeText(shareLink);
      } else {
        // 폴백: textarea를 통한 복사
        const textArea = document.createElement('textarea');
        textArea.value = shareLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('execCommand copy failed:', err);
        }
        
        document.body.removeChild(textArea);
      }
      
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // 에러 발생 시에도 사용자에게 피드백 제공
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleButtonClick = () => {
    if (!buttonConfig.disabled && buttonConfig.link) {
      window.open(buttonConfig.link, '_blank');
    }
  }


  // 모집 예정 레이아웃
  const renderBeforeOpen = () => (
    <div className="open-alert-style">
              <div className="alert-text">
          <div id="pre-notification-container">
            <Text typography="heading6" className="open-alert-text-pre">
              TECH UP 모집 오픈
            </Text>
            <Text typography="heading6" className="days-left">
              D-{daysLeft}
            </Text>
            <Text typography="heading6" className="notification-description">
              오픈 알림 신청하시면 가장 먼저 오픈 소식을 알려드려요.
            </Text>
          </div>
        </div>
      <div className="cta-button-container">
        {isCopied ? (
          <Button 
            size="xl" 
            color="secondary" 
            className="copy-button"
            disabled
          >
            복사됨
          </Button>
        ) : (
          <IconButton 
            size="xl" 
            color="secondary" 
            className="copy-button"
            onClick={handleShareClick}
            onTouchEnd={handleShareClick} // 모바일 터치 이벤트 추가
          >
            <LinkOutlineIcon />
          </IconButton>
        )}
        <Button
          size="xl"
          color="primary"
          className="cta-button"
          disabled={buttonConfig.disabled}
          onClick={handleButtonClick}
        >
          {buttonConfig.text}
        </Button>
      </div>
    </div>
  );

  // 모집 중 레이아웃
  const renderOpen = () => (
    <div className="open-alert-style">
      <div className="alert-text">
        <div id="application-container" className="alert-text-wrapper">
          <Text typography="heading6" className="open-alert-text">
            TECH UP에 지금 합류하세요.
          </Text>
          <Text typography="heading6" className="time-alert-text">
            <span className="flip-clock">
              지원 마감까지
              <span className="time-text">
                <span className="digit">{String(timeLeft.days).padStart(2, '0')}</span>일{' '}
                <span className="digit">{String(timeLeft.hours).padStart(2, '0')}</span>시간{' '}
                <span className="digit">{String(timeLeft.minutes).padStart(2, '0')}</span>분{' '}
                <span className="digit">{String(timeLeft.seconds).padStart(2, '0')}</span>초
              </span>
              남았습니다.
            </span>
          </Text>
        </div>
      </div>
      <div className="cta-button-container">
        {isCopied ? (
          <Button 
            size="xl" 
            color="secondary" 
            className="copy-button"
            disabled
          >
            복사됨
          </Button>
        ) : (
          <IconButton 
            size="xl" 
            color="secondary" 
            className="copy-button"
            onClick={handleShareClick}
          >
            <LinkOutlineIcon />
          </IconButton>
        )}
        {buttonConfig.link && !buttonConfig.disabled ? (
          <Button
            size="xl"
            color="primary"
            className="cta-button"
            disabled={buttonConfig.disabled}
            onClick={handleButtonClick}
          >
            {buttonConfig.text}
          </Button>
        ) : (
          <Button
            size="xl"
            color="primary"
            className="cta-button"
            disabled={buttonConfig.disabled}
          >
            {buttonConfig.text}
          </Button>
        )}
      </div>
    </div>
  );

  // 모집 마감 레이아웃
  const renderClosed = () => (
    <div className="open-alert-style">
      <div className="alert-text">
        <Text typography="heading6" className="open-alert-text">
          TECH UP 모집이 종료되었습니다.
        </Text>
      </div>
      <div className="cta-button-container">
        {isCopied ? (
          <Button 
            size="xl" 
            color="secondary" 
            className="copy-button"
            disabled
          >
            복사됨
          </Button>
        ) : (
          <IconButton 
            size="xl" 
            color="secondary" 
            className="copy-button"
            onClick={handleShareClick}
          >
            <LinkOutlineIcon />
          </IconButton>
        )}
        <Button
          size="xl"
          color="primary"
          className="cta-button"
          disabled={buttonConfig.disabled}
        >
          {buttonConfig.text}
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (status) {
      case 'open':
        return renderOpen();
      case 'closed':
        return renderClosed();
      case 'beforeOpen':
      default:
        return renderBeforeOpen();
    }
  };



  return (
    <>
      {isVisible && (
        <div 
          className={`open-alert show ${className}`.trim()}
        >
          {renderContent()}
        </div>
      )}
    </>
  );
};

export default OpenAlert;
