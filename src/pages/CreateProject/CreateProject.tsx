import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import technologiesData from "../../assets/json/technologies.json";
import Botao from "../../components/comum/Botao/Botao.tsx";
import Title from "../../components/comum/Title/Title.tsx";
import { projectService } from "../../services/firebase.ts";

interface FormData {
  title: string;
  image: File | null;
  imageGif: File | null;
  urlsite: string;
  urlrepository: string;
  technologies: string[];
  description: string;
}

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: null,
    imageGif: null,
    urlsite: "",
    urlrepository: "",
    technologies: [],
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files![0],
      }));
    }
  };

  const handleTechnologyChange = (techName: string) => {
    setFormData((prev) => {
      const technologies = prev.technologies.includes(techName)
        ? prev.technologies.filter((tech) => tech !== techName)
        : [...prev.technologies, techName];
      return { ...prev, technologies };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("urlsite", formData.urlsite);
      formDataToSend.append("urlrepository", formData.urlrepository);
      formDataToSend.append(
        "technologies",
        JSON.stringify(formData.technologies)
      );

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
      if (formData.imageGif) {
        formDataToSend.append("imageGif", formData.imageGif);
      }

      await projectService.create(formDataToSend);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      alert("Erro ao criar projeto. Tente novamente.");
    }
  };

  return (
    <div
      id="event-createProject-container"
      className="container mx-auto px-4 min-h-screen flex items-center justify-center"
    >
      <div className="w-full py-8">
        <Title className="text-center mb-6">Criar Novo Projeto</Title>
        <div className="max-w-2xl mx-auto bg-[#13131f] p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label-title">Título do Projeto:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#202024] text-white border border-[#408bec] focus:outline-none focus:border-none"
              />
            </div>

            <div className="form-group-midias">
              <div>
                <label className="form-label-title">Imagem do Projeto:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full p-2 text-[rgba(255,255,255,0.2)]"
                />
              </div>
              <div>
                <label className="form-label-title">GIF do Projeto:</label>
                <input
                  type="file"
                  name="imageGif"
                  onChange={handleFileChange}
                  className="w-full p-2 text-[rgba(255,255,255,0.2)]"
                />
              </div>
            </div>

            <div>
              <label className="form-label-title">URL do Projeto:</label>
              <input
                type="text"
                name="urlsite"
                value={formData.urlsite}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#202024] text-white border border-[#408bec] focus:outline-none focus:border-none"
              />
            </div>

            <div>
              <label className="form-label-title">URL do Repositório:</label>
              <input
                type="text"
                name="urlrepository"
                value={formData.urlrepository}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#202024] text-white border border-[#408bec] focus:outline-none focus:border-none"
              />
            </div>

            <div>
              <label className="form-label-title block text-center mb-4">
                Tecnologias usadas:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {technologiesData.technologies.map((tech) => (
                  <div key={tech.id} className="flex items-center p-1">
                    <input
                      type="checkbox"
                      id={`tech-${tech.id}`}
                      checked={formData.technologies.includes(tech.name)}
                      onChange={() => handleTechnologyChange(tech.name)}
                      className="mr-1"
                    />
                    <label
                      htmlFor={`tech-${tech.id}`}
                      className="text-white text-sm"
                    >
                      {tech.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <label className="form-label-title block text-center mb-2">
                Descrição do projeto:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#202024] text-white border border-[#408bec] focus:outline-none focus:border-none h-32"
              />
            </div>

            <div className="button-submit-container text-center pt-6">
              <Botao type="submit" className="button-submit">
                Postar Projeto
              </Botao>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
