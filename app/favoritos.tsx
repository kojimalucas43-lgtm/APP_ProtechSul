import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import Menu from "../components/menu";
import Item from "../components/item";
import { produtos } from "../constants/mock";
import { lerFavoritos, alternarFavorito } from "../utils/storage";
import { estilos } from "../constants/tema";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useFocusEffect(useCallback(() => { lerFavoritos().then(setFavoritos); }, []));

  const lista = produtos.filter((p) => favoritos.includes(p.id));

  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <Menu />
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>FAVORITOS</Text>
      </View>

      {lista.length === 0 ? (
        <View style={estilos.conteudo}>
          <Text style={styles.vazio}>Toque na estrela de um produto no catálogo para salvá-lo aqui.</Text>
          <TouchableOpacity style={estilos.botao} onPress={() => router.push("/catalogo")}>
            <Text style={estilos.botaoTexto}>Ver catálogo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={estilos.grade}>
          {lista.map((p) => (
            <Item key={p.id} produto={p} favorito
              onFavoritar={async () => setFavoritos(await alternarFavorito(p.id))} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  vazio: { textAlign: "center", maxWidth: 280 },
});
