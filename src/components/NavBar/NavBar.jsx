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
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
const products = [
  { name: '프로그램 1', description: '프로그램 간단한 설명', href: '#', icon: ChartPieIcon },
  { name: '프로그램 2', description: '프로그램 간단한 설명', href: '#', icon: CursorArrowRaysIcon },
  { name: '프로그램 3', description: '프로그램 간단한 설명', href: '#', icon: FingerPrintIcon },
  { name: '프로그램 4', description: '프로그램 간단한 설명', href: '#', icon: SquaresPlusIcon },
  { name: '프로그램 5', description: '프로그램 간단한 설명', href: '#', icon: ArrowPathIcon },
  { name: '프로그램 6', description: '프로그램 간단한 설명', href: '#', icon: ChartPieIcon },
  { name: '프로그램 7', description: '프로그램 간단한 설명', href: '#', icon: CursorArrowRaysIcon },
  { name: '프로그램 8', description: '프로그램 간단한 설명', href: '#', icon: FingerPrintIcon },
  { name: '프로그램 9', description: '프로그램 간단한 설명', href: '#', icon: SquaresPlusIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]
export default function Example({ isDarkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="container flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src={isDarkMode 
                ? "https://oopy.lazyrockets.com/api/rest/cdn/image/01976835-e46a-70be-a5bc-0e8bdfa7610c.png" 
                : "https://oopy.lazyrockets.com/api/rest/cdn/image/01976835-e46a-70be-a5bc-0e8bdfa7610c.png"
              }
              className="h-8 w-auto"
            />
          </a>
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
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-2 transition-colors">
            DEEP DIVE 소개
          </a>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-2 transition-colors">
              교육 프로그램
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-[var(--vapor-color-foreground-normal)] stroke-2" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl bg-[var(--vapor-color-background-normal)] shadow-lg ring-1 ring-[var(--vapor-color-border-normal)] transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="space-y-4">
                  {products.slice(0, 5).map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-3 rounded-lg p-3 text-sm/6 hover:bg-[var(--vapor-color-gray-400)]/16"
                    >
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-[var(--vapor-color-background-normal-darker)] group-hover:bg-[var(--vapor-color-background-normal)]">
                        <item.icon aria-hidden="true" className="size-5 text-[var(--vapor-color-foreground-normal-lighter)] group-hover:text-[var(--vapor-color-background-primary)]" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-[var(--vapor-color-foreground-normal)]">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="text-[var(--vapor-color-foreground-normal-lighter)]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {products.slice(5, 9).map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-3 rounded-lg p-3 text-sm/6 hover:bg-[var(--vapor-color-gray-400)]/16"
                    >
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-[var(--vapor-color-background-normal-darker)] group-hover:bg-[var(--vapor-color-background-normal)]">
                        <item.icon aria-hidden="true" className="size-5 text-[var(--vapor-color-foreground-normal-lighter)] group-hover:text-[var(--vapor-color-background-primary)]" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-[var(--vapor-color-foreground-normal)]">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="text-[var(--vapor-color-foreground-normal-lighter)]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </Popover>
          <a href="#" className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-2 transition-colors">
            프로젝트 쇼케이스
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={toggleDarkMode}
            className="text-sm/6 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 rounded-lg p-2 transition-colors"
          >
            {isDarkMode ? <MoonIcon className="size-5 stroke-2" /> : <SunIcon className="size-5 stroke-2" />}
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--vapor-color-background-normal)] p-6 sm:max-w-sm sm:ring-1 sm:ring-[var(--vapor-color-border-normal)]">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={isDarkMode 
                  ? "https://oopy.lazyrockets.com/api/rest/cdn/image/01976835-e46a-70be-a5bc-0e8bdfa7610c.png" 
                  : "https://oopy.lazyrockets.com/api/rest/cdn/image/01976835-e46a-70be-a5bc-0e8bdfa7610c.png"
                }
                className="h-8 w-auto"
              />
            </a>
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
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16">
                    교육 프로그램
                    <ChevronDownIcon aria-hidden="true" className="size-6 flex-none group-data-open:rotate-180 stroke-2" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {products.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                >
                  프로젝트 쇼케이스
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                >
                  문의하기
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16"
                >
                  소개
                </a>
              </div>
              <div className="py-6">
                <button
                  onClick={toggleDarkMode}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-[var(--vapor-color-foreground-normal)] hover:bg-[var(--vapor-color-gray-400)]/16 transition-colors"
                >
                  {isDarkMode ? <MoonIcon className="size-5 stroke-2" /> : <SunIcon className="size-5 stroke-2" />}
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}