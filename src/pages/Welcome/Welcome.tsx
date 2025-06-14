import React, { useEffect } from "react";
import backgroundImage from "../../assets/img/background-apresentation.png";
import profileImage from "../../assets/img/fotoImg.png";
import logoImage from "../../assets/img/olaeusoujuan.png";
import { AnimatedImage } from "../../components/AnimatedImage.tsx";
import Projetos from "../../components/Layouts/Projetos/Projetos.tsx";
import Skills from "../../components/Layouts/Skills/Skills.tsx";
import Solutions from "../../components/Layouts/Solutions/Solutions.tsx";

const Welcome: React.FC = () => {
  useEffect(() => {
    const handleImageHover = (id: string) => {
      const image = document.getElementById(id);
      if (!image) return;

      const onEnter = () => {
        image.style.transform = "scale(1.1)";
      };

      const onLeave = () => {
        image.style.transform = "scale(1)";
      };

      image.addEventListener("mouseenter", onEnter);
      image.addEventListener("mouseleave", onLeave);

      return () => {
        image.removeEventListener("mouseenter", onEnter);
        image.removeEventListener("mouseleave", onLeave);
      };
    };

    handleImageHover("imgFoto");
    handleImageHover("imgLogo");
  }, []);

  return (
    <div className="min-h-screen bg-[#13131f] text-white">
      {/* Landing Page Section */}
      <section
        id="landing-page"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-center bg-cover min-h-screen"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center pt-10 lg:pt-20 gap-8">
            <div
              className="contacts w-full lg:w-1/2"
              data-aos="fade-right"
              data-aos-delay="500"
            >
              <AnimatedImage
                id="imgLogo"
                src={logoImage}
                alt="Olá Eu Sou Juan"
                delay={3000}
                className="w-full max-w-[300px] sm:max-w-md mx-auto lg:mx-0 cursor-pointer transition-transform duration-300"
              />

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-7">
                <a
                  href="https://drive.google.com/drive/folders/1zRo5mDJs5gTjvLfefBpt35v765bm5soV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center bg-gradient-to-r from-[#0510a1] to-[#010b63] px-5 py-2.5 text-white font-bold rounded-full border border-[#408bec] transition-all duration-200 hover:bg-gradient-to-r hover:from-[#0d1ced] hover:to-[#408bec] hover:border-none hover:scale-98"
                >
                  Download CV
                </a>
                <a
                  href="https://contate.me/desenvolvedorjuanmacedo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center bg-transparent px-5 py-2.5 rounded-full border border-[#408bec] transition-all duration-200 hover:bg-gradient-to-r hover:from-[#0d1ced] hover:to-[#408bec] hover:border-none hover:scale-98"
                >
                  Entrar em contato
                </a>
              </div>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="500"
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            >
              <AnimatedImage
                id="imgFoto"
                src={profileImage}
                alt="Foto de Juan"
                delay={4500}
                className="w-full max-w-[300px] lg:max-w-[400px] h-auto cursor-pointer transition-all duration-1000"
              />
            </div>
          </div>

          <div className="mt-12 lg:mt-20 flex justify-center items-center px-4">
            <div className="w-full max-w-4xl border border-[#0d6eed] p-4 sm:p-6 lg:p-8 bg-transparent shadow-lg rounded-md">
              <h1 className="text-[#fff] text-xl sm:text-2xl font-bold mb-4">
                Sobre mim
              </h1>
              <p
                className="text-[#b8b7b7] text-base sm:text-lg lg:text-2xl"
                data-aos="fade-left"
                data-aos-delay="1500"
              >
                Desenvolvedor Full Stack com experiência em aplicações web
                modernas, APIs RESTful e soluções completas com foco em perfomance
                e escalabidade. Atuo com JavaScript, TypeScript, React, Node.js,
                FastAPI e Spring Boot, além de ampla familiaridade com banco de dados 
                relacionais (MySQL, PostgreSQL) e NoSQL (MongoDB, Firebase Firestore).

                Tenho conhecimentos sólidos em MAchine LEarning com Python,
                especialmente com pandas e scikit-learn, aplicando esses
                recursos para análises, automações e protótipos de IA.
                Experiência prática com Docker, versionamento com GIt e deploys
                em AQS, Vercel e Firebase.
                Participo de projetos próprios e também trabalho como freelancer, 
                entregando soluções personalizadas para diferentes nichos.
                Meu foco está em qualidade de código, arquitetura limpa, usabilidade
                e entrega contínua.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Skills />
      <Projetos />
      <Solutions />
    </div>
  );
};

export default Welcome;
