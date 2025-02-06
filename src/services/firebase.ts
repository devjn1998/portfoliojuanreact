import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { uploadImage } from './cloudinary.ts';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageGif?: string;
  urlsite?: string;
  urlrepository?: string;
  technologies: { name: string }[];
  createdAt?: Date;
}

if (!process.env.REACT_APP_FIREBASE_API_KEY) {
  throw new Error('Missing Firebase API Key');
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Inicializa a coleção 'projects' se não existir
const projectsCollection = collection(db, 'projects');

export const projectService = {
  // Criar projeto
  create: async (formData: FormData) => {
    try {
      console.log('Iniciando criação do projeto...');
      
      const imageFile = formData.get('image') as File;
      const imageGifFile = formData.get('imageGif') as File;
      
      console.log('Arquivos recebidos:', {
        image: imageFile ? {
          name: imageFile.name,
          type: imageFile.type,
          size: imageFile.size
        } : null,
        imageGif: imageGifFile ? {
          name: imageGifFile.name,
          type: imageGifFile.type,
          size: imageGifFile.size
        } : null
      });

      let imageUrl = '';
      let imageGifUrl = '';

      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }
      
      if (imageGifFile && imageGifFile.size > 0) {
        imageGifUrl = await uploadImage(imageGifFile);
      }

      console.log('Imagens enviadas:', { imageUrl, imageGifUrl });

      const projectData = {
        title: formData.get('title'),
        description: formData.get('description'),
        urlsite: formData.get('urlsite'),
        urlrepository: formData.get('urlrepository'),
        technologies: JSON.parse(formData.get('technologies') as string),
        image: imageUrl,
        imageGif: imageGifUrl,
        createdAt: new Date()
      };
      
      console.log('Dados do projeto:', projectData);
      
      console.log('Criando documento no Firestore...');
      const projectRef = await addDoc(projectsCollection, projectData);

      console.log('Projeto criado com sucesso! ID:', projectRef.id);
      return projectRef.id;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  },

  // Listar projetos
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || '',
      description: doc.data().description || '',
      image: doc.data().image || '',
      imageGif: doc.data().imageGif,
      urlsite: doc.data().urlsite,
      urlrepository: doc.data().urlrepository,
      technologies: doc.data().technologies || [], 
      createdAt: doc.data().createdAt
    })) as Project[];
  },

  // Deletar projeto
  delete: async (id: string) => {
    await deleteDoc(doc(db, 'projects', id));
  }
};

export const firebaseService = {
  login: async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  logout: async () => {
    return signOut(auth);
  }
}; 