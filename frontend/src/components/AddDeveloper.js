import React, { useState } from "react";
import { create } from "../services/DeveloperService";
import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
function AddDeveloper() {
  const initialDeveloperState = {
    id: null,
    name: "",
    description: "",
  };
  const [developer, setDeveloper] = useState(initialDeveloperState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeveloper({ ...developer, [name]: value });
  };
  const saveDeveloper = async () => {
    const data = {
      name: developer.name,
      description: developer.description,
      workStatus: developer.workStatus,
    };
    if (data.name && data.description) {
      create(data)
        .then((response) => {
          setDeveloper({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            workStatus: response.data.workStatus,
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log("error", data);
          console.log(e);
        });
    }
  };
  const newDeveloper = () => {
    setDeveloper(initialDeveloperState);
    setSubmitted(false);
  };
  return (
    <>
      {submitted ? (
        <Box marginX={"auto"}>
          <Text fontSize={"2xl"} padding={"10px"}>
            You submitted successfully!
          </Text>

          <Button className="btn btn-success" onClick={newDeveloper}>
            Add
          </Button>
        </Box>
      ) : (
        <form>
          <FormControl id="name" marginY={"20px"}>
            <FormLabel>Name</FormLabel>
            <Input
              type="name"
              required
              value={developer.name}
              onChange={handleInputChange}
              name="name"
            />
          </FormControl>
          <FormControl id="description" marginY={"20px"}>
            <FormLabel>description</FormLabel>
            <Textarea
              placeholder="Write simple Description about yourself"
              required
              value={developer.description}
              onChange={handleInputChange}
              name="description"
            />
          </FormControl>
          <FormControl marginY={"20px"}>
            <Select name="workStatus" onChange={handleInputChange}>
              <option value={true}>Working</option>
              <option value={false}>Open To Work</option>
            </Select>
          </FormControl>
          <Button onClick={saveDeveloper} colorScheme="blue">
            Add
          </Button>
        </form>
      )}
    </>
  );
}

export default AddDeveloper;
