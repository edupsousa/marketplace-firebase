import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
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
                user ? (
                  <Link
                    className="btn btn-outline-success"
                    to={`/mensagens/${anuncio.id}`}
                  >
                    <BiMessageRoundedCheck />{" "}
                    {user.uid === anuncio.anunciante
                      ? "Ver Propostas"
                      : "Enviar Proposta"}
                  </Link>
                ) : undefined
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
