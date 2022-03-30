import React, { useState, useEffect } from "react";

import "./styles.css";
import { UserService } from "../../api/UserService";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
export const Header = () => {
  const [userAd, setUserAd] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function getUserAD() {
    let retorno = await UserService.getUserAD();
    console.log("retorno", retorno);
    let user = retorno.data.Concatenado;

    setUserAd(user);
  }
  function toggle() {
    let open = isOpen ? false : true;
    setIsOpen(open);
  }
  useEffect(() => {
    getUserAD();
  }, []);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/home">PHOBOS</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/tickets">Tickets</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/kanban">Kanban</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Painel de Controle
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="/associacoes">
                  Associação Kanban
                </DropdownItem>
                <DropdownItem href="/gerenciamento-wip">
                  Gerenciar WIP
                </DropdownItem>
                <DropdownItem href="/templates-resposta">
                  Cadastro de Templates
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        <Nav>
          <Nav>{userAd == null ? "Anônimo" : userAd}</Nav>
        </Nav>
      </Navbar>
    </div>
  );
};
