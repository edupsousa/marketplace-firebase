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
  const [carregando, setCarregando] = useState(true);
  const [selecionado, setSelecionado] = useState<undefined | string>();
  const [interessados, setInteressados] = useState<InteressadoWithId[]>([]);

  useEffect(() => {
    return listarInteressados(idAnuncio, (lista) => {
      setInteressados(lista);
      setCarregando(false);
    });
  }, []);

  const selecionar = (id: string, nome: string) => {
    setSelecionado(id);
    onInteressadoSelecionado({ id, nome });
  };

  return (
    <ListGroup>
      {carregando && <ListGroup.Item>Carregando...</ListGroup.Item>}
      {!carregando && interessados.length === 0 && (
        <ListGroup.Item variant="danger">Nenhum interessado 😕</ListGroup.Item>
      )}
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
