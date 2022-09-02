import { User } from "firebase/auth";
import {
  getDatabase,
  connectDatabaseEmulator,
  ref,
  set,
  onDisconnect,
  remove,
  push,
  serverTimestamp,
  onValue,
} from "firebase/database";
import { boolean } from "yup";
import app from "./app";

const db = getDatabase(app);
if (import.meta.env.DEV) {
  connectDatabaseEmulator(db, "localhost", 9000);
}

export async function setOnline(uid: string) {
  const onlineRef = ref(db, `online/${uid}`);
  await set(onlineRef, true);
  const disconnectRef = onDisconnect(onlineRef);
  await disconnectRef.remove();
  return async () => {
    await remove(onlineRef);
    await disconnectRef.cancel();
  };
}

export async function salvarAnunciante(idAnuncio: string, anunciante: string) {
  const anunciosRef = ref(db, `anuncios/${idAnuncio}/anunciante`);
  await set(anunciosRef, anunciante);
}

export async function apagarAnunciante(idAnuncio: string) {
  const anunciosRef = ref(db, `anuncios/${idAnuncio}`);
  await remove(anunciosRef);
}

type Mensagem = {
  fromInteressado: boolean;
  texto: string;
  dataEnvio: number;
};

async function salvarMensagem(
  idAnuncio: string,
  idInteressado: string,
  mensagem: Omit<Mensagem, "dataEnvio">
) {
  const mensagensRef = ref(
    db,
    `anuncios/${idAnuncio}/mensagens/${idInteressado}`
  );
  await push(mensagensRef, { ...mensagem, dataEnvio: serverTimestamp() });
}

export async function salvarMensagemInteressado(
  idInteressado: string,
  nomeInteressado: string,
  idAnuncio: string,
  texto: string
) {
  await adicionarInteressado(idInteressado, nomeInteressado, idAnuncio);
  await salvarMensagem(idAnuncio, idInteressado, {
    texto,
    fromInteressado: true,
  });
}

export async function salvarRespostaAnunciante(
  idInteressado: string,
  idAnuncio: string,
  texto: string
) {
  await salvarMensagem(idAnuncio, idInteressado, {
    texto,
    fromInteressado: false,
  });
}

type Interessado = {
  nome: string;
  ultimaMensagem: number;
};

export async function adicionarInteressado(
  idInteressado: string,
  nomeInteressado: string,
  idAnuncio: string
) {
  const interassadoRef = ref(
    db,
    `anuncios/${idAnuncio}/interessados/${idInteressado}`
  );
  await set(interassadoRef, {
    nome: nomeInteressado,
    ultimaMensagem: serverTimestamp(),
  });
}

export type InteressadoWithId = Interessado & { id: string };

export function listarInteressados(
  idAnuncio: string,
  atualizar: (interessados: InteressadoWithId[]) => void
) {
  const interessadosRef = ref(db, `anuncios/${idAnuncio}/interessados`);
  return onValue(interessadosRef, (snapshot) => {
    const interessados = snapshot.val() as Record<string, Interessado>;
    const lista = Object.entries(interessados)
      .map(([id, interessado]) => ({
        id,
        ...interessado,
      }))
      .sort((a, b) => b.ultimaMensagem - a.ultimaMensagem);
    atualizar(lista);
  });
}

export type MensagemWithId = Mensagem & { id: string };

export function listarMensagens(
  idAnuncio: string,
  idUsuario: string,
  atualizar: (mensagens: MensagemWithId[]) => void
) {
  const mensagensRef = ref(db, `anuncios/${idAnuncio}/mensagens/${idUsuario}`);
  return onValue(mensagensRef, (snapshot) => {
    if (!snapshot.exists()) return;
    const mensagens = snapshot.val() as Record<string, Mensagem>;
    const lista = Object.entries(mensagens)
      .map(([id, mensagem]) => ({
        id,
        ...mensagem,
      }))
      .sort((a, b) => a.dataEnvio - b.dataEnvio);
    atualizar(lista);
  });
}
