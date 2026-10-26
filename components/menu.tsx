import { useState } from "react";
import { View, Image, TouchableOpacity, Modal, Text, StyleSheet, Pressable } from "react-native";
import { router, Href } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cores, fonteTitulo } from "../constants/tema";

const links: { rotulo: string; rota: Href }[] = [
  { rotulo: "SOBRE NÓS", rota: "/sobre" },
  { rotulo: "CATÁLOGO", rota: "/catalogo" },
  { rotulo: "ORÇAMENTO", rota: "/orcamento" },
  { rotulo: "PÁGINA INICIAL", rota: "/explore" },
  { rotulo: "FAVORITOS", rota: "/favoritos" },
];

export default function Menu() {
  const [aberto, setAberto] = useState(false);
  const insets = useSafeAreaInsets();

  function ir(rota: Href) {
    setAberto(false);
    router.push(rota);
  }

  return (
    <View style={[styles.cabecalho, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity onPress={() => router.push("/explore")}>
        <Image source={require("../assets/images/logoProtecSul2.png")} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoMenu} onPress={() => setAberto(true)} accessibilityLabel="Abrir menu">
        <Image source={require("../assets/images/Menu.png")} style={styles.icone} />
      </TouchableOpacity>

      <Modal visible={aberto} transparent animationType="fade" onRequestClose={() => setAberto(false)}>
        <View style={styles.fundo}>
          <Pressable style={{ flex: 1 }} onPress={() => setAberto(false)} />
          <View style={[styles.painel, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity style={[styles.botaoMenu, { alignSelf: "flex-end" }]} onPress={() => setAberto(false)} accessibilityLabel="Fechar menu">
              <Image source={require("../assets/images/Menu.png")} style={styles.icone} />
            </TouchableOpacity>
            {links.map((l) => (
              <TouchableOpacity key={l.rotulo} onPress={() => ir(l.rota)}>
                <Text style={styles.link}>{l.rotulo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: cores.preto, flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingHorizontal: 14, paddingBottom: 8,
  },
  logo: { width: 80, height: 40, resizeMode: "contain" },
  icone: { width: 36, height: 36, resizeMode: "contain" },
  fundo: { flex: 1, flexDirection: "row", backgroundColor: "rgba(0,0,0,0.4)" },
  painel: { width: "60%", maxWidth: 260, backgroundColor: "#1E1E1E", paddingHorizontal: 16 },
  link: { color: cores.branco, fontFamily: fonteTitulo, fontSize: 16, paddingVertical: 10 },
  botaoMenu: { backgroundColor: cores.amarelo, borderRadius: 6, padding: 4 },
});
