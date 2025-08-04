document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    fetch('itinerary.json')
        .then(res => res.json())
        .then(data => {
            app.innerHTML = '<h3>Itinerary Loaded ✅</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(() => {
            app.innerHTML = '<p>Failed to load itinerary</p>';
        });
});
