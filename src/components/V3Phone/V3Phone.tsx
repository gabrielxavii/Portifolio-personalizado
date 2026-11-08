import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import V3 from "../../assets/phone-designopenclose.svg?react";
import perfilFallout from "../../assets/perfil-fallout.png";

type PosicaoTela = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function V3Phone() {
  const [aberto, setAberto] = useState(false);
  const [pagina, setPagina] = useState("inicio");
  const [atributoSelecionado, setAtributoSelecionado] = useState({
    nome: "Eficiência",
    descricao:
    "Buscar soluções práticas e organizar tarefas para alcançar resultados.",
  });
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
                    <section className="home">
                        <div className="system-status">
                            <span>V3 OS</span>
                            <span>SISTEMA ONLINE</span>
                        </div>
                    
                <div className="home-grid">
                        <p className="terminal-label">
                            &gt; INICIALIZANDO PORTFÓLIO...
                        </p>

                        <h1>
                            Olá, eu sou
                            <br />
                            <span>Gabriel.</span>
                        </h1>

                        <p className="home-description">
                            Estudante de Análise e Desenvolvimento de Sistemas,
                            interessado em tecnologia, programação e desenvolvimento
                            de soluções.
                        </p>

                        <div className="home-actions">
                            <button onClick={() => setPagina("projetos")}>
                                [ VER PROJETOS ]
                            </button>

                            <button onClick={() => setPagina("sobre")}>
                                [ SOBRE MIM ]
                            </button>
                        </div>
                    </div>

                        <div className="system-footer">
                            <span>MEMORY OK</span>
                            <span>VERSION 1.0</span>
                        </div>
                    </section>
                )}

                {pagina === "projetos" && (
                  <section className="projects">
                    <p className="terminal-label">&gt; DIRETÓRIO DE PROJETOS</p>
                    <h1>Meus projetos</h1>
                    <p>Projetos desenvolvidos durante meus estudos e minha evolução em tecnologia.</p>

                    <div className="projects-grid">
                      <article className="project-card">
                        <span className="project-number">PROJECT_001</span>
                        <h2>Portifólio pessoal</h2>
                        <p>Site interativo inspirado na estética da internet antiga e no Motorola V3.</p>
                        <div className="project-tags">
                          <span>React</span>
                          <span>TypeScript</span>
                          <span>CSS</span>
                          
                          <a
                            className="project-link"
                            href="https://github.com/gabrielxavii"
                            target="_blank"
                            rel="noreferrer"
                            >
                              [ VER NO GITHUB ↗ ]
                            </a>
                        </div>
                      </article>

                      <article className="project-card">
                        <span className="project-number">Project_002</span>
                        <h2>Projeto acadêmico</h2>
                        <p>Espaço reservado para apresentar outro projeto desenvolvido durante a graduação.</p>
                        <div className="project-tags">
                          <span>Em desenvolvimento</span>
                        </div>

                      </article>
                    </div>
                  </section>

                )}
                {pagina === "formacao" && (
                  <section className="education">
                    <p className="terminal-label">&gt; REGISTRO ACADÊMICO</p>
                    <h1>Formação</h1>

                    <article className="education-card">
                      <span className="project-number">FORMAÇÃO_001</span>
                      <h2>Análise e Desenvolvimento de Sistemas</h2>
                      <p>
                        Graduação voltada ao desenvolvimento de software,
                        análise de sistemas e fundamentos da tecnologia.
                      </p>
                      <span className="education-status">STATUS: EM ANDAMENTO</span>
                    </article>

                    <article className="education-card">
                      <span className="project-number">ESTUDOS_001</span>
                      <h2>Estudos complementares</h2>
                      <p>
                        Espaço para registrar cursos, certificados e outras
                        competências desenvolvidas ao longo da formação.
                      </p>
                      <span className="education-status">REGISTRO DISPONÍVEL</span>
                    </article>
                  </section>
                )}
                {pagina === "sobre" && (
                  <section className="about">
                    <p className="terminal-label">&gt; PERFIL DO USUÁRIO</p>
                    <h1>Sobre mim</h1>
                    
                    <div className="about-special">
                      <div className="about-portait">
                        <img
                          className="about-portrait-image"
                          src={perfilFallout}
                          alt="Retrato em estilo retrô de Fallout"
                        />
                        <p>USUÁRIO: GABRIEL</p>
                        <p>STATUS: EM DESENVOLVIMENTO</p>
                      </div>

                      <div className="about-attributes">
                        <p className="attributes-title">E.S.P.E.C.I.A.L.</p>
                        <p className="attributes-subtitle">
                          SELECIONE UMA QUALIDADE
                        </p>

                        {[
                          {
                            nome: "Eficiência",
                            descricao: "Buscar soluções práticas e organizar tarefas para alcançar resultados."
                          },
                          {
                            nome: "Solução de problemas",
                            descricao: "Analisar desafios e investigar alternativas para resolvê=los."
                          },
                          {
                            nome: "Pensamento critico",
                            descricao: "Avaliar informações e considerar diferentes possibilidades antes de decidir."
                          },
                          {
                            nome: "Espirito de equipe",
                            descricao: "Colaborar com outras pessoas para atingir objetivos em comum."
                          },
                          {
                            nome: "Comunicação",
                            descricao: "Transmitir ideias e informações de maneira clara."
                          },
                          {
                            nome: "Iniciativa",
                            descricao: "Buscar oportunidades de aprendizado e melhoria continua."
                          },
                          {
                            nome: "Adaptabilidade",
                            descricao: "Aprender novas ferramentas e lidar com mudanças."
                          },
                          {
                            nome: "Lógica",
                            descricao: "Organizar o raciocinio para compreender e resolver problemas."
                          }
                        ].map((atributo) =>(
                          <button
                            className={`attribute-button ${
                              atributoSelecionado.nome === atributo.nome ? "selecionado" : ""
                            }`}
                            key={atributo.nome}
                            onClick={() =>
                              setAtributoSelecionado(atributo)
                            }
                          >
                            {atributo.nome}
                          </button>
                        ))}

                        <div className="attribute-description">
                          <p>&gt; QUALIDADE SELECIONADA</p>
                          <h2>{atributoSelecionado.nome}</h2>
                          <p>{atributoSelecionado.descricao}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                {pagina === "contato" && <h1>Contato</h1>}
            </main>
        </div>
      )}
    </div>
  );
}

export default V3Phone;
