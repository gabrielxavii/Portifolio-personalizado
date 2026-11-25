import { useRef, useState, useEffect } from "react";

import musica01 from "../../assets/music/Humming-The-Bassline.mp3";
import musica02 from "../../assets/music/I-Wanna-Kno.mp3";
import musica03 from "../../assets/music/Shape-Da-Future.mp3";

interface Music {
  title: string;
  artist: string;
  file: string;
}

const musicList: Music[] = [
  { title: "Humming the bassline", artist: "Jet Set Radio", file: musica01 },
  { title: "I Wanna Know", artist: "2Melo", file: musica02 },
  { title: "Shape da future", artist: "Jet Set Radio", file: musica03 },
];

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [musicaAtual, setMusicaAtual] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [duracao, setDuracao] = useState(0);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  async function alternarReproducao() {
    const audio = audioRef.current;
    if (!audio) return;

    if (tocando) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.error("Erro ao reproduzir música:", error);
      }
    }
  }

    function avancarMusica() {
    setMusicaAtual((atual) => (atual + 1) % musicList.length);
    setTocando(false);
    setTempoAtual(0);
    setDuracao(0);
    }

    function retrocederMusica() {
    setMusicaAtual((atual) =>
        (atual - 1 + musicList.length) % musicList.length
    );
    setTocando(false);
    setTempoAtual(0);
    setDuracao(0);
    }

  function formatarTempo(tempo: number) {
    if (!Number.isFinite(tempo)) return "0:00";

    const minutos = Math.floor(tempo / 60);
    const segundos = Math.floor(tempo % 60);

    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  }

  function alterarTempo(valor: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = valor;
      setTempoAtual(valor);
    }
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={musicList[musicaAtual].file}
        onLoadedMetadata={(event) => setDuracao(event.currentTarget.duration)}
        onTimeUpdate={(event) => setTempoAtual(event.currentTarget.currentTime)}
        onEnded={() => setTocando(false)}
        onPause={() => setTocando(false)}
        onPlay={() => setTocando(true)}
      />

      <div className="music-player-header">
        <span>NOW PLAYING</span>
        <span className={tocando ? "music-status ativo" : "music-status"}>
          {tocando ? "PLAYING" : "STOPPED"}
        </span>
      </div>

      <div className="music-player-info">
        <strong>{musicList[musicaAtual].title}</strong>
        <span>{musicList[musicaAtual].artist}</span>
      </div>

      <div className="music-progress">
        <input
          type="range"
          min="0"
          max={duracao || 0}
          value={Math.min(tempoAtual, duracao || 0)}
          onChange={(event) => alterarTempo(Number(event.target.value))}
        />

        
      </div>

      <div className="music-controls">
        <button onClick={retrocederMusica}>|◀</button>

        <button onClick={alternarReproducao}>
            {tocando ? "||" : "▶"}
        </button>

        <button onClick={avancarMusica}>▶|</button>
    </div>

      <div className="music-volume">
        <span>VOL</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </div>

     
    </div>
  );
}

export default MusicPlayer;