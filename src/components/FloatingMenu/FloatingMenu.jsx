import { useState, useEffect } from 'react';
import { IconButton, Text } from '@vapor-ui/core';
import { COURSE, COURSE_INFORMATION } from '../../constants/CourseInformation';
import './FloatingMenu.css';
import { LinkOutlineIcon } from '@vapor-ui/icons';

const FloatingMenu = ({ 
  courseType = COURSE.FULLSTACK,
  onApplyClick,
  onNotificationClick,
  className = ''
}) => {
  const [isMobile, setIsMobile] = useState(false);
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

  // 반응형 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 코스 정보 가져오기
  const courseInfo = COURSE_INFORMATION[courseType];
  if (!courseInfo) {
    console.warn(`Course information not found for: ${courseType}`);
    return null;
  }

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
      case 'closed':
        return {
          text: "모집 마감",
          link: null,
          disabled: true
        };
      case 'beforeOpen':
        return {
          text: "오픈 알림 신청하기",
          link: "https://gem.goorm.io/submissions/ktcloudtechup/openalarm",
          disabled: false
        };
      case 'open':
        return {
          text: getApplyButtonText(),
          link: `https://gem.goorm.io/submissions/ktcloudtechup/${courseType.toLowerCase()}`,
          disabled: false
        };
      default:
        return {
          text: "오픈 알림 신청하기",
          link: "https://gem.goorm.io/submissions/ktcloudtechup/openalarm",
          disabled: false
        };
    }
  };
  
  const buttonConfig = getButtonConfig();

  // 모든 아이콘은 이제 Vapor UI의 Icons를 사용

  // 공유 링크 처리 함수
  const handleShareClick = async () => {
    try {
      // 링크 복사
      await navigator.clipboard.writeText(shareLink);
      
      if (onNotificationClick) {
        onNotificationClick();
      }
      
      // 복사 성공 상태로 변경
      setIsCopied(true);
      
      // 2초 후 원래 상태로 복원
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      
    } catch (err) {
      console.error("링크 복사 실패:", err);
      // 폴백: 구식 브라우저 지원
      const textArea = document.createElement("textarea");
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      // 복사 성공 상태로 변경
      setIsCopied(true);
      
      // 2초 후 원래 상태로 복원
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  // 모집 전 레이아웃
  const renderBeforeOpen = () => {
    if (isMobile) {
      return (
        <div className="floating-menu-content mobile">
          <div className="mobile-text-content">
            <div className="title-row">
              <Text typography="heading6">
                kt cloud TECH UP 모집 오픈
              </Text>
              <Text typography="heading6" className="days-left">
                D-{daysLeft}
              </Text>
            </div>
          </div>
          <div className="mobile-action-row">
            <IconButton
              size="xl" 
              color="secondary" 
              className="cta-share"
              onClick={handleShareClick}
            >
              {isCopied ? '복사됨' : <LinkOutlineIcon />}
            </IconButton>
            {buttonConfig.link && !buttonConfig.disabled ? (
              <a href={buttonConfig.link} className="apply-button-link w-full">
                <button className="apply-button mobile" onClick={onApplyClick}>
                  <Text typography="heading6" className="button-text">
                    {buttonConfig.text}
                  </Text>
                </button>
              </a>
            ) : (
              <button 
                className={`apply-button mobile${buttonConfig.disabled ? ' disabled' : ''}`}
                onClick={onApplyClick}
                disabled={buttonConfig.disabled}
              >
                <Text typography="heading6" className="button-text">
                  {buttonConfig.text}
                </Text>
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="floating-menu-content">
        <div className="menu-text-content">
          <div className="title-row">
              <Text typography="heading6">
                kt cloud TECH UP 모집 오픈
              </Text>
            <Text typography="heading6" className="days-left">
              D-{daysLeft}
            </Text>
          </div>
          <Text typography="body2" className="description">
            모집 오픈 알림을 신청하세요.
          </Text>
        </div>
        <div className="menu-actions">
                    <IconButton
                      size="xl" 
                      color="secondary" 
                      className="cta-share"
                      onClick={handleShareClick}
                    >
                      {isCopied ? '복사됨' : <LinkOutlineIcon />}
                    </IconButton>
          {buttonConfig.link && !buttonConfig.disabled ? (
            <a href={buttonConfig.link} className="apply-button-link w-full">
              <button className="apply-button" onClick={onApplyClick}>
                <Text typography="heading6" className="button-text">
                  {buttonConfig.text}
                </Text>
              </button>
            </a>
          ) : (
            <button 
              className={`apply-button${buttonConfig.disabled ? ' disabled' : ''}`}
              onClick={onApplyClick}
              disabled={buttonConfig.disabled}
            >
              <Text typography="heading6" className="button-text">
                {buttonConfig.text}
              </Text>
            </button>
          )}
        </div>
      </div>
    );
  };

  // 모집 중 레이아웃
  const renderOpen = () => {
    if (isMobile) {
      return (
        <div className="floating-menu-content mobile">
          <div className="mobile-text-content">
            <div className="countdown-row">
              <Text typography="body2" className="countdown-label">
                지원 마감까지 남은 시간
              </Text>
              <Text typography="heading6" className="countdown-time">
                {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분 {timeLeft.seconds}초
              </Text>
            </div>
          </div>
          <div className="mobile-action-row">
            <IconButton
              size="xl" 
              color="secondary" 
              className="cta-share"
              onClick={handleShareClick}
            >
              {isCopied ? '복사됨' : <LinkOutlineIcon />}
            </IconButton>
            {buttonConfig.link && !buttonConfig.disabled ? (
              <a href={buttonConfig.link} className="apply-button-link w-full">
                <button className="apply-button mobile" onClick={onApplyClick}>
                  <Text typography="heading6" className="button-text">
                    {buttonConfig.text}
                  </Text>
                </button>
              </a>
            ) : (
              <button 
                className={`apply-button mobile${buttonConfig.disabled ? ' disabled' : ''}`}
                onClick={onApplyClick}
                disabled={buttonConfig.disabled}
              >
                <Text typography="heading6" className="button-text">
                  {buttonConfig.text}
                </Text>
              </button>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="floating-menu-content">
        <div className="menu-text-content">
          <div className="title-row">
            <Text typography="heading6">
              kt cloud TECH UP에 지금 합류하세요.
            </Text>
          </div>
          <div className="countdown-row">
            <Text typography="body2" className="countdown-label">
              지원 마감까지 남은 시간
            </Text>
            <Text typography="heading6" className="countdown-time">
              {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분 {timeLeft.seconds}초
            </Text>
          </div>
        </div>
        <div className="menu-actions">
          <IconButton
            size="xl" 
            color="secondary" 
            className="cta-share"
            onClick={handleShareClick}
          >
            {isCopied ? '복사됨' : <LinkOutlineIcon />}
          </IconButton>
          {buttonConfig.link && !buttonConfig.disabled ? (
            <a href={buttonConfig.link} className="apply-button-link w-full">
              <button className="apply-button" onClick={onApplyClick}>
                <Text typography="heading6" className="button-text">
                  {buttonConfig.text}
                </Text>
              </button>
            </a>
          ) : (
            <button 
              className={`apply-button${buttonConfig.disabled ? ' disabled' : ''}`}
              onClick={onApplyClick}
              disabled={buttonConfig.disabled}
            >
              <Text typography="heading6" className="button-text">
                {buttonConfig.text}
              </Text>
            </button>
          )}
        </div>
      </div>
    );
  };

  // 모집 마감 레이아웃
  const renderClosed = () => {
    if (isMobile) {
      return (
        <div className="floating-menu-content mobile">
          <div className="mobile-text-content">
            <div className="title-row">
              <Text typography="heading6">
                kt cloud TECH UP 모집이 종료되었습니다.
              </Text>
            </div>
          </div>
          <div className="mobile-action-row">
            <button 
              className="apply-button mobile disabled"
              disabled
            >
              <Text typography="heading6" className="button-text">
                {buttonConfig.text}
              </Text>
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="floating-menu-content">
        <div className="menu-text-content">
          <div className="title-row">
            <Text typography="heading6">
              kt cloud TECH UP 모집이 종료되었습니다.
            </Text>
          </div>
        </div>
        <div className="menu-actions">
          <button 
            className="apply-button disabled"
            disabled
          >
            <Text typography="heading6" className="button-text">
              {buttonConfig.text}
            </Text>
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (status) {
      case 'beforeOpen':
        return renderBeforeOpen();
      case 'open':
        return renderOpen();
      case 'closed':
        return renderClosed();
      default:
        return renderBeforeOpen();
    }
  };

  return (
    <div className={`floating-menu ${className}`.trim()}>
      <div className="floating-menu-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default FloatingMenu;