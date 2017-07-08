
var _retornoPesquisa = new Array();
var arrVeiculosNoEstacionamento  = new Array()
//define um valor zero para todos os vinculo
_valoresVinculo = new Object();
_valoresVinculo.aluno = 0;
_valoresVinculo.funcionario = 0;
_valoresVinculo.professor = 0;
_valoresVinculo.visitante = 0;

//Cadastrando veiculos em array Multidimensional
var arrVeiculos =  new Array(
  ['ADB-3340','1A', 'aluno', '00:00', '00:00' ],
  ['ACD-3740','2B', 'funcionario', '00:00', '00:00'],
  ['ADB-3240','3C', 'professor', '00:00', '00:00' ],
  ['ADB-3840','4D', 'visitante', '00:00', '00:00' ]
)

console.log(arrVeiculos);
//Adiciona os valores de cada categoria em um objeto
var _categoriaVeiculo = new Object();
_categoriaVeiculo.cat1A = 0.50;
_categoriaVeiculo.cat2B = 1.00;
_categoriaVeiculo.cat3C = 1.50;
_categoriaVeiculo.cat4D = 2.00;

//Adiciona os valores de descontos de acordo com o vinculo com a universidade
function vinculoUniversidade(tempo){

  //até 4 horas de permanencia
  if (tempo <=4){
    _valoresVinculo.aluno = 20;
    _valoresVinculo.funcionario = 10;
    _valoresVinculo.professor = 10;
    _valoresVinculo.visitante = 0;
  //entre 4:1 e 6 horas de permanencia
}else if  (tempo >4 && tempo <=6) {
    _valoresVinculo.aluno = 30;
    _valoresVinculo.funcionario = 10;
    _valoresVinculo.professor = 10;
    _valoresVinculo.visitante = 0;
  //mais de 6 horas de permanencia
} else if (tempo >6) {
    _valoresVinculo.aluno = 40;
    _valoresVinculo.funcionario = 40;
    _valoresVinculo.professor = 40;
    _valoresVinculo.visitante = 0;
  }
  return _valoresVinculo;
}

//Metodo para subtrair a porcentagem de vinculo
function calculoPorcentagem(valorTotalDeHoras, objComPorcentagem ){
  var valor = valorTotalDeHoras;
  var porcentagem = objComPorcentagem;
  var result, total;
  result = valor/100;
  total = valor-(porcentagem*result);
  return total
}

//Metodo para pesquisar Veiculo no Array
function pesquisarVeiculo(placaVeiculo){
  var indexVeiculo;
  var veiculoExiste = false;

     var i = 0;//Percorre o array e verifica se o veiculo existe
     while ( i < arrVeiculos.length) {
       //verifica se existe o valor dentro do array
       veiculoExiste = arrVeiculos[i].includes(placaVeiculo);
       indexVeiculo = i;//adiciona a posição  em que o valor foi encontrado
       //se o array foi encontrado para o loop
       if (veiculoExiste == true){
         break;
       }
       //incrementa a variavel
       i++;
     }

      return _retornoPesquisa = [veiculoExiste, indexVeiculo];
}

//Metodo para registrar entrada do Veiculo
function registroEntrada (placaVeiculo, horarioEntrada){
var indexVeiculo = pesquisarVeiculo(placaVeiculo)[1];
var veiculoExiste = pesquisarVeiculo(placaVeiculo)[0];

     //se o veiculoExiste for = true , adicione o horario de entrada
    if (veiculoExiste) {
       arrVeiculos[indexVeiculo][3] = horarioEntrada;
       arrVeiculosNoEstacionamento.push(arrVeiculos[indexVeiculo]);
       console.log("Veiculo Localizado:");
       console.log(arrVeiculos[indexVeiculo]);
       return arrVeiculos[indexVeiculo];
    //se não exiba alguma mensagem ou metodo para cadastrar um veiculo
    }else {
       console.log("O Veiculo não existe, chama metodo de cadastrar");
    }

}
//Metodo para registrar saida do veiculo do Estacionamento
function saidaVeiculo(placaVeiculo, horarioSaida){
var veiculoExiste = pesquisarVeiculo(placaVeiculo)[0];
var indexVeiculo = pesquisarVeiculo(placaVeiculo)[1];
console.log(veiculoExiste);
console.log(indexVeiculo);

var i = 0;//Percorre o array e verifica se o veiculo está no array do estacionamento
while ( i < arrVeiculosNoEstacionamento.length) {
  //verifica se existe o valor dentro do array do estacionamento e armazena na variavel um valor boolean
  estaNoLocal = arrVeiculosNoEstacionamento[i].includes(placaVeiculo);
  indexArrEstacionamento = i;//adiciona a posição  em que o valor foi encontrado
  //se o array foi encontrado para o loop
  if (estaNoLocal == true){
    break;
  }
  //incrementa a variavel
  i++;
}

//se var estaNoLocal = true , adicione...
if (estaNoLocal) {
  console.log("Veiculo Localizado no Estacionamento:");
  console.log(arrVeiculosNoEstacionamento[indexArrEstacionamento]);
  //remove o carro que está no array do Estacionamento
  arrVeiculosNoEstacionamento.splice(indexArrEstacionamento,1);
  //Define o horario De Saida
  arrVeiculos[indexVeiculo][4]= horarioSaida

//se não exiba alguma mensagem informando que o veiculo não está no Estacionamento
}else {
  console.log("O este veiculo não está no Estacionamento");
}

}

