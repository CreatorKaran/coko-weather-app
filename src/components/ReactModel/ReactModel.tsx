import React from 'react';
import Modal from 'react-modal';

// Style configuration for the modal
const modalStyles: Modal.Styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
    },
    content: {
        width: '400px',
        height: '250px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        color: '#333333',
        fontFamily: 'Arial, sans-serif',
    },
};

// Popup component
interface PopupProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={modalStyles}
            ariaHideApp={false}
        >
            <h2 style={{ marginBottom: '16px' }}>Hold on!</h2>
            <p style={{ marginBottom: '24px' }}>Cooldown with your search. Too many requests.</p>
            <button onClick={onRequestClose} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#333333', color: '#ffffff', border: 'none' }}>
                Close
            </button>
        </Modal>
    );
};

export default Popup;
