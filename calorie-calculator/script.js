async function calculate() {
    const res = await fetch('data.json');
    const d = await res.json();
    let w = parseFloat(document.getElementById('weight').value);
    let h = parseFloat(document.getElementById('height').value);
    const unit = document.getElementById('unit').value;
    const dur = parseFloat(document.getElementById('duration').value);

    let wKg = unit === 'imperial' ? w * d.conversions.lbs_to_kg : w;
    let hCm = unit === 'imperial' ? h * d.conversions.in_to_cm : h;

    const bmr = (10 * wKg) + (6.25 * hCm) - (5 * document.getElementById('age').value) + (document.getElementById('gender').value === 'male' ? 5 : -161);
    const burn = (d.activities[document.getElementById('activity').value] * 3.5 * wKg) / 200 * dur;

    document.getElementById('result').innerHTML = `<span>Output:</span> ${Math.round(burn)} kcal`;
}

async function convertUnits() {
    const res = await fetch('data.json');
    const d = await res.json();
    let w = document.getElementById('weight'), h = document.getElementById('height'), u = document.getElementById('unit');
    if (u.value === 'metric') {
        w.value = (w.value * d.conversions.kg_to_lbs).toFixed(1);
        h.value = (h.value * d.conversions.cm_to_in).toFixed(1);
        u.value = 'imperial';
    } else {
        w.value = (w.value * d.conversions.lbs_to_kg).toFixed(1);
        h.value = (h.value * d.conversions.in_to_cm).toFixed(1);
        u.value = 'metric';
    }
}