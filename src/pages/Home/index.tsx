import { useState } from "react";
import Form from "../../components/Form";
import SubmitButton from "../../components/SubmitButton";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import api from "../../services/api";
import type { RepositoriosDTO } from "../../types/repositorio";

export default function Home() {
  const [newRepo, setNewRepo] = useState("");
  const [respositorios, setRespositorios] = useState<RepositoriosDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      setRespositorios((prev) => [...prev, data]);
      setNewRepo("");
    } catch (error) {
      setError("Erro na requisição");
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded-sm bg-white p-8 shadow-[0_0_20px_black]">
        <h1 className="flex items-center justify-center gap-2 text-lg font-bold">
          <FaGithub size={20} />
          Meus repositórios
        </h1>

        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2 py-2 font-bold text-gray-500 outline-0"
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner className="animate-spin" size={17} />
            ) : (
              <FaPlus size={17} />
            )}
          </SubmitButton>
        </Form>

        {loading && <p>Carregando...</p>}

        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full">
          {respositorios.map((repositorio) => (
            <p key={repositorio.name}>{repositorio.name}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
