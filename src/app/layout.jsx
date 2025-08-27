import {
  GoogleTagManagerBody,
  GoogleTagManagerHead,
} from '../components/GoogleTagManager/GoogleTagManager';
import StructuredData from '../components/StructuredData/StructuredData';
import { DEFAULT_OG_DATA } from '../constants/CourseInformation';
import HydrationWrapper from '../components/HydrationWrapper/HydrationWrapper';
import { createThemeConfig, ThemeScript, ThemeProvider } from '@vapor-ui/core';
import AmplitudeProvider from '../components/AmplitudeManager/AmplitudeProvider';

import './globals.css';

export const metadata = {
  title: DEFAULT_OG_DATA.title,
  description: DEFAULT_OG_DATA.description,
  keywords: DEFAULT_OG_DATA.keywords,
  openGraph: {
    title: DEFAULT_OG_DATA.title,
    description: DEFAULT_OG_DATA.description,
    url: DEFAULT_OG_DATA.baseUrl,
    siteName: 'kt cloud TECH UP',
    images: [
      {
        url: DEFAULT_OG_DATA.image,
        width: 1200,
        height: 630,
        alt: 'kt cloud TECH UP',
      },
    ],
    locale: 'ko_KR',
    type: DEFAULT_OG_DATA.type,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_OG_DATA.title,
    description: DEFAULT_OG_DATA.description,
    images: [DEFAULT_OG_DATA.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: DEFAULT_OG_DATA.baseUrl,
  },
};

const themeConfig = createThemeConfig({
  appearance: 'dark',
  radius: 'none',
  scaling: 1,
  storageKey: 'my-vapor-theme',
});

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="ko">
      <head>
        <ThemeScript />
        <link rel="icon" href="https://cloud.kt.com/favicon.ico" />
        <link rel="apple-touch-icon" href="https://cloud.kt.com/favicon.ico" />
        <StructuredData />
        <GoogleTagManagerHead />
      </head>
      <body>
        <GoogleTagManagerBody />
        <HydrationWrapper>
          <ThemeProvider config={themeConfig}>
            <AmplitudeProvider>{children}</AmplitudeProvider>
          </ThemeProvider>
        </HydrationWrapper>
      </body>
    </html>
  );
}
