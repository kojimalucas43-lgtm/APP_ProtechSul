import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";

export async function salvar(chave: string, valor: string) {
  await AsyncStorage.setItem(chave, valor);
}

export async function ler(chave: string) {
  return AsyncStorage.getItem(chave);
}

export async function remover(chave: string) {
  await AsyncStorage.removeItem(chave);
}

export function aviso(titulo: string, mensagem: string) {
  if (Platform.OS === "web") window.alert(`${titulo}\n\n${mensagem}`);
  else Alert.alert(titulo, mensagem);
}

export async function lerFavoritos(): Promise<number[]> {
  const dados = await ler("favoritos");
  return dados ? JSON.parse(dados) : [];
}

export async function alternarFavorito(id: number): Promise<number[]> {
  const favs = await lerFavoritos();
  const novos = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
  await salvar("favoritos", JSON.stringify(novos));
  return novos;
}
