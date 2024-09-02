import React from 'react';
import './Tracker.css';

function Tracker({ inputTracker }) {
    return (
        <div className="tracker-container-vertical">
            {/* Step 1 */}
            <div className={`tracker-step ${inputTracker.name ? 'complete' : ''}`}>
                {inputTracker.name ? <span className="checkmark">✔</span> : <span className="circle"></span>}
            </div>
            <div className={`tracker-line ${inputTracker.name ? 'complete' : ''}`}></div>
            
            {/* Step 2 */}
            <div className={`tracker-step ${inputTracker.email ? 'complete' : ''}`}>
                {inputTracker.email ? <span className="checkmark">✔</span> : <span className="circle"></span>}
            </div>
            <div className={`tracker-line ${inputTracker.email ? 'complete' : ''}`}></div>
            
            {/* Step 3 */}
            <div className={`tracker-step ${inputTracker.phoneNumber ? 'complete' : ''}`}>
                {inputTracker.phoneNumber ? <span className="checkmark">✔</span> : <span className="circle"></span>}
            </div>
            <div className={`tracker-line ${inputTracker.phoneNumber ? 'complete' : ''}`}></div>
            
            {/* Step 4 */}
            <div className={`tracker-step ${inputTracker.address ? 'complete' : ''}`}>
                {inputTracker.address ? <span className="checkmark">✔</span> : <span className="circle"></span>}
            </div>
        </div>
    );
}

export default Tracker;