//calculo de horas
function calculadorHora(horaIncial, horaFinal){
	//separa a hora dos minutos e adiciona no array
	arrHoraInicio = horaIncial.split(':');
	arrHoraFinal = horaFinal.split(':');

  //converte a horaincial para inteiro e armazena na mesma posição do array
	arrHoraInicio[0] = parseInt(arrHoraInicio[0]);
	arrHoraInicio[1] = parseInt(arrHoraInicio[1]);
  //converte a horaincial para inteiro e armazena na mesma posição do array
	arrHoraFinal[0] = parseInt(arrHoraFinal[0]);
	arrHoraFinal[1] = parseInt(arrHoraFinal[1]);

	//calculo para transforma horas em minutos - formula [hora * 60 + minutos]
	var hInicial = (arrHoraInicio[0] * 60) + arrHoraInicio[1];
	var hFinal = (arrHoraFinal[0] * 60) + arrHoraFinal[1];

	//Verifica se a hora final é maior que a inicial
  //e inverte as posições das variaveis para não obter valores negativos
	if ((hInicial > hFinal)) {
		var diferencaHora = hInicial - hFinal
	}else if (hFinal > hInicial){
		var diferencaHora = hFinal - hInicial;
	}
  //transforma minutos em horas formula [minutos/60]
  var tempo = (diferencaHora / 60);
  //diminui a quantidade de casas decimais, transforma para string e separa os valores a parti do "."
  //armazenando os valores dentro do array "tempo".
  tempo = tempo.toFixed(2).split('.');
  //concatena as strings passando-as para o formato de hora
  tempo = tempo[0] + ":" + tempo[1];

  //retorna o intervalo de tempo
  return tempo;
}

function pegarHora(){
  //captura horario atual
  var tempo = new Date();
  var hora = tempo.getHours();
  var min  = tempo.getMinutes();
  var str_hora = hora + ':' + min;
  return str_hora;
}


function calculador(categoria, vinculo, entrada, saida){

}

//Metodo para imprimir dados na tabela
function imprimirDadosGerais(){
  i = 0;
  while (i < arrVeiculos.length) {
    $("#dadosGerais tbody").append(
      '<tr>' +
        '<td>'+ arrVeiculos[i][0] +'</td>'+
        '<td>'+ arrVeiculos[i][1] +'</td>'+
        '<td>'+ arrVeiculos[i][2] +'</td>'+
        '<td>'+ arrVeiculos[i][3] +'</td>'+
        '<td>'+ arrVeiculos[i][4] +'</td>'+
        '<td>'+ '---- ' + '</td>'+
      '</tr>'
    )
    i++
  }
}
//Metodo para imprimir dados dos carros no Estacionamento
function imprimirEstacionamento(){
    i = 0;
    while (i < arrVeiculosNoEstacionamento.length) {
      $("#estacionamento tbody").append(
        '<tr>' +
          '<td>'+ arrVeiculosNoEstacionamento[i][0] +'</td>'+
          '<td>'+ arrVeiculosNoEstacionamento[i][1] +'</td>'+
          '<td>'+ arrVeiculosNoEstacionamento[i][2] +'</td>'+
          '<td>'+ arrVeiculosNoEstacionamento[i][3] +'</td>'+
        '</tr>'
      )
      i++
    }


}

function confirmaEntrada(placa, hora){
    registroEntrada(placa, hora);
    $('#estacionamento tbody tr').remove();
    imprimirEstacionamento();
}

//Registros

registroEntrada("ADB-3240","22:30");
registroEntrada("ADB-3840","20:30");
saidaVeiculo("ADB-3240",pegarHora());
imprimirDadosGerais();
imprimirEstacionamento();
console.log(pegarHora());
console.log(calculadorHora("12:32", "22:43"));

//saidaVeiculo("ADB-3840","15:30");
console.log(vinculoUniversidade(6));
console.log(_categoriaVeiculo);
console.log("registros:");
console.log("Carros no Estacionamento");
console.log(arrVeiculosNoEstacionamento);
console.log("Carro com hora de saida Registrada:");
console.log(arrVeiculos);

$(document).ready(function(){

    $('#btnConfirmEntrada').on('click', function(){
      var getFormHora = $('#horaEntrada').val();
      var getFormPlaca = $('#idEntrada').val();
      console.log(getFormHora);
      console.log(getFormPlaca);
      confirmaEntrada(getFormPlaca, getFormHora);

    });

  function validarPlaca(placa){
    var er = /[a-z]{3}-?\d{4}/gim;
    er.lastIndex = 0;
    return er.test( placa);
  }

});
