// src/components/ConnectionTest.jsx
import React, { useEffect } from 'react';
import supabase from '../config/supabaseClient'; // No curly braces for default import

const ConnectionTest = () => {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('Users').select('*');

      if (error) {
        console.error('Error connecting to Supabase:', error.message);
      } else {
        console.log('Supabase connection successful. Data:', data);
      }
    };

    testConnection();
  }, []);

  return <p>Testing Supabase connection...</p>;
};

export default ConnectionTest;
