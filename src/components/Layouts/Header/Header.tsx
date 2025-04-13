import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/img/logotag.png";
import Botao from "../../comum/Botao/Botao.tsx";

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav
        className="navbar bg-[#13131f] sticky top-0 border-b border-[#0d6eed] shadow-[0_4px_25px_rgba(0,0,0,0.363)] md:p-3"
        data-aos="fade-down"
        data-aos-delay="500"
      >
        <div
          id="navbar"
          className="flex justify-between items-center px-4 py-4"
        >
          <div className="logo">
            <Link to="/">
              <img
                src={logoImage}
                alt="logo"
                className="h-[76px] border-2 border-[#0d6eed] shadow-[0px_0px_4px_rgba(35,42,136,0.74)] transition-all duration-300 hover:shadow-[0_0_12px_1px_rgba(0,13,22,0.8)] hover:scale-[1.04]"
              />
            </Link>
          </div>

          {/* Botão do menu hamburguer para mobile - só aparece quando autenticado */}
          {isAuthenticated && (
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}

          {/* Menu de navegação */}
          <div
            className={`navbar-nav ${
              isMenuOpen ? "block" : "hidden"
            } md:block absolute md:relative top-full left-0 w-full md:w-auto bg-[#13131f] md:bg-transparent z-50`}
          >
            <ul className="flex flex-col md:flex-row items-center py-4 md:py-0">
              {isAuthenticated ? (
                <>
                  <li className="w-full md:w-auto text-center py-2 md:py-0">
                    <Botao
                      tipo="nav"
                      to="/cadastrar"
                      className="w-full md:w-auto"
                    >
                      Postar projetos
                    </Botao>
                  </li>
                  <li className="w-full md:w-auto text-center py-2 md:py-0">
                    <Botao
                      tipo="nav"
                      to="/dashboard"
                      className="w-full md:w-auto"
                    >
                      Meus projetos
                    </Botao>
                  </li>
                  <li className="w-full md:w-auto text-center py-2 md:py-0">
                    <Botao
                      tipo="nav"
                      onClick={onLogout}
                      className="w-full md:w-auto"
                    >
                      Sair
                    </Botao>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
