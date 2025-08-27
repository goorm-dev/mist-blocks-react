'use client';

import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

export default function ClientLayout({ children }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}