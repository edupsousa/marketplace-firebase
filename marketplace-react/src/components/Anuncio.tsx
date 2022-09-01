import { Card, Carousel, Image } from "react-bootstrap";
import { AnuncioWithId } from "../firebase/firestore";
import formatarDataAnuncio from "../utils/formatarDataAnuncio";
import formatarPreco from "../utils/formatarPreco";

type Props = {
  anuncio: AnuncioWithId;
  botao?: JSX.Element;
};

export default function Anuncio({ anuncio, botao }: Props) {
  return (
    <Card className="text-center">
      <Card.Header>{anuncio.categoria}</Card.Header>
      <Card.Body className="d-flex">
        <div className="w-50 border rounded" style={{ aspectRatio: "4/3" }}>
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
          <div>{botao}</div>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div>Valor: {formatarPreco(anuncio.preco)}</div>
        <div>Anunciado: {formatarDataAnuncio(anuncio.dataAnuncio)}</div>
      </Card.Footer>
    </Card>
  );
}
