const form = document.getElementById('tax-form');
const grossAnnualIncomeInput = document.getElementById('gross-annual-income');
const extraIncomeInput = document.getElementById('extra-income');
const totalDeductionsInput = document.getElementById('total-deductions');
const ageSelect = document.getElementById('age');
const errorIcons = document.querySelectorAll('.error-icon');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const grossAnnualIncome = parseFloat(grossAnnualIncomeInput.value);
  const extraIncome = parseFloat(extraIncomeInput.value);
  const totalDeductions = parseFloat(totalDeductionsInput.value);
  const age = ageSelect.value;

  let isValid = true;

  if (isNaN(grossAnnualIncome) || grossAnnualIncome < 0) {
    grossAnnualIncomeInput.classList.add('error');
    errorIcons[0].style.visibility = 'visible';
    isValid = false;
  } else {
    grossAnnualIncomeInput.classList.remove('error');
    errorIcons[0].style.visibility = 'hidden';
  }

  if (isNaN(extraIncome) || extraIncome < 0) {
    extraIncomeInput.classList.add('error');
    errorIcons[1].style.visibility = 'visible';
    isValid = false;
  } else {
    extraIncomeInput.classList.remove('error');
    errorIcons[1].style.visibility = 'hidden';
  }

  if (isNaN(totalDeductions) || totalDeductions < 0) {
    totalDeductionsInput.classList.add('error');
    errorIcons[2].style.visibility = 'visible';
    isValid = false;
  } else {
    totalDeductionsInput.classList.remove('error');
    errorIcons[2].style.visibility = 'hidden';
  }

  if (age === '') {
    ageSelect.classList.add('error');
    errorIcons[3].style.visibility = 'visible';
    isValid = false;
  } else {
    ageSelect.classList.remove('error');
    errorIcons[3].style.visibility = 'hidden';
  }

  if (isValid) {
    const taxableIncome = grossAnnualIncome + extraIncome - totalDeductions;
    let taxAmount = 0;

    if (taxableIncome <= 800000) {
      taxAmount = 0;
    } else {
      const taxableIncomeOver8Lakhs = taxableIncome - 800000;
console.log(taxableIncomeOver8Lakhs);
      if (age <40) {
        taxAmount = 0.3 * taxableIncomeOver8Lakhs;
        console.log('40',taxAmount);
      } else if (age >=40 && age<60) {
        taxAmount = 0.4 * taxableIncomeOver8Lakhs;
        console.log('50',taxAmount);
      } else if (age >=60) {
        taxAmount = 0.1 * taxableIncomeOver8Lakhs;
        console.log('70',taxAmount);
      }
    }

    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const taxableIncomeSpan = document.getElementById('taxable-income');
    const taxAmountSpan = document.getElementById('tax-amount');
console.log(grossAnnualIncome-taxAmount);
console.log(grossAnnualIncome);
console.log(taxAmount);
    taxableIncomeSpan.textContent = `${(grossAnnualIncome-taxAmount).toLocaleString()}`;
    // taxAmountSpan.textContent = `₹ ${taxAmount.toLocaleString()}`;

    modal.style.visibility = 'visible';
    modalContent.style.animation = 'fadeIn 0.3s';
  }
});

const modalClose = document.getElementById('modal-close');

modalClose.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  const modalContent = document.querySelector('.modal-content');

  modal.style.visibility = 'hidden';
  modalContent.style.animation = '';
});