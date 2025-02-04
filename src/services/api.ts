import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Criamos uma instância do axios para facilitar as chamadas
const api = axios.create({
  baseURL: API_URL,
});

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    imagegif: string;
    urlsite: string;
    urlrepository: string;
    technologies: { name: string }[];
}

interface LoginCredentials {
    email: string;
    password: string;
}

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/login', credentials);
        return response.data;
    }
};

export const projectService = {
    getAll: async (timestamp?: number): Promise<Project[]> => {
        const response = await api.get(`/projects?t=${timestamp || Date.now()}`);
        return response.data
          .filter(Boolean) // Remove itens null/undefined
          .map((project: Project) => ({
            ...project,
            image: project.image ? `${API_URL}/img/events/${project.image}?t=${Date.now()}` : '',
            imagegif: project.imagegif ? `${API_URL}/img/events/${project.imagegif}?t=${Date.now()}` : ''
          }));
    },
    // Criar novo projeto
    create: async (formData: FormData) => {
      const response = await api.post('/create-project', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  },

  // Deletar um projeto
  delete: async (id: number) => {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
  },

  // Buscar um projeto específico
  getById: async (id: number) => {
      const response = await api.get(`/projects/${id}`);
      return response.data;
  }
};


export const technologyService = {
    // Buscar todas as tecnologias
    getAll: async () => {
        const response = await api.get('/technologies');
        return response.data;
    }
};