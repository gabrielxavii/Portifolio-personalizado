import { useState } from "react";
import V3 from "../../assets/phone-designopenclose.svg?react";

function V3Phone() {
    const [aberto, setAberto] = useState(false);

    function alterarTelefone() {
        setAberto((estadoAtual) => !estadoAtual);
    }

    return (
        <div 
        className={`v3-phone ${aberto ? "aberto" : "fechado"}`}
        onClick={alterarTelefone}
        >
            <V3 />
        </div>
    );
}

export default V3Phone
