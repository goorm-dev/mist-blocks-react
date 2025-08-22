export const COURSE = {
    PRODUCT_DESIGN: "PRODUCT_DESIGN",
    PRODUCT_MANAGEMENT: "PRODUCT_MANAGEMENT",
    FULLSTACK: "FULLSTACK",
    FRONTEND: "FRONTEND",
    BACKEND: "BACKEND",
    GEN_AI: "GEN_AI",
    INFORMATION_SECURITY: "INFORMATION_SECURITY",
    CLOUD_NATIVE: "CLOUD_NATIVE",
    CLOUD_INFRASTRUCTURE: "CLOUD_INFRASTRUCTURE"
}

export const COURSE_LIST = [
    COURSE.PRODUCT_DESIGN,
    COURSE.PRODUCT_MANAGEMENT,
    COURSE.FULLSTACK,
    COURSE.FRONTEND,
    COURSE.BACKEND,
    COURSE.GEN_AI,
    COURSE.INFORMATION_SECURITY,
    COURSE.CLOUD_NATIVE,
    COURSE.CLOUD_INFRASTRUCTURE
]

export const COURSE_AREA = {
    WEB_DEVELOPMENT: "WEB_DEVELOPMENT",
    INFRA_INNOVATION: "INFRA_INNOVATION",
    PRODUCT_EXPERT: "PRODUCT_EXPERT"
}

export const COURSE_AREA_LIST = [
    COURSE_AREA.WEB_DEVELOPMENT,
    COURSE_AREA.INFRA_INNOVATION,
    COURSE_AREA.PRODUCT_EXPERT
];

export const COURSE_AREA_INFORMATION = {
    WEB_DEVELOPMENT: {
        title: "웹 개발",
        description: "프론트엔드부터 백엔드까지, 웹 개발 전반을 실무로 익히는 실전 중심 트랙",
        courses: [
            COURSE.FULLSTACK,
            COURSE.FRONTEND,
            COURSE.BACKEND,
        ]
    },
    INFRA_INNOVATION: {
        title: "인프라 / 혁신 기술",
        description: "클라우드부터 AI·보안까지, 인프라와 미래 기술 중심의 테크 트랙",
        courses: [
            COURSE.GEN_AI,
            COURSE.INFORMATION_SECURITY,
            COURSE.CLOUD_INFRASTRUCTURE,
            COURSE.CLOUD_NATIVE,
        ]
    },
    PRODUCT_EXPERT: {
        title: "프로덕트 전문가",
        description: "기획부터 설계까지, 디지털 프로덕트 전반을 경험하는 실무형 프로덕트 트랙",
        courses: [
            COURSE.PRODUCT_DESIGN,
            COURSE.PRODUCT_MANAGEMENT,
        ]
    }
}

