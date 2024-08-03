// components/DecoderForm.tsx
import React, { useState } from 'react';
import { decode_jwt, validate_jwt } from 'npm_jwt_tllib';

interface DecoderFormProps {
  onSecretKeyChange: (key: string) => void; // To update the secret key in the parent component
}

const DecoderForm: React.FC<DecoderFormProps> = ({ onSecretKeyChange }) => {
  const [jwtToken, setJwtToken] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [decodedPayload, setDecodedPayload] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'jwtToken') {
      setJwtToken(value);
    } else if (name === 'secretKey') {
      setSecretKey(value);
      onSecretKeyChange(value); // Update the secret key in the parent component
    }
  }

  function handleDecode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const payload = decode_jwt(secretKey, jwtToken);
      console.log("Decoded Payload:", payload); // Debugging log
      setDecodedPayload(JSON.stringify(payload)); // Set the decoded payload string
    } catch (error) {
      console.error("Error decoding JWT:", error.message);
      setDecodedPayload(null);
    }
  }

  function handleValidate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const valid = validate_jwt(secretKey, jwtToken);
      setIsValid(valid);
    } catch (error) {
      console.error("Error validating JWT:", error.message);
      setIsValid(false);
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h2>Decode and Validate JWT</h2>
      <form onSubmit={handleDecode}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          JWT Token:
          <input
            type="text"
            name="jwtToken"
            value={jwtToken}
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
              borderRadius: '4px',
            }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Secret Key:
          <input
            type="text"
            name="secretKey"
            value={secretKey}
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
              borderRadius: '4px',
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            marginRight: '10px',
          }}
        >
          Decode JWT
        </button>
      </form>
      <form onSubmit={handleValidate} style={{ marginTop: '10px' }}>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#FFF',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Validate JWT
        </button>
      </form>
      {decodedPayload && (
        <div style={{ marginTop: '20px' }}>
          <h3>Decoded Payload:</h3>
          <pre style={{ wordBreak: 'break-all' }}>{decodedPayload}</pre> {/* Display the decoded payload */}
        </div>
      )}
      {isValid !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Validation Status:</h3>
          <p style={{ color: isValid ? 'green' : 'red' }}>{isValid ? 'Valid JWT' : 'Invalid JWT'}</p>
        </div>
      )}
    </div>
  );
};

export default DecoderForm;
