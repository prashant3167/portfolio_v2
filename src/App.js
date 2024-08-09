import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Input } from '@mui/material';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const callRestApi = async () => {
  const jsonResponse = [
    { name: "Bitch" },
    { name: "Shit" },
    { name: "Ass" },
  ]; 

  console.log(jsonResponse);

  const arrayOfLists = jsonResponse.map(
    (record, index) => <li key={index}><b>{record.name}</b></li>
  );

  return arrayOfLists;
};

const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",  
    },
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#696969",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  const onSubmit = (data) => {
    console.log(data);  
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSubmit(onSubmit)(); 
    }
  };

  const [apiResponse, setApiResponse] = useState("*** now loading ***");

  useEffect(() => {
    callRestApi().then(
      result => setApiResponse(result)
    );
  }, []);

  return (
    <div className="App" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {/* Particles component for background effect */}
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,  // Ensures particles are in the background
          opacity: 0.5, // Adjust opacity as needed
        }}
      />

      <header className="App-header" style={{ position: 'relative', zIndex: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          Rizwan is a {' '}
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="_____" 
                onKeyDown={handleKeyDown}
                disableUnderline
                sx={{
                  color: 'inherit',
                  fontSize: 'inherit',
                }} 
              />
            )}
          />
        </form>

        <div style={{ textAlign: 'left', width: '50%', paddingLeft: '30px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {apiResponse}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
