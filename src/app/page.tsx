'use client'

import React, {useState} from 'react'
import {Form,userData } from '../components/form_';
import DecoderForm from '@/components/decoder_form';


const App: React.FC = () => {
  const [secretKey, setSecretKey] = useState<string>('');
  const [jwtEncoded, setJwtEncoded] = useState<string>('');

  const handleFormSubmit = (data: { id: string | number; payload: string; secretKey: string }) => {
    setSecretKey(data.secretKey);
    setJwtEncoded(data.payload);
  };

  const handleSecretKeyChange = (key: string) => {
    setSecretKey(key);
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>JWT Library Demo</h1>
        <Form onSubmit={handleFormSubmit} />
        
      </div>
      <div style={{ flex: 1 }}>
        <DecoderForm onSecretKeyChange={handleSecretKeyChange} />
      </div>
    </div>
  );
}

export default App;