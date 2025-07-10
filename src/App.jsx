import React, { useEffect } from 'react';
import Routes from './Routes';
import './styles/tailwind.css';
import themeManager from './utils/themeManager';

function App() {
  useEffect(() => {
    // Initialize theme on app start
    themeManager.applyTheme(themeManager.getCurrentTheme());
  }, []);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;