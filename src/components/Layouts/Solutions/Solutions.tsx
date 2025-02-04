import React from 'react';
import solutionsImage from '../../../assets/img/soluctionsapresentation.png';
import backgroundImage from '../../../assets/img/background-apresentation-2.png';
import Botao from '../../comum/Botao/Botao.tsx';

const Solutions: React.FC = () => {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center py-12 px-4 text-white"
      style={{backgroundImage: `url(${backgroundImage})`}}
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
            <form 
              id="contact-me" 
              className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-md mx-auto"
              action="https://formsubmit.co/juandev1998@gmail.com"
              method="POST"
              encType="multipart/form-data"
            >
              <h2 className="text-2xl font-bold text-center mb-6">Me envie uma mensagem</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-1">Seu nome:</label>
                  <input 
                    type="text" 
                    name="nome" 
                    id="nome"
                    className="w-full bg-transparent border border-white/40 rounded-lg p-2 focus:border-[#408bec] focus:outline-none transition-colors" 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Seu e-mail:</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    className="w-full bg-transparent border border-white/40 rounded-lg p-2 focus:border-[#408bec] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium mb-1">Seu telefone:</label>
                  <input 
                    type="tel" 
                    name="telefone" 
                    id="telefone"
                    className="w-full bg-transparent border border-white/40 rounded-lg p-2 focus:border-[#408bec] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium mb-1">Mensagem:</label>
                  <textarea 
                    name="mensagem" 
                    id="mensagem"
                    rows={4}
                    className="w-full bg-transparent border border-white/40 rounded-lg p-2 focus:border-[#408bec] focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="text-center">
                  <Botao tipo="nav" className="w-full sm:w-auto">
                    Enviar
                  </Botao>
                </div>
              </div>

              <input type="hidden" name="_subject" value="Alguém enviou uma mensagem do site Juan Dev" />
              <input type="text" name="_honey" style={{display: 'none'}} />
              <input type="hidden" name="_captcha" value="false" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
