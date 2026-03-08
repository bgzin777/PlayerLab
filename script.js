let dias=["Seg","Ter","Qua","Qui","Sex","Sab","Dom"]

let dadosSemana=[0,0,0,0,0,0,0]

let totalTreinos=0
let pontuacao=0
let grafico


function salvarPerfil(){

let nome=document.getElementById("nome").value
let altura=parseInt(document.getElementById("altura").value)
let peso=parseInt(document.getElementById("peso").value)
let posicao=document.getElementById("posicao").value

let alturaStatus=""
let pesoStatus=""
let dica=""

if(altura<170){
alturaStatus="baixo"
}else if(altura<185){
alturaStatus="altura média"
}else{
alturaStatus="alto"
}

if(peso<65){
pesoStatus="magro"
dica="Você precisa se alimentar melhor para ganhar massa."
}
else if(peso<85){
pesoStatus="peso normal"
dica="Continue mantendo alimentação equilibrada."
}
else{
pesoStatus="acima do peso"
dica="Tente melhorar a alimentação e treinar mais."
}

let texto=`
Jogador: ${nome}
Posição: ${posicao}
Altura: ${altura} cm (${alturaStatus})
Peso: ${peso} kg (${pesoStatus})
Dica: ${dica}
`

document.getElementById("perfil").innerText=texto

localStorage.setItem("perfil",texto)

}


function salvarTreino(){

let tempo=document.getElementById("tempoTreino").value
let resultado=document.getElementById("resultadoTreino").value

if(!tempo)return

let hoje=new Date().getDay()

let index=hoje===0?6:hoje-1

dadosSemana[index]+=parseInt(tempo)

totalTreinos++

pontuacao+=parseInt(tempo)

localStorage.setItem("dadosSemana",JSON.stringify(dadosSemana))
localStorage.setItem("totalTreinos",totalTreinos)
localStorage.setItem("pontuacao",pontuacao)

document.getElementById("totalTreinos").innerText=totalTreinos
document.getElementById("pontuacao").innerText=pontuacao

if(resultado){
alert("Resultado do treino: "+resultado)
}

definirNivel()

criarGrafico()

}


function definirNivel(){

let nivel="Iniciante"

if(pontuacao>50){
nivel="Jogador em evolução"
}

if(pontuacao>120){
nivel="Jogador dedicado"
}

if(pontuacao>250){
nivel="Atleta avançado"
}

document.getElementById("nivel").innerText=nivel

}


function apagarSemana(){

dadosSemana=[0,0,0,0,0,0,0]

totalTreinos=0
pontuacao=0

localStorage.setItem("dadosSemana",JSON.stringify(dadosSemana))
localStorage.setItem("totalTreinos",0)
localStorage.setItem("pontuacao",0)

document.getElementById("totalTreinos").innerText=0
document.getElementById("pontuacao").innerText=0
document.getElementById("nivel").innerText="Iniciante"

criarGrafico()

}


function carregarDados(){

let dadosSalvos=JSON.parse(localStorage.getItem("dadosSemana"))
let totalSalvo=localStorage.getItem("totalTreinos")
let pontuacaoSalva=localStorage.getItem("pontuacao")
let perfil=localStorage.getItem("perfil")

if(dadosSalvos){
dadosSemana=dadosSalvos
}

if(totalSalvo){
totalTreinos=totalSalvo
document.getElementById("totalTreinos").innerText=totalTreinos
}

if(pontuacaoSalva){
pontuacao=pontuacaoSalva
document.getElementById("pontuacao").innerText=pontuacao
definirNivel()
}

if(perfil){
document.getElementById("perfil").innerText=perfil
}

}


function criarGrafico(){

let ctx=document.getElementById("graficoTreino")

if(!ctx)return

if(grafico){
grafico.destroy()
}

grafico=new Chart(ctx,{

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