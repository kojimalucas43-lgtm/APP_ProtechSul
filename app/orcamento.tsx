import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Menu from "../components/menu";
import { buscarProduto, formatarPreco } from "../constants/mock";
import { ler, salvar, aviso } from "../utils/storage";
import { estilos, cores } from "../constants/tema";

export default function Orcamento() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const produto = id ? buscarProduto(Number(id)) : undefined;

  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [quantidade, setQuantidade] = useState("1");

  const qtd = Math.max(parseInt(quantidade) || 0, 0);

  async function fazerOrcamento() {
    if (!nome || !empresa || !email || !telefone) {
      aviso("Atenção", "Preencha nome, empresa, e-mail e telefone.");
      return;
    }
    if (!produto) {
      aviso("Atenção", "Escolha um produto no catálogo e toque em COMPRAR.");
      return;
    }
    if (qtd < 1) {
      aviso("Atenção", "Informe uma quantidade maior que zero.");
      return;
    }
    try {
      const dados = await ler("orcamentos");
      const lista = dados ? JSON.parse(dados) : [];
      lista.push({ nome, empresa, email, telefone, mensagem, produtoId: produto.id, quantidade: qtd, data: new Date().toISOString() });
      await salvar("orcamentos", JSON.stringify(lista));
      aviso("Sucesso", "Orçamento enviado! Entraremos em contato.");
      setMensagem("");
    } catch {
      aviso("Erro", "Não foi possível enviar o orçamento.");
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <Menu />
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>ORÇAMENTO</Text>

        <View style={estilos.formulario}>
          <Text style={estilos.rotulo}>Nome/sobrenome completo</Text>
          <TextInput style={estilos.input} placeholder="Digite seu nome completo" value={nome} onChangeText={setNome} />
          <Text style={estilos.rotulo}>Empresa</Text>
          <TextInput style={estilos.input} placeholder="Digite o nome da empresa" value={empresa} onChangeText={setEmpresa} />
          <Text style={estilos.rotulo}>E-mail</Text>
          <TextInput style={estilos.input} placeholder="Digite seu e-mail" value={email} onChangeText={setEmail}
            keyboardType="email-address" autoCapitalize="none" />
          <Text style={estilos.rotulo}>Telefone</Text>
          <TextInput style={estilos.input} placeholder="Digite seu telefone com DDD" value={telefone} onChangeText={setTelefone}
            keyboardType="phone-pad" />
          <Text style={estilos.rotulo}>Mensagem</Text>
          <TextInput style={estilos.input} placeholder="Digite sua mensagem ou dúvida" value={mensagem} onChangeText={setMensagem} multiline />
        </View>

        <View style={styles.cartao}>
          <Text style={styles.cartaoTitulo}>Produto selecionado</Text>
          <View style={styles.caixaImagem}>
            {produto
              ? <Image source={produto.imagem} style={styles.imagem} />
              : <Text style={styles.interrogacao}>?</Text>}
          </View>
          <Text style={styles.nome}>{produto ? produto.nome : "Nenhum produto selecionado"}</Text>

          <Text style={estilos.rotulo}>Quantidade</Text>
          <TextInput style={[estilos.input, { backgroundColor: cores.branco }]} value={quantidade}
            onChangeText={setQuantidade} keyboardType="number-pad" />
          <Text style={styles.info}>Valor: {produto ? formatarPreco(produto.preco * qtd) : "—"}</Text>
          <Text style={styles.info}>Previsão de entrega: a combinar</Text>

          <TouchableOpacity style={[estilos.botao, { marginTop: 16 }]} onPress={fazerOrcamento}>
            <Text style={estilos.botaoTexto}>FAZER ORÇAMENTO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cartao: { backgroundColor: cores.cinza, borderRadius: 14, padding: 14, width: "100%", maxWidth: 300, marginTop: 32 },
  cartaoTitulo: { textAlign: "center", fontSize: 12, marginBottom: 8 },
  caixaImagem: { backgroundColor: cores.branco, borderRadius: 12, aspectRatio: 1, justifyContent: "center", alignItems: "center" },
  imagem: { width: "80%", height: "80%", resizeMode: "contain" },
  interrogacao: { fontSize: 90, fontWeight: "bold", color: cores.amarelo },
  nome: { textAlign: "center", marginTop: 8, fontWeight: "bold" },
  info: { marginTop: 8, fontSize: 13 },
});
