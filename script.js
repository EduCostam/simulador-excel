// const PASSWORD = "teste123";

// Adiciona um evento de clique em cada célula da tabela
let cells = document.querySelectorAll("#tabela-simulados td");
cells.forEach((cell) => {
  cell.addEventListener("click", function () {
    let currentPercentage = parseInt(cell.innerHTML);
    if (!isNaN(currentPercentage)) {
      let newPercentage = prompt("Insira a nova porcentagem:");
      if (newPercentage !== null && newPercentage !== "") {
        cell.innerHTML = newPercentage + "%";
        recalcularMedia();
      }
    }
  });
});

// Recalcula a média de cada linha da tabela
function recalcularMedia() {
  let table = document.querySelector("#tabela-simulados");
  let rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    let cells = row.querySelectorAll("td:not(:last-child)");
    let totalPercentage = 0;
    cells.forEach((cell) => {
      let percentage = parseInt(cell.innerHTML);
      if (!isNaN(percentage)) {
        totalPercentage += percentage;
      }
    });
    let media = totalPercentage / cells.length;
    row.lastElementChild.innerHTML = media.toFixed(2) + "%";
  });
}

// Seleciona a tabela
const table = document.querySelector("table");

// Obtém a lista de linhas da tabela
const rows = table.querySelectorAll("tr");

// Adiciona a coluna "Porcentagem" às linhas da tabela
rows.forEach((row, index) => {
  /*if (index === 0) {
    const cell = document.createElement("th");
    cell.textContent = "Porcentagem";
    row.appendChild(cell);
  } else {
    const cell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "100";
    cell.appendChild(input);
    row.appendChild(cell);*/

    // Adiciona a coluna "Senha" às linhas da tabela
    /*const senhaCell = document.createElement("td");
    const senhaInput = document.createElement("input");
    senhaInput.type = "password";
    senhaInput.placeholder = "Insira a senha";
    senhaCell.appendChild(senhaInput);
    row.appendChild(senhaCell);*/

    // Adiciona um ouvinte de eventos para atualizar a média
    input.addEventListener("input", () => {
      const values = [];
      let sum = 0;
      let count = 0;
      rows.forEach((row, index) => {
        if (index !== 0) {
          const cell = row.querySelectorAll("td")[index - 1];
          const value = parseInt(cell.querySelector("input").value);
          const senha = cell.nextElementSibling.querySelector("input").value;
          if (!isNaN(value) && senha === PASSWORD) {
            values.push(value);
            sum += value;
            count++;
          }
        }
      });
      const average = count > 0 ? sum / count : 0;
      const averageCell = table.querySelector("tr:first-child th:last-child");
      averageCell.textContent = `${average.toFixed(2)}%`;
    });
  }
});

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

// Dados da tabela
let dados = [
  { dia: '01/03/2023', acertos: 0, erros: 0, porcentagem: 0 },
  { dia: '02/03/2023', acertos: 0, erros: 0, porcentagem: 0 },
  { dia: '03/03/2023', acertos: 0, erros: 0, porcentagem: 0 },
  { dia: '04/03/2023', acertos: 0, erros: 0, porcentagem: 0 },
  { dia: '05/03/2023', acertos: 0, erros: 0, porcentagem: 0 },
];

// Rota para consultar o resultado de um simulado a partir de um link
app.get('/simulado', async (req, res) => {
  try {
    const { link } = req.query;

    // Faz a requisição para o link do simulado
    const response = await axios.get(link);

    // Carrega o HTML da página em um objeto Cheerio
    const $ = cheerio.load(response.data);

    // Encontra os elementos HTML que contêm a quantidade de acertos e erros
    const acertos = $('span[class="acertos"]').text();
    const erros = $('span[class="erros"]').text();

    // Calcula a porcentagem de acertos
    const total = parseInt(acertos) + parseInt(erros);
    const porcentagem = (parseInt(acertos) / total) * 100;

    // Encontra o dia atual e atualiza os dados na tabela
    const dataAtual = new Date().toLocaleDateString();
    const indice = dados.findIndex((item) => item.dia === dataAtual);
    dados[indice].acertos = acertos;
    dados[indice].erros = erros;
    dados[indice].porcentagem = porcentagem.toFixed(2);

    // Retorna os dados atualizados
    res.status(200).json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao consultar o resultado do simulado.');
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000.');
});

const simuladoLink = document.getElementById("simulado-link").value;
getSimuladoData(simuladoLink);


