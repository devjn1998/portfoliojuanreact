const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

console.log("Verificando variáveis de ambiente:", {
  CLOUD_NAME,
  UPLOAD_PRESET,
  allEnv: process.env,
});

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.error("Variáveis de ambiente não encontradas:", {
    CLOUD_NAME: !!CLOUD_NAME,
    UPLOAD_PRESET: !!UPLOAD_PRESET,
  });
  throw new Error("Cloudinary credentials not found in environment variables");
}

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadImage = async (file: File) => {
  try {
    console.log("Iniciando upload para Cloudinary...", {
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET,
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro detalhado do Cloudinary:", errorData);
      throw new Error(
        `Upload falhou: ${errorData.error?.message || "Erro desconhecido"}`
      );
    }

    const data = await response.json();
    console.log("Upload bem sucedido:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("Erro no upload:", error);
    throw error;
  }
};
