import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './styles1.css'; // Import external CSS file

function GoogleSignInButton() {
  const navigate = useNavigate(); // Initialize useNavigate

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      // Redirect to welcome screen after successful sign-in
      if (result.user) {
        navigate('/welcome');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="button-container">
      <button 
        onClick={signInWithGoogle}
        className="google-sign-in-button" // Apply CSS class
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default GoogleSignInButton;
