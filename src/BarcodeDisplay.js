import React from 'react';

function BarcodeDisplay({ barcodeUrl }) {
    if (!barcodeUrl) return null;

    return (
        <div className="barcode-container">
            <img src={barcodeUrl} alt="Generated Barcode" className="barcode-image" />
            <a href={barcodeUrl} download="barcode.png" className="download-link">Download Barcode</a>
        </div>
    );
}

export default BarcodeDisplay;
