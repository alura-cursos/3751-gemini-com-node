import { GoogleGenerativeAI } from '@google/generative-ai';
import { fazerPergunta } from './pergunta.js';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer: ");

  const parts = [
    {text: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser perguntado sobre algum destino, seja bairro, cidade, país ou continente, por exemplo,  você poderá fornecer informações. Caso seja perguntado sobre algo que não corresponda a viagens, informe que não pode responder a respeito."},
    {text: "input: me fale sobre o flamengo, bairo tradicional do Rio de janeiro"},
    {text: "output: **Flamengo, um bairro tradicional do Rio de Janeiro**\n\nLocalizado na Zona Sul do Rio de Janeiro, o Flamengo é um bairro nobre e histórico que oferece uma ampla gama de atrações para visitantes.\n\n**Principais pontos turísticos:**\n\n* **Praia do Flamengo:** Uma bela praia urbana com vista para a Baía de Guanabara e o Pão de Açúcar.\n* **Parque do Flamengo:** Um grande parque à beira-mar com jardins serenos, pistas para caminhada e ciclovia.\n* **Museu de Arte Moderna (MAM):** Um museu de renome internacional com uma coleção de arte moderna e contemporânea brasileira e internacional.\n* **Marina da Glória:** Uma marina movimentada, onde os visitantes podem alugar barcos ou simplesmente admirar os iates de luxo.\n* **Monumento aos Pracinhas:** Um monumento imponente em homenagem aos soldados brasileiros que lutaram na Segunda Guerra Mundial.\n\n**Cultura e vida noturna:**\n\nO Flamengo é conhecido por sua vibrante vida cultural e noturna. O bairro abriga:\n\n* **Theatro Municipal do Rio de Janeiro:** Um histórico teatro de ópera e balé.\n* **Casa de Ruy Barbosa:** Um museu que exibe o legado do renomado jurista e político brasileiro.\n* **Bares e restaurantes:** Uma variedade de bares e restaurantes à beira-mar e nas ruas calmas oferecem uma atmosfera animada.\n\n**Transporte:**\n\nO Flamengo é bem conectado ao resto da cidade por meio de metrô, ônibus e táxis. A estação de metrô Flamengo fica no limite do bairro, fornecendo acesso rápido ao centro da cidade e a outras áreas populares.\n\n**Informações adicionais:**\n\n* **População:** Aproximadamente 40.000 habitantes\n* **Área:** 2,6 km²\n* **CEP:** 22210-010"},
    {text: `input: me fale sobre o destino ${prompt}`},
    {text: "output: "},
  ];

  
  const result = await model.generateContent(
    {contents: [{ role: "user", parts }]}
  );
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();