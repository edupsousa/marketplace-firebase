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
} from "firebase/database";
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

export async function salvarMensagemInteressado(
  idInteressado: string,
  nomeInteressado: string,
  idAnuncio: string,
  texto: string
) {
  await adicionarInteressado(idInteressado, nomeInteressado, idAnuncio);
  const mensagemRef = ref(
    db,
    `anuncios/${idAnuncio}/mensagens/${idInteressado}`
  );
  await push(mensagemRef, { texto, dataEnvio: serverTimestamp() });
}

export async function adicionarInteressado(
  idInteressado: string,
  nomeInteressado: string,
  idAnuncio: string
) {
  const interassadoRef = ref(
    db,
    `anuncios/${idAnuncio}/interessados/${idInteressado}`
  );
  await set(interassadoRef, { nome: nomeInteressado });
}
