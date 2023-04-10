const newChatButton = document.getElementById('new-chat');
const sidebar = document.getElementById('sidebar');
const chatArea = document.getElementById('chat-area');
let chatCount = 1;

window.onload = function() {
  // Create a container div
  const container = document.createElement("div");
  container.classList.add("prompt-container");

  // Create a message label
  const label = document.createElement("label");
  label.innerText = "Please enter your API key here:";
  label.classList.add("prompt-label");
  container.appendChild(label);

  // Create an input field
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("prompt-input");
  container.appendChild(input);

  // Create a button
  const button = document.createElement("button");
  button.innerText = "OK";
  button.classList.add("prompt-button");
  container.appendChild(button);

  // Add the container to the page
  document.body.appendChild(container);

  // Center the dialog box on the screen
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";

  // Focus on the input field
  input.focus();

  // Handle button click event
  button.addEventListener("click", () => {
    const value = input.value;
    console.log(value);
    document.body.removeChild(container);
  });
};


newChatButton.addEventListener('click', () => {
  const prevChat = chatArea.querySelector('.chat');
  const newChat = prevChat.cloneNode(true);
  newChat.textContent = `Chat ${chatCount}: ${prevChat.textContent}`;
  newChat.classList.add('chat-link');
  sidebar.appendChild(newChat);

  const chatName = prompt('Enter chat name:');
  if (chatName) {
    chatArea.innerHTML = `<div class="chat">${chatName}</div>`;
    chatCount++;
  }
});

sidebar.addEventListener('click', (e) => {
  if (e.target.classList.contains('chat-link')) {
    chatArea.innerHTML = `<div class="chat">${e.target.textContent}</div>`;
  }
});

const inputText = document.getElementById('input-text');
const sendMessageButton = document.getElementById('send-message');
const uploadPdfButton = document.getElementById('upload-pdf');
const pdfInput = document.getElementById('pdf-input');

function appendMessageToChatArea(message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = message;
  chatArea.appendChild(messageDiv);
}

sendMessageButton.addEventListener('click', () => {
  if (inputText.value.trim()) {
    appendMessageToChatArea(inputText.value);
    inputText.value = '';
  }
});

inputText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputText.value.trim()) {
    appendMessageToChatArea(inputText.value);
    inputText.value = '';
  }
});

uploadPdfButton.addEventListener('click', () => {
  pdfInput.click();
});

pdfInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const pdfLink = `<a href="${e.target.result}" target="_blank">View PDF: ${file.name}</a>`;
      appendMessageToChatArea(pdfLink);
    };
    reader.readAsDataURL(file);
    pdfInput.value = '';
  }
});
