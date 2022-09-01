import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EnviarFotos from "./EnviarFotos";
import {
  adicionarFotosAnuncio,
  salvarNovoAnuncio,
} from "../firebase/firestore";
import { useAuthContext } from "../firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { salvarFotoAnuncio } from "../firebase/storage";

const categorias: string[] = [
  "Eletrônicos",
  "Imóveis",
  "Móveis e Decoração",
  "Eletrodomésticos",
  "Informática",
  "Moda",
  "Esporte e Lazer",
  "Automotivo",
  "Brinquedos",
  "Livros",
  "Filmes",
  "Jogos",
  "Música",
  "Celulares e Smartphones",
];

type FormInputs = {
  titulo: string;
  descricao: string;
  preco: number;
  categoria: string;
};

const schema = yup.object({
  titulo: yup.string().required(),
  descricao: yup.string().required(),
  preco: yup.number().positive().required(),
  categoria: yup.string().required().oneOf(categorias),
});

export default function AnuncioForm() {
  const [fotos, setFotos] = useState<File[]>([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormInputs) => {
    const anuncio = { ...data, anunciante: user.uid };
    try {
      const id = await salvarNovoAnuncio(anuncio);
      const urlFotos = await Promise.all(
        fotos.map((foto) => salvarFotoAnuncio(foto, user.uid, id))
      );
      await adicionarFotosAnuncio(id, urlFotos);
      navigate("/meus-anuncios/lista");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="titulo">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Título do anúncio"
          isInvalid={!!errors.titulo}
          {...register("titulo")}
        />
      </Form.Group>
      <Form.Group controlId="descricao">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          isInvalid={!!errors.descricao}
          {...register("descricao")}
        />
      </Form.Group>
      <Form.Group controlId="preco">
        <Form.Label>Preço</Form.Label>
        <Form.Control
          type="number"
          step={0.01}
          placeholder="Preço do anúncio"
          isInvalid={!!errors.preco}
          {...register("preco")}
        />
      </Form.Group>
      <Form.Group controlId="categoria">
        <Form.Label>Categoria</Form.Label>
        <Form.Control
          as="select"
          isInvalid={!!errors.categoria}
          {...register("categoria")}
        >
          <option value="">Selecione</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="fotos">
        <Form.Label>Fotos</Form.Label>
        <EnviarFotos onFotosChange={setFotos} />
      </Form.Group>

      <Button variant="success" type="submit">
        Salvar Anúncio
      </Button>
    </Form>
  );
}
