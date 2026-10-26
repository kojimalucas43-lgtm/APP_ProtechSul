import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { estilos, cores } from "../constants/tema";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <View style={estilos.barraTopo} />
      <View style={estilos.conteudo}>
        <Image source={require("../assets/images/logoProtecSul1.png")} style={estilos.logoGrande} />
        <Text style={styles.boasVindas}>Seja bem-vindo à ProtecSul EPI's! O que deseja fazer?</Text>

        <TouchableOpacity style={estilos.botao} onPress={() => router.push("/login")}>
          <Text style={estilos.botaoTexto}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[estilos.botao, { marginTop: 14 }]} onPress={() => router.push("/cadastro")}>
          <Text style={estilos.botaoTexto}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  boasVindas: { backgroundColor: cores.amarelo, padding: 8, textAlign: "center", marginTop: 24, maxWidth: 300 },
});
