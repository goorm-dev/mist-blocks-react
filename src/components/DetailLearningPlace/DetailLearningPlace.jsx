import './DetailLearningPlace.css';
import { Text } from '@vapor-ui/core';

const DetailLearningPlace = () => {
  // 이미지 배열 - CDN URL 적용
  const images = [
    "https://statics.goorm.io/ktcloud-techup/landing/assets/learning-place/techup_learning_place_01.png",
    "https://statics.goorm.io/ktcloud-techup/landing/assets/learning-place/techup_learning_place_02.png",
    "https://statics.goorm.io/ktcloud-techup/landing/assets/learning-place/techup_learning_place_03.png",
    "https://statics.goorm.io/ktcloud-techup/landing/assets/learning-place/techup_learning_place_04.png",
    "https://statics.goorm.io/ktcloud-techup/landing/assets/learning-place/techup_learning_place_05.png",
    "https://statics.goorm.io/ktcloud-techup/landing/assets/learning-place/techup_learning_place_06.png"
  ];

  return (
    <section className="content-section" id="benefit">
      <div className="container">
          <Text typography='heading2'>몰입과 협업이 공존하는<br/>열린 학습 공간</Text>
      </div>
      {/* Full-width slider container outside of container constraints */}
      <div className="learning-place-slider-container">
          {/* 두 슬라이더를 부모 컨테이너 안에 위치시킵니다 */}
          <div className="learning-place-slider original">
            {images.map((image, index) => (
              <div 
                key={`original-${index}`}
                className="learning-place-slide"
              >
                <img src={image} alt={`학습 공간 ${index + 1}`} className="learning-place-image" />
              </div>
            ))}
          </div>
          <div className="learning-place-slider clone">
            {images.map((image, index) => (
              <div 
                key={`clone-${index}`}
                className="learning-place-slide"
              >
                <img src={image} alt={`학습 공간 ${index + 1}`} className="learning-place-image" />
              </div>
            ))}
          </div>
      </div>
      <div className="container">

        <div className="learning-places-container">
          {/* 구름스퀘어 강남 카드 */}
          <div className="learning-place-card">
            <div className="learning-place-card-header">
              <Text typography='heading5' foreground='normal'>구름스퀘어 강남</Text>
              <a target='_blank' href="https://map.naver.com/p/entry/place/1318967756?placePath=%2Fhome">
                <Text as="span" typography='heading6' className="learning-place-card-link">위치 확인</Text>
              </a>
            </div>
            <div className="learning-place-card-content">
              <Text typography='body1' foreground='normal-lighter'>
                구름스퀘어 강남의 쾌적한 공간에서 팀원들과 직접 협업하며 실무와 같은 프로젝트 경험을 쌓을 수 있습니다. 대면 소통을 통해 커뮤니케이션과 팀워크 역량을 자연스럽게 키울 수 있습니다.
              </Text>
            </div>
          </div>
          
          {/* TECH UP 메타버스 카드 */}
          <div className="learning-place-card">
            <div className="learning-place-card-header">
              <Text typography='heading5' foreground='normal'>TECH UP 메타버스</Text>
            </div>
            <div className="learning-place-card-content">
              <Text typography='body1' foreground='normal-lighter'>
                대회 가상현실 기반의 메타버스 환경에서 시간과 장소 제약 없이 몰입감 있는 학습과 협업을 경험할 수 있습니다. 실제와 유사한 협업 과정을 온라인에서도 생생하게 체험할 수 있습니다.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailLearningPlace;