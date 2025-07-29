import React from 'react';
import { Text, Button, Badge } from '@vapor-ui/core';
import Aurora from '../Aurora/Aurora';
// import GridDistortion from '../GridDistortion/GridDistortion';
import './HeroSection2.css';

const HeroSection2 = () => {
  return (
    <section className="hero2-root">
      {/* Aurora 배경 */}
      <div className="hero2-bg">
        <Aurora colorStops={["#2E1EAE", "#2CD6E2", "#7A1EEB"]} amplitude={1.0} blend={0.5} />
      </div>
      <div className="hero2-content">
        <div className="hero2-label">
          {/* <Badge color="secondary" size="md">{'{{label text}}'}</Badge> */}
        </div>
        <div className="hero2-headline">
          <Text typography="display4" foreground="undefined" className="hero2-headline-line">{'몰입의 깊이가 실력의 높이가 되는 곳'}</Text>
          <Text typography="display4" foreground="undefined" className="hero2-headline-line">{'DEEP DIVE'}</Text>
        </div>
        <div className="hero2-cta-group">
          <Button size="xl" color="secondary" className="hero2-cta">{'Get Started'}</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2; 