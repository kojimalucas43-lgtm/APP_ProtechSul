import { View, Text, ScrollView, StyleSheet } from "react-native";
import Menu from "../components/menu";
import { estilos, cores, fonteTitulo } from "../constants/tema";

const secoes = [
  { titulo: "", texto: " A ProtecSul EPI's nasceu com o propósito de oferecer soluções em Equipamentos de Proteção Industrial (EPI's), contribuindo para a seurança, o bem estar e a qualidade de vida dos profissionais n os mais diversos ambientes de trabalho. \n Ao longo de sua trajetória, a empresa vem construindo sua atuação com base em princípios como qualidade, responsabilidade, comprometimento e confiança, buscando entender as necessidades de cada cliente e oferecer produtos adequados às diferentes atividades e níveis de proteção exigidos." },
  {texto: "Nossa missão vai além da comercialização de equipamentos. A ProtecSul EPI's acredita que a segurança deve fazer parte da rotina de todas as empresas e profissionais. Por isso, trabalhamos para disponibilizar produtos que auxiliem na prevenção de acidentes e na proteção dos trabalhadores, sempre prezando pela qualidade e pela confiabilidade. \n Contamos com um portfólio desenvolvido para atender diferentes segmentos e necessidades, oferecendo soluções em proteção individual para empresas, indústrias, comércios, profissionais autônomos e demais clientes que valorizam a segurança no ambiente de trabalho."},
  { titulo: "Nossos Compromissos", texto: "Na ProtecSul EPI's, cada cliente é tratado como um parceiro. Nosso compromisso é oferecer atendimento próximo, produtos de qualidade e soluções eficientes, ajudando empresas e profissionais a encontrarem os equipamentos mais adequados para suas atividades. \n Buscamos constantemente aprimorar nossos produtos, serviços e atendimento, acompanhando as necessidades do mercado e mantendo o foco naquilo que realmente importa: proteger pessoas e contribuir para ambientes de trabalho mais seguros." },
  { titulo: "Nossa Visão", texto: "Ser reconhecida como uma empresa de referência em soluções de proteção individual, destacando-se pela qualidade dos produtos, excelência no atendimento e compromisso com a segurança de seus clientes." },
  { titulo: "Nossos Valores",topicos: [
    { nome: "Segurança", texto: "colocamos a proteção das pessoas em primeiro lugar." },
    { nome: "Qualidade", texto: "buscamos oferecer produtos confiáveis e adequados às necessidades de nossos clientes." },
    { nome: "Compromisso", texto: "trabalhamos com responsabilidade e dedicação em cada atendimento." },
    { nome: "Confiança", texto: "construímos relacionamentos duradouros e transparentes com nossos clientes e parceiros." },
    { nome: "Responsabilidade", texto: "acreditamos na importância de contribuir para ambientes de trabalho cada vez mais seguros." },
  ] },
  ];

export default function Sobre() {
  return (
    <ScrollView contentContainerStyle={estilos.tela}>
      <Menu />
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>SOBRE NÓS</Text>

        {secoes.map((s, i) => (
          <View key={i} style={styles.secao}>
            {s.titulo ? <Text style={styles.subtitulo}>{s.titulo}</Text> : null}

            {s.texto ? <Text style={styles.caixa}>{s.texto}</Text> : null}

            {s.topicos ? (
              <View style={styles.caixaTopicos}>
                {s.topicos.map((t) => (
                  <View key={t.nome} style={styles.topico}>
                    <Text style={styles.marcador}>•</Text>
                    <Text style={styles.topicoTexto}>
                      <Text style={styles.negrito}>{t.nome}:</Text> {t.texto}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  secao: { width: "100%", maxWidth: 360, marginBottom: 16 },
  subtitulo: { fontFamily: fonteTitulo, fontSize: 18, textAlign: "center", marginBottom: 8 },
  caixa: { backgroundColor: cores.amarelo, padding: 14, textAlign: "center", lineHeight: 20 },
  caixaTopicos: { backgroundColor: cores.amarelo, padding: 14 },
  topico: { flexDirection: "row", marginBottom: 4 },
  marcador: { fontFamily: fonteTitulo, fontSize: 14, lineHeight: 21, marginRight: 8 },
  topicoTexto: { flex: 1, fontFamily: fonteTitulo, fontSize: 14, lineHeight: 21, color: cores.preto, textAlign: "left" },
  negrito: { fontWeight: "bold" },
});
