import { useState } from 'react';
import { Text, Card } from '@vapor-ui/core';
import './DetailCurriculum.css';
import { CURRICULUM_DATA } from './DetailCurriculum.constant';

const DetailCurriculum = ({ course }) => {
  const [openIndexes, setOpenIndexes] = useState([0]);
  const [activeIndex, setActiveIndex] = useState('0-0');
  const curriculumData = CURRICULUM_DATA[course] ?? [];
  
  const handleAccordionClick = (idx) => {
    // Check if the card is not already open
    if (!openIndexes.includes(idx)) {
      setOpenIndexes([idx]); // 하나만 열리게
      setActiveIndex(`${idx}-0`); // Set the first item in this curriculum as active
    } else {
      // If closing, just remove from open indexes
      setOpenIndexes([]);
    }
  };

  return (
    <section className="content-section curriculum-section" id="curriculum">
      <div className="container">
        <Text typography="heading2" foreground='normal' className="title">단계별 학습 설계로<br/>탄탄하게 쌓는 커리큘럼</Text>  
        {/* 커리큘럼 아코디언 */}
        <div className="curriculum-content">
          {curriculumData.length > 0 ? (
            <div className="curriculum-grid">
              <div className="curriculum-column left-column">
                {curriculumData.slice(0, 4).map((item, idx) => (
              <Card.Root key={idx} className="curriculum-card">
                <Card.Header style={{ padding: 0 }} className="curriculum-card-header">
                  <button
                    className="curriculum-toggle-btn"
                    onClick={() => handleAccordionClick(idx)}
                    aria-expanded={openIndexes.includes(idx)}
                  >
                    <div className="curriculum-question-container">
                      <Text typography="heading6" className="curriculum-week">{item.week}개월</Text>
                      <Text typography="heading6" className="curriculum-title">{item.title}</Text>
                    </div>
                    <span className="curriculum-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </Card.Header>
                {openIndexes.includes(idx) && (
                  <Card.Body className="curriculum-card-body">
                    <div className="curriculum-content-detail">
                      {item.contents.map((content, contentIdx) => (
                        <div 
                          key={contentIdx} 
                          className={`curriculum-item-wrapper ${activeIndex === `${idx}-${contentIdx}` ? 'active' : ''}`}
                          onClick={() => setActiveIndex(`${idx}-${contentIdx}`)}
                        >
                          <div className="curriculum-dot-container">
                            <div className="curriculum-dot" />
                          </div>
                          <div className="curriculum-content-container">
                            <div className="curriculum-hover-container">
                              <Text typography='heading6' className='curriculum-content-title'>
                                {typeof content === 'object' ? content.title : 
                                 content.includes(":") ? content.split(":")[0] : content}
                              </Text>
                              {typeof content === 'object' && (
                                <Text typography='body2' foreground="secondary" className={`curriculum-content-description ${activeIndex === `${idx}-${contentIdx}` ? 'active' : ''}`}>
                                  {content.description}
                                </Text>
                              )}
                              {typeof content === 'string' && content.includes(":") && (
                                <Text typography='body2' foreground="secondary" className={`curriculum-content-description ${activeIndex === `${idx}-${contentIdx}` ? 'active' : ''}`}>
                                  {content.split(":").slice(1).join(":")}
                                </Text>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                )}
              </Card.Root>
            ))}
              </div>
              <div className="curriculum-column right-column">
                {curriculumData.slice(4).map((item, idx) => (
              <Card.Root key={idx + 4} className="curriculum-card">
                <Card.Header style={{ padding: 0 }} className="curriculum-card-header">
                  <button
                    className="curriculum-toggle-btn"
                    onClick={() => handleAccordionClick(idx + 4)}
                    aria-expanded={openIndexes.includes(idx + 4)}
                  >
                    <div className="curriculum-question-container">
                      <Text typography="heading6" className="curriculum-week">{item.week}개월</Text>
                      <Text typography="heading6" className="curriculum-title">{item.title}</Text>
                    </div>
                    <span className="curriculum-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </Card.Header>
                {openIndexes.includes(idx + 4) && (
                  <Card.Body className="curriculum-card-body">
                    <div className="curriculum-content-detail">
                      {item.contents.map((content, contentIdx) => (
                        <div 
                          key={contentIdx} 
                          className={`curriculum-item-wrapper ${activeIndex === `${idx + 4}-${contentIdx}` ? 'active' : ''}`}
                          onClick={() => setActiveIndex(`${idx + 4}-${contentIdx}`)}
                        >
                          <div className="curriculum-dot-container">
                            <div className="curriculum-dot" />
                          </div>
                          <div className="curriculum-content-container">
                            <div className="curriculum-hover-container">
                              <Text typography='heading6' className='curriculum-content-title'>
                                {typeof content === 'object' ? content.title : 
                                 content.includes(":") ? content.split(":")[0] : content}
                              </Text>
                              {typeof content === 'object' && (
                                <Text typography='body2' foreground="secondary" className={`curriculum-content-description ${activeIndex === `${idx + 4}-${contentIdx}` ? 'active' : ''}`}>
                                  {content.description}
                                </Text>
                              )}
                              {typeof content === 'string' && content.includes(":") && (
                                <Text typography='body2' foreground="secondary" className={`curriculum-content-description ${activeIndex === `${idx + 4}-${contentIdx}` ? 'active' : ''}`}>
                                  {content.split(":").slice(1).join(":")}
                                </Text>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                )}
              </Card.Root>
            ))}
              </div>
            </div>
          ) : (
            <Text typography="body1" foreground="secondary" className="no-curriculum-message">
              해당 과정의 커리큘럼 정보가 없습니다.
            </Text>
          )}
        </div>
        </div>
    </section>
  );
};

export default DetailCurriculum;