import {
  getDatabase,
  connectDatabaseEmulator,
  ref,
  set,
  onDisconnect,
  remove,
  OnDisconnect,
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
