import "./style.css";

// pegando os elementos do HTML
let textPassEl = document.querySelector(".text-pass");
let upplettersEl = document.querySelector("#uppletters");
let lowlettersEl = document.querySelector("#lowletters");
let numbersEl = document.querySelector("#numbers");
let symbolsEl = document.querySelector("#symbols");
let range = document.querySelector(".card #range");
let value = document.querySelector(".chlength .value");
let generateEl = document.querySelector(".btn-generate");
let copyEl = document.querySelector(".copy-pass");
let strengthForceEL = document.querySelector(".strength-force");

// função para pegar o valor do input range
range.oninput = function () {
  value.textContent = this.value;
};

// definindo os valores onde a função vai fazer a busca
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

// pegando valores aleatórios para cada elemento include
function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// gerando a senha com o button
generateEl.addEventListener("click", generatePassword);

function generatePassword() {
  const len = value.textContent;

  let password = "";

  if (upplettersEl.checked) {
    password += getUppercase();
  }

  if (lowlettersEl.checked) {
    password += getLowercase();
  }

  if (numbersEl.checked) {
    password += getNumber();
  }

  if (symbolsEl.checked) {
    password += getSymbol();
  }

  for (let i = password.length; i < len; i++) {
    const x = generateX();
    password += x;
  }

  textPassEl.value = password;

  // chamando a função da força da senha
  force();
}

//verificar quantos elementos estão selecionados e definindo a força da senha
function force() {
  let weigth = 0;
  let chkSelect = [];
  let arrForce = ["", "WEAK", "MEDIUM", "STRONG", "VERY STRONG"];
  let chk = document.getElementsByName("chk");
  for (var i = 0; i < chk.length; i++) {
    if (chk[i].checked) {
      chkSelect.push(chk[i].value);
    }
  }
  weigth = Math.round((3 * value.textContent + 1 * chkSelect.length * 5) / 20);
  strengthForceEL.innerText =
    arrForce[!!chkSelect.length && !!value.textContent ? weigth : 0];
  // console.log(!!chkSelect.length);
  // console.log(!!value.textContent);
}

function generateX() {
  const xs = [];
  if (upplettersEl.checked) {
    xs.push(getUppercase());
  }

  if (lowlettersEl.checked) {
    xs.push(getLowercase());
  }

  if (numbersEl.checked) {
    xs.push(getNumber());
  }

  if (symbolsEl.checked) {
    xs.push(getSymbol());
  }

  if (xs.length === 0) return "";

  return xs[Math.floor(Math.random() * xs.length)];
}
// função para copiar texto do input
copyEl.addEventListener("click", () => {
  let copyPassword = document.querySelector(".text-pass");

  if (navigator.clipboard.writeText(copyPassword.value)) {
  }
});
