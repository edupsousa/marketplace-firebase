import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BiMessageRoundedCheck } from "react-icons/bi";
import Anuncio from "../components/Anuncio";
import { useAuthContext } from "../firebase/auth";
import { AnuncioWithId, listarTodosAnuncios } from "../firebase/firestore";

export default function HomePage() {
  const { user } = useAuthContext();
  const [anuncios, setAnuncios] = useState<AnuncioWithId[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarAnuncios = async () => {
      const lista = await listarTodosAnuncios();
      setAnuncios(lista);
      setIsLoading(false);
    };
    carregarAnuncios();
  }, []);

  return (
    <div>
      <h1>Anúncios</h1>
      {isLoading && <p>Carregando...</p>}
      <Row>
        {anuncios?.map((anuncio) => (
          <Col xs={12} lg={6} key={anuncio.id}>
            <Anuncio
              anuncio={anuncio}
              botao={
                user && user.uid !== anuncio.anunciante ? (
                  <Button variant="outline-success">
                    <BiMessageRoundedCheck /> Enviar Proposta
                  </Button>
                ) : undefined
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
