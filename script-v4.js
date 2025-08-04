async function loadItinerary() {
  try {
    const res = await fetch('itinerary.json');
    const data = await res.json();
    const container = document.getElementById('trip-container');
    container.innerHTML = '';

    data.forEach(day => {
      const card = document.createElement('div');
      card.className = 'trip-card';
      card.innerHTML = `
        <h2>${day.date} ${day.city}行程</h2>
        <ul>${day.activities.map(act => `<li>${act}</li>`).join('')}</ul>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    document.getElementById('trip-container').textContent = '無法載入行程資料';
  }
}

document.addEventListener('DOMContentLoaded', loadItinerary);

// Expense tracking
const rate = { HKD: 1, EUR: 8.5, DKK: 1.15 }; 
let totalHKD = 0;
document.getElementById('expense-form').addEventListener('submit', e => {
  e.preventDefault();
  const item = document.getElementById('item').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const currency = document.getElementById('currency').value;

  const hkdAmount = amount * (rate[currency] || 1);
  totalHKD += hkdAmount;

  const li = document.createElement('li');
  li.textContent = `${item} - ${amount} ${currency} (~HKD ${hkdAmount.toFixed(2)})`;
  document.getElementById('expense-list').appendChild(li);

  document.getElementById('total-expenses').textContent = `總開支: HKD ${totalHKD.toFixed(2)} / 15,000`;
  e.target.reset();
});
