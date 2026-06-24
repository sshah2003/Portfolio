import React from 'react';
import Nav from './components/Header';
import Hero from './components/About';
import Experience from './components/Resume';
import ClassmateSection from './components/Testimonials';
import Projects from './components/Portfolio';
import Footer from './components/Footer';
import resumeData from './resumeData';
import './index.css';

export default function App() {
  return (
    <div>
      <Nav resumeData={resumeData} />
      <Hero resumeData={resumeData} />
      <Experience resumeData={resumeData} />
      <ClassmateSection />
      <Projects resumeData={resumeData} />
      <Footer resumeData={resumeData} />
    </div>
  );
}
