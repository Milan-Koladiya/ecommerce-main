import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmBox = ({ show, onClose, onConfirm, title, message }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Confirm'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || 'Are you sure?'}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmBox;
