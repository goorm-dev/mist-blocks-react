import React from 'react';
import { Text } from '@vapor-ui/core';
import './DetailIntroduceCourse.css';
import { COURSE_CONTENT } from './DetailIntroduceCourse.constant';

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
            <span className="highlight-keyword">
              {part.content.split('\n').map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  {lineIndex < part.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
            <span className="highlight-brace">{'}'}</span>
          </React.Fragment>
        );
      } else {
        // 일반 텍스트에서 줄바꿈 처리
        return (
          <span key={index} className="normal-text">
            {part.content.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex < part.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
        );
      }
    });
  };

  return (
    <section className={`content-section detail-introduce-course-section ${className}`.trim()} id="introduce">
      <div className="container" >
        <div className="detail-introduce-course-wrap">
          <div className="section-inner">
            {/* 메인 타이틀 */}
            <div className="section-title">
              <Text typography="heading2" foreground="normal">
                {title.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </Text>
            </div>

            {/* 콘텐츠 그리드 */}
            <div className="content-grid">
              {/* 핵심 메시지 섹션 */}
              <div className="content-card core-message-card">
                <div className="card-header">
                  <Text typography="subtitle1" foreground="accent" className="card-label">
                    이 교육이 특별한 이유
                  </Text>
                </div>
                <div className="core-card-content">
                  <Text typography="heading2" foreground="accent" className="core-message-text">
                    {parseMessage(coreMessage)}
                  </Text>
                </div>
              </div>
              
              <div className='content-grid-right'>
                {/* 가치 증명 섹션 */}
                <div className="content-card value-proposition-card">
                  <div className="card-header">
                    <Text typography="subtitle1" foreground="primary" className="card-label">
                      검증된 결과
                    </Text>
                  </div>
                  <div className="core-card-content">
                    <div className="value-content">
                      <Text typography="heading5" foreground="normal" className="value-title">
                        {valueTitle}
                      </Text>
                      <Text typography="body1" foreground="hint" className="value-description">
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
                          <Text typography="body1" foreground="normal" className="audience-text">
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
        </div>
      </div>
    </section>
  );
};

export default DetailIntroduceCourse;