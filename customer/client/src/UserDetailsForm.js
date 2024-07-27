import React, { useState } from 'react';

const UserDetailsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
    contact: ''
  });

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={styles.overlay}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Enter Your Details</h2>
        {[
          { name: 'customerName', label: 'Name' },
          { name: 'address', label: 'Address' },
          { name: 'city', label: 'City' },
          { name: 'state', label: 'State' },
          { name: 'pincode', label: 'Pincode' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'contact', label: 'Contact' },
        ].map(({ name, label, type = 'text' }) => (
          <label key={name} style={styles.label}>
            {label}:
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
        ))}
        <button
          type="submit"
          style={{ ...styles.button, ...(isButtonHovered ? styles.buttonHover : {}) }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  form: {
    backgroundColor: '#333',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '25px 4px 15px rgba(0, 0, 0, 0.3)',
    width: '600px',
    maxWidth: '90%',
    color: '#fff',
  },
  title: {
    marginBottom: '15px',
    textAlign: 'center',
    color: '#fff',
    fontSize: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#ccc',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0 10px 0',
    borderRadius: '5px',
    border: '1px solid #555',
    backgroundColor: '#444',
    color: '#fff',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#555',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#666',
  },
};

export default UserDetailsForm;
