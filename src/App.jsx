import React from 'react'
import './App.css'
import HeroSection2 from './components/Hero_2/HeroSection2';
import HeroSection1 from './components/Hero_1/HeroSection1'
import GridSection1 from './components/Grid_1/GridSection1';
import AccordionFaq from './components/AccordionFaq/AccordionFaq';
import FooterFull from './components/FooterFull/FooterFull';
import Navbar from './components/NavBar/NavBar';

function App() {
  return (
    <main>
        <Navbar />
        <HeroSection2 />
        <HeroSection1 />
        <GridSection1 />
        <AccordionFaq />
        <FooterFull />
    </main>
  )
}

export default App
