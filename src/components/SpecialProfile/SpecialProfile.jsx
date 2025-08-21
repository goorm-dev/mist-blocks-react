import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { Text, Button, Badge } from '@vapor-ui/core';
import "./SpecialProfile.css";

/**
 * ProfileCard 컴포넌트
 * 
 * 개별 프로필 카드를 렌더링하는 컴포넌트입니다.
 * 3D 틸트 효과와 홀로그램 스타일의 시각적 효과를 제공합니다.
 */

// 기본 그라디언트 설정
const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "var(--ktc-background-gradient)";

// 애니메이션 설정
const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
};

// 유틸리티 함수들
const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value, precision = 3) =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value,
  fromMin,
  fromMax,
  toMin,
  toMax
) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

// 작은 화면 감지 훅 (768px 미만)
const useIsSmallScreen = () => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmall(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isSmall;
};

// 개별 ProfileCard 컴포넌트
const ProfileCard = ({
  // 사용자 정보 props
  name = "Javi A. Torres",
  title = "Software Engineer",
  stack = "#AI, #Data, #ML",
  experience = ["Google", "Microsoft", "Apple"],
  contactText = "Contact Me",
  avatarUrl = "/path/to/avatar.jpg",
  miniAvatarUrl,
  showUserInfo = true,
  
  // 스타일링 props
  className = "",
  iconUrl = "src/assets/iconpattern.png",
  grainUrl = "src/assets/grain.webp",
  
  // 애니메이션 관련 props
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  
  // 그라디언트 관련 props
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  
  // 이벤트 핸들러
  onContactClick,
}) => {
  // Refs
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  // 작은 화면 감지
  const isSmallScreen = useIsSmallScreen();
  
  // 작은 화면에서는 tilt 효과를 강제로 비활성화
  const shouldEnableTilt = enableTilt && !isSmallScreen;

  // 애니메이션 핸들러 메모이제이션 (작은 화면에서는 비활성화)
  const animationHandlers = useMemo(() => {
    if (!shouldEnableTilt) return null;

    let rafId = null;

    const updateCardTransform = (
      offsetX,
      offsetY,
      card,
      wrap
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration,
      startX,
      startY,
      card,
      wrap
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [shouldEnableTilt]);

  // 마우스/터치 이벤트 핸들러들
  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  const handleDeviceOrientation = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const { beta, gamma } = event;
      if (!beta || !gamma) return;

      animationHandlers.updateCardTransform(
        card.clientHeight / 2 + gamma * mobileTiltSensitivity,
        card.clientWidth / 2 + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        card,
        wrap
      );
    },
    [animationHandlers, mobileTiltSensitivity]
  );

  // 이벤트 리스너 설정 및 초기화 (작은 화면에서는 완전히 차단)
  useEffect(() => {
    if (!shouldEnableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== 'https:' || isSmallScreen) return;
      if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
        window.DeviceMotionEvent
          .requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(err => console.error(err));
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);
    card.addEventListener("click", handleClick);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      card.removeEventListener("click", handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      animationHandlers.cancelAnimation();
    };
  }, [
    shouldEnableTilt,
    enableMobileTilt,
    isSmallScreen,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  // 카드 스타일 메모이제이션 (작은 화면에서는 안전한 스타일 적용)
  const cardStyle = useMemo(
    () => {
      const baseStyle = {
        "--icon": iconUrl ? `url(${iconUrl})` : "none",
        "--grain": grainUrl ? `url(${grainUrl})` : "none",
        "--behind-gradient": (showBehindGradient && !isSmallScreen)
          ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
          : "none",
        "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      };

      // 작은 화면에서는 터치 스크롤 보장 및 transform 리셋
      if (isSmallScreen) {
        return {
          ...baseStyle,
          // CSS 변수 초기화로 transform 리셋
          "--pointer-x": "50%",
          "--pointer-y": "50%",
          "--rotate-x": "0deg",
          "--rotate-y": "0deg",
          "--pointer-from-center": "0",
          // 터치 스크롤 보장
          touchAction: "auto",
          userSelect: "auto",
          cursor: "default",
          // transform 강제 리셋
          transform: "none",
          perspective: "none",
        };
      }

      return baseStyle;
    },
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient, isSmallScreen]
  );

  // 연락처 버튼 클릭 핸들러
  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${isSmallScreen ? 'small-screen-static' : ''} ${className}`.trim()}
      style={cardStyle}
    >
      <section 
        ref={cardRef} 
        className="pc-card"
        style={isSmallScreen ? {
          transform: "none",
          perspective: "none",
          backfaceVisibility: "visible"
        } : {}}
      >
        <div 
          className="pc-inside"
          style={isSmallScreen ? {
            transform: "none",
            perspective: "none",
            backfaceVisibility: "visible"
          } : {}}
        >
          {!isSmallScreen && <div className="pc-shine" />}
          {!isSmallScreen && <div className="pc-glare" />}
          
          {/* 아바타 콘텐츠 영역 */}
          <div 
            className="pc-content pc-avatar-content"
            style={isSmallScreen ? {
              transform: "none",
              perspective: "none",
              backfaceVisibility: "visible"
            } : {}}
          >
            <img
              className="avatar"
              src={avatarUrl}
              alt={`${name || "User"} avatar`}
              loading={isSmallScreen ? "eager" : "lazy"}
              style={isSmallScreen ? {
                transform: "translateX(-50%)",
                backfaceVisibility: "visible",
                perspective: "none",
                left: "50%",
                position: "absolute"
              } : {}}
              onError={(e) => {
                const target = e.target;
                target.style.display = "none";
              }}
            />
            
            {/* 사용자 정보 표시 */}
            {showUserInfo && (
              <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-user-text">
                      <div className="pc-stack-badges">
                        {stack.split(',').map((tag, index) => (
                          <Badge key={index} color="hint" size="sm" square="square" className="stack-badge">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                      <div className="pc-experience">
                        {Array.isArray(experience) && experience.length > 0 ? (
                          experience.map((exp, index) => (
                            <Text key={index} typography="body2" className="experience-item" foreground="accent">
                              {exp}
                            </Text>
                          ))
                        ) : (
                          <Text typography="body2" className="experience-item" foreground="accent">
                            경력 없음
                          </Text>
                        )}
                      </div>
                    </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 프로필 상세 정보 */}
          <div className="pc-content">
            <div className="pc-details">
              <Text typography="heading2" className="profile-name">{name}</Text>
              <Text typography="body1" className="profile-title">{title}</Text>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * SpecialProfile 컴포넌트
 * 
 * 여러 ProfileCard를 그리드 형태로 표시하는 컴포넌트입니다.
 * CourseCard와 유사한 구조로 여러 프로필을 관리합니다.
 * 
 * @example
 * // 기본 사용
 * <SpecialProfile />
 * 
 * // 커스텀 데이터로 사용
 * <SpecialProfile 
 *   title="팀 멤버"
 *   profiles={[
 *     {
 *       id: 1,
 *       name: "Javi A. Torres",
 *       title: "Software Engineer",
 *       stack: "#AI, #Data, #ML",
 *       experience: ["전) NCSOFT Data Scientist/Analyst", "전) Netmarble Data Scientist/Analyst"],
 *       avatarUrl: "/path/to/avatar.jpg",
 *       iconUrl: "src/assets/iconpattern.png",
 *       grainUrl: "src/assets/grain.webp"
 *     }
 *   ]}
 * />
 */
const SpecialProfile = ({ 
  title = "기술과 경험을 전할\n멘토 라인업",
  profiles = [
    {
      id: 1,
      name: "제이슨",
      title: "구름",
      stack: "#AI, #Data, #ML",
      experience: ["전) NCSOFT Data Scientist/Analyst", "전) Netmarble Data Scientist/Analyst"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: true,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Contact clicked')
    },
    {
      id: 2,
      name: "제이슨",
      title: "구름",
      stack: "#UX, #Design, #Figma",
      experience: ["전) Figma Senior Designer", "전) Adobe Creative Director"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Sarah contacted')
    },
    {
      id: 3,
      name: "제이슨",
      title: "구름",
      stack: "#Product, #Strategy, #Growth",
      experience: ["전) Amazon Product Manager", "전) Netflix Senior PM"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Mike contacted')
    },
    {
      id: 4,
      name: "제이슨",
      title: "구름",
      stack: "#Product, #Strategy, #Growth",
      experience: ["전) Amazon Product Manager", "전) Netflix Senior PM"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Mike contacted')
    },
    {
      id: 5,
      name: "제이슨",
      title: "구름",
      stack: "#Product, #Strategy, #Growth",
      experience: ["전) Amazon Product Manager", "전) Netflix Senior PM"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Mike contacted')
    },
    {
      id: 6,
      name: "제이슨",
      title: "구름",
      stack: "#Product, #Strategy, #Growth",
      experience: ["전) Amazon Product Manager", "전) Netflix Senior PM"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Mike contacted')
    },
    {
      id: 7,
      name: "제이슨",
      title: "구름",
      stack: "#Product, #Strategy, #Growth",
      experience: ["전) Amazon Product Manager", "전) Netflix Senior PM"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Mike contacted')
    },
    {
      id: 8,
      name: "제이슨",
      title: "구름",
      stack: "#Product, #Strategy, #Growth",
      experience: ["전) Amazon Product Manager", "전) Netflix Senior PM"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Mike contacted')
    },
    {
      id: 9,
      name: "제이슨",
      title: "구름",
      stack: "#Product, #Strategy, #Growth",
      experience: ["전) Amazon Product Manager", "전) Netflix Senior PM"],
      avatarUrl: "src/assets/person.png",
      iconUrl: "src/assets/iconpattern.png",
      grainUrl: "src/assets/grain.webp",
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
      mobileTiltSensitivity: 5,
      onContactClick: () => console.log('Mike contacted')
    },
  ]
}) => {
  const handleContactClick = (profileId) => {
    console.log(`Contact clicked for profile ${profileId}`);
  };

  return (
    <section className="content-section special-profile-section">
      <div className="container">
        <Text typography="heading2" className="title">{title}</Text>
        <div className="profile-cards-grid">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              name={profile.name}
              title={profile.title}
              stack={profile.stack}
              experience={profile.experience}
              avatarUrl={profile.avatarUrl}
              iconUrl={profile.iconUrl}
              grainUrl={profile.grainUrl}
              showUserInfo={profile.showUserInfo}
              enableTilt={profile.enableTilt}
              enableMobileTilt={profile.enableMobileTilt}
              mobileTiltSensitivity={profile.mobileTiltSensitivity}
              onContactClick={() => handleContactClick(profile.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProfileCard };
export default SpecialProfile;