export const COURSE_INFORMATION = {
    [COURSE.FULLSTACK]: {
        title: "kt cloud 풀스택",
        description: "프론트엔드와 백엔드 모두 다루는 개발 전문가 과정",
        tags: ["React", "Java", "Spring", "아키텍처 설계"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'fullstack',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_fullstack.png",
        imageSrc: "/assets/techup_thumb_fullstack.png",
        detailImageDesktop: "/assets/techup_detail_pc_fullstack.png",
        detailImageMobile: "/assets/techup_detail_mo_fullstack.png"
    },
    [COURSE.FRONTEND]: {
        title: "kt cloud 프론트엔드",
        description: "최상의 사용 경험을 구현하는 인터페이스 전문가 과정",
        tags: ["React", "디자인 시스템", "웹 성능", "UI 설계"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-07-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'frontend',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_frontend.png",
        imageSrc: "/assets/techup_thumb_frontend.png",
        detailImageDesktop: "/assets/techup_detail_pc_frontend.png",
        detailImageMobile: "/assets/techup_detail_mo_frontend.png"
    },
    [COURSE.BACKEND]: {
        title: "kt cloud 백엔드",
        description: "서비스의 코어를 설계하는 개발 전문가 과정",
        tags: ["Java", "Spring Boot", "데이터베이스", "성능 최적화"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'backend',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_backend.png",
        imageSrc: "/assets/techup_thumb_backend.png",
        detailImageDesktop: "/assets/techup_detail_pc_backend.png",
        detailImageMobile: "/assets/techup_detail_mo_backend.png"
    },
    [COURSE.GEN_AI]: {
        title: "kt cloud 생성형 AI",
        description: "생성형 AI 혁신을 이끄는 글로벌 인재 과정",
        tags: ["LLM 성능", "커스텀 RAG", "LLM fine-tuning", "AI 서비스"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'gen-ai',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_genai.png",
        imageSrc: "/assets/techup_thumb_genai.png",
        detailImageDesktop: "/assets/techup_detail_pc_genai.png",
        detailImageMobile: "/assets/techup_detail_mo_genai.png"
    },
    [COURSE.INFORMATION_SECURITY]: {
        title: "kt cloud 사이버 보안",
        description: "데이터와 서비스를 수호하는 보안 전문가 과정",
        tags: ["네트워크보안", "침해사고 대응", "모의해킹", "디지털포렌식"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'cybersecurity',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_security.png",
        imageSrc: "/assets/techup_thumb_security.png",
        detailImageDesktop: "/assets/techup_detail_pc_security.png",
        detailImageMobile: "/assets/techup_detail_mo_security.png"
    },
    [COURSE.CLOUD_NATIVE]: {
        title: "kt cloud 클라우드 네이티브",
        description: "차세대 클라우드 아키텍처 전문가 과정",
        tags: ["Docker", "Kubernetes", "CI/CD", "모니터링", "로그 관리"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'cloud-native',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_cloudnative.png",
        imageSrc: "/assets/techup_thumb_cloudnative.png",
        detailImageDesktop: "/assets/techup_detail_pc_cloudnative.png",
        detailImageMobile: "/assets/techup_detail_mo_cloudnative.png"
    },
    [COURSE.CLOUD_INFRASTRUCTURE]: {
        title: "kt cloud 클라우드 인프라",
        description: "확장성과 안정성을 구축하는 인프라 전문가 과정",
        tags: ["클라우드 운영", "IaC", "비용 최적화", "운영 자동화"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'cloud-infra',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_cloudinfra.png",
        imageSrc: "/assets/techup_thumb_cloudinfra.png",
        detailImageDesktop: "/assets/techup_detail_pc_cloudinfra.png",
        detailImageMobile: "/assets/techup_detail_mo_cloudinfra.png"
    },
    [COURSE.PRODUCT_DESIGN]: {
        title: "kt cloud 프로덕트 디자인",
        description: "사용자 중심 경험을 설계하는 디자인 전문가 과정",
        tags: ["사용자 경험", "UX 리서치", "디자인 시스템", "Figma"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        keyword: 'product-design',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_design.png",
        imageSrc: "/assets/techup_thumb_design.png",
        detailImageDesktop: "/assets/techup_detail_pc_design.png",
        detailImageMobile: "/assets/techup_detail_mo_design.png"
    },
    [COURSE.PRODUCT_MANAGEMENT]: {
        title: "kt cloud 프로덕트 매니지먼트",
        description: "아이디어를 제품으로 비즈니스 임팩트를 만드는 과정",
        tags: ["데이터 분석", "고객 중심 사고", "제품 설계", "로드맵 수립"],
        startAt: new Date('2025-08-27T15:00:00.000Z'),
        endAt: new Date('2025-09-11T14:59:59.999Z'),
        eventStartAt: new Date('2025-09-22T15:00:00.000Z'),
        eventEndAt: new Date('2026-04-22T14:59:59.999Z'),
        path: 'product-management',
        recruitedPeopleAmount: 45,
        navIconSrc: "/assets/techup_nav_pm.png",
        imageSrc: "/assets/techup_thumb_pm.png",
        detailImageDesktop: "/assets/techup_detail_pc_pm.png",
        detailImageMobile: "/assets/techup_detail_mo_pm.png"
    },
}
