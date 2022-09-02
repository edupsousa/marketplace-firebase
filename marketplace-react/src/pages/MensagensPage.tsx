import { useEffect, useState } from "react";
import { Alert, Button, Col, ListGroup, Row, Toast } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import Anunciante from "../components/Anunciante";
import EnviarMensagem from "../components/EnviarMensagem";
import ListaInteressados from "../components/ListaInteressados";
import ListaMensagens from "../components/ListaMensagens";
import { Mensagem } from "../components/Mensagem";
import { useAuthContext } from "../firebase/auth";
import { Anuncio, obterAnuncio } from "../firebase/firestore";

export default function MensagensPage() {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }

  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const { idAnuncio } = useParams();

  useEffect(() => {
    const carregarAnuncio = async (id: string) => {
      const anuncio = await obterAnuncio(id);
      if (anuncio) {
        setAnuncio(anuncio);
      } else {
        setNaoEncontrado(true);
      }
    };

    if (idAnuncio) {
      carregarAnuncio(idAnuncio);
    } else {
      setNaoEncontrado(true);
    }
  }, []);

  if (!idAnuncio || naoEncontrado) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Anúncio não encontrado!</Alert.Heading>
        <p>
          Desculpe, o anúncio que você está tentando acessar não existe ou foi
          removido.
        </p>
      </Alert>
    );
  }

  if (!anuncio) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="d-flex flex-column h-100">
      <h1>Mensagens</h1>
      <Row className="flex-grow-1 pb-2">
        <Col lg={4} style={{ overflowY: "auto" }}>
          {anuncio.anunciante === user.uid ? (
            <ListaInteressados anuncio={anuncio} />
          ) : (
            <Anunciante />
          )}
        </Col>
        <Col className="d-flex flex-column">
          <ListaMensagens anuncio={anuncio} />
          <EnviarMensagem idAnuncio={idAnuncio} />
        </Col>
      </Row>
    </div>
  );
}
