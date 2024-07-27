import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'; // Import CSS file for styling

const Profile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log(`Fetching user profile for user ID: ${userId}`);
                const response = await axios.get(`http://localhost:5000/profile/users/${userId}`);
                console.log("User profile data:", response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Error fetching user profile');
            }
        };

        if (userId) {
            fetchUserProfile();
        } else {
            setError('No user ID provided');
        }
    }, [userId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    const getInitial = (name) => {
        return name[0].toUpperCase();
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="avatar">
                    {user.photo ? (
                        <img src={user.photo} alt="Profile" />
                    ) : (
                        <div className="initials">{getInitial(user.name)}</div>
                    )}
                </div>
                <div className="profile-info">
                    <h2>{user.name}</h2>
                    <p>@{user.username}</p>
                </div>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Mobile No:</strong> {user.mobileNo}</p>
                <p><strong>City:</strong> {user.City}</p>
                <p><strong>Landmark:</strong> {user.Landmark}</p>
                <p><strong>State:</strong> {user.State}</p>
                <p><strong>Pincode:</strong> {user.pincode}</p>
            </div>
        </div>
    );
};

export default Profile;