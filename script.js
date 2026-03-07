let dias = ["Seg","Ter","Qua","Qui","Sex","Sab","Dom"]

let dadosSemana = [0,0,0,0,0,0,0]

let totalTreinos = 0

let grafico


function salvarPerfil(){

let nome = document.getElementById("nome").value
let altura = parseInt(document.getElementById("altura").value)
let peso = parseInt(document.getElementById("peso").value)
let posicao = document.getElementById("posicao").value

let analiseAltura = ""
let analisePeso = ""
let dica = ""

if(altura < 170){
analiseAltura = "baixo"
}else if(altura < 185){
analiseAltura = "altura média"
}else{
analiseAltura = "alto"
}

if(peso < 65){
analisePeso = "magro"
dica = "Você precisa se alimentar melhor para ganhar massa."
}
else if(peso < 85){
analisePeso = "peso normal"
dica = "Continue mantendo alimentação equilibrada."
}
else{
analisePeso = "acima do peso"
dica = "Tente melhorar a alimentação e treinar mais."
}

let texto = `
Jogador: ${nome}
Posição: ${posicao}
Altura: ${altura} cm (${analiseAltura})
Peso: ${peso} kg (${analisePeso})
Dica: ${dica}
`

document.getElementById("perfil").innerText = texto

localStorage.setItem("perfil", texto)

}


function salvarTreino(){

let tempo = document.getElementById("tempoTreino").value

if(!tempo) return

let hoje = new Date().getDay()

let index = hoje === 0 ? 6 : hoje - 1

dadosSemana[index] += parseInt(tempo)

totalTreinos++

localStorage.setItem("dadosSemana", JSON.stringify(dadosSemana))
localStorage.setItem("totalTreinos", totalTreinos)

document.getElementById("totalTreinos").innerText = totalTreinos

criarGrafico()

}


function apagarSemana(){

dadosSemana = [0,0,0,0,0,0,0]

totalTreinos = 0

localStorage.setItem("dadosSemana", JSON.stringify(dadosSemana))
localStorage.setItem("totalTreinos", totalTreinos)

document.getElementById("totalTreinos").innerText = 0

criarGrafico()

}


function carregarDados(){

let dadosSalvos = JSON.parse(localStorage.getItem("dadosSemana"))
let totalSalvo = localStorage.getItem("totalTreinos")
let perfil = localStorage.getItem("perfil")

if(dadosSalvos){
dadosSemana = dadosSalvos
}

if(totalSalvo){
totalTreinos = totalSalvo
document.getElementById("totalTreinos").innerText = totalTreinos
}

if(perfil){
document.getElementById("perfil").innerText = perfil
}

}


function criarGrafico(){

let ctx = document.getElementById("graficoTreino")

if(!ctx) return

if(grafico){
grafico.destroy()
}

grafico = new Chart(ctx,{

type:"bar",

data:{
labels:dias,
datasets:[{
label:"Tempo de treino (min)",
data:dadosSemana,
backgroundColor:"#22c55e"
}]
},

options:{
plugins:{
legend:{
labels:{color:"white"}
}
},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}

})

}


carregarDados()
criarGrafico()