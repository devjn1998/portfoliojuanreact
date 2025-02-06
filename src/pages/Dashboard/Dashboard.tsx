import React, { useState, useEffect } from 'react';
import Title from '../../components/comum/Title/Title.tsx';
import Botao from '../../components/comum/Botao/Botao.tsx';
import { projectService } from '../../services/firebase.ts';


interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageGif?: string;
  urlsite?: string;
  urlrepository?: string;
  technologies: string[];
  createdAt?: Date;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectService.getAll();
        console.log('Dados dos projetos:', data);
        setProjects(data as Project[]);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        setError('Erro ao carregar projetos. Por favor, tente novamente.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const deleteProject = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await projectService.delete(id);
        setProjects(prev => prev.filter(p => p.id !== id));
        setSelectedProject(null);
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
        alert('Erro ao deletar projeto. Tente novamente.');
      }
    }
  };

  if (selectedProject) {
    return (
      <div className="container mx-auto px-4 relative">
        <button 
          onClick={() => setSelectedProject(null)}
          className="absolute top-4 right-8 text-white text-2xl hover:text-[#408bec] transition-colors duration-300"
        >
          <span className="text-[#408bec] absolute top-4 left-8">✕</span>
        </button>
        <div className="min-h-screen bg-[#13131f] text-white py-12">
          <Title className="text-3xl font-bold text-center mb-8">{selectedProject.title}</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img 
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full rounded-lg object-cover shadow-lg hover:shadow-2xl transition-all duration-300"
            />
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">{selectedProject.description}</p>
              <div className="bg-[#202024] p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-[#408bec]">Links do Projeto:</h4>
                <ul className="space-y-3">
                  {selectedProject.urlsite && (
                    <li className="transition-all duration-300 hover:translate-x-2">
                      <a href={selectedProject.urlsite} target="_blank" rel="noopener noreferrer" className="text-[#408bec] hover:text-[#5a9fff] flex items-center gap-2">
                        <span>🔗</span> Visualizar projeto
                      </a>
                    </li>
                  )}
                  {selectedProject.urlrepository && (
                    <li className="transition-all duration-300 hover:translate-x-2">
                      <a href={selectedProject.urlrepository} target="_blank" rel="noopener noreferrer" className="text-[#408bec] hover:text-[#5a9fff] flex items-center gap-2">
                        <span>📁</span> Acessar repositório
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-[#202024] p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-[#408bec]">Tecnologias usadas:</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies && selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="bg-[#408bec] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#5a9fff] transition-colors duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Botao
                onClick={() => deleteProject(selectedProject.id)}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full mt-4 transition-all duration-300 hover:scale-105"
              >
                Excluir projeto
              </Botao>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="min-h-screen bg-[#13131f] text-white py-12">
        <Title className="text-3xl font-bold text-center mb-12">Tela de Projetos</Title>
        
        {loading && (
          <div className="text-center">
            <p className="text-xl animate-pulse">Carregando projetos...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-100/10 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {projects.length > 0 ? (
              projects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-[#202024] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold mb-2 text-[#408bec]">{project.title}</h4>
                    <p className="text-sm text-gray-300 line-clamp-3">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-[#408bec]/20 text-[#408bec] px-2 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className="text-xl text-gray-400">Não há projetos cadastrados</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
