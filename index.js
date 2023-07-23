// Conversion de la date de début (aujourd'hui par défaut) au format "input"
const today = new Date().toISOString().split('T')[0];

// Injection de la date de début dans le 1er input
start_date.value = today;
start_date.min = today;

// Calcul de date de retour (lendemain par défaut)
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Conversion de la date de retour au format "input"
let tomorrowFormat = tomorrow.toISOString().split('T')[0];

// Injection de la date de retour dans le 2ème input
end_date.value = tomorrowFormat;
end_date.min = tomorrowFormat;

// Changement automatique de la date de retour quand la date de début est modifiée (réglage au lendemain)
start_date.addEventListener('change', (e) => {
  let day = new Date(e.target.value);

  if (start_date.value > end_date.value) {
    day.setDate(day.getDate() + 1);
    end_date.value = day.toISOString().split('T')[0];
  }
});

// Changement automatique de la date de départ quand la date de retour est modifiée et incohérente (réglage à la veille)
end_date.addEventListener('change', (e) => {
  let day = new Date(e.target.value);

  if (start_date.value > end_date.value) {
    day.setDate(day.getDate() + -1);
    start_date.value = day.toISOString().split('T')[0];
  }
});

// Calcul du prix du vol
const bookingCalc = () => {
  let diffTime = Math.abs(
    new Date(end_date.value) - new Date(start_date.value)
  );
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  total.textContent = diffDays * nightPrice.textContent;
};

start_date.addEventListener('change', bookingCalc);
end_date.addEventListener('change', bookingCalc);

bookingCalc();
