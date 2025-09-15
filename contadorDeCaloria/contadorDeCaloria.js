const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;

function cleanInputString(str) {
  const regex = /[+\-\s]/g; // remove +, -, espaços
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // evita notação científica
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );

  // conta quantos "nomes" já existem para numerar o próximo
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  const htmlString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Item ${entryNumber}</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Nome do item" />

    <label for="${entryDropdown.value}-${entryNumber}-calories">Calorias do Item ${entryNumber}</label>
    <input type="number" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calorias" />
  `;

  // não perde valores já digitados
  targetInputContainer.insertAdjacentHTML("beforeend", htmlString);
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true; // use a flag global (não recrie variável)
      return null; // sinaliza falha
    }

    calories += Number(currVal || 0); // vazio vira 0
  }
  return calories;
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  // colete todos os inputs numéricos por seção
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type='number']"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type='number']"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type='number']"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type='number']"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type='number']"
  );

  // calcule calorias de cada grupo + orçamento
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

  // se houve erro em qualquer leitura, pare aqui
  if (isError) return;

  // some consumidas e calcule saldo
  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;

  const surplusOrDeficit = remainingCalories < 0 ? "Superávite" : "Défice";

  // Lição 81: limpe o output antes de montar o resultado
  output.innerHTML = ``;

  // preencha resultado
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">
      ${Math.abs(remainingCalories)} Calorias ${surplusOrDeficit}
    </span>
    <hr>
    <p>${budgetCalories} Meta Diaria</p>
    <p>${consumedCalories} Calorias Consumidas</p>
    <p>${exerciseCalories} Calorias Queimadas</p>
  `;

  output.classList.remove("hide");
}

function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (const container of inputContainers) {
    container.innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerHTML = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
