import React from 'react';
import { Text } from '@vapor-ui/core';
import './DetailIntroduceCourse.css';
import { COURSE_CONTENT } from './DetailIntroduceCourse.constant';
import { COURSE } from '../../constants/CourseInformation';

// 각 과정별 배경 이미지 매핑
const COURSE_BACKGROUND_IMAGES = {
  [COURSE.CLOUD_NATIVE]: 'techup_introduce_bg_cloudnative.png',
  [COURSE.CLOUD_INFRASTRUCTURE]: 'techup_introduce_bg_cloudinfra.png',
  [COURSE.INFORMATION_SECURITY]: 'techup_introduce_bg_security.png',
  [COURSE.FULLSTACK]: 'techup_introduce_bg_fullstack.png',
  [COURSE.BACKEND]: 'techup_introduce_bg_backend.png',
  [COURSE.FRONTEND]: 'techup_introduce_bg_frontend.png',
  [COURSE.GEN_AI]: 'techup_introduce_bg_genai.png',
  [COURSE.PRODUCT_DESIGN]: 'techup_introduce_bg_design.png',
  [COURSE.PRODUCT_MANAGEMENT]: 'techup_introduce_bg_pm.png',
};

const DetailIntroduceCourse = ({ 
  course,
  className = ""
}) => {
  // 선택된 과정의 콘텐츠 가져오기
  const content = COURSE_CONTENT[course];

  // 콘텐츠가 없는 경우 처리
  if (!content) {
    console.warn(`Course content not found for: ${course}`);
    return null;
  }
  
  // 과정에 맞는 배경 이미지 가져오기
  const backgroundImage = COURSE_BACKGROUND_IMAGES[course];

  const {
    title,
    coreMessage,
    valueProposition,
    targetAudience
  } = content;

  // valueProposition을 줄바꿈으로 분리
  const valuePropositionLines = valueProposition.split('\n');
  const valueTitle = valuePropositionLines[0];
  const valueDescription = valuePropositionLines.slice(1).join('\n');

  // 핵심 메시지 텍스트 파싱 함수 - 중괄호로 감싸진 키워드와 줄바꿈 처리
  const parseMessage = (message) => {
    if (!message) return null;

    // 중괄호 패턴을 찾아서 분리
    const parts = [];
    let currentIndex = 0;
    let match;
    const regex = /\{([^}]+)\}/g;

    while ((match = regex.exec(message)) !== null) {
      // 중괄호 앞의 텍스트
      if (match.index > currentIndex) {
        const beforeText = message.substring(currentIndex, match.index);
        parts.push({ type: 'text', content: beforeText });
      }
      
      // 중괄호 안의 키워드
      parts.push({ type: 'keyword', content: match[1] });
      
      currentIndex = regex.lastIndex;
    }

    // 마지막 부분의 텍스트
    if (currentIndex < message.length) {
      const afterText = message.substring(currentIndex);
      parts.push({ type: 'text', content: afterText });
    }

    return parts.map((part, index) => {
      if (part.type === 'keyword') {
        return (
          <React.Fragment key={index}>
            <span className="highlight-brace">{'{'}</span>
            <span className="normal-text">
              {(() => {
                const lines = part.content.split('\n');
                
                // 연속된 줄바꿈을 확인하기 위한 처리
                const elements = [];
                let consecutiveNewlines = 0;
                
                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i];
                  
                  // 현재 라인이 빈 문자열이면 연속된 줄바꿈 카운트 증가
                  if (line === "") {
                    consecutiveNewlines++;
                    // 마지막 라인이 아니면 계속 진행
                    if (i < lines.length - 1) {
                      continue;
                    }
                  }
                  
                  // 이전 라인이 있고 연속된 줄바꿈이 있으면 <br/> 추가
                  if (i > 0) {
                    // 일반적인 줄바꿈은 무조건 하나 추가
                    elements.push(<br key={`br-keyword-${i}-1`} />);
                    
                    // 연속된 줄바꿈이 있으면 추가 <br/> 삽입
                    for (let j = 0; j < consecutiveNewlines; j++) {
                      elements.push(<br key={`br-keyword-${i}-${j+2}`} />);
                    }
                  }
                  
                  // 현재 라인이 빈 문자열이 아닌 경우에만 내용 추가
                  if (line !== "") {
                    elements.push(<React.Fragment key={`line-keyword-${i}`}>{line}</React.Fragment>);
                    consecutiveNewlines = 0;
                  }
                }
                
                return elements;
              })()}
            </span>
            <span className="highlight-brace">{'}'}</span>
          </React.Fragment>
        );
      } else {
        // 일반 텍스트에서 줄바꿈 처리 - 이중 줄바꿈(\n\n) 지원
        return (
          <span key={index} className="normal-text">
            {(() => {
              const lines = part.content.split('\n');
              
              // 연속된 줄바꿈을 확인하기 위한 처리
              const elements = [];
              let consecutiveNewlines = 0;
              
              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                // 현재 라인이 빈 문자열이면 연속된 줄바꿈 카운트 증가
                if (line === "") {
                  consecutiveNewlines++;
                  // 마지막 라인이 아니면 계속 진행
                  if (i < lines.length - 1) {
                    continue;
                  }
                }
                
                // 이전 라인이 있고 연속된 줄바꿈이 있으면 <br/> 추가
                if (i > 0) {
                  // 일반적인 줄바꿈은 무조건 하나 추가
                  elements.push(<br key={`br-normal-${i}-1`} />);
                  
                  // 연속된 줄바꿈이 있으면 추가 <br/> 삽입
                  for (let j = 0; j < consecutiveNewlines; j++) {
                    elements.push(<br key={`br-normal-${i}-${j+2}`} />);
                  }
                }
                
                // 현재 라인이 빈 문자열이 아닌 경우에만 내용 추가
                if (line !== "") {
                  elements.push(<React.Fragment key={`line-normal-${i}`}>{line}</React.Fragment>);
                  consecutiveNewlines = 0;
                }
              }
              
              return elements;
            })()}
          </span>
        );
      }
    });
  };

  return (
    <section className={`content-section ${className}`.trim()} id="introduce">
      <div className="container" >
            {/* 메인 타이틀 */}
              <Text typography="heading2" foreground="normal" className="title">
                {(() => {
                  // 줄바꿈을 기준으로 텍스트를 분리
                  const lines = title.split('\n');
                  
                  // 연속된 줄바꿈을 확인하기 위한 변수
                  let consecutiveNewlines = 0;
                  const elements = [];
                  
                  // 각 라인을 처리
                  for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    
                    // 현재 라인이 빈 문자열이면 연속된 줄바꿈 카운트 증가
                    if (line === "") {
                      consecutiveNewlines++;
                      // 마지막 라인이 아니면 계속 진행
                      if (i < lines.length - 1) {
                        continue;
                      }
                    }
                    
                    // 이전 라인이 있고 연속된 줄바꿈이 있으면 <br/> 추가
                    if (i > 0) {
                      // 일반적인 줄바꿈은 무조건 하나 추가
                      elements.push(<br key={`br-${i}-1`} />);
                      
                      // 연속된 줄바꿈이 있으면 추가 <br/> 삽입
                      for (let j = 0; j < consecutiveNewlines; j++) {
                        elements.push(<br key={`br-${i}-${j+2}`} />);
                      }
                    }
                    
                    // 현재 라인이 빈 문자열이 아닌 경우에만 내용 추가
                    if (line !== "") {
                      elements.push(<React.Fragment key={`line-${i}`}>{line}</React.Fragment>);
                      consecutiveNewlines = 0;
                    }
                  }
                  
                  return elements;
                })()}
              </Text>

            {/* 콘텐츠 그리드 */}
            <div className="content-grid">
              {/* 핵심 메시지 섹션 */}
              <div 
                className="content-card core-message-card"
                style={{ 
                  backgroundImage: `url('/assets/${backgroundImage}')`
                }}
              >
                <div className="core-card-content">
                  <Text typography="heading2" foreground="accent" className="core-message-text">
                    {parseMessage(coreMessage)}
                  </Text>
                </div>
              </div>
              
              <div className='content-grid-right'>
                {/* 가치 증명 섹션 */}
                <div className="content-card value-proposition-card">
                  <div className="core-card-content">
                    <div className="value-content">
                      <Text typography="heading5" foreground="normal" className="value-title">
                        {valueTitle}
                      </Text>
                      <Text typography="body2" foreground="normal-lighter" className="value-description">
                        {valueDescription}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* 추천 대상 섹션 */}
                <div className="content-card target-audience-card">
                  <div className="card-header">
                    <Text typography="subtitle1" foreground="primary" className="card-label">
                      이런 분께 추천합니다
                    </Text>
                  </div>
                  <div className="flex flex-col">
                    <div className="target-audience-list">
                      {targetAudience.map((audience, index) => (
                        <div key={index} className="target-audience-item">
                          <div className="audience-bullet"></div>
                          <Text typography="body" foreground="normal" className="audience-text">
                            {audience}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </section>
  );
};

export default DetailIntroduceCourse;