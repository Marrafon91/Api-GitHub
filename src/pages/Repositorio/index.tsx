import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import type { IssueDTO, RepositorioFullDTO } from "../../types/Repositorio";
import { FaSpinner } from "react-icons/fa";
import BackButton from "../../components/BackButton";
import FowardButton from "../../components/FowardButton";

export default function Repositorio() {
  const [repo, setRepo] = useState<RepositorioFullDTO | null>(null);
  const [issues, setIssues] = useState<IssueDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = repositorio ? decodeURIComponent(repositorio) : "";

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: "open",
          page,
          per_page: 5,
        },
      });
      setIssues(response.data);
    }

    loadIssue();
  }, [repositorio, page]);

  function handlePage(action: string) {
    setPage(action === "back" ? page - 1 : page + 1);
  }

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
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="relative flex w-full max-w-2xl flex-col items-center justify-center rounded-lg bg-white shadow-[0_0_20px_black]">
        <Link to="/" className="absolute top-4 left-4">
          <BackButton />
        </Link>
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="my-6 w-34 rounded-[20%]"
        />
        <h1 className="flex items-center justify-center text-4xl font-bold text-[#0D2636]">
          {repo.name.toLocaleUpperCase()}
        </h1>
        <p className="my-1.5 w-full max-w-100 text-center text-sm leading-snug wrap-break-word text-black">
          {repo.description}
        </p>
        <ul className="mt-8 flex flex-col items-center justify-center border-t border-black p-8 text-black">
          {issues.map((issue) => (
            <li key={String(issue.id)} className="flex p-3">
              <img
                src={issue.user.avatar_url}
                alt={issue.user.login}
                className="h-9 w-9 rounded-full border-2 border-[#0D2636]"
              />

              <div className="ml-3 flex-1">
                <strong className="font-semibold">
                  <a
                    className="text-[#222] no-underline transition-colors duration-300 hover:text-[#0071DB]"
                    href={issue.html_url}
                  >
                    {issue.title}
                  </a>

                  {issue.labels.map((label) => (
                    <span
                      key={String(label.id)}
                      className="ml-2 rounded-sm bg-[#222] p-1 text-xs font-semibold whitespace-nowrap text-white"
                    >
                      {label.name}
                    </span>
                  ))}
                </strong>
                <p className="mt-2.5 text-[12px] font-bold text-[#3600fa]">
                  {issue.user.login.toLocaleUpperCase()}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex w-full items-center justify-between gap-4 p-4">
          <BackButton
            onClick={() => handlePage("back")}
            disabled={page < 2}
          />
          <FowardButton onClick={() => handlePage("next")} />
        </div>
      </div>
    </main>
  );
}
