import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { ler, aviso } from "../utils/storage";
import { estilos } from "../constants/tema";

export default function LoginPag() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function fazerLogin() {
    if (!email || !senha) {
      aviso("Atenção", "Preencha e-mail e senha.");
      return;
    }
    const dados = await ler("usuario");
    if (!dados) {
      aviso("Atenção", "Nenhum cadastro encontrado. Faça seu cadastro primeiro.");
      return;
    }
    const usuario = JSON.parse(dados);
    if (usuario.email === email.trim() && usuario.senha === senha) {
      router.replace("/explore");
    } else {
      aviso("Erro", "E-mail ou senha incorretos.");
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <View style={estilos.barraTopo} />
      <View style={estilos.conteudo}>
        <Image source={require("../assets/images/logoProtecSul1.png")} style={estilos.logoGrande} />
        <Text style={estilos.titulo}>LOGIN</Text>

        <View style={estilos.formulario}>
          <Text style={estilos.rotulo}>E-mail</Text>
          <TextInput style={estilos.input} placeholder="Digite seu e-mail" value={email} onChangeText={setEmail}
            keyboardType="email-address" autoCapitalize="none" />

          <Text style={estilos.rotulo}>Senha</Text>
          <TextInput style={estilos.input} placeholder="Digite sua senha" value={senha} onChangeText={setSenha} secureTextEntry />

          <TouchableOpacity style={estilos.botao} onPress={fazerLogin}>
            <Text style={estilos.botaoTexto}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
