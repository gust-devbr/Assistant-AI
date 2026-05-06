import { MsgProps, MsgTypeProps, CohereRole, Role } from "@/types";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({ token: process.env.CO_API_KEY });

function mapRole(role: Role): CohereRole {
    return role === "user" ? "USER" : "CHATBOT";
}

function formatHistory(messages: MsgProps[] = []) {
    return messages.map((msg) => ({
        role: mapRole(msg.role),
        message: msg.message
    }));
}

export async function sendMessage(message: string, type: MsgTypeProps, history: MsgProps[] = []) {
    let preamble = `
    Você é um assistente educativo que ajuda alunos.
    
    REGRAS DE FORMATAÇÃO (OBRIGATÓRIAS):
    - Toda equação matemática deve ser escrita em LaTeX
    - Use $...$ para expressões inline
    - Use $$...$$ para equações em bloco
    - Nunca escreva equações em texto simples
    - Tabelas devem ser formatadas em Markdown
    - Cálculos devem ser mostrados passo a passo, usando LaTeX
    - Limite a resposta a no máximo 500 palavras
    - Não gere caracteres aleatórios ou símbolos sem sentido
    
    Exemplo correto:
    $$E = mc^2$$
    `;

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
        case "duvida":
            preamble += "Explique a dúvida que o usuário mandar, mas sem fugir dos estudos";
            break;
    };

    const limitedHistory = history.slice(-10);

    const response = await cohere.chat({
        model: "command-xlarge-nightly",
        preamble: preamble,
        message: message,
        chatHistory: formatHistory(limitedHistory),
    });

    return response.text;
};