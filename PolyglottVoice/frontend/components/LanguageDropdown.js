import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosUtils';

const LanguageDropdown = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('/api/languages');
        setLanguages(response.data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div id="languageDropdown">
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;