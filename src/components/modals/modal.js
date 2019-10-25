import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';

const ModalComponent = ({open, message, title, action}) => {
  return (
    <div>
      <Modal className='mStyles' isOpen={open} toggle={action}>
        <ModalHeader className='mHeader'>
          <div toggle={action}>{title}</div>
        </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button className='mButton' color="secondary" onClick={action}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalComponent;