const form = document.getElementById('verify-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const otp = document.getElementById('otp').value.trim();
  const email = localStorage.getItem('user-email');

  if (!email) {
    alert('No email found. Please register again.');
    return;
  }

  try {
    const res = await fetch('https://moodbot-api.onrender.com/api/v1/moodbot/auth/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        code: otp
      })
    });

    if (res.ok) {
      const data = await res.json();
      alert('Email verified successfully! You can now log in.');
      // Optionally save tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.href = 'login.html';
    } else {
      const error = await res.json();
      alert(error.message || 'OTP verification failed.');
    }
  } catch (err) {
    console.error(err);
    alert('Network error. Please try again.');
  }
});
