"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [type, setType] = useState("explicacao");

  async function sendMessage() {
    if (!message) return;

    const newChat = [...chat, { role: "USER", message, type }];

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, type, history: newChat }),
    });

    const data = await res.json();

    setChat([...newChat, { role: "ASSISTANT", message: data.reply }]);
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white p-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8">Assistente de Estudos</h1>

      <div className="max-w-4xl mx-auto border-t border-gray-800 pt-6">

        <div className="flex items-center gap-4 mb-8">
          <label className="text-gray-300 text-lg">Escolha a função:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-[#0b0e14] border border-gray-600 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="explicacao">Explicação</option>
            <option value="resumo">Resumo</option>
            <option value="questao">Criar Questões</option>
          </select>
        </div>

        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 mb-6 min-h-125 max-h-150 overflow-y-auto">
          {chat.map((c, i) => (
            <div key={i} className="mb-6 last:mb-0">
=              <div className="flex flex-col gap-2">
                <span className={`font-bold text-md uppercase tracking-wider ${c.role === 'USER' ? 'text-blue-400 text-right' : 'text-purple-400 text-left'}`}>
                  {c.role}:
                </span>

                <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 relative group">
                  <div className={`text-gray-200 leading-relaxed ${c.role === "USER" ? "text-right" : "text-left"}`}>
                    <ReactMarkdown>{c.message}</ReactMarkdown>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite seu assunto ou texto..."
            className="flex-1 bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            className="bg-[#3123a1] hover:bg-[#3f2dbd] text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg active:scale-95"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>

        <button
          className="mt-4 text-gray-500 hover:text-gray-300 text-xs underline"
          onClick={() => setChat([])}
        >
          Limpar histórico de chat
        </button>
      </div>
    </div>
  )
};