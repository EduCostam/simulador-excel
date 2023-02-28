const PASSWORD = "teste123";

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
