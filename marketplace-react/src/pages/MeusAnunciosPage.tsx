import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
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
import { BiMessageRoundedCheck } from "react-icons/bi";

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
      <Row>
        <Col>
          <h1>Meus Anúncios</h1>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Link to="/meus-anuncios/novo" className="btn btn-success btn-sm">
            Novo Anúncio
          </Link>
        </Col>
      </Row>
      {isLoading && <p>Carregando...</p>}
      <Row>
        {anuncios?.map((anuncio) => (
          <Col xs={12} lg={6} key={anuncio.id}>
            <Anuncio
              anuncio={anuncio}
              botao={
                <Stack gap={3} className="align-items-center">
                  <Link
                    className="btn btn-outline-success btn-sm"
                    to={`/mensagens/${anuncio.id}`}
                  >
                    <BiMessageRoundedCheck /> Ver Propostas
                  </Link>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removerAnuncio(anuncio.id)}
                  >
                    <BsFillTrashFill /> Remover
                  </Button>
                </Stack>
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
