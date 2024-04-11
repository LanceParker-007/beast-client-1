import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const InvitationModal = ({ invitation, onResponse }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();

  const handleResponse = (accepted) => {
    onResponse(accepted);
    onClose();
  };

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invitation</ModalHeader>
          <ModalBody>You have been invited to join the game.</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => handleResponse(true)}
            >
              Accept
            </Button>
            <Button colorScheme="red" onClick={() => handleResponse(false)}>
              Decline
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvitationModal;
