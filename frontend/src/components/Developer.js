import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect, useParams } from "react-router";
import {
  Box,
  Text,
  Spinner,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { get, remove } from "../services/DeveloperService";
import EditDeveloperModal from "./EditDeveloperModal";
function Developer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const param = useParams();
  const [redirect, setRedirect] = useState(false);
  const [developer, setDeveloper] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancel = false;
    get(param.id).then((data) => {
      if (cancel) return;
      setDeveloper(data.data);
      setLoading(true);
    });
    return () => {
      cancel = true;
    };
  }, [param.id, developer]);
  function deleteDeveloper() {
    toast({
      title: "Account Deleted Successfully .",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    remove(param.id);
    setRedirect(true);
  }
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      {loading ? (
        <Box textAlign={"center"}>
          <Text fontSize={"5xl"} paddingY={"10px"}>
            {developer.name}
          </Text>
          <Text fontSize={"xl"} paddingY={"10px"}>
            {developer.description}
          </Text>
          <Text fontSize={"lg"} paddingY={"10px"}>
            {developer.workStatus ? "working" : "open to work"}
          </Text>
          <Flex justifyContent={"center"} paddingY={"30px"}>
            <EditDeveloperModal
              developerID={param.id}
              currentDeveloper={developer}
              setCurrentDeveloper={setDeveloper}
            />
            <Button onClick={onOpen} marginX={"2px"} bg={"red.300"}>
              <DeleteIcon />
            </Button>
          </Flex>
        </Box>
      ) : (
        <Spinner />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you want to delete this Developer</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" bg="red.300" onClick={deleteDeveloper}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Developer;
