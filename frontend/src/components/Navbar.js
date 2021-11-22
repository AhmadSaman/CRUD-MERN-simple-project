import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
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
import { AddIcon, MoonIcon, SunIcon, DeleteIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { removeAll } from "../services/DeveloperService";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  function deleteAll() {
    toast({
      title: "All the Accounts Deleted Successfully .",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    removeAll();
    onClose();
  }

  return (
    <Box mb={"15px"}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Button>
          <NavLink to="/">Developers</NavLink>
        </Button>
        <Button onClick={onOpen}>
          <DeleteIcon />
        </Button>
        <Flex alignItems={"center"}>
          <Button mx={2}>
            <NavLink to="/add">
              <AddIcon />
            </NavLink>
          </Button>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete All Developers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you want to delete all the Developers</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" bg="red.300" onClick={deleteAll}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
