import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuthUser } from "../firebase/auth";
import { salvarAnunciante } from "../firebase/database";
import {
  adicionarFotosAnuncio,
  salvarNovoAnuncio,
} from "../firebase/firestore";
import { salvarFotoAnuncio } from "../firebase/storage";
import EnviarFotos from "./EnviarFotos";

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
].sort();

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
  const [submitDesativado, setSubmitDesativado] = useState(false);
  const [fotos, setFotos] = useState<File[]>([]);
  const navigate = useNavigate();
  const user = useAuthUser();
  if (!user) return null;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormInputs) => {
    setSubmitDesativado(true);
    const nomeAnunciante = user.displayName || user.email || "Anônimo";
    const anuncio = { ...data, nomeAnunciante, anunciante: user.uid };
    try {
      const id = await salvarNovoAnuncio(anuncio);
      const urlFotos = await Promise.all(
        fotos.map((foto) => salvarFotoAnuncio(foto, user.uid, id))
      );
      await adicionarFotosAnuncio(id, urlFotos);
      await salvarAnunciante(id, user.uid);
      navigate("/meus-anuncios/lista");
    } catch (e) {
      console.error(e);
    }
    setSubmitDesativado(false);
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

      <Button variant="success" type="submit" disabled={submitDesativado}>
        Salvar Anúncio
      </Button>
    </Form>
  );
}
