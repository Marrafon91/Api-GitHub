import { useParams } from "react-router-dom";

export default function Repositorio() {
  const { repositorio } = useParams();

  const nomeRepositorio = repositorio ? decodeURIComponent(repositorio) : "";

  return (
    <h1 className="flex h-screen items-center justify-center text-3xl font-bold text-red-500">
      {nomeRepositorio}
    </h1>
  );
}
