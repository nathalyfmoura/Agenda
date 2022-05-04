var prompt = require('prompt-sync')();
var localStorage = require('node-localstorage').LocalStorage;
localStorage = new localStorage('./dados');
console.clear();

while (true) {
  titulo('Agenda de contatos :');

  console.log('1. Incluir contato');
  console.log('2. listar contatos');
  console.log('3. Pesquisar por nome');
  console.log('4. Excluir contato ');
  console.log('5. Estatística');
  console.log('6. Finalizar');
  var opcao = Number(prompt('Opção: '));
  if (opcao == 1) {
    incluir();
  } else if (opcao == 2) {
    listar();
  } else if (opcao == 3) {
    pesquisar();
  } else if (opcao == 4) {
    excluir();
  } else if (opcao == 5) {
    estatistica();
  } else {
    break;
  }
}

function titulo(texto) {
  console.log();
  console.log(texto);
  console.log('='.repeat(40));
}
function incluir() {
  titulo('Inclusão de Contatos');
  var nome = prompt('Nome: ');
  var tel = prompt('Telefone: ');
  var whats = prompt('Possui whatsApp? (S/N)  ');

  var dados = '';

  if (localStorage.getItem('agenda.txt')) {
    dados = localStorage.getItem('agenda.txt') + '\n';
  }

  localStorage.setItem(
    'agenda.txt',
    `${dados}${nome};${tel};${whats.toUpperCase()}`,
  );
  console.log('Contato cadastrado com Sucesso !! ');
}
function listar() {
  titulo('Lista de contatos : ');

  if (!localStorage.getItem('agenda.txt')) {
    console.log('Não há Contatos cadastrados !! ');
    return;
  }
  console.log('Nº   Nome          Telefone           WhatsApp : ');
  var agenda = localStorage.getItem('agenda.txt');
  var linhas = agenda.split('\n');
  num = 0;
  for (linha of linhas) {
    var partes = linha.split(';');
    var nome = partes[0];
    var tel = partes[1];
    var whats = partes[2];
    num += 1;
    console.log(
      `${String(num).padEnd(4)} ${nome.padEnd(13)} ${tel.padEnd(18)} ${whats}`,
    );
  }
}
function pesquisar() {
  titulo('Pesquisa por Nome : ');
  if (!localStorage.getItem('agenda.txt')) {
    console.log('Não há Contatos com este Nome cadastrado !! ');
    return;
  }
  var pesq = prompt('Nome do contato a pesquisar : ');

  console.log('\nNº   Nome         Telefone           WhatsApp  ');

  var agenda = localStorage.getItem('agenda.txt');
  var linhas = agenda.split('\n');
  var num = 0;

  for (linha of linhas) {
    var partes = linha.split(';');
    var nome = partes[0];
    var tel = partes[1];
    var whats = partes[2];

    if (nome.toUpperCase() == pesq.toUpperCase()) {
      num += 1;
      console.log(
        `${String(num).padEnd(4)} ${nome.padEnd(12)} ${tel.padEnd(
          18,
        )} ${whats}`,
      );
    }
  }
  if (num == 0) {
    console.log('Não foi encontrado nenhum contato !! ');
  }
}
function excluir() {
  listar();

  var numExc = Number(
    prompt(`\n Nº do contato a ser excluido (0, para voltar)? `),
  );

  if (numExc == 0) {
    return;
  }

  var agenda = localStorage.getItem('agenda.txt');

  var linhas = agenda.split('\n');

  linhas.splice(numExc - 1, 1);

  localStorage.setItem('agenda.txt', linhas.join('\n'));

  console.log('Contato Removido ! !');
}
function estatistica() {
  titulo('Estatística dos Contatos : ');

  var agenda = localStorage.getItem('agenda.txt');
  var linhas = agenda.split('\n');

  var num = 0;
  var totals = 0;
  var totaln = 0;
  var oi = 0;
  var claro = 0;
  var vivo = 0;
  var outros = 0;

  for (linha of linhas) {
    var partes = linha.split(';');

    var tel = partes[1];
    var whats = partes[2];

    num += 1;

    if (whats == 'S') {
      totals += 1;
    }

    for (j = 0; j < 1; j++) {
      if (tel.charAt(1) != 9 && tel.charAt(2) != 4) {
        outros += 1;
      } else if (tel.charAt(2) == 9) {
        vivo += 1;
      } else if (tel.charAt(2) == 1) {
        claro += 1;
      } else if (tel.charAt(2) == 4) {
        oi += 1;
      }
    }
  }
  var totaln = num - totals;

  console.log(`Nº de contatos Cadastrados: ${num}`);
  console.log(`Total de Contatos C/ WhatsApp: ${totals}`);
  console.log(`Total de Contatos S/ WhatsApp : ${totaln}`);

  titulo('Estatisticas por Operadoras : ');
  console.log(
    `Operadora Vivo     : ${vivo} contatos. Representa ${(
      (vivo * 100) /
      num
    ).toFixed(2)}% do Total de Operadoras .`,
  );
  console.log(
    `Operadora Claro    : ${claro} contatos. Representa ${(
      (claro * 100) /
      num
    ).toFixed(2)}% do Total de Operadoras.`,
  );
  console.log(
    `Operadora Oi       : ${oi} contatos. Representa ${(
      (oi * 100) /
      num
    ).toFixed(2)}% do Total de Operadoras.`,
  );
  console.log(
    `Operadora Outras   : ${outros} contatos. Representa ${(
      (outros * 100) /
      num
    ).toFixed(2)}% do Total de Operadoras.`,
  );
}
