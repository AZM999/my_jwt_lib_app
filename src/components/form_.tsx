import React, { useState } from 'react';
import { encode_jwt, decode_jwt, validate_jwt } from 'npm_jwt_tllib';


interface payload_spec {
    data?: string;
    id?: string;
    iat?: number;
    exp?: number;
    nbf?: number;
    iss?: string;
    sub?: string;
    [key: string]: any;
}

interface FormProps {
  onSubmit: (data: userData) => void;
}

export interface userData {
    id: string | Number;
  payload: string;
  secretKey: string;
}

export function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = useState<userData>({ id: 0,payload: '', secretKey: '' });
  const [encodedJWT, setEncodedJWT] = useState<string>('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
function parse_payload (pld: string): payload_spec | null {
    
    try{
        const payload_: payload_spec = JSON.parse(pld);
        return payload_;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { id, payload, secretKey } = formData;
    const id_ = id.toString();

    // parse and handle error at runtime
    const payload_ = parse_payload(payload);
    if (typeof payload_ == null) {
        console.error("JSON Parse Error!");
    }
        const token = encode_jwt(secretKey, id_, payload_);

    setEncodedJWT(token);
    onSubmit(formData);
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <h1>Encode and get Token</h1>
      <label style={{ display: 'block', marginBottom: '8px' }}>
          Id:
          <input 
            type="text" 
            name="id" 
            value={formData.id.toString()} 
            onChange={handleInputChange} 
            style={{ 
              display: 'block', 
              width: '100%', 
              padding: '8px', 
              boxSizing: 'border-box', 
              marginTop: '4px', 
              backgroundColor: 'white', 
              color: 'black', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Payload:
          <input 
            type="text" 
            name="payload" 
            value={formData.payload} 
            onChange={handleInputChange} 
            style={{ 
              display: 'block', 
              width: '100%', 
              padding: '8px', 
              boxSizing: 'border-box', 
              marginTop: '4px', 
              backgroundColor: 'white', 
              color: 'black', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Secret Key:
          <input 
            type="text" 
            name="secretKey" 
            value={formData.secretKey} 
            onChange={handleInputChange} 
            style={{ 
              display: 'block', 
              width: '100%', 
              padding: '8px', 
              boxSizing: 'border-box', 
              marginTop: '4px', 
              backgroundColor: 'white', 
              color: 'black', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </label>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Encode!
        </button>
      </form>
      {encodedJWT && (
        <div style={{ marginTop: '20px' }}>
          <h3>Encoded JWT:</h3>
          <p style={{ wordBreak: 'break-all' }}>{encodedJWT}</p>
        </div>
      )}
    </div>
  );
}
