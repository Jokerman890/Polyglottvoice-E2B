import React, { useState } from 'react';
import axios from '../utils/axiosUtils';

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subscribeUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/subscribe');
      if (response.status === 200) {
        setLoading(false);
        window.dispatchEvent(new CustomEvent('subscriptionSuccess'));
      } else {
        throw new Error('Subscription failed');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <button id="subscriptionButton" onClick={subscribeUser} disabled={loading}>
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Subscription;