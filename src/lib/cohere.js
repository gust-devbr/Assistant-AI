import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({ apiKey: process.env.CO_API_KEY });

export async function sendMessage(message, type, history = []) {
    let preamble = "Você é um assistente educativo que ajuda alunos. E se caso na sua resposta tiver calculos ou equações, formate-os.";

    switch (type) {
        case "explicacao":
            preamble += "Explique o assunto de forma clara, simples e com exemplos.";
            break;
        case "resumo":
            preamble += "Crie um resumo de acordo com o tópico abaixo, de forma objetiva e fácil de entender.";
            break;
        case "questao":
            preamble += "Crie o número de questões que o usuário escolher, de múltiplas escolhas sobre o assunto e no final dê uma dica.";
            break;
    };

    const response = await cohere.chat({
        model: "command-xlarge-nightly",
        preamble: preamble,
        message: message,
        chatHistory: history,
    });

    return response;
};