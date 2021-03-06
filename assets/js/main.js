
var _retornoPesquisa = new Array();
var arrVeiculosNoEstacionamento  = new Array();
//Cadastrando veiculos em array Multidimensional
var arrVeiculos =  new Array(
  ['ADB-3340','1A', 'aluno', '00:00', '00:00','00:00', '0,00' ],
  ['ACD-3740','2B', 'funcionario', '00:00', '00:00','00:00', '0,00'  ],
  ['ADB-3240','3C', 'professor', '00:00', '00:00','00:00', '0,00' ],
  ['ADB-3840','4D', 'visitante', '00:00', '00:00','00:00', '0,00'  ]
)

console.log(arrVeiculos);
//Adiciona os valores de cada categoria em um objeto
var _categoriaVeiculo = new Object();
_categoriaVeiculo.cat1A = 0.50;
_categoriaVeiculo.cat2B = 1.00;
_categoriaVeiculo.cat3C = 1.50;
_categoriaVeiculo.cat4D = 2.00;

//Adiciona os valores de descontos de acordo com o vinculo com a universidade
function vinculoUniversidade(tempo, vinculo){
  //separa o valor recebido e armazena um array na propria variavel
  var tempo = tempo.split(':');
  //pega somente as horas e armazena na variavel
  var tempo = parseInt(tempo[0]);

  //até 4 horas de permanencia
  if (tempo <=4){
    //verifica o vinculo e retorna o valor do objeto
    if (vinculo == 'aluno'){
      return 20;
    }else if (vinculo == 'funcionario'){
      return 10;
    }else if (vinculo == 'professor'){
      return 10;
    }else {
      return 0;
    }

  //entre 4:1 e 6 horas de permanencia
  }else if  (tempo >4 && tempo <=6) {
    //verifica o vinculo e retorna o valor referente ao debito
    if (vinculo == 'aluno'){
      return 30;
    }else if (vinculo == 'funcionario') {
      return 10;
    }else if (vinculo == 'professor'){
      return 10;
    }else {
      return  0;
    }

  //mais de 6 horas de permanencia
  } else if (tempo >6) {
    //verifica o vinculo e retorna o valor do objeto
    if (vinculo == 'aluno'){
      return 40;
    }else if (vinculo == 'funcionario') {
      return 40;
    }else if (vinculo == 'professor'){
      return 40;
    }else {
      return 0;
    }
    }
}

//Metodo para verificar categoria
function verificarCategoria(categoria){
  var categoria = categoria.toUpperCase();
  if (categoria == "1A"){
    return _categoriaVeiculo.cat1A;
  }else if (categoria == "2B") {
    return _categoriaVeiculo.cat2B;
  }else if (categoria == '3C') {
    return _categoriaVeiculo.cat3C;
  }else if (categoria == '4D') {
    return _categoriaVeiculo.cat4D;
  }
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

  //Percorre o array e verifica se o veiculo está no array do estacionamento
  var i = 0;
  while ( i < arrVeiculosNoEstacionamento.length) {
    //verifica se existe o valor dentro do array do estacionamento e armazena na variavel um valor boolean.
    estaNoLocal = arrVeiculosNoEstacionamento[i].includes(placaVeiculo);
    indexArrEstacionamento = i;//adiciona a posição  em que o valor foi encontrado
    //se o valor no  array foi encontrado pare o loop
    if (estaNoLocal == true){
      break;
    }
    //incrementa a variavel
    i++;
  }
  console.log('VEICULO NO LOCAL ? ');
  console.log(estaNoLocal);
  //se o veiculo estiver no estacionamento (estaNoLocal = true) faça..
  if (estaNoLocal) {
    console.log("Veiculo Localizado no Estacionamento:");
    console.log(arrVeiculosNoEstacionamento[indexArrEstacionamento]);
    //remove o carro que está no array do Estacionamento
    arrVeiculosNoEstacionamento.splice(indexArrEstacionamento,1);
    //Define o horario De Saida no array padrão
    arrVeiculos[indexVeiculo][4]= horarioSaida;
    //captura os horarios no array e armazena na variavel
    var getHoraEntrada = arrVeiculos[indexVeiculo][3];
    var getHoraSaida = arrVeiculos[indexVeiculo][4];
    /*Armazena na variavel o retorno do metodo calculadorHora(),
    que por sua vez calcula o tempo de permanencia no local*/
    var permanenciaEstacionamento = calculadorHora(getHoraEntrada, getHoraSaida);
    //armazena no array o tempo de permanencia no Estacionamento
    arrVeiculos[indexVeiculo][5] = permanenciaEstacionamento;
    /*armazena na variavel descontos o retorno do metodo vinculoUniversidade(),
    que por sua vez retorna o valor de desconto.
    */
    var descontos = vinculoUniversidade(permanenciaEstacionamento, arrVeiculos[indexVeiculo][2]);
    console.log(descontos);
    //calcula o valor a pagar através do metodo calculadorValor()
    var valor = calculadorValor(permanenciaEstacionamento, arrVeiculos[indexVeiculo][1] , descontos);
    console.log(valor);
    arrVeiculos[indexVeiculo][6] = valor;

    //se não exiba alguma mensagem informando que o veiculo não está no Estacionamento
    }else {
      alert('Veiculo não encontrado');
      console.log("O este veiculo não está no Estacionamento");
    }

}

//captura horario atual
function pegarHora(){
  var tempo = new Date();
  var hora = tempo.getHours();
  var min  = tempo.getMinutes();
  var str_hora = hora + ':' + min;
  return str_hora;
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

//Metodo para subtrair a porcentagem  do valor recebido.
function calculoPorcentagem(valor, porcentagem ){
  var result, total;
  result = valor/100;
  total = valor-(porcentagem*result);
  return total
}
//Metodo para calcular o valor referente ao tempo no estacionamento
function calculadorValor(tempo, categoria, desconto){
  //armazena na propria variavel um array separando horas de minutos
  var tempo = tempo.split(':');
  //armazena na variavel os valores do array
  hora = parseInt(tempo[0]);
  minuto = parseInt(tempo[1]);
  console.log(hora+ "HORA CONVERTIDA" +minuto);

  totalMinutos = (hora*60) + minuto;
  console.log(totalMinutos);
  //verifica a categoria e armazena o valor da hora na variavel
  var valorDaHora = verificarCategoria(categoria);
  //converte horas e minutos para minutos
  var valorDoMinuto = valorDaHora/60;
  //calcula o valor a pagar formula [valor do minutos * total de minutos]
  var valorApagar = valorDoMinuto * totalMinutos;
  //armazena na propria variavel o valor convertido em float depois de diminuir as casas decimais (toFixed).
  valorApagar = parseFloat(valorApagar.toFixed(2));
  //realiza o desconto da porcentagem através do metodo calculoPorcentagem()
  var valorComDesconto = calculoPorcentagem(valorApagar, desconto);
  //diminui a quantidade de casas decimais e retornando uma string com o valor a pagar
  valorComDesconto = valorComDesconto.toFixed(2);
  console.log(valorDaHora);
  console.log(valorApagar);
  console.log(valorComDesconto);
  return valorComDesconto;
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
        '<td>'+ arrVeiculos[i][5] + '</td>'+
        '<td>'+ arrVeiculos[i][6] + '</td>'+
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

//Metodo de confirmação de entrada de veiculo, com tratamento de erros(ainda não adcionado)
function confirmaEntrada(placa, hora){
    registroEntrada(placa, hora);
    $('#estacionamento tbody tr').remove();
    $('#dadosGerais tbody tr').remove();
    imprimirEstacionamento();
    imprimirDadosGerais()
}

//Metodo para confirma saida de veiculos com tratamento de erros(ainda não adicionado)
function confirmaSaida(placa){
  saidaVeiculo(placa, pegarHora());
  $('#estacionamento tbody tr').remove();
  $('#dadosGerais tbody tr').remove();
  imprimirEstacionamento();
  imprimirDadosGerais();

}


//Registros
registroEntrada("ADB-3240","10:30");
registroEntrada("ADB-3840","12:30");
saidaVeiculo("ADB-3240",pegarHora());
imprimirDadosGerais();
imprimirEstacionamento();
console.log(pegarHora());
console.log(calculadorHora("12:32", "22:43"));

//saidaVeiculo("ADB-3840","15:30");
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

    $('#btnConfirmSaida').on('click', function(){
      var getFormPlaca = $('#inputSaida').val();
      console.log(getFormPlaca);
      alert(getFormPlaca);
      confirmaSaida(getFormPlaca);
    });

  function validarPlaca(placa){
    var er = /[a-z]{3}-?\d{4}/gim;
    er.lastIndex = 0;
    return er.test( placa);
  }

});
