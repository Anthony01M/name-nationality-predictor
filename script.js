document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);

    const nameInput = document.getElementById('nameInput');
    const originFeedback = document.getElementById('nationalityFeedback');

    nameInput.addEventListener('input', function () {
        const name = nameInput.value;
        getNameOrigin(name).then(origin => {
            originFeedback.textContent = `Predicted Nationality: ${origin}`;
        });
    });

    async function getNameOrigin(name) {
        const response = await fetch(`https://api.nationalize.io?name=${name}`);
        const data = await response.json();
        if (data.country && data.country.length > 0) {
            const country = data.country[0];
            return `${country.country_id} with probability ${country.probability}`;
        } else {
            return "Nationality not found";
        }
    }
});