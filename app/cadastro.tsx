import { router } from "expo-router";
import { Text, TextInput, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { salvar, aviso } from "../utils/storage";
import { useState } from "react";
import { estilos } from "../constants/tema";

export default function CadastroPag() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");

  async function fazerCadastro() {
    if (!email || !senha || !nome || !empresa || !telefone) {
      aviso("Atenção", "Preencha todos os campos.");
      return;
    }

    const usuario = { email: email.trim(), senha, nome, empresa, telefone };

    try {
      await salvar("usuario", JSON.stringify(usuario));
      aviso("Sucesso", "Cadastro realizado!");
      router.replace("/login");
    } catch (erro) {
      aviso("Erro", "Não foi possível salvar o cadastro.");
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <View style={estilos.barraTopo} />
      <View style={estilos.conteudo}>
        <Image source={require("../assets/images/logoProtecSul1.png")} style={estilos.logoGrande} />
        <Text style={estilos.titulo}>CADASTRO</Text>

        <View style={estilos.formulario}>
          <Text style={estilos.rotulo}>E-mail</Text>
          <TextInput style={estilos.input} placeholder="Digite seu e-mail" value={email} onChangeText={setEmail}
            keyboardType="email-address" autoCapitalize="none" />

          <Text style={estilos.rotulo}>Senha</Text>
          <TextInput style={estilos.input} placeholder="Digite sua senha" value={senha} onChangeText={setSenha} secureTextEntry />

          <Text style={estilos.rotulo}>Nome/sobrenome completo</Text>
          <TextInput style={estilos.input} placeholder="Digite seu nome completo" value={nome} onChangeText={setNome} />

          <Text style={estilos.rotulo}>Empresa</Text>
          <TextInput style={estilos.input} placeholder="Digite o nome da empresa" value={empresa} onChangeText={setEmpresa} />

          <Text style={estilos.rotulo}>Telefone</Text>
          <TextInput style={estilos.input} placeholder="Digite seu telefone com DDD" value={telefone} onChangeText={setTelefone}
            keyboardType="phone-pad" />

          <TouchableOpacity style={estilos.botao} onPress={fazerCadastro}>
            <Text style={estilos.botaoTexto}>Fazer Cadastro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
