async function loadItinerary() {
  const container = document.getElementById('trip-container');
  try {
    const res = await fetch('itinerary.json');
    const itinerary = await res.json();
    container.innerHTML = ''; // Clear loading text

    itinerary.forEach(day => {
      const card = document.createElement('div');
      card.className = 'trip-card';
      card.innerHTML = `
        <h2>${day.date} ${day.city}行程</h2>
        <p>${day.city}：${day.weather || '15.9°C ☀️'} 風速 ${day.wind || '11.2 km/h'}</p>
        <ul>${day.activities.map(a => `<li>${a}</li>`).join('')}</ul>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = '行程載入失敗 ❌';
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadItinerary);
