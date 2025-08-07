const form = document.getElementById('signup-form');
const submit = form.querySelector('.login-button');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submit.disabled = true;

  const username = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const confirmPassword = form.confirmPassword.value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    submit.disabled = false;
    return;
  }

  const payload = {
    username,
    email,
    password
  };

  try {
    const res = await fetch('https://moodbot-api.onrender.com/api/v1/moodbot/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('user-email', data.email);
      alert('Registration successful! Please check your email for the OTP.');
      window.location.href = 'verify.html';
    } else {
      const { message } = await res.json().catch(() => ({}));
      alert(message || 'Sign-up failed. Please try again.');
    }
  } catch (err) {
    console.error(err);
    alert('Network error. Please try again later.');
  } finally {
    submit.disabled = false;
  }
});
