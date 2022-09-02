import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuthUser } from "../firebase/auth";
import { listarMensagens, MensagemWithId } from "../firebase/database";
import { Anuncio } from "../firebase/firestore";
import { Mensagem } from "./Mensagem";

type Props = {
  idAnuncio: string;
  idAnunciante: string;
  nomeAnunciante: string;
  idUsuario?: string;
  nomeUsuario?: string;
};

export default function ListaMensagens({
  idAnuncio,
  idAnunciante,
  nomeAnunciante,
  idUsuario,
  nomeUsuario,
}: Props) {
  const [mensagens, setMensagens] = useState<MensagemWithId[]>([]);
  const user = useAuthUser();
  if (!user) return null;

  useEffect(() => {
    if (!idUsuario) return () => {};
    return listarMensagens(idAnuncio, idUsuario, setMensagens);
  }, [idAnuncio, idUsuario]);

  const isAnunciante = idAnunciante === user.uid;
  const isInteressado = !isAnunciante;

  const getRemetenteSouEu = useCallback(
    (fromInteressado: boolean) => {
      if (
        (fromInteressado && isInteressado) ||
        (!fromInteressado && isAnunciante)
      ) {
        return true;
      }
      return false;
    },
    [isAnunciante, isInteressado]
  );

  const getNomeRemetente = useCallback(
    (fromInteressado: boolean) => {
      if (getRemetenteSouEu(fromInteressado)) {
        return "Você";
      }
      if (isAnunciante) return nomeUsuario;
      return nomeAnunciante;
    },
    [getRemetenteSouEu, isAnunciante, nomeAnunciante, nomeUsuario]
  );

  if (isAnunciante) {
    if (!idUsuario || !nomeUsuario) {
      return (
        <Alert variant="warning" className="text-center">
          Escolha um usuário na lista ao lado para visualizar as mensagens
          recebidas.
        </Alert>
      );
    }
  }

  return (
    <div
      className="border rounded d-flex flex-column flex-grow-1 p-2"
      style={{ overflowY: "auto", rowGap: "0.5rem" }}
    >
      {mensagens.map(({ id, fromInteressado, dataEnvio, texto }) => (
        <Mensagem
          key={id}
          remetente={getNomeRemetente(fromInteressado)}
          alinhamento={
            getRemetenteSouEu(fromInteressado) ? "direita" : "esquerda"
          }
          dataEnvio={dataEnvio}
          texto={texto}
        />
      ))}
    </div>
  );
}
