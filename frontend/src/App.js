import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import DevelopersList from "./components/DevelopersList";
import AddDeveloper from "./components/AddDeveloper";
import Developer from "./components/Developer";
function App({ Component }) {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>
      <Router>
        <Container maxW={"container.md"} marginX={"auto"}>
          <Navbar />
          <Switch>
            <Route exact path={["/"]} component={DevelopersList} />
            <Route exact path="/add" component={AddDeveloper} />
            <Route path="/Developers/:id" component={Developer} />
          </Switch>
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;
