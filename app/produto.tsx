import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import Menu from "../components/menu";
import Item from "../components/item";
import { produtos, buscarProduto, formatarPreco } from "../constants/mock";
import { lerFavoritos, alternarFavorito } from "../utils/storage";
import { estilos, cores } from "../constants/tema";

export default function ProdutoPag() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const produto = buscarProduto(Number(id));
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useFocusEffect(useCallback(() => { lerFavoritos().then(setFavoritos); }, []));

  if (!produto) {
    return (
      <ScrollView contentContainerStyle={estilos.tela}>
        <Menu />
        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>PRODUTO</Text>
          <Text>Produto não encontrado.</Text>
          <TouchableOpacity style={estilos.botao} onPress={() => router.push("/catalogo")}>
            <Text style={estilos.botaoTexto}>Voltar ao catálogo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const relacionados = produtos.filter((p) => p.id !== produto.id).slice(0, 2);

  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <Menu />
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>PRODUTO</Text>
        <Image source={produto.imagem} style={styles.imagem} />

        <View style={styles.caixa}>
          <Text style={styles.nome}>{produto.nome}</Text>
          <Text>Preço: {formatarPreco(produto.preco)}</Text>
          <TouchableOpacity style={styles.botao}
            onPress={() => router.push({ pathname: "/orcamento", params: { id: String(produto.id) } })}>
            <Text style={styles.botaoTexto}>FAZER ORÇAMENTO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.caixa}>
          <Text>{produto.descricao || "Descrição do produto em breve."}</Text>
          {produto.caracteristicas.length > 0 && (
            <>
              <Text style={styles.subtitulo}>Características</Text>
              {produto.caracteristicas.map((c) => <Text key={c}>• {c}</Text>)}
            </>
          )}
        </View>
      </View>

      <View style={[estilos.grade, { marginTop: 16 }]}>
        {relacionados.map((p) => (
          <Item key={p.id} produto={p} favorito={favoritos.includes(p.id)}
            onFavoritar={async () => setFavoritos(await alternarFavorito(p.id))} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagem: { width: 160, height: 160, resizeMode: "contain" },
  caixa: { backgroundColor: cores.cinza, borderRadius: 14, padding: 14, width: "100%", maxWidth: 360, marginTop: 14 },
  nome: { fontWeight: "bold", marginBottom: 4 },
  subtitulo: { fontWeight: "bold", marginTop: 10, marginBottom: 4 },
  botao: { backgroundColor: cores.amarelo, borderRadius: 12, paddingVertical: 6, marginTop: 10 },
  botaoTexto: { textAlign: "center", fontWeight: "bold", fontSize: 12 },
});
