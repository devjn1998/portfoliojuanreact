import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import backgroundImage from "../../../assets/img/background-apresentation-2.png";
import solutionsImage from "../../../assets/img/soluctionsapresentation.png";
import Botao from "../../comum/Botao/Botao.tsx";
import Title from "../../comum/Title/Title.tsx";

const Solutions: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "juandev1998@gmail.com",
      };

      await emailjs.send(
        "service_cu7r3pp",
        "template_qcwzcbc",
        templateParams,
        "GopptU0helcG_Jjpd"
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center py-12 px-4 text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      data-aos="fade-right"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            <img
              src={solutionsImage}
              alt="Apresentação"
              className="w-full max-w-md mx-auto"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <Title className="text-2xl font-bold text-center mb-12">
              Entre em Contato
            </Title>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded bg-[#202024] text-white border border-[#408bec] focus:outline-none focus:border-[#5a9fff]"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded bg-[#202024] text-white border border-[#408bec] focus:outline-none focus:border-[#5a9fff]"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Mensagem</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 rounded bg-[#202024] text-white border border-[#408bec] focus:outline-none focus:border-[#5a9fff]"
                />
              </div>

              <Botao
                type="submit"
                disabled={loading}
                className={`w-full bg-[#408bec] text-white py-3 rounded transition-all duration-300 
                  ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#5a9fff]"
                  }`}
              >
                {loading ? "Enviando..." : "Enviar Mensagem"}
              </Botao>

              {status === "success" && (
                <div className="text-green-500 text-center">
                  Mensagem enviada com sucesso!
                </div>
              )}

              {status === "error" && (
                <div className="text-red-500 text-center">
                  Erro ao enviar mensagem. Tente novamente.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
