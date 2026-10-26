import { Platform, StyleSheet } from "react-native";

export const cores = {
  amarelo: "#FFD200",
  preto: "#000000",
  cinza: "#D9D9D9",
  cinzaTitulo: "#A6A6A6",
  branco: "#FFFFFF",
  texto: "#222222",
};

export const fonteTitulo = Platform.select({ ios: "Georgia", android: "serif", default: "Georgia, serif" });

export const estilos = StyleSheet.create({
  tela: { flexGrow: 1, backgroundColor: cores.branco, paddingBottom: 40 },
  conteudo: { paddingHorizontal: 24, alignItems: "center" },
  barraTopo: { height: 60, backgroundColor: cores.preto, width: "100%" },
  logoGrande: { width: 220, height: 130, resizeMode: "contain", marginTop: 24 },
  titulo: {
    fontFamily: fonteTitulo, fontSize: 22, color: cores.preto, textAlign: "center",
    backgroundColor: cores.cinzaTitulo, borderWidth: 2, borderColor: "#7A7A7A",
    paddingHorizontal: 24, paddingVertical: 4, marginVertical: 24,
  },
  formulario: { width: "100%", maxWidth: 360 },
  rotulo: { fontSize: 13, color: cores.texto, marginBottom: 4, marginTop: 10 },
  input: { backgroundColor: cores.cinza, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, fontSize: 14 },
  botao: { backgroundColor: cores.amarelo, borderRadius: 4, paddingVertical: 10, paddingHorizontal: 28, alignSelf: "center", marginTop: 28 },
  botaoTexto: { fontFamily: fonteTitulo, fontSize: 16, color: cores.preto, textAlign: "center" },
  grade: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", width: "100%", paddingHorizontal: 12 },
});
