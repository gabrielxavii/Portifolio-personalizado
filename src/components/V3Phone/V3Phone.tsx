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
          <h1>Portfólio</h1>
          <p>Bem-vindo ao meu espaço pessoal.</p>
        </div>
      )}
    </div>
  );
}

export default V3Phone;
