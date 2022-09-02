import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { InteressadoWithId, listarInteressados } from "../firebase/database";
import formatarTempoDecorrido from "../utils/formatarTempoDecorrido";

type Props = {
  idAnuncio: string;
  onInteressadoSelecionado: (interessado: { nome: string; id: string }) => void;
};

export default function ListaInteressados({
  idAnuncio,
  onInteressadoSelecionado,
}: Props) {
  const [selecionado, setSelecionado] = useState<undefined | string>();
  const [interessados, setInteressados] = useState<InteressadoWithId[]>([]);

  useEffect(() => {
    return listarInteressados(idAnuncio, setInteressados);
  }, []);

  const selecionar = (id: string, nome: string) => {
    setSelecionado(id);
    onInteressadoSelecionado({ id, nome });
  };

  return (
    <ListGroup>
      {interessados.map(({ id, nome, ultimaMensagem }) => (
        <ListGroup.Item
          key={id}
          onClick={() => selecionar(id, nome)}
          active={selecionado === id}
          action
        >
          <div className="fw-bold">Interessado: {nome}</div>
          <small>
            Última Mensagem: {formatarTempoDecorrido(ultimaMensagem)}
          </small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
