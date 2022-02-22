import React, { useState, useEffect } from "react";
import {
  Table,
  ButtonGroup,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { TemplateRespostaService } from "../../api/TemplatesRespostasService";

export default function ListTemplates() {
  const [templates, setTemplates] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [model, setModel] = useState({ id: 0, title: "", template: "" });

  function toggleEdit() {
    let modalEditt = modalEdit ? false : true;
    setModalEdit(modalEditt);
  }
  function toggleCreate() {
    let modalCreatee = modalCreate ? false : true;
    setModalCreate(modalCreatee);
  }
  async function getAllTemplates() {
    let retorno = await TemplateRespostaService.getAllTemplatesResposta();
    console.log(retorno.data);
    let templates = retorno.data;
    console.log(templates);
    setTemplates(templates);
  }
  async function edit(id) {
    let payload = {
      id: model.id,
      title: model.title,
      template: model.template,
    };

    let retorno = await TemplateRespostaService.updateTemplate(payload);

    if (retorno.status === 200) {
      console.log("retorno 200", retorno);
    } else {
      console.log("retorno erro", retorno);
    }
    toggleEdit();
    resetForm();
    getAllTemplates();
  }
  function onEdit(id) {
    let retorno = templates.filter((e) => e.id === id);
    model.id = retorno[0].id;
    model.title = retorno[0].title;
    model.template = retorno[0].template;
    setModel(model);
    toggleEdit();
  }
  async function create() {
    let payload = {
      title: model.title,
      template: model.template,
    };

    let retorno = await TemplateRespostaService.createTemplate(payload);
    if (retorno.status === 200) {
      console.log("retorno 200", retorno);
    } else {
      console.log("retorno erro", retorno);
    }
    toggleCreate();
    resetForm();
    getAllTemplates();
  }
  async function deletar(id) {
    let retorno = await TemplateRespostaService.deleteTemplate(id);

    if (retorno.status === 200) {
      console.log("retorno 200", retorno);
    } else {
      console.log("retorno erro", retorno);
    }
    getAllTemplates();
  }
  function setValues(e, field) {
    model[field] = e.target.value;
    setModel(model);
  }
  function resetForm() {
    setModel({ id: 0, title: "", template: "" });
  }

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <div>
      <h2 className="font-weight-bold">Lista de Templates</h2>

      <Button color="success" onClick={toggleCreate}>
        Adicionar Template
      </Button>
      <Table className="table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>Título</th>
            <th>Template</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.title}</td>
              <td>{template.template}</td>
              <td>
                <ButtonGroup>
                  <Button
                    color="success"
                    size="sm"
                    onClick={() => onEdit(template.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => deletar(template.id)}
                  >
                    Remover
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>
          Editar Template de Resposta
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="titulo">Título</Label>
              <Input
                id="titulo"
                type="text"
                placeholder="Título do Template"
                defaultValue={model.title}
                onChange={(e) => setValues(e, "title")}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="template">Template</Label>
              <Input
                id="template"
                type="textarea"
                placeholder="Descrição do Template"
                defaultValue={model.template}
                onChange={(e) => setValues(e, "template")}
              ></Input>
            </FormGroup>
            <Button color="primary" block onClick={edit}>
              Editar
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleEdit}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCreate} toggle={toggleCreate}>
        <ModalHeader toggle={toggleCreate}>
          Editar Template de Resposta
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Título</Label>
              <Input
                id="title"
                type="text"
                placeholder="Título do Template"
                onChange={(e) => setValues(e, "title")}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="template">Template</Label>
              <Input
                id="template"
                type="text"
                placeholder="Descrição do Template"
                onChange={(e) => setValues(e, "template")}
              ></Input>
            </FormGroup>
            <Button color="primary" block onClick={create}>
              Adicionar
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleCreate}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

/*export default class ListTemplates extends Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
  }
  state = {
    templates: [],
    modalEdit: false,
    modalCreate: false,
    model: { id: 0, title: "", template: "" },
  };
  toggleEdit() {
    this.setState({
      modalEdit: !this.state.modalEdit,
    });
  }
  toggleCreate() {
    this.setState({
      modalCreate: !this.state.modalCreate,
    });
  }
  getAllTemplates = async () => {
    let retorno = await TemplateRespostaService.getAllTemplatesResposta();
    let templates = retorno.data;
    this.setState({ templates });
  };
  edit = async (id) => {
    let payload = {
      id: this.state.model.id,
      title: this.state.model.title,
      template: this.state.model.template,
    };

    let retorno = await TemplateRespostaService.updateTemplate(payload);

    if (retorno.status === 200) {
      console.log("retorno 200", retorno);
    } else {
      console.log("retorno erro", retorno);
    }
    this.toggleEdit();
    this.resetForm();
    this.getAllTemplates();
  };
  onEdit = (id) => {
    let retorno = this.state.templates.filter((e) => e.id === id);
    const { model } = this.state;
    model.id = retorno[0].id;
    model.title = retorno[0].title;
    model.template = retorno[0].template;
    this.setState({ model });
    this.setState({
      modalEdit: !this.state.modalEdit,
    });
  };
  componentDidMount() {
    this.getAllTemplates();
  }
  create = async () => {
    let payload = {
      title: this.state.model.title,
      template: this.state.model.template,
    };

    let retorno = await TemplateRespostaService.createTemplate(payload);
    if (retorno.status === 200) {
      console.log("retorno 200", retorno);
    } else {
      console.log("retorno erro", retorno);
    }
    this.toggleCreate();
    this.resetForm();
    this.getAllTemplates();
  };
  delete = async (id) => {
    let retorno = await TemplateRespostaService.deleteTemplate(id);

    if (retorno.status === 200) {
      console.log("retorno 200", retorno);
    } else {
      console.log("retorno erro", retorno);
    }
    this.getAllTemplates();
  };
  setValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
  };
  resetForm = () => {
    this.setState({ id: 0, title: "", template: "" });
  };
  render() {
    return (
      <div>
        <h2 className="font-weight-bold">Lista de Templates</h2>

        <Button color="success" onClick={this.toggleCreate}>
          Adicionar Template
        </Button>
        <Table className="table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>Título</th>
              <th>Template</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.templates.map((template) => (
              <tr key={template.id}>
                <td>{template.title}</td>
                <td>{template.template}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => this.onEdit(template.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => this.delete(template.id)}
                    >
                      Remover
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggleEdit}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleEdit}>
            Editar Template de Resposta
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="titulo">Título</Label>
                <Input
                  id="titulo"
                  type="text"
                  placeholder="Título do Template"
                  value={this.state.model.title}
                  onChange={(e) => this.setValues(e, "title")}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="template">Template</Label>
                <Input
                  id="template"
                  type="textarea"
                  placeholder="Descrição do Template"
                  value={this.state.model.template}
                  onChange={(e) => this.setValues(e, "template")}
                ></Input>
              </FormGroup>
              <Button color="primary" block onClick={this.edit}>
                Editar
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggleEdit}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalCreate}
          toggle={this.toggleCreate}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleCreate}>
            Editar Template de Resposta
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Título</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Título do Template"
                  value={this.state.model.title}
                  onChange={(e) => this.setValues(e, "title")}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="template">Template</Label>
                <Input
                  id="template"
                  type="text"
                  placeholder="Descrição do Template"
                  value={this.state.model.template}
                  onChange={(e) => this.setValues(e, "template")}
                ></Input>
              </FormGroup>
              <Button color="primary" block onClick={this.create}>
                Adicionar
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggleCreate}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}*/
