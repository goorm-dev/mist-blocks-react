import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import logoLight from '../../assets/logo_KTB_light.svg'
import logoDark from '../../assets/logo_KTB_dark.svg'
const products = [
  { name: '풀스택', description: '프로그램 간단한 설명', href: '/fullstack', icon: ChartPieIcon },
  { name: '프론트엔드', description: '프로그램 간단한 설명', href: '#', icon: CursorArrowRaysIcon },
  { name: '백엔드', description: '프로그램 간단한 설명', href: '#', icon: FingerPrintIcon },
  { name: '클라우드 네이티브', description: '프로그램 간단한 설명', href: '#', icon: SquaresPlusIcon },
  { name: '클라우드 인프라', description: '프로그램 간단한 설명', href: '#', icon: ArrowPathIcon },
  { name: '생성형 AI', description: '프로그램 간단한 설명', href: '#', icon: ChartPieIcon },
  { name: '사이버 보안', description: '프로그램 간단한 설명', href: '#', icon: CursorArrowRaysIcon },
  { name: '프로덕트 디자이너', description: '프로그램 간단한 설명', href: '#', icon: FingerPrintIcon },
  { name: '프로젝트 매니지먼트', description: '프로그램 간단한 설명', href: '#', icon: SquaresPlusIcon },
]

const mainMenuItems = [
  { name: '교육 소개', href: '#' },
  { 
    name: '교육 프로그램', 
    href: '#', 
    isDropdown: true,
    dropdownItems: products 
  },
  { name: '프로젝트 결과', href: '#' },
  { name: '지원 확인', href: '#' },
]
export default function Example({ isDarkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="container flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Logo"
              src={isDarkMode ? logoDark : logoLight}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--vapor-color-foreground-normal)]"
          >
            <span className="sr-only">Open main menu</span>
            <Bars2Icon aria-hidden="true" className="size-6 stroke-2" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          {mainMenuItems.slice(0, 1).map((item) => (
            <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-3 transition-[background-color]">
              {item.name}
            </Link>
          ))}
          {mainMenuItems.slice(1, 2).map((item) => (
            <Popover key={item.name} className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-3 transition-[background-color]">
                {item.name}
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-[var(--vapor-color-foreground-normal)] stroke-2" />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute left-1/2 z-10 mt-3 w-screen max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl bg-[var(--vapor-color-background-normal)] shadow-lg ring-1 ring-[var(--vapor-color-border-normal)] transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div className="space-y-4">
                    {item.dropdownItems.slice(0, 5).map((dropdownItem) => (
                      <div
                        key={dropdownItem.name}
                        className="group relative flex items-center gap-x-3 rounded-lg p-3 text-sm/6 hover:bg-[var(--vapor-color-gray-400)]/16"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-[var(--vapor-color-background-normal-darker)] group-hover:bg-[var(--vapor-color-background-normal)]">
                          <dropdownItem.icon aria-hidden="true" className="size-5 text-[var(--vapor-color-foreground-normal-lighter)] group-hover:text-[var(--vapor-color-background-primary)]" />
                        </div>
                        <div className="flex-auto">
                          <Link to={dropdownItem.href} className="block font-semibold text-[var(--vapor-color-foreground-normal)]">
                            {dropdownItem.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="text-[var(--vapor-color-foreground-normal-lighter)]">{dropdownItem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {item.dropdownItems.slice(5, 9).map((dropdownItem) => (
                      <div
                        key={dropdownItem.name}
                        className="group relative flex items-center gap-x-3 rounded-lg p-3 text-sm/6 hover:bg-[var(--vapor-color-gray-400)]/16"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-[var(--vapor-color-background-normal-darker)] group-hover:bg-[var(--vapor-color-background-normal)]">
                          <dropdownItem.icon aria-hidden="true" className="size-5 text-[var(--vapor-color-foreground-normal-lighter)] group-hover:text-[var(--vapor-color-background-primary)]" />
                        </div>
                        <div className="flex-auto">
                          <Link to={dropdownItem.href} className="block font-semibold text-[var(--vapor-color-foreground-normal)]">
                            {dropdownItem.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="text-[var(--vapor-color-foreground-normal-lighter)]">{dropdownItem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          ))}
          {mainMenuItems.slice(2, 3).map((item) => (
            <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-3 transition-[background-color]">
              {item.name}
            </Link>
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <button
            onClick={toggleDarkMode}
            className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-3 transition-[background-color]"
          >
            {isDarkMode ? <SunIcon className="size-5 stroke-2" /> : <MoonIcon className="size-5 stroke-2" />}
          </button>
          {mainMenuItems.slice(3, 4).map((item) => (
            <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-3 transition-[background-color]">
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--vapor-color-background-normal)] p-6 sm:max-w-sm sm:ring-1 sm:ring-[var(--vapor-color-border-normal)]">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={isDarkMode ? logoDark : logoLight}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-[var(--vapor-color-foreground-normal)]"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6 stroke-2" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[var(--vapor-color-border-normal)]">
              <div className="space-y-2 py-6">
                {mainMenuItems.slice(0, 1).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                  >
                    {item.name}
                  </Link>
                ))}
                {mainMenuItems.slice(1, 2).map((item) => (
                  <Disclosure key={item.name} as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16">
                      {item.name}
                      <ChevronDownIcon aria-hidden="true" className="size-6 flex-none group-data-open:rotate-180 stroke-2" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <DisclosureButton
                          key={dropdownItem.name}
                          as={Link}
                          to={dropdownItem.href}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                        >
                          {dropdownItem.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {mainMenuItems.slice(2, 4).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={toggleDarkMode}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 transition-[background-color]"
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