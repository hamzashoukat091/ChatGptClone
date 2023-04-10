const newChatButton = document.getElementById('new-chat');
const sidebar = document.getElementById('sidebar');
const chatArea = document.getElementById('chat-area');
let chatCount = 1;

window.onload = function() {
  const formContainer = document.getElementById("api-form");
  formContainer.classList.remove("hidden");

  const form = document.getElementById("api-key-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    fetch("http://127.0.0.1:8000/api/", {
  method: "POST",
  headers: {
    "X-CSRFToken": csrfToken
  },
  body: formData
})
.then(response => response.json())
  .then(data => {
    console.log(data);
    formContainer.classList.add("hidden");
  })
  .catch(error => {
    console.error(error);
  });

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

//const inputText = document.getElementById('input-text');
//const sendMessageButton = document.getElementById('send-message');

//const pdfInput = document.getElementById('pdf-input');
//
//function appendMessageToChatArea(message) {
//  const messageDiv = document.createElement('div');
//  messageDiv.classList.add('message');
//  messageDiv.innerHTML = message;
//  chatArea.appendChild(messageDiv);
//}
//
//sendMessageButton.addEventListener('click', () => {
//  if (inputText.value.trim()) {
//    appendMessageToChatArea(inputText.value);
//    inputText.value = '';
//  }
//});
//
//inputText.addEventListener('keypress', (e) => {
//  if (e.key === 'Enter' && inputText.value.trim()) {
//    appendMessageToChatArea(inputText.value);
//    inputText.value = '';
//  }
//});
//
//uploadPdfButton.addEventListener('click', () => {
//  pdfInput.click();
//});
//
//pdfInput.addEventListener('change', (e) => {
//  const file = e.target.files[0];
//  if (file) {
//    const reader = new FileReader();
//    reader.onload = (e) => {
//      const pdfLink = `<a href="${e.target.result}" target="_blank">View PDF: ${file.name}</a>`;
//      appendMessageToChatArea(pdfLink);
//    };
//    reader.readAsDataURL(file);
//    pdfInput.value = '';
//  }
//});
//
//

const form = document.getElementById("input-area");
const uploadPdfButton = document.getElementById('upload-pdf');
 const fileInput = document.getElementById("pdf-input");

  // Show file input when the "Upload PDF" button is clicked
  uploadPdfButton.addEventListener("click", () => {
    fileInput.click();
  });

  // Submit the form with AJAX
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Do something with the response data
    })
    .catch(error => {
      console.error(error);
    });
  });