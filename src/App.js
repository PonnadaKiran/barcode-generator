import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UserForm from './UserForm';
import Tracker from './Tracker';
import BarcodeDisplay from './BarcodeDisplay';

function App() {
    const [user, setUser] = useState({ name: '', email: '', phoneNumber: '', address: '' });
    const [barcodeUrl, setBarcodeUrl] = useState('');
    const [userId, setUserId] = useState(null);
    const [inputTracker, setInputTracker] = useState({ name: false, email: false, phoneNumber: false, address: false });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const tracker = {
            name: user.name !== '',
            email: validateEmail(user.email),
            phoneNumber: validatePhoneNumber(user.phoneNumber),
            address: user.address !== '',
        };
        setInputTracker(tracker);
    }, [user]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/; // Validates a 10-digit phone number
        return phoneRegex.test(phoneNumber);
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!user.name) newErrors.name = 'Name is required';
        if (!validateEmail(user.email)) newErrors.email = 'Invalid email address';
        if (!validatePhoneNumber(user.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
        if (!user.address) newErrors.address = 'Address is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createUser = async () => {
        if (!validateInputs()) return;

        try {
            const response = await axios.post('http://localhost:5000/create-user', user);
            setUserId(response.data._id);
            alert('User created successfully');
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    const confirmAndGenerateBarcode = () => {
        if (window.confirm('Are you sure you want to generate the barcode and save the data?')) {
            generateBarcode();
        }
    };

    const generateBarcode = async () => {
        if (!validateInputs()) return;

        try {
            if (!userId) {
                return alert('Please create the user first.');
            }

            const response = await axios.post(`http://localhost:5000/generate-barcode/${userId}`);
            setBarcodeUrl(response.data.barcode);
            alert('Barcode generated and saved successfully!');
        } catch (error) {
            console.error('Error generating barcode', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Barcode Generator</h1>
            <div className="layout-container">
                <div className="main-content">
                    <UserForm user={user} errors={errors} handleInputChange={handleInputChange} />
                    <div className="button-group">
                        <button onClick={createUser} className="action-button">Create User</button>
                        <button onClick={confirmAndGenerateBarcode} className="action-button">Generate Barcode</button>
                    </div>
                    <BarcodeDisplay barcodeUrl={barcodeUrl} />
                </div>
                <div className="tracker-container">
                    <Tracker inputTracker={inputTracker} />
                </div>
            </div>
        </div>
    );
}

export default App;
