// Comentários
// document.write('Hello')

// Variáveis e tipos de dados

// Variável
var myvar = "Hello "
document.write(myvar)

// ou

let mylet = "Hi "
document.write(mylet)

// Constantes
const myconst = "He "
document.write(myconst)

// Concatenando strings
document.write(myconst+myvar+mylet)

// String
const s1 = "<br>Isso é uma string "
const s2 = '<br>Isso também é uma string <br>'

document.write(s1+s2)

// Number
const n1 = 1
const n2 = 12
document.write(n1 + n2) // soma os números

// Boolean - true ou false
const bTrue = true
const bFalse = false
document.write(bTrue)

// Objeto - possuem propriedades e funcionalidades

// objeto.propriedade
// objeto.funcionalidade

const pessoa = {
  altura: "<br>1,75m",
  idade: 31,
  solteiro: false,
  correr(){
    return "<br>Run Forest"
  }
}

document.write(pessoa) //indica que é um objeto
document.write(pessoa.altura) //propriedade indicada depois do ponto
document.write(pessoa.correr()) //funcionalidade indicada depois do ponto

// Array / Lista / Vetor
// Coleção de dados

const paletaDeCores = ["<br>azul", "<br>verde", 3, {name: "<br>Cor", cor: "<br>Branca"}]

document.write(paletaDeCores)
document.write(paletaDeCores[0])
document.write(paletaDeCores[2])
document.write(paletaDeCores[3].name)

// Funções
// Declarando
function sayMyName(x) {
  document.write(x)
}
// Executando
sayMyName("<br>Pedro")
sayMyName("<br>William")
sayMyName("<br>Ritta")

// Condicionais
// If / Else
const notaFinal = 7

if (notaFinal >= 7){
  document.write("<br>Aprovado")
}else{
  document.write("<br>Reprovado")
}

// Loop / Repetições
// atribui / condicional / soma
for (i = 0; i <= 10; i++){
  document.write(`<br>${i}`)
}

a = 0
while (a <= 10){
  document.write(`<br>${a}`)
  a++
}