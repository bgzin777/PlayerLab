const btnJogador = document.getElementById("btn-jogador");
const btnClube = document.getElementById("btn-clube");

// verificar escolha salva
const tipo = localStorage.getItem("playerlab_tipo");

if(tipo === "jogador"){
    window.location.href = "jogador.html";
}

if(tipo === "clube"){
    window.location.href = "clube.html";
}

// jogador
btnJogador.addEventListener("click",()=>{
    localStorage.setItem("playerlab_tipo","jogador");
    window.location.href = "jogador.html";
});

// clube
btnClube.addEventListener("click",()=>{
    localStorage.setItem("playerlab_tipo","clube");
    window.location.href = "clube.html";
});