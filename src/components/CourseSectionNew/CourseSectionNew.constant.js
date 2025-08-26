import { COURSE_INFORMATION, COURSE_AREA_INFORMATION } from '../../constants/CourseInformation.js';


export const COURSE_TRACK_LIST = [
    {
        id: 'web-dev',
        title: COURSE_AREA_INFORMATION.WEB_DEVELOPMENT.title,
        description: COURSE_AREA_INFORMATION.WEB_DEVELOPMENT.description,
        hasSlider: false,
        courses: COURSE_AREA_INFORMATION.WEB_DEVELOPMENT.courses.map((courseType, index) => ({
            id: index + 1,
            name: COURSE_INFORMATION[courseType].title,
            startAt: COURSE_INFORMATION[courseType].startAt,
            endAt: COURSE_INFORMATION[courseType].endAt,
            eventStartAt: COURSE_INFORMATION[courseType].eventStartAt,
            eventEndAt: COURSE_INFORMATION[courseType].eventEndAt,
            tags: COURSE_INFORMATION[courseType].tags,
            thumbnailType: 'image',
            imageSrc: COURSE_INFORMATION[courseType].imageSrc,
            link: `/${COURSE_INFORMATION[courseType].keyword}`,
            showCtaButton: false
        }))
    },
    {
        id: 'tech-infra',
        title: COURSE_AREA_INFORMATION.INFRA_INNOVATION.title,
        description: COURSE_AREA_INFORMATION.INFRA_INNOVATION.description,
        hasSlider: false,
        courses: COURSE_AREA_INFORMATION.INFRA_INNOVATION.courses.map((courseType, index) => ({
            id: index + 4,
            name: COURSE_INFORMATION[courseType].title,
            startAt: COURSE_INFORMATION[courseType].startAt,
            endAt: COURSE_INFORMATION[courseType].endAt,
            eventStartAt: COURSE_INFORMATION[courseType].eventStartAt,
            eventEndAt: COURSE_INFORMATION[courseType].eventEndAt,
            tags: COURSE_INFORMATION[courseType].tags,
            thumbnailType: 'image',
            imageSrc: COURSE_INFORMATION[courseType].imageSrc,
            link: `/${COURSE_INFORMATION[courseType].keyword}`,
            showCtaButton: false
        }))
    },
    {
        id: 'product',
        title: COURSE_AREA_INFORMATION.PRODUCT_EXPERT.title,
        description: COURSE_AREA_INFORMATION.PRODUCT_EXPERT.description,
        hasSlider: false,
        courses: COURSE_AREA_INFORMATION.PRODUCT_EXPERT.courses.map((courseType, index) => ({
            id: index + 8,
            name: COURSE_INFORMATION[courseType].title,
            startAt: COURSE_INFORMATION[courseType].startAt,
            endAt: COURSE_INFORMATION[courseType].endAt,
            eventStartAt: COURSE_INFORMATION[courseType].eventStartAt,
            eventEndAt: COURSE_INFORMATION[courseType].eventEndAt,
            tags: COURSE_INFORMATION[courseType].tags,
            thumbnailType: 'image',
            imageSrc: COURSE_INFORMATION[courseType].imageSrc,
            link: `/${COURSE_INFORMATION[courseType].keyword || COURSE_INFORMATION[courseType].path}`,
            showCtaButton: false
        }))
    }
]