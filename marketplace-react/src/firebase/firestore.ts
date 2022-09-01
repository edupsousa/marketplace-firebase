import {
  getFirestore,
  connectFirestoreEmulator,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";
import app from "./app";

const firestore = getFirestore(app);
if (import.meta.env.DEV) {
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

export type Anuncio = {
  dataAnuncio: number;
  anunciante: string;
  titulo: string;
  descricao: string;
  preco: number;
  categoria: string;
  fotos: string[];
};

export type NovoAnuncio = Omit<Anuncio, "dataAnuncio" | "fotos">;
export type AnuncioWithId = Anuncio & { id: string };

export async function salvarNovoAnuncio(anuncio: NovoAnuncio) {
  const dataAnuncio = Date.now();
  const anunciosCollection = collection(firestore, "anuncios");
  const anuncioRef = await addDoc(anunciosCollection, {
    dataAnuncio,
    ...anuncio,
  });
  return anuncioRef.id;
}

export async function adicionarFotosAnuncio(id: string, fotos: string[]) {
  if (fotos.length === 0) return;
  const anuncioRef = doc(firestore, "anuncios", id);
  await updateDoc(anuncioRef, { fotos });
}

export async function listarMeusAnuncios(
  uid: string
): Promise<AnuncioWithId[]> {
  const anunciosCollection = collection(firestore, "anuncios");
  const q = query(anunciosCollection, where("anunciante", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((doc) => ({ ...(doc.data() as Anuncio), id: doc.id }))
    .sort((a, b) => b.dataAnuncio - a.dataAnuncio);
}

export async function apagarAnuncio(id: string) {
  const anunciosCollection = collection(firestore, "anuncios");
  const anuncioDoc = doc(anunciosCollection, id);
  try {
    await deleteDoc(anuncioDoc);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
