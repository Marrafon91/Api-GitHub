import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import type { IssueDTO, RepositorioIssuesDTO } from "../../types/Repositorio";

export default function Repositorio() {
  const { repositorio } = useParams();

  const nomeRepo = repositorio ? decodeURIComponent(repositorio) : "";
  const [repo, setRepo] = useState<RepositorioIssuesDTO | null>(null);
  const [issues, setIssues] = useState<IssueDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: "open",
              per_page: 5,
            },
          }),
        ]);

        setRepo(repositorioData.data);
        setIssues(issuesData.data);
      } catch (error) {
        console.error("Erro ao carregar repositório:", error);
        setError("Não foi possível carregar o repositório.");
      } finally {
        setLoading(false);
      }
    }

    if (nomeRepo) {
      load();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      setError("Repositório inválido.");
    }
  }, [nomeRepo]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-bold">Carregando...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="rounded-md bg-white p-8 shadow-[0_0_20px_black]">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  if (!repo) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Repositório não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded-sm bg-white p-8 shadow-[0_0_20px_black]">
        <h1 className="flex h-screen items-center justify-center text-3xl font-bold text-red-500">
          {nomeRepo}
        </h1>
      </div>
    </main>
  );
}
