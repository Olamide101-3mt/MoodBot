const form = document.getElementById('signup-form');
const submit = form.querySelector('.login-button');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submit.disabled = true;

  const rawId = form.identifier.value.trim();
  const password = form.password.value.trim();

  //Decide if the user typed an email an email or a username
  const looksLikeEmail = rawId.includes('@');

  //Build Payload to satisfy backendschema
  const payload = {
    username :  looksLikeEmail ? undefined : rawId,
    email : looksLikeEmail ? rawId : undefined,
    password
  };

  try {
    const res = await fetch ('/api/v1/moodbot/auth/register', {
      method : 'POST',
      headers: {'Content-Type': 'application/json' },
      body : JSON.stringify(payload) 
    });
    
    if (res.ok) {
      alert('Registration successful! Please verify your email, then log in.');
      window.location.href = 'chat.html';
    }else {
      const { message } = await res.json().catch(() => ({}));
      alert(message || 'Sign-up failed. Please try again.');
    }
  }catch (err) {
    console.error(err);
    alert('Network error. Please try again later.');
  }finally {
    submit.disabled = false;
  }
});