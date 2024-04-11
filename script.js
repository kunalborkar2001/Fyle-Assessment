document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        hideErrorIcons();

        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const age = document.getElementById('age').value;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;

        if (!grossIncome || !age) {
            displayErrorIcons();
            return;
        }

        const totalIncome = grossIncome + extraIncome - deductions;
        let tax = 0;

        if (totalIncome > 800000) {
            if (age === '<40') {
                tax = 0.3 * (totalIncome - 800000);
            } else if (age === '≥40 &lt;60') {
                tax = 0.4 * (totalIncome - 800000);
            } else if (age === '≥60') {
                tax = 0.1 * (totalIncome - 800000);
            }
        }

        showModal(totalIncome, tax);
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    function hideErrorIcons() {
        const errorIcons = document.querySelectorAll('.error-icon');
        errorIcons.forEach(icon => icon.style.display = 'none');
    }

    function displayErrorIcons() {
        const errorIcons = document.querySelectorAll('.error-icon');
        errorIcons.forEach(icon => icon.style.display = 'inline');
    }

    function showModal(income, tax) {
        resultDiv.innerHTML = `<p>Your Overall Income will be: Rs ${income.toFixed(2)} Lakhs</p>
                             <p>Tax: Rs ${tax.toFixed(2)} Lakhs</p>`;
        modal.style.display = 'block';
    }
});

document.addEventListener('input', function (event) {
    
    const inputField = event.target;
    const errorIcon = inputField.nextElementSibling;

    if (inputField.value.match(/[a-zA-Z]/)) {
        errorIcon.style.display = 'inline';
    } else {
        errorIcon.style.display = 'none';
    }
});
