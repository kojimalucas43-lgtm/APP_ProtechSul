import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router, Href } from "expo-router";
import Menu from "../components/menu";
import { estilos, cores } from "../constants/tema";

const botoes: { rotulo: string; rota: Href }[] = [
  { rotulo: "SOBRE NÓS", rota: "/sobre" },
  { rotulo: "CATÁLOGO", rota: "/catalogo" },
  { rotulo: "ORÇAMENTO", rota: "/orcamento" },
  { rotulo: "FAVORITOS", rota: "/favoritos" },
];

export default function Explore() {
  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <Menu />
      <View style={estilos.conteudo}>
        <Image source={require("../assets/images/logoProtecSul1.png")} style={estilos.logoGrande} />
        <Text style={styles.boasVindas}>Seja bem-vindo à ProtecSul EPI's! O que deseja fazer?</Text>

        {botoes.map((b) => (
          <TouchableOpacity key={b.rotulo} style={[estilos.botao, styles.botao]} onPress={() => router.push(b.rota)}>
            <Text style={estilos.botaoTexto}>{b.rotulo}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  boasVindas: { backgroundColor: cores.amarelo, padding: 8, textAlign: "center", marginTop: 24, marginBottom: 8, maxWidth: 300 },
  botao: { marginTop: 14, minWidth: 180 },
});
