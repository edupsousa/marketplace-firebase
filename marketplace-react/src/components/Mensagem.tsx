import { Toast } from "react-bootstrap";
import formatarTempoDecorrido from "../utils/formatarTempoDecorrido";

type Props = {
  remetente: string;
  dataEnvio: number;
  texto: string;
  alinhamento: "esquerda" | "direita";
};

export function Mensagem({ remetente, dataEnvio, texto, alinhamento }: Props) {
  const alignClass =
    alinhamento === "esquerda" ? "align-self-start" : "align-self-end";
  return (
    <Toast style={{ width: "60%" }} className={alignClass}>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">{remetente}</strong>
        <small>{formatarTempoDecorrido(dataEnvio)}</small>
      </Toast.Header>
      <Toast.Body>{texto}</Toast.Body>
    </Toast>
  );
}
