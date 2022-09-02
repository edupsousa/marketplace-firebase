import { ListGroup } from "react-bootstrap";

export default function Anunciante() {
  return (
    <ListGroup>
      <ListGroup.Item action>
        <div>Vendedor: Eduardo</div>
        <small className="text-muted">Carro - R$ 2000,00</small>
      </ListGroup.Item>
    </ListGroup>
  );
}
