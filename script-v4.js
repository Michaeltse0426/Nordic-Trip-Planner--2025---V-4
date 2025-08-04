// ---------------------------
// Nordic Trip Planner V4 Script
// ---------------------------

const tripContainer = document.querySelector('#trip-container');
const expensesTable = document.querySelector('#expenses-table tbody');
const totalHKDSpan = document.querySelector('#total-hkd');
const remainingHKDSpan = document.querySelector('#remaining-hkd');
const exportJsonBtn = document.querySelector('#export-json');
const exportCsvBtn = document.querySelector('#export-csv');
const completeTripBtn = document.querySelector('#complete-trip');

// Pre-set daily budget (HKD)
const DAILY_BUDGET = 1500;
const TOTAL_DAYS = 10;
let totalBudgetHKD = DAILY_BUDGET * TOTAL_DAYS;
let totalExpensesHKD = 0;
let expenses = [];

// Example conversion rates (could be dynamic via API)
const conversionRates = {
  "HKD": 1,
  "USD": 7.8,
  "EUR": 8.5,
  "DKK": 1.12,
};

// ---------------------------
// Render Itinerary
// ---------------------------
fetch('itinerary.json')
  .then(response => response.json())
  .then(data => {
    tripContainer.innerHTML = '';

    data.forEach(day => {
      const card = document.createElement('div');
      card.className = 'trip-card';

      // Dummy weather (replace with API if needed)
      const temp = (15 + Math.random() * 5).toFixed(1);
      const wind = (8 + Math.random() * 5).toFixed(1);

      card.innerHTML = `
        <h2>${day.date} ${day.city}行程</h2>
        <p>${day.city}：${temp}°C 🌤 風速 ${wind} km/h</p>
        <ul>
          ${day.activities.map(act => `<li>${act}</li>`).join('')}
        </ul>
      `;

      tripContainer.appendChild(card);
    });
  });

// ---------------------------
// Expense Tracking
// ---------------------------
function addExpense(item, amount, currency) {
  const hkdAmount = (amount * (1 / conversionRates[currency])).toFixed(2);
  expenses.push({ item, amount, currency, hkdAmount });
  totalExpensesHKD += parseFloat(hkdAmount);
  updateExpensesTable();
}

function updateExpensesTable() {
  expensesTable.innerHTML = '';
  expenses.forEach((exp, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${exp.item}</td>
      <td>${exp.amount} ${exp.currency}</td>
      <td>${exp.hkdAmount} HKD</td>
    `;
    expensesTable.appendChild(row);
  });

  totalHKDSpan.textContent = totalExpensesHKD.toFixed(2);
  remainingHKDSpan.textContent = (totalBudgetHKD - totalExpensesHKD).toFixed(2);
}

// ---------------------------
// Export Functions
// ---------------------------
function exportJSON() {
  const blob = new Blob([JSON.stringify(expenses, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  downloadFile(url, 'expenses.json');
}

function exportCSV() {
  const header = "Item,Amount,Currency,HKD\n";
  const rows = expenses.map(e => `${e.item},${e.amount},${e.currency},${e.hkdAmount}`).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  downloadFile(url, 'expenses.csv');
}

function downloadFile(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ---------------------------
// Trip Completion Confetti
// ---------------------------
function markTripComplete() {
  // Simple 3D confetti effect
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
  alert('🎉 恭喜完成北歐慢旅！總開支已記錄。');
}

// ---------------------------
// Event Listeners
// ---------------------------
if (exportJsonBtn) exportJsonBtn.addEventListener('click', exportJSON);
if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportCSV);
if (completeTripBtn) completeTripBtn.addEventListener('click', markTripComplete);

// Example: Add sample expenses (can be replaced by form inputs)
addExpense("機票", 18854, "HKD");
addExpense("酒店住宿", 7275.49, "HKD");
addExpense("門票通行證", 2884, "HKD");
