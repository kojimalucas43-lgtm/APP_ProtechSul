import { ImageSourcePropType } from "react-native";

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  caracteristicas: string[];
  imagem: ImageSourcePropType;
};

export const produtos: Produto[] = [
  { id: 1, nome: "Kit máscara semifacial com filtro", preco: 50.0, descricao: "O Kit Máscara Semifacial ProtecFace oferece proteção respiratória para uso profissional, com design confortável e prático para diferentes ambientes de trabalho", caracteristicas: [], imagem: require("../assets/images/mascaraFiltro.png") },
  { id: 2, nome: "Luva de proteção", preco:  9.90, descricao: "Luvas banhadas com látex natural, com ótima aderência e conforto para o manuseio de materiais.", caracteristicas: [], imagem: require("../assets/images/luva.png") },
  { id: 3, nome: "Protetor auricular tipo fone", preco: 100.0, descricao:  "Protetor auricular tipo concha com atenuação de ruído para ambientes industriais.", caracteristicas: [], imagem: require("../assets/images/fone.png") },
  { id: 4, nome: "Calçado de segurança", preco: 70.90, descricao:  "Calçado em EVA leve e antiderrapante, ideal para ambientes úmidos e de higiene controlados", caracteristicas: [], imagem: require("../assets/images/tenis.png") },
  { id: 5, nome: "Protetor solar", preco: 15.50, descricao: "Protetor solar FPS 60 para trabalhadores expostos ao sol.", caracteristicas: [], imagem: require("../assets/images/p.solar5.png") },
  { id: 6, nome: "Capacete de Segurança", preco: 15.29, descricao: "Capacete de segurança classe B com suspensão de 6 pontos.", caracteristicas: [], imagem: require("../assets/images/capacete9.png") },
  { id: 7, nome: "Bota de segurança", preco: 150.90, descricao: "Bota de segurança com bico de PVC.", caracteristicas: [], imagem: require("../assets/images/bota8.png") },
  { id: 8, nome: "Cartucho para respirador", preco: 40.00, descricao: "Cartucho químico para vapores orgânicos e gases ácidos.", caracteristicas: [], imagem: require("../assets/images/cartucho7.png") },
  { id: 9, nome: "Máscara", preco: 67.36, descricao: "Protetor facial com tela de nylon e boné, ideal para trabalhos de roçada e jardinagem.", caracteristicas: [], imagem: require("../assets/images/mascara.png") },
];

export function formatarPreco(valor: number) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

export function buscarProduto(id: number) {
  return produtos.find((p) => p.id === id);
}
