const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const showPassword = document.getElementById('show-password');
const passwordMatch = document.getElementById('password-match');

function updatePasswordVisibility() {
  const type = showPassword.checked ? 'text' : 'password';
  password.type = type;
  confirmPassword.type = type;
}

function validatePasswordMatch() {
  // 清除上一次的自定义错误，让 required、minlength 等原生规则继续生效。
  confirmPassword.setCustomValidity('');
  confirmPassword.removeAttribute('aria-invalid');
  passwordMatch.textContent = '';
  delete passwordMatch.dataset.state;

  // 尚未填写确认密码时，不提前显示不一致提示。
  if (!confirmPassword.value) return;

  if (password.value !== confirmPassword.value) {
    const message = '两次输入的密码不一致，请重新输入。';
    confirmPassword.setCustomValidity(message);
    confirmPassword.setAttribute('aria-invalid', 'true');
    passwordMatch.textContent = message;
    passwordMatch.dataset.state = 'error';
  } else {
    passwordMatch.textContent = '两次密码一致，匹配校验通过。';
    passwordMatch.dataset.state = 'success';
  }
}

showPassword.addEventListener('change', updatePasswordVisibility);
// 任意一个密码发生变化，都重新比较，兼顾输入、粘贴和自动填充。
for (const field of [password, confirmPassword]) {
  field.addEventListener('input', validatePasswordMatch);
  field.addEventListener('change', validatePasswordMatch);
}

window.addEventListener('pageshow', () => {
  updatePasswordVisibility();
  validatePasswordMatch();
});

updatePasswordVisibility();
validatePasswordMatch();
