import React, { FormEvent, useRef } from "react";
import { Button } from "react-bootstrap";
import { useAuthUser } from "../firebase/auth";
import {
  salvarMensagemInteressado,
  salvarRespostaAnunciante,
} from "../firebase/database";

type Props = {
  idAnuncio: string;
  idInteressado?: string;
};

export default function EnviarMensagem({ idAnuncio, idInteressado }: Props) {
  const mensagemRef = useRef<HTMLInputElement | null>(null);
  const user = useAuthUser();
  if (!user) return null;

  const enviarMensagem = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!idInteressado) return;
    const input = mensagemRef.current;
    if (!input) return;
    const mensagem = input.value.trim();
    if (!mensagem) return;
    const nome = user.displayName || user.email || "Anônimo";
    if (user.uid === idInteressado) {
      await salvarMensagemInteressado(user.uid, nome, idAnuncio, mensagem);
    } else {
      await salvarRespostaAnunciante(idInteressado, idAnuncio, mensagem);
    }
    input.value = "";
  };

  return (
    <form
      className="d-block mt-2 d-flex"
      style={{ columnGap: "0.5rem" }}
      onSubmit={enviarMensagem}
    >
      <input
        ref={mensagemRef}
        className="form-control flex-grow-1"
        type="text"
        placeholder="Digite sua mensagem"
        disabled={!idInteressado}
      />
      <Button
        size="sm"
        className="flex-shrink-0"
        disabled={!idInteressado}
        type="submit"
      >
        Enviar Mensagem
      </Button>
    </form>
  );
}
