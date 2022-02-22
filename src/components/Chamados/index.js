import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, Label, Input } from "reactstrap";
import { TicketService } from "../../api/TicketService";

export default function ListChamados() {
  const [chamados, setChamados] = useState([]);
  const [grupoDeAtendimentoAtual, setGrupoDeAtendimentoAtual] = useState("");
  const [onlyProj, setOnlyProjects] = useState(false);

  async function getChamados(grupo, onlyProjects) {
    let retorno = await TicketService.getAllTickets(grupo, onlyProjects);

    if (retorno.data.length > 0) {
      let chamados = retorno.data;
      setChamados(chamados);
    }
  }

  async function onChangeGrupoAtendimento(event) {
    if (event.target.value !== "00") {
      setOnlyProjects(false);
      setGrupoDeAtendimentoAtual(event.target.value);
      getChamados(event.target.value, false);
    }
  }
  function onlyProjects(event) {
    if (grupoDeAtendimentoAtual !== "") {
      setOnlyProjects(event.target.checked);
      getChamados(grupoDeAtendimentoAtual, event.target.checked);
    }
  }

  return (
    <div className="container-fluid">
      <Form>
        <FormGroup className="col-sm-3">
          <Input
            type="select"
            name="grupo"
            id="grupo"
            onChange={(e) => onChangeGrupoAtendimento(e)}
          >
            <option value="00">Escolha um Grupo</option>
            <option value="01">Tecnologia da Informação</option>
            <option value="73">Sistemas Especialistas</option>
            <option value="94">Central de Serviços</option>
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onChange={(e) => onlyProjects(e)} /> Exibir
            Somente Projetos
          </Label>
        </FormGroup>
      </Form>
      <h2 className="font-weight-bold">Lista de Chamados</h2>

      <Table className="table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>Código</th>
            <th>Atribuido</th>
            <th>Classificacao</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.assignedTo}</td>
              <td>{chamado.classification}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

/*export default class ListChamados extends Component {
  state = {
    chamados: [],
  };
  async getChamados() {
    let retorno = await TicketService.getAllTickets("73", false);
    console.log("retorno", retorno.data);
    if (retorno.data.length > 0) {
      let chamados = retorno.data;
      this.setState({ chamados });
    }
  }

  componentDidMount() {
    this.getChamados();
  }
  render() {
    return (
      <div>
        <h2 className="font-weight-bold">Lista de Chamados</h2>

        <Table className="table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>Código</th>
              <th>Atribuido</th>
              <th>Classificacao</th>
            </tr>
          </thead>
          <tbody>
            {this.state.chamados.map((chamado) => (
              <tr key={chamado.id}>
                <td>{chamado.id}</td>
                <td>{chamado.assignedTo}</td>
                <td>{chamado.classification}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
*/
