import { ListGroup } from "react-bootstrap";

type Props = {
  nome: string;
  descricao: string;
};

export default function Anunciante({ nome, descricao }: Props) {
  return (
    <ListGroup>
      <ListGroup.Item action>
        <div>Falando com o Vendedor: {nome}</div>
        <small className="text-muted">Sobre: {descricao}</small>
      </ListGroup.Item>
    </ListGroup>
  );
}
