import React from 'react';
import './DetailLearningPlace.css';
import { Text } from '@vapor-ui/core';

const DetailLearningPlace = () => {
  // 이미지 배열 - 실제 이미지 경로로 변경해야 함
  const images = [
    "https://placehold.co/384x218",
    "https://placehold.co/384x218",
    "https://placehold.co/384x218",
    "https://placehold.co/384x218",
  ];

  return (
    <section className="content-section">
      <div className="container">
      <div className="section-inner">
          <Text typography='heading2'>몰입과 협업이 공존하는<br/>열린 학습 공간</Text>
          <div className="learning-place-slider-container">
            <div className="learning-place-slider-wrapper">
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
            <div className="learning-place-caption">구름 스퀘어 강남 / 메타버스 환경</div>
          </div>
          </div>
          </div>
    </section>
  );
};

export default DetailLearningPlace;