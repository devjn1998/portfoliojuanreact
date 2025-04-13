import React from "react";
import { Link } from "react-router-dom";

interface BotaoProps {
  children: React.ReactNode;
  tipo?: "primario" | "secundario" | "nav";
  onClick?: () => void;
  to?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Botao: React.FC<BotaoProps> = ({
  children,
  tipo = "primario",
  onClick,
  to,
  className = "",
  type = "button",
}) => {
  const estilos = {
    primario:
      "bg-gradient-to-r from-[#0510a1] to-[#010b63] px-5 py-2.5 text-white font-bold rounded-full border border-[#408bec] transition-all duration-200 hover:bg-gradient-to-r hover:from-[#0d1ced] hover:to-[#408bec] hover:border-none hover:scale-98",
    secundario:
      "bg-transparent px-5 py-2.5 rounded-full border border-[#408bec] text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-[#0d1ced] hover:to-[#408bec] hover:border-none hover:scale-98",
    nav: "nav-item inline-block bg-transparent border-4 border-white scale-98 text-white font-bold text-xl rounded-[10px] px-12 py-3 mx-2.5 transition-all duration-500 hover:border-[#ffffff1c] md:text-base md:px-2.5 md:py-0.5 md:text-center",
  };

  if (to) {
    return (
      <Link to={to} className={`${estilos[tipo]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${estilos[tipo]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Botao;
