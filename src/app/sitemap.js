import { COURSE_INFORMATION } from '../constants/CourseInformation';

export const dynamic = 'force-static';

export default function sitemap() {
    // 현재 날짜를 가져와서 lastModified에 사용
    const date = new Date();

    // 메인 페이지 URL
    const mainPageUrl = {
        url: 'https://ktcloud-techup.com',
        lastModified: date,
        changeFrequency: 'daily',
        priority: 1,
    };

    // 각 코스별 URL 생성
    const courseUrls = Object.values(COURSE_INFORMATION).map(course => ({
        url: `https://ktcloud-techup.com/${course.keyword}`,
        lastModified: date,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 모든 URL 합치기
    return [mainPageUrl, ...courseUrls];
}