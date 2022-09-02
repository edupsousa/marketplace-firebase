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
import formatarPreco from "../utils/formatarPreco";

export default function MensagensPage() {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }

  const [interessado, setInteressado] = useState<
    { nome: string; id: string } | undefined
  >(undefined);
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

  const isAnunciante = anuncio.anunciante === user.uid;
  return (
    <div className="d-flex flex-column h-100">
      <h1>Mensagens</h1>
      <Row className="flex-grow-1 pb-2">
        <Col lg={4} style={{ overflowY: "auto" }}>
          {isAnunciante ? (
            <ListaInteressados
              idAnuncio={idAnuncio}
              onInteressadoSelecionado={setInteressado}
            />
          ) : (
            <Anunciante
              nome={anuncio.nomeAnunciante}
              descricao={`${anuncio.titulo} ${formatarPreco(anuncio.preco)}`}
            />
          )}
        </Col>
        <Col className="d-flex flex-column">
          <ListaMensagens
            idAnuncio={idAnuncio}
            idAnunciante={anuncio.anunciante}
            nomeAnunciante={anuncio.nomeAnunciante}
            idUsuario={isAnunciante ? interessado?.id : user.uid}
            nomeUsuario={
              isAnunciante
                ? interessado?.nome
                : ((user.displayName || user.email) as string)
            }
          />
          <EnviarMensagem
            idAnuncio={idAnuncio}
            idInteressado={isAnunciante ? interessado?.id : user.uid}
          />
        </Col>
      </Row>
    </div>
  );
}
