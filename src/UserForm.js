import React from 'react';

function UserForm({ user, errors, handleInputChange }) {
    return (
        <>
            <div className="form-group">
                <input 
                    type="text" 
                    name="name" 
                    value={user.name} 
                    onChange={handleInputChange} 
                    placeholder="Enter name" 
                    className="input-field"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    onChange={handleInputChange} 
                    placeholder="Enter email" 
                    className="input-field"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    name="phoneNumber" 
                    value={user.phoneNumber} 
                    onChange={handleInputChange} 
                    placeholder="Enter phone number" 
                    className="input-field"
                />
                {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    name="address" 
                    value={user.address} 
                    onChange={handleInputChange} 
                    placeholder="Enter address" 
                    className="input-field"
                />
                {errors.address && <div className="error-message">{errors.address}</div>}
            </div>
        </>
    );
}

export default UserForm;
