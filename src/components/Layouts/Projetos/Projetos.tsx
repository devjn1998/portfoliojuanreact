import React, { useEffect, useState } from "react";
import { projectService } from "../../../services/firebase.ts";
import Title from "../../comum/Title/Title.tsx";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imagegif?: string;
  urlsite?: string;
  urlrepository?: string;
  technologies: string[];
}

const Projetos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectService.getAll();

        if (Array.isArray(response)) {
          const validProjects = response.filter((project) => {
            return (
              project &&
              typeof project.id === "string" &&
              typeof project.title === "string" &&
              project.image &&
              project.description &&
              Array.isArray(project.technologies)
            );
          });
          setProjects(validProjects);
        } else {
          setProjects([]);
          setError("Nenhum projeto encontrado");
        }
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        setError("Erro ao carregar projetos. Por favor, tente novamente.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (selectedProject) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto bg-[#13131f] rounded-lg shadow-xl my-8">
          <button
            onClick={() => setSelectedProject(null)}
            className="relative float-right text-white hover:text-[#408bec] transition-colors p-5"
          >
            ✕
          </button>

          <div className="p-6">
            <Title className="text-2xl font-bold text-center mb-6">
              {selectedProject.title}
            </Title>

            <div className="space-y-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />

              <p className="text-white text-base">
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {selectedProject.urlsite && (
                  <a
                    href={selectedProject.urlsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#408bec] hover:bg-[#5a9fff] px-4 py-2 rounded-full text-white text-sm transition-colors"
                  >
                    🔗 Ver Projeto
                  </a>
                )}
                {selectedProject.urlrepository && (
                  <a
                    href={selectedProject.urlrepository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#408bec] hover:bg-[#5a9fff] px-4 py-2 rounded-full text-white text-sm transition-colors"
                  >
                    📁 Repositório
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-[#202024] px-3 py-1 rounded-full text-xs text-[#408bec]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="projetos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-[#13131f] text-white py-8 rounded-xl">
          <Title className="text-2xl font-bold text-center mb-8">
            Projetos
          </Title>

          {loading && (
            <div className="text-center">
              <p className="text-lg animate-pulse">Carregando projetos...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 bg-red-100/10 p-3 rounded-lg mx-4">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-4 px-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="bg-[#202024] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="text-base font-semibold text-[#408bec] truncate">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center">
                  <p className="text-gray-400">Não há projetos cadastrados</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projetos;
