import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { getAll } from "../services/DeveloperService";
import { NavLink } from "react-router-dom";
function DevelopersList() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancel = false;
    getAll().then((data) => {
      if (cancel) {
        return;
      }
      setDevelopers(data.data);
      setLoading(true);
    });
    return () => {
      cancel = true;
    };
  }, [developers]);
  return (
    <div>
      {loading ? (
        <Table variant="simple">
          <TableCaption>Developers Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Work Status</Th>
              <Th>Profile</Th>
            </Tr>
          </Thead>
          <Tbody>
            {developers.map((developer) => (
              <Tr key={developer.id}>
                <Td>{developer.name}</Td>
                <Td>{developer.description}</Td>
                <Td>{developer.workStatus ? "working" : "open to work"}</Td>
                <Td>
                  <NavLink to={`/Developers/${developer.id}`}>
                    <ExternalLinkIcon />
                  </NavLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default DevelopersList;
