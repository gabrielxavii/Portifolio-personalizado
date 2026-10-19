import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import V3 from "../../assets/phone-designopenclose.svg?react";

type PosicaoTela = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function V3Phone() {
  const [aberto, setAberto] = useState(false);
  const [pagina, setPagina] = useState("inicio");
  const [posicaoTela, setPosicaoTela] = useState<PosicaoTela | null>(null);
  const [zoomIn, setZoomIn] = useState(false);
  const desenhoRef = useRef<HTMLDivElement>(null);

  function alterarTelefone() {
    setAberto((estadoAtual) => !estadoAtual);
  }

  useEffect(() => {
    if (!aberto) {
      setPosicaoTela(null);
      setZoomIn(false);
      return;
    }

    const temporizador = window.setTimeout(() => {
      const tela = desenhoRef.current?.querySelector(
        "#v3-aberto #tela"
      ) as SVGGraphicsElement | null;

      if (!tela) {
        console.error("Não foi possível encontrar o grupo #tela no SVG.");
        return;
      }

      const retangulo = tela.getBoundingClientRect();

      setPosicaoTela({
        left: retangulo.left,
        top: retangulo.top,
        width: retangulo.width,
        height: retangulo.height,
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setZoomIn(true));
      });
    }, 550);

    return () => window.clearTimeout(temporizador);
  }, [aberto]);

  const estiloTela: CSSProperties | undefined = posicaoTela
    ? {
        left: zoomIn ? 0 : posicaoTela.left,
        top: zoomIn ? 0 : posicaoTela.top,
        width: zoomIn ? "100vw" : posicaoTela.width,
        height: zoomIn ? "100vh" : posicaoTela.height,
      }
    : undefined;

  return (
    <div className={`v3-phone ${aberto ? "aberto" : "fechado"}`}>
      <div
        className="v3-phone-desenho"
        ref={desenhoRef}
        onClick={alterarTelefone}
      >
        <V3 />
      </div>

      {aberto && posicaoTela && (
        <div
          className={`v3-tela-conteudo ${zoomIn ? "zoom-in" : ""}`}
          style={estiloTela}
        >
            <header className="site-header">
                <span className="site-logo">V3://PORTFOLIO</span>

                <nav className="site-nav">
                    <button onClick={() => setPagina("inicio")}>Início</button>
                    <button onClick={() => setPagina("projetos")}>Portfólio</button>
                    <button onClick={() => setPagina("formacao")}>Formação</button>
                    <button onClick={() => setPagina("sobre")}>Sobre mim</button>
                    <button onClick={() => setPagina("contato")}>Contato</button>
                </nav>
            </header>

            <main className="site-content">
                {pagina === "inicio" && (
                    <>
                        <p>SISTEMA INICIALIZADO...</p>
                        <h1>Bem-vindo ao meu portfólio.</h1>
                        <p>Estudante de Análise e Desenvolvimento de Sistemas.</p>
                        <p>Explore os menus para conhecer meus projetos e minha trajetória.</p>
                    </>
                )}

                {pagina === "projetos" && <h1>Meus projetos</h1>}
                {pagina === "formacao" && <h1>Formação</h1>}
                {pagina === "sobre" && <h1>Sobre mim</h1>}
                {pagina === "contato" && <h1>Contato</h1>}
            </main>
        </div>
      )}
    </div>
  );
}

export default V3Phone;
