//Login.js
const form = document.getElementById('login-form');
const submit = document.getElementById('login-button');

console.log(submit);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submit.disabled = true;


// To Gather input values
const identifier = form.identifier.value.trim();
const password = form.password.value.trim();

//Build the request
try{
  const res = await fetch ('https://moodbot-api.onrender.com/api/v1/moodbot/auth/login', {
    method : 'POST',
    headers : {'Content-Type': 'application/json'},
    body : JSON.stringify({ identifier, password})
  });

  //Handle each Status code
  if (res.status === 200) {
    const { accessToken, refreshToken} = await res.json();

    sessionStorage.setItem('mb_access', accessToken);
    sessionStorage.setItem('mb_refresh', refreshToken);

    //Redirect to a proctected page
    window.location.href = 'chat.html';

  }
  else if (res.status === 401) {
    const {message } = await res.json();
    alert(message || 'Please verify your e-mail before logging in.');
  }
  else {
    //400 or any other error
    const { message } = await res.json();
    alert(message || 'Invalid credentials. Please try again.');
  }
}
catch (err) {
  console.error(err);
  alert('Network error. Check your connection and try again.');
}
finally {
  submit.disabled = false;
}

})

console.log(submit);