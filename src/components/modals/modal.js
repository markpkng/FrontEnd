import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalComponent = ({open, className, message, title, action}) => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Modal isOpen={open} toggle={action} className={className}>
        <ModalHeader toggle={action}>{title}</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={action}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalComponent;