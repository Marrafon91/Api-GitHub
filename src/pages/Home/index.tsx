import { useCallback, useEffect, useState } from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import type { RepositoriosDTO } from "../../types/Repositorio";

import SubmitButton from "../../components/SubmitButton";
import Form from "../../components/Form";
import api from "../../services/api";
import axios from "axios";
import DeleteButton from "../../components/DeleteButton";
import { Link } from "react-router-dom";

export default function Home() {
  const [newRepo, setNewRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [respositorios, setRespositorios] = useState<RepositoriosDTO[]>(() => {
    const repoStorage = localStorage.getItem("repos");

    if (repoStorage) {
      return JSON.parse(repoStorage);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(respositorios));
  }, [respositorios]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    const repo = newRepo.trim();

    if (!repo) {
      setError("Digite o repositório!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(`/repos/${repo}`);

      const repoName = response.data.full_name;

      const hasRepo = respositorios.some(
        (repositorio) =>
          repositorio.name.toLowerCase() === repoName.toLowerCase(),
      );

      if (hasRepo) {
        setError("Repositório já existe!");
        return;
      }

      const data: RepositoriosDTO = {
        name: repoName,
      };

      setRespositorios((prev) => [...prev, data]);
      setNewRepo("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          setError(
            "Limite de requisições da API excedido. Tente novamente mais tarde.",
          );
        } else if (error.response?.status === 404) {
          setError("Repositório não encontrado!");
        } else {
          setError("Erro ao buscar repositório.");
        }
      }

      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = useCallback((repoName: string) => {
    setRespositorios((prev) => prev.filter((repo) => repo.name !== repoName));
  }, []);

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

        <ul className="w-full space-y-2">
          {respositorios.map((repo) => (
            <li
              key={repo.name}
              className="flex list-none items-center justify-between rounded-md border border-gray-200 p-3"
            >
              <span>
                <DeleteButton
                  onClick={() => {
                    handleDelete(repo.name);
                  }}
                />
                {repo.name}
              </span>
              <Link
                to={`/repositorio/${encodeURIComponent(repo.name)}`}
                className="text-[#0D2636] no-underline"
              >
                <FaBars size={20} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
