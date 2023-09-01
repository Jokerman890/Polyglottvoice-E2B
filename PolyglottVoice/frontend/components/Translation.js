import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosUtils';

const Translation = ({ videoId }) => {
  const [translation, setTranslation] = useState('');

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const response = await axios.get(`/api/translate/${videoId}`);
        setTranslation(response.data.translation);
      } catch (error) {
        console.error('Error fetching translation:', error);
      }
    };

    fetchTranslation();
  }, [videoId]);

  return (
    <div id="translationOutput">
      {translation}
    </div>
  );
};

export default Translation;