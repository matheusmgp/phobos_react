import React, { Component, useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { UserService } from "../../api/UserService";
import {
  Form,
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
function Header() {
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
}
export default Header;
/*export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  state = {
    user: null,
  };
  async getUserAD() {
    let retorno = await UserService.getUserAD();
    console.log("retorno", retorno);
    let user = retorno.data.Concatenado;

    this.setState({ user });
  }
  componentDidMount() {
    this.getUserAD();
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/home">PHOBOS</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
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
                  <DropdownItem href="/associacao-etapas">
                    Associação Kanban
                  </DropdownItem>
                  <DropdownItem href="/cadastro-etapas">
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
            <Nav>
              {this.state.user == null
                ? "Anônimo"
                : this.state.user}
            </Nav>
          </Nav>
        </Navbar>
      </div>
    );
  }
}*/
