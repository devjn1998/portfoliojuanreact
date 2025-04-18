import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/img/logotag.png";
import Botao from "../../comum/Botao/Botao.tsx";

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <header>
      <nav
        className="navbar bg-[#13131f] sticky top-0 border-b border-[#0d6eed] shadow-[0_4px_25px_rgba(0,0,0,0.363)] md:p-3"
        data-aos="fade-down"
        data-aos-delay="500"
      >
        <div
          id="navbar"
          className="flex flex-row justify-between items-center px-4 py-4"
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

          {/* Menu de navegação */}
          {isAuthenticated && (
            <div className="flex flex-row items-center gap-4">
              <Botao tipo="nav" to="/cadastrar">
                Postar projetos
              </Botao>
              <Botao tipo="nav" to="/dashboard">
                Meus projetos
              </Botao>
              <Botao tipo="nav" onClick={onLogout}>
                Sair
              </Botao>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
