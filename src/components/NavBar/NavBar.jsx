import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars2Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logoLight from '../../assets/logo_ktc_light.svg'
import logoDark from '../../assets/logo_ktc_dark.svg'
import { COURSE_INFORMATION, COURSE_AREA_INFORMATION, COURSE } from '../../constants/CourseInformation'

const COURSE_ICONS = {
  [COURSE.FULLSTACK]: ChartPieIcon,
  [COURSE.FRONTEND]: CursorArrowRaysIcon,
  [COURSE.BACKEND]: FingerPrintIcon,
  [COURSE.GEN_AI]: ChartPieIcon,
  [COURSE.INFORMATION_SECURITY]: CursorArrowRaysIcon,
  [COURSE.CLOUD_INFRASTRUCTURE]: ArrowPathIcon,
  [COURSE.CLOUD_NATIVE]: SquaresPlusIcon,
  [COURSE.PRODUCT_DESIGN]: FingerPrintIcon,
  [COURSE.PRODUCT_MANAGEMENT]: SquaresPlusIcon,
}

const COURSE_DESCRIPTIONS = {
  [COURSE.FULLSTACK]: 'React, Node, Spring 기반 웹 서비스 전 과정 경험',
  [COURSE.FRONTEND]: 'UI 설계부터 인터렉션까지 최신 프론트 기술 학습',
  [COURSE.BACKEND]: '서버, DB, 보안, API까지 실무형 백엔드 기술 학습',
  [COURSE.GEN_AI]: 'LLM 기반 생성형 AI의 원리와 실제 구현 방식 경험',
  [COURSE.INFORMATION_SECURITY]: '침투 테스트, 위협 분석으로 실전 보안 역량 강화',
  [COURSE.CLOUD_INFRASTRUCTURE]: 'IaC, 모니터링, 보안으로 클라우드 운영 자동화',
  [COURSE.CLOUD_NATIVE]: '컨테이너, Kubernetes 기반 마이크로서비스 설계',
  [COURSE.PRODUCT_DESIGN]: 'UX 리서치부터 UI, 디자인 시스템까지 실무 적용',
  [COURSE.PRODUCT_MANAGEMENT]: '애자일 기획과 협업으로 프로젝트 운영 전 과정 경험',
}

const createCourseDropdownItems = (courseTypes) => {
  return courseTypes.map(courseType => ({
    name: COURSE_INFORMATION[courseType].title,
    description: COURSE_DESCRIPTIONS[courseType],
    href: `/detail/${COURSE_INFORMATION[courseType].keyword}`,
    icon: COURSE_ICONS[courseType]
  }))
}

const mainMenuItems = [
  { 
    name: COURSE_AREA_INFORMATION.WEB_DEVELOPMENT.title,
    isDropdown: true,
    dropdownItems: createCourseDropdownItems(COURSE_AREA_INFORMATION.WEB_DEVELOPMENT.courses)
  },
  { 
    name: COURSE_AREA_INFORMATION.INFRA_INNOVATION.title,
    isDropdown: true,
    dropdownItems: createCourseDropdownItems(COURSE_AREA_INFORMATION.INFRA_INNOVATION.courses)
  },
  { 
    name: COURSE_AREA_INFORMATION.PRODUCT_EXPERT.title,
    isDropdown: true,
    dropdownItems: createCourseDropdownItems(COURSE_AREA_INFORMATION.PRODUCT_EXPERT.courses)
  },
]

export default function Example({ isDarkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="container flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 transition-opacity hover:opacity-80">
            <span className="sr-only">Your Company</span>
            <img
              alt="Logo"
              src={isDarkMode ? logoDark : logoLight}
              className="h-9 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-[var(--vapor-color-foreground-normal)]"
          >
            <span className="sr-only">Open main menu</span>
            <Bars2Icon aria-hidden="true" className="size-6 stroke-2" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          {mainMenuItems.map((item) => (
            <Popover key={item.name} className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 p-3 transition-[background-color]">
                {item.name}
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-[var(--vapor-color-foreground-normal)] stroke-2" />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute left-1/2 z-10 mt-3 w-screen max-w-[22.5rem] -translate-x-1/2 overflow-hidden bg-[var(--vapor-color-background-normal)] shadow-lg ring-1 ring-[var(--vapor-color-border-normal)] transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="grid grid-cols-1 gap-4 p-4">
                  <div className="space-y-4">
                    {item.dropdownItems.map((dropdownItem) => (
                      <div
                        key={dropdownItem.name}
                        className="group relative flex items-center gap-x-3 p-3 text-sm/6 hover:bg-[var(--vapor-color-gray-400)]/16"
                      >
                        <div className="flex size-10 flex-none items-center justify-center bg-[var(--vapor-color-background-normal-darker)] group-hover:bg-[var(--vapor-color-background-normal)]">
                          <dropdownItem.icon aria-hidden="true" className="size-5 text-[var(--vapor-color-foreground-normal-lighter)] group-hover:text-[var(--vapor-color-background-danger)]" />
                        </div>
                        <div className="flex-auto">
                          <a href={dropdownItem.href} className="block font-semibold text-[var(--vapor-color-foreground-normal)]">
                            {dropdownItem.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="text-[var(--vapor-color-foreground-normal-lighter)] text-xs">{dropdownItem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <button
            onClick={toggleDarkMode}
            className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 p-3 transition-[background-color]"
          >
            {isDarkMode ? <SunIcon className="size-5 stroke-2" /> : <MoonIcon className="size-5 stroke-2" />}
          </button>
          <a href="#" className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 p-3 transition-[background-color]">
            지원 확인
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--vapor-color-background-normal)] sm:max-w-sm sm:ring-1 sm:ring-[var(--vapor-color-border-normal)]"
          style={{
            paddingLeft: 'calc(var(--spacing) * 5)',
            paddingRight: 'calc(var(--spacing) * 5)',
            paddingTop: 'calc(var(--spacing) * 6)',
            paddingBottom: 'calc(var(--spacing) * 6)'
          }}>
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 transition-opacity hover:opacity-80">
              <img
                alt=""
                src={isDarkMode ? logoDark : logoLight}
                className="h-9 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-[var(--vapor-color-foreground-normal)]"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6 stroke-2" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[var(--vapor-color-border-normal)]">
              <div className="space-y-2 py-6">
                {mainMenuItems.map((item) => (
                  <Disclosure key={item.name} as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between py-2 pr-3.5 pl-3 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16">
                      {item.name}
                      <ChevronDownIcon aria-hidden="true" className="size-6 flex-none group-data-open:rotate-180 stroke-2" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <DisclosureButton
                          key={dropdownItem.name}
                          as="a"
                          href={dropdownItem.href}
                          className="block py-2 pr-3 pl-6 text-sm/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block px-3 py-2.5 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                >
                  지원 확인
                </a>
                <button
                  onClick={toggleDarkMode}
                  className="-mx-3 block px-3 py-2.5 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 transition-[background-color]"
                >
                  {isDarkMode ? <SunIcon className="size-5 stroke-2" /> : <MoonIcon className="size-5 stroke-2" />}
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}