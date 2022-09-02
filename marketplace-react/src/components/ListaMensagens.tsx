import { Alert } from "react-bootstrap";
import { useAuthUser } from "../firebase/auth";
import { Anuncio } from "../firebase/firestore";
import { Mensagem } from "./Mensagem";

type Props = {
  anuncio: Anuncio;
  idRemetente?: string;
};

export default function ListaMensagens({ anuncio, idRemetente }: Props) {
  const user = useAuthUser();
  if (!user) return null;

  if (anuncio.anunciante === user.uid) {
    if (!idRemetente)
      return (
        <Alert variant="warning" className="text-center">
          Escolha um usuário na lista ao lado para visualizar as mensagens
          recebidas.
        </Alert>
      );
  }

  return (
    <div
      className="border rounded d-flex flex-column flex-grow-1 p-2"
      style={{ overflowY: "auto", rowGap: "0.5rem" }}
    >
      <Mensagem
        remetente="Eduardo"
        dataEnvio={0}
        texto="Olá, tudo bem?"
        alinhamento="esquerda"
      />
      <Mensagem
        remetente="Eduardo"
        dataEnvio={0}
        texto="Olá, tudo bem?"
        alinhamento="direita"
      />
      <Mensagem
        remetente="Eduardo"
        dataEnvio={0}
        texto="Olá, tudo bem?"
        alinhamento="direita"
      />
      <Mensagem
        remetente="Eduardo"
        dataEnvio={0}
        texto="Olá, tudo bem?"
        alinhamento="esquerda"
      />
      <Mensagem
        remetente="Eduardo"
        dataEnvio={0}
        texto="Olá, tudo bem?"
        alinhamento="direita"
      />
    </div>
  );
}
