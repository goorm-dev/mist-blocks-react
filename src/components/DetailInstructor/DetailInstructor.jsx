'use client';

import { Text, Badge } from '@vapor-ui/core';
import './DetailInstructor.css';
import { INSTRUCTOR_PROFILES } from './DetailInstructor.constant';
import { COURSE } from '../../constants/CourseInformation';

const DetailInstructor = ({ course = COURSE.FRONTEND, className = '' }) => {
  // 해당 course와 매칭되는 강사 프로필 필터링
  const filteredInstructors = INSTRUCTOR_PROFILES.filter(instructor => instructor.course === course);

  // 강사가 없는 경우 빈 섹션 반환
  if (filteredInstructors.length === 0) {
    return null;
  }

  return (
    <section className={`content-section ${className}`.trim()} id="instructor" data-course={course}>
      <div className="container">
        {/* 메인 타이틀 */}
        <Text typography="heading2" foreground="normal" className="title">
          탄탄한 기술과
          <br />
          경험을 지닌 전문 강사
        </Text>

        {/* 강사 카드들 */}
        <div className="instructor-cards-container">
          {filteredInstructors.map((instructor) => (
            <div key={instructor.id} className="instructor-card">
              <div className="instructor-avatar">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="instructor-profile-image"
                />
              </div>
              
              <div className="instructor-info-wrapper">
                <div className="instructor-info">
                  <Text typography="heading3" foreground="normal" className="instructor-name">
                    {instructor.name}
                  </Text>
                  {instructor.description && (
                    <Text 
                      typography="heading6" 
                      foreground="hint" 
                      className="instructor-description"
                      dangerouslySetInnerHTML={{ __html: instructor.description }}
                    />
                  )}
                </div>
                
                <div className="instructor-sections">
                  {/* 이력 소개 섹션 - badge 형태 */}
                  <div className="career-section">
                    <Text typography="heading6" foreground="normal" className="instructor-sub-title">
                      이력 소개
                    </Text>
                    <div className="career-list">
                      {instructor.careerHistory.map((career, index) => (
                        <div key={index} className="career-item">
                          {typeof career === 'string' ? (
                            <Text typography="heading6" foreground="normal" className="career-text-only">
                              {career}
                            </Text>
                          ) : (
                            <>
                              <Badge 
                                size="sm" 
                                color={career.badge === "현재" ? "danger" : "hint"} 
                                shape="square"
                                className="career-badge"
                              >
                                {career.badge}
                              </Badge>
                              <Text typography="subtitle1" foreground="normal" className="career-text">
                                {career.description}
                              </Text>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="instructor-notice-wrapper">
          <Text typography="subtitle1" foreground="hint" className="instructor-notice">
            ※ 운영상의 이유로 강사가 변경될 수 있습니다.
          </Text>
        </div>
      </div>
    </section>
  );
};

export default DetailInstructor;
