import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import type { IssueDTO, RepositorioFullDTO } from "../../types/Repositorio";
import { FaSpinner } from "react-icons/fa";
import BackButton from "../../components/BackButton";

export default function Repositorio() {
  const [repo, setRepo] = useState<RepositorioFullDTO | null>(null);
  const [issues, setIssues] = useState<IssueDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { repositorio } = useParams();
  const nomeRepo = repositorio ? decodeURIComponent(repositorio) : "";

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
        <p className="flex items-center gap-2 text-lg font-bold text-white">
          {loading && (
            <>
              <FaSpinner className="animate-spin" size={17} />
              Carregando...
            </>
          )}
        </p>
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
      <header className="relative flex w-full max-w-2xl flex-col items-center justify-center rounded-lg bg-white shadow-[0_0_20px_black]">
        <Link to="/" className="absolute top-4 left-4">
          <BackButton />
        </Link>
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="my-5.5 w-37.5 rounded-[20%]"
        />
        <h1 className="flex items-center justify-center text-4xl font-bold text-[#0D2636]">
          {repo.name.toLocaleUpperCase()}
        </h1>
        <p className="my-1.5 w-full max-w-100 text-center text-sm leading-[1.4] wrap-break-word text-black">
          {repo.description}
        </p>
      </header>
    </main>
  );
}
