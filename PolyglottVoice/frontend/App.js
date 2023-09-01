import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Translation from './components/Translation';
import LanguageDropdown from './components/LanguageDropdown';
import Login from './components/Login';
import Subscription from './components/Subscription';
import { getSupportedLanguages } from './utils/axiosUtils';
import './styles/styles.js';

function App() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    getSupportedLanguages().then(languages => setLanguages(languages));
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleSubscription = (subscription) => {
    setSubscription(subscription);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Polyglott Voice</h1>
        <Login onLogin={handleLogin} />
        {user && <Subscription onSubscription={handleSubscription} />}
      </header>
      <main>
        <VideoPlayer />
        <LanguageDropdown languages={languages} onChange={handleLanguageChange} />
        <Translation language={selectedLanguage} />
      </main>
    </div>
  );
}

export default App;