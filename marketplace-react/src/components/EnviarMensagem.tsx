import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useAuthUser } from "../firebase/auth";
import { salvarMensagemInteressado } from "../firebase/database";

type Props = {
  idAnuncio: string;
};

export default function EnviarMensagem({ idAnuncio }: Props) {
  const mensagemRef = useRef<HTMLInputElement | null>(null);
  const user = useAuthUser();
  if (!user) return null;

  const enviarMensagem = async () => {
    const input = mensagemRef.current;
    if (!input) return;
    const mensagem = input.value.trim();
    if (!mensagem) return;
    const nome = user.displayName || user.email || "Anônimo";
    await salvarMensagemInteressado(user.uid, nome, idAnuncio, mensagem);
    input.value = "";
  };

  return (
    <div className="mt-2 d-flex" style={{ columnGap: "0.5rem" }}>
      <input
        ref={mensagemRef}
        className="form-control flex-grow-1"
        type="text"
        placeholder="Digite sua mensagem"
      />
      <Button
        size="sm"
        className="flex-shrink-0"
        onClick={() => enviarMensagem()}
      >
        Enviar Mensagem
      </Button>
    </div>
  );
}
