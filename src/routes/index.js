import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import ListChamadosPage from "../pages/ListChamados";
import ListTemplatesPage from "../pages/ListTamplates";
import HomePage from "../pages/Home";
import Header from "../components/Header";
import ListAssociacoesPage from "../pages/ListAssociacoes";
import GerenciamentoWipPage from "../pages/ListGerenciarWips";
import KanbanPage from "../pages/Kanban";
export const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tickets" element={<ListChamadosPage />} />
        <Route path="/associacoes" element={<ListAssociacoesPage />} />
        <Route path="/gerenciamento-wip" element={<GerenciamentoWipPage />} />
        <Route path="/templates-resposta" element={<ListTemplatesPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
      </Switch>
    </Router>
  );
};
