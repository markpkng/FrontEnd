import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalComponent = ({open, className, message, title, action}) => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Modal isOpen={open} toggle={action} className={className}>
        <h1 toggle={action}>{title}</h1>
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