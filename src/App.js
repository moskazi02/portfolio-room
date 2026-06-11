import React, { useState } from 'react';
import './App.css';

// Imports des images
import mainRoom from './assets/main-room.png';
import pcZoom from './assets/pcDesktopZoom.png';
import bed from './assets/fileDetails.png';
import introCharNeutral from './assets/introCharNeutral.png';
import introCharTalking from './assets/introCharTalking.png';

const introDialogues = [
  { text: "Salut moi c'est Mostafa !", charImage: introCharNeutral },
  { text: "Je ne savais pas comment me presenter et montrer mes projets..", charImage: introCharNeutral },
  { text: "alors au lieu de faire un portfolio minimaliste..", charImage: introCharNeutral },
  { text: "je vous invite dans ma chambre !", charImage: introCharTalking }
];

const projects = [
  { 
    title: "React App Triathlon", 
    description: "Application mobile développée dans le cadre d'un projet BTS SIO 2ème année...", 
    image: require('./assets/ton-image-1.png') 
  },
  { 
    title: "Balatro WikiApp", 
    description: "Description ici.", 
    image: require('./assets/ton-image-2.png') 
  }
];

function App() {
  const [currentView, setCurrentView] = useState('mainRoom');
  const [projectIndex, setProjectIndex] = useState(null);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const advanceDialogue = () => {
    if (currentDialogueIndex < introDialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      setIsIntroActive(false);
    }
  };

  const getBackgroundImage = () => {
    switch(currentView) {
      case 'bed': return bed;
      case 'desktop': return pcZoom;
      default: return mainRoom;
    }
  };

  const changeProject = (direction) => {
    let newIndex = projectIndex + direction;
    if (newIndex < 0) newIndex = projects.length - 1;
    if (newIndex >= projects.length) newIndex = 0;
    setProjectIndex(newIndex);
  };

  const introScene = (
    <div className="intro-container" onClick={advanceDialogue}>
      <img 
        src={introDialogues[currentDialogueIndex].charImage} 
        alt="Character" 
        className="intro-character" 
      />
      <div className="speech-bubble">
        {introDialogues[currentDialogueIndex].text}
      </div>
    </div>
  );

  return (
    <div className="game-container" style={{ backgroundImage: isIntroActive ? 'none' : `url(${getBackgroundImage()})` }}>
      
      {isIntroActive ? introScene : (
        <>
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
              <div className="hotspot" style={{ top: '7%', left: '14%', width: '34%', height: '65%' }} 
                   onClick={() => setProjectIndex(0)} />
            </>
          )}

          {/* 3. BED VIEW */}
          {currentView === 'bed' && (
            <div className="back-hotspot" style={{ position: 'absolute', bottom: '5%', left: '45%', width: '10%', height: '15%' }} 
                 onClick={() => setCurrentView('mainRoom')} />
          )}

          {/* POP-UP PROJET */}
          {projectIndex !== null && (
            <div className="info-popup">
              <div className="popup-wrapper">
                <button className="nav-arrow left" onClick={() => changeProject(-1)}>◀</button>
                <div className="popup-content">
                  <h2>{projects[projectIndex].title}</h2>
                  <p>{projects[projectIndex].description}</p>
                  <img src={projects[projectIndex].image} alt="Project Preview" className="project-image" />
                  <button onClick={() => setProjectIndex(null)}>Close</button>
                </div>
                <button className="nav-arrow right" onClick={() => changeProject(1)}>▶</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;