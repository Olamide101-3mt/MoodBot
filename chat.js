//Selecting Elements
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('messages');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  addMessage(text, 'user');
  input.value = "";

  //Simulate bot response
  setTimeout( () => {
    addMessage('This is a bot reply to:' + text, 'bot');
  }, 600);
});

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}