import { Button, Col, ListGroup, Row, Toast } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { Mensagem } from "../components/Mensagem";
import { useAuthContext } from "../firebase/auth";

export default function MensagensPage() {
  const { user } = useAuthContext();
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="d-flex flex-column h-100">
      <h1>Mensagens</h1>
      <Row className="flex-grow-1 pb-2">
        <Col lg={4} style={{ overflowY: "auto" }}>
          <ListGroup>
            <ListGroup.Item action>
              <div>Eduardo</div>
              <small className="text-muted">Carro - R$ 2000,00</small>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col className="d-flex flex-column">
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
          <div className="mt-2 d-flex" style={{ columnGap: "0.5rem" }}>
            <input
              className="form-control flex-grow-1"
              type="text"
              placeholder="Digite sua mensagem"
            />
            <Button size="sm" className="flex-shrink-0">
              Enviar Mensagem
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
