import Form from "../../components/Form";
import SubmitButton from "../../components/SubmitButton";
import { FaGithub, FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded-sm bg-white p-8 shadow-[0_0_20px_black]">
        <h1 className="flex items-center justify-center gap-2 text-lg font-bold">
          <FaGithub size={20} />
          Meus repositórios
        </h1>

        <Form onSubmit={() => {}}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2 py-2 font-bold text-gray-500 outline-0"
          />

          <SubmitButton
            children={<FaPlus size={17} />}
          ></SubmitButton>
        </Form>
      </div>
    </main>
  );
}
