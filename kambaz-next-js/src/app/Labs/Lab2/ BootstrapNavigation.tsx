"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BootstrapNavigation() {
  return (
    <Container>
      <div id="wd-css-navigating-with-tabs">
        <h2>Tabs</h2>
        <Nav variant="tabs">
          <NavItem>
            <NavLink href="#/Labs/Lab2/Active">Active</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link1">Link 1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link2">Link 2</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Disabled" disabled>
              Disabled
            </NavLink>
          </NavItem>
        </Nav>
      </div>

      <div id="wd-css-navigating-with-cards" className="mt-4">
        <h2>Cards</h2>
        <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/SpaceX_Starship_ignition_during_IFT-5.jpg" />
          <Card.Body>
            <Card.Title>Stacking Starship</Card.Title>
            <Card.Text>
              Stacking the most powerful rocket in history. Mars or bust!
            </Card.Text>
            <Button variant="primary">Boldly Go</Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
