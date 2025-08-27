import { useState, useEffect } from "react";
import { Text } from '@vapor-ui/core';
import "./RecommendCommentSection.css";
import RecommendCommentCard from "./RecommendCommentCard";
import { debounce } from '../../utils/performanceUtils';

/**
 * RecommendCommentSection 컴포넌트
 * 
 * RecommendCommentCard를 관리하는 섹션 컴포넌트입니다.
 * 유동적인 그리드 레이아웃으로 추천 코멘트 카드들을 표시합니다.
 */

// 테스트용 더미 데이터
const DUMMY_COMMENTS = [
  {
    id: 1,
    name: "홍길동",
    position: "백엔드 개발자",
    title: "실무에 도움되는 강의",
    description: "실무에 바로 적용할 수 있는 내용이 많아서 정말 도움이 되었습니다. 특히 실제 프로젝트 사례를 바탕으로 한 예제가 이해하기 쉬웠습니다.",
    avatarUrl: "https://statics.goorm.io/ktcloud-techup/landing/assets/dummy/avatar01.png"
  },
  {
    id: 2,
    name: "김민지",
    position: "프론트엔드 개발자",
    title: "체계적인 커리큘럼",
    description: "기초부터 고급 내용까지 체계적으로 구성되어 있어서 학습 흐름이 끊기지 않고 잘 따라갈 수 있었습니다.",
    avatarUrl: "https://statics.goorm.io/ktcloud-techup/landing/assets/dummy/avatar02.png"
  },
  {
    id: 3,
    name: "이준호",
    position: "클라우드 엔지니어",
    title: "멘토의 실시간 피드백",
    description: "과제에 대한 멘토의 상세한 피드백이 많은 도움이 되었습니다. 특히 코드 리뷰를 통해 더 나은 방향으로 개선할 수 있었습니다.",
    avatarUrl: "https://statics.goorm.io/ktcloud-techup/landing/assets/dummy/avatar03.png"
  },
  {
    id: 4,
    name: "박서연",
    position: "시스템 엔지니어",
    title: "유익한 네트워킹",
    description: "같은 분야를 공부하는 다른 수강생들과의 교류가 큰 자산이 되었습니다. 서로 의견을 나누며 더 넓은 시야를 가질 수 있었습니다.",
    avatarUrl: "https://statics.goorm.io/ktcloud-techup/landing/assets/dummy/avatar04.png"
  }
];

const RecommendCommentSection = ({
  title = "수강생들의 생생한<br/>후기를 만나보세요",
  comments = DUMMY_COMMENTS,
  iconUrl = "/assets/iconpattern.png",
  grainUrl = "/assets/grain.webp",
}) => {
  const [screenSize, setScreenSize] = useState('desktop');

  // 화면 크기 감지
  useEffect(() => {
    // 원본 크기 감지 함수
    const checkScreenSizeOriginal = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setScreenSize('mobile');
      } else if (width <= 768) {
        setScreenSize('tablet');
      } else if (width <= 992) {
        setScreenSize('small-desktop');
      } else {
        setScreenSize('desktop');
      }
    };
    
    // 디바운스 적용된 크기 감지 함수
    const checkScreenSize = debounce(checkScreenSizeOriginal, 200);

    // 초기 체크
    checkScreenSizeOriginal();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);

    // 클린업
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 화면 크기에 따라 카드 너비 결정
  const getCardWidth = () => {
    switch (screenSize) {
      case 'mobile':
        return '100%'; // 모바일에서는 한 줄에 1개
      case 'tablet':
        return 'calc(50% - 12px)'; // 태블릿에서는 한 줄에 2개
      case 'small-desktop':
      case 'desktop':
      default:
        return 'calc(50% - 12px)'; // 데스크탑에서는 한 줄에 2개
    }
  };

  // br 태그 처리
  const renderWithBreaks = (text) => {
    if (!text) return null;
    
    return text.split('<br/>').map((part, index, array) => (
      <span key={index}>
        {part}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section className="content-section recommend-comment-section">
      <div className="container">
        {/* 섹션 타이틀 */}
        <Text typography="heading2" className="rc-section-title">
          {renderWithBreaks(title)}
        </Text>

        {/* 코멘트 카드 그리드 */}
        <div className="rc-comment-grid">
          {comments.map((comment) => (
            <RecommendCommentCard
              key={comment.id}
              name={comment.name}
              position={comment.position}
              title={comment.title}
              description={comment.description}
              avatarUrl={comment.avatarUrl}
              iconUrl={iconUrl}
              grainUrl={grainUrl}
              width={getCardWidth()}
              enableTilt={true}
              showUserInfo={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendCommentSection;