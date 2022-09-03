import { ListGroup } from "react-bootstrap";

type Props = {
  nome: string;
  descricao: string;
};

export default function Anunciante({ nome, descricao }: Props) {
  return (
    <ListGroup>
      <ListGroup.Item variant="primary">
        <div className="fw-bold">Falando com o Vendedor: {nome}</div>
        <small>Sobre: {descricao}</small>
      </ListGroup.Item>
    </ListGroup>
  );
}
