import { useCallback, useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Image, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../firebase/auth";
import {
  AnuncioWithId,
  apagarAnuncio,
  listarMeusAnuncios,
} from "../firebase/firestore";
import formatarDataAnuncio from "../utils/formatarDataAnuncio";
import formatarPreco from "../utils/formatarPreco";
import { BsFillTrashFill } from "react-icons/bs";
import { apagarFotosAnuncio } from "../firebase/storage";
import Anuncio from "../components/Anuncio";

export default function MeusAnunciosPage() {
  const [anuncios, setAnuncios] = useState<AnuncioWithId[]>();
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthContext();
  if (!user) return <Navigate to="/login" />;

  useEffect(() => {
    const carregarAnuncios = async () => {
      const lista = await listarMeusAnuncios(user.uid);
      setAnuncios(lista);
      setIsLoading(false);
    };
    carregarAnuncios();
  }, []);

  const removerAnuncio = async (id: string) => {
    if (await apagarAnuncio(id)) {
      setAnuncios((lista) => lista?.filter((anuncio) => anuncio.id !== id));
      await apagarFotosAnuncio(user.uid, id);
    }
  };

  return (
    <div>
      <h1>Meus Anúncios</h1>
      {isLoading && <p>Carregando...</p>}
      <Row>
        {anuncios?.map((anuncio) => (
          <Col xs={12} lg={6} key={anuncio.id}>
            <Anuncio
              anuncio={anuncio}
              botao={
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removerAnuncio(anuncio.id)}
                >
                  <BsFillTrashFill /> Remover
                </Button>
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
