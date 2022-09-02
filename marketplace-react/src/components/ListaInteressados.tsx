import { ListGroup } from "react-bootstrap";
import { Anuncio } from "../firebase/firestore";

type Props = {
  idAnuncio: string;
  onInteressadoSelecionado: (id: string) => void;
};

export default function ListaInteressados({
  idAnuncio,
  onInteressadoSelecionado,
}: Props) {
  return (
    <ListGroup>
      <ListGroup.Item action>
        <div>Interessado: Eduardo</div>
        <small className="text-muted">Carro - R$ 2000,00</small>
      </ListGroup.Item>
    </ListGroup>
  );
}
