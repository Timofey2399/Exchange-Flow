const RATE = 88.41;          // 1 EUR = 88.41 RUB
const BANK_FEE = 0.03;       // условная банковская комиссия 3%

let currentLang = 'ru';
let direction = 'eur-to-rub';

// ── Language ──────────────────────────────

const langBtn = document.getElementById('langBtn');

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'ru' ? 'en' : 'ru';
  langBtn.textContent = currentLang === 'ru' ? 'EN' : 'RU';
  applyLanguage();
});

function applyLanguage() {
  document.querySelectorAll('[data-ru]').forEach(el => {
    el.textContent = el.dataset[currentLang];
  });
}

// ── Calculator ────────────────────────────

const calcInput     = document.getElementById('calcInput');
const resultAmount  = document.getElementById('resultAmount');
const savingsAmount = document.getElementById('savingsAmount');
const inputCurrency = document.getElementById('inputCurrency');
const outputCurrency= document.getElementById('outputCurrency');
const btnEurToRub   = document.getElementById('btnEurToRub');
const btnRubToEur   = document.getElementById('btnRubToEur');

btnEurToRub.addEventListener('click', () => {
  if (direction === 'eur-to-rub') return;
  direction = 'eur-to-rub';
  btnEurToRub.classList.add('active');
  btnRubToEur.classList.remove('active');
  inputCurrency.textContent = 'EUR';
  outputCurrency.textContent = 'RUB';
  calcInput.value = 100;
  calculate();
});

btnRubToEur.addEventListener('click', () => {
  if (direction === 'rub-to-eur') return;
  direction = 'rub-to-eur';
  btnRubToEur.classList.add('active');
  btnEurToRub.classList.remove('active');
  inputCurrency.textContent = 'RUB';
  outputCurrency.textContent = 'EUR';
  calcInput.value = 10000;
  calculate();
});

calcInput.addEventListener('input', () => {
  calcInput.value = calcInput.value.replace(/[^0-9.,]/g, '');
  calculate();
});

function calculate() {
  const amount = Math.max(0, parseFloat(calcInput.value) || 0);

  if (direction === 'eur-to-rub') {
    const result  = amount * RATE;
    const savings = amount * BANK_FEE;
    resultAmount.textContent = formatRub(result);
    savingsAmount.textContent = `€${savings.toFixed(2)}`;
  } else {
    const result     = amount / RATE;
    const savingsEur = (amount * BANK_FEE) / RATE;
    resultAmount.textContent = formatEur(result);
    savingsAmount.textContent = `€${savingsEur.toFixed(2)}`;
  }
}

function formatRub(n) {
  return Math.round(n).toLocaleString('ru-RU');
}

function formatEur(n) {
  return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Init ──────────────────────────────────

applyLanguage();
calculate();
