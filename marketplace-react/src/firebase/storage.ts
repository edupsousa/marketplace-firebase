import {
  getStorage,
  connectStorageEmulator,
  ref,
  uploadBytes,
  listAll,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import app from "./app";

const storage = getStorage(app);
if (import.meta.env.DEV) {
  connectStorageEmulator(storage, "localhost", 9199);
}

export async function salvarFotoAnuncio(
  file: File,
  uid: string,
  anuncio: string
) {
  const storageRef = ref(storage, `images/${uid}/${anuncio}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = getDownloadURL(snapshot.ref);
  return url;
}

export async function apagarFotosAnuncio(uid: string, anuncio: string) {
  const storageRef = ref(storage, `images/${uid}/${anuncio}`);
  const snapshot = await listAll(storageRef);
  await Promise.all(snapshot.items.map((item) => deleteObject(item)));
}
