import { View, Text, TextInput, Image, ScrollView, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import Menu from "../components/menu";
import Item from "../components/item";
import { produtos } from "../constants/mock";
import { lerFavoritos, alternarFavorito } from "../utils/storage";
import { estilos, cores } from "../constants/tema";

export default function Catalogo() {
  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useFocusEffect(useCallback(() => { lerFavoritos().then(setFavoritos); }, []));

  const filtrados = produtos.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <Menu />
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>CATÁLOGO</Text>
        <View style={styles.busca}>
          <Image source={require("../assets/images/lupa.png")} style={styles.lupa} />
          <TextInput style={styles.buscaInput} placeholder="Pesquisar" value={busca} onChangeText={setBusca} />
        </View>
      </View>

      <View style={estilos.grade}>
        {filtrados.map((p) => (
          <Item key={p.id} produto={p} favorito={favoritos.includes(p.id)}
            onFavoritar={async () => setFavoritos(await alternarFavorito(p.id))} />
        ))}
      </View>
      {filtrados.length === 0 && <Text style={styles.vazio}>Nenhum produto encontrado para “{busca}”.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  busca: { flexDirection: "row", alignItems: "center", backgroundColor: cores.cinza, borderRadius: 20,
    paddingHorizontal: 12, width: "80%", maxWidth: 320, marginBottom: 16 },
  lupa: { width: 16, height: 16, resizeMode: "contain", marginRight: 6 },
  buscaInput: { flex: 1, paddingVertical: 6, fontSize: 13 },
  vazio: { textAlign: "center", marginTop: 20, color: cores.texto },
});
