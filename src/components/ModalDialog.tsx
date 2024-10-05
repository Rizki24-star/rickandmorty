import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface ModalDialogProps {
  status: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  status,
  message,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{status === "error" ? "Oopps!" : "Success"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};

export default ModalDialog;
