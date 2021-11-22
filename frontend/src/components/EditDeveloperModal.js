import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { update } from "../services/DeveloperService";
import { useState } from "react";
function EditDeveloperModal({
  developerID,
  currentDeveloper,
  setCurrentDeveloper,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const toast = useToast();
  const [developer, setDeveloper] = useState(currentDeveloper);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeveloper({ ...developer, [name]: value });
  };
  const updateDeveloper = () => {
    const data = {
      name: developer.name,
      description: developer.description,
      workStatus: developer.workStatus,
    };
    if (data.name && data.description) {
      update(developerID, data)
        .then((response) => {
          setCurrentDeveloper(response.data);
        })
        .catch((e) => {
          console.log("error", data);
          console.log(e);
        });
      onClose();
      toast({
        title: "Updated Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} marginX={"2px"}>
        <EditIcon />
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="name" marginY={"20px"}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                required
                value={developer.name}
                onChange={handleInputChange}
                name="name"
              />
            </FormControl>
            <FormControl id="description" marginY={"20px"}>
              <FormLabel>description</FormLabel>
              <Textarea
                required
                value={developer.description}
                onChange={handleInputChange}
                name="description"
              />
            </FormControl>
            <FormControl marginY={"20px"}>
              <Select
                name="workStatus"
                onChange={handleInputChange}
                defaultValue={developer.workStatus}
              >
                <option value={true}>Working</option>
                <option value={false}>Open To Work</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={updateDeveloper} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditDeveloperModal;
