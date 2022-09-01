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
            <Card className="text-center">
              <Card.Header>{anuncio.categoria}</Card.Header>
              <Card.Body className="d-flex">
                <div
                  className="w-50 border rounded"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Carousel className="fotos-anuncio w-100 h-100">
                    {anuncio.fotos.map((foto, index) => (
                      <Carousel.Item key={index}>
                        <Image
                          src={foto}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
                <div className="flex-grow-1 d-flex flex-column justify-content-center">
                  <Card.Title>{anuncio.titulo}</Card.Title>
                  <Card.Text>{anuncio.descricao}</Card.Text>
                  <div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removerAnuncio(anuncio.id)}
                    >
                      <BsFillTrashFill /> Remover
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                <div>Valor: {formatarPreco(anuncio.preco)}</div>
                <div>Anunciado: {formatarDataAnuncio(anuncio.dataAnuncio)}</div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
