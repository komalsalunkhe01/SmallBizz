import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


function EmailAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default EmailAuth;
