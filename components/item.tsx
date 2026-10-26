import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Produto, formatarPreco } from "../constants/mock";
import { cores } from "../constants/tema";

type Props = {
  produto: Produto;
  favorito: boolean;
  onFavoritar: () => void;
};

export default function Item({ produto, favorito, onFavoritar }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.caixaImagem}>
        <TouchableOpacity
          style={styles.toqueImagem}
          onPress={() => router.push({ pathname: "/produto", params: { id: String(produto.id) } })}
        >
          <Image source={produto.imagem} style={styles.imagem} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.estrela} onPress={onFavoritar} accessibilityLabel="Favoritar">
          <Text style={styles.estrelaTexto}>{favorito ? "★" : "☆"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.nome} numberOfLines={3}>{produto.nome}</Text>
      <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push({ pathname: "/orcamento", params: { id: String(produto.id) } })}
      >
        <Text style={styles.botaoTexto}>COMPRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: "48%", backgroundColor: cores.cinza, borderRadius: 14, padding: 8, marginBottom: 12, alignItems: "center" },
  caixaImagem: { width: "100%", aspectRatio: 1, backgroundColor: cores.branco, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  toqueImagem: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  imagem: { width: "80%", height: "80%", resizeMode: "contain" },
  estrela: { position: "absolute", top: 4, right: 6 },
  estrelaTexto: { fontSize: 24, color: cores.preto },
  nome: { fontSize: 11, textAlign: "center", marginTop: 6 },
  preco: { fontSize: 12, marginTop: 4 },
  botao: { backgroundColor: cores.amarelo, borderRadius: 12, paddingVertical: 5, paddingHorizontal: 16, marginTop: 6 },
  botaoTexto: { fontSize: 11, fontWeight: "bold" },
});
