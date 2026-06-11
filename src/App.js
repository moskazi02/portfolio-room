import React, { useState } from 'react';
import './App.css';

import mainRoom from './assets/main-room.png';
import pcZoom from './assets/pcDesktopZoom.png';
import bed from './assets/fileDetails.png';

// 1. Data structure for your projects
const projects = [
  { 
    title: "React App Triathlon", 
    description: "Application mobile développée dans le cadre d'un projet BTS SIO 2ème année, destinée aux triathlètes souhaitant consulter et gérer leurs participations à des compétitions de triathlon.", 
    image: require('./assets/ton-image-1.png') // Import direct
  },
  { 
    title: "Balatro WikiApp", 
    description: "Description ici.", 
    image: require('./assets/ton-image-2.png') 
  }
];

function App() {
  const [currentView, setCurrentView] = useState('mainRoom');
  const [projectIndex, setProjectIndex] = useState(null); // null = closed, 0 or 1 = specific project

  const getBackgroundImage = () => {
    switch(currentView) {
      case 'bed': return bed;
      case 'desktop': return pcZoom;
      default: return mainRoom;
    }
  };

  // 2. Navigation logic for the carousel
  const changeProject = (direction) => {
    let newIndex = projectIndex + direction;
    if (newIndex < 0) newIndex = projects.length - 1;
    if (newIndex >= projects.length) newIndex = 0;
    setProjectIndex(newIndex);
  };

  return (
    <div className="game-container" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
      
      {/* 1. MAIN ROOM */}
      {currentView === 'mainRoom' && (
        <>
          <div className="hotspot" style={{ top: '25%', left: '7%', width: '20%', height: '70%' }} 
               onClick={() => setCurrentView('bed')} />
          <div className="hotspot" style={{ top: '7%', left: '30%', width: '35%', height: '40%' }} 
               onClick={() => setCurrentView('desktop')} />
        </>
      )}

      {/* 2. DESKTOP VIEW */}
      {currentView === 'desktop' && (
        <>
          <div className="back-hotspot" style={{ position: 'absolute', bottom: '5%', left: '45%', width: '10%', height: '15%' }} 
               onClick={() => setCurrentView('mainRoom')} />

          {/* Clicking this opens the carousel at index 0 */}
          <div className="hotspot" style={{top: '7%', left: '14%', width: '34%', height: '65%' }} 
               onClick={() => setProjectIndex(0)} />
        </>
      )}

      {/* 3. BED VIEW */}
      {currentView === 'bed' && (
        <div className="back-hotspot" style={{ position: 'absolute', bottom: '5%', left: '45%', width: '10%', height: '15%' }} 
             onClick={() => setCurrentView('mainRoom')} />
      )}

      {projectIndex !== null && (
  <div className="info-popup">
    {/* This wrapper holds both the box and the arrows */}
    <div className="popup-wrapper">
      
      <button className="nav-arrow left" onClick={() => changeProject(-1)}>◀</button>
      
      <div className="popup-content">
        <h2>{projects[projectIndex].title}</h2>
        <p>{projects[projectIndex].description}</p>

        <img 
          src={projects[projectIndex].image} 
          alt="Project Preview" 
          className="project-image" 
        />

        <button onClick={() => setProjectIndex(null)}>Close</button>
      </div>

      <button className="nav-arrow right" onClick={() => changeProject(1)}>▶</button>
      
    </div>
  </div>
)}
    </div>
  );
}

export default App;