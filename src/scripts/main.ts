const loginForm = document.getElementById('login-form') as HTMLFormElement;

loginForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const emailError = document.getElementById('email-error') as HTMLElement;
  const passwordError = document.getElementById('password-error') as HTMLElement;

  let isValid = true;

  // hato check
  emailInput.classList.remove('error');
  passwordInput.classList.remove('error');
  emailError.textContent = '';
  passwordError.textContent = '';

  // email check
  if (!emailInput.value || !emailInput.value.includes('@')) {
    isValid = false;
    emailInput.classList.add('error');
    emailError.textContent = 'Неправильно';
  }

  // parol check
  if (!passwordInput.value || passwordInput.value.length < 4) {
    isValid = false;
    passwordInput.classList.add('error');
    passwordError.textContent = 'Неправильно';
  }

  if (isValid) {
    alert('Успешный вход!');
  }
});
