const newChatButton = document.getElementById('new-chat');
const sidebar = document.getElementById('sidebar');
const chatArea = document.getElementById('chat-area');
let chatCount = 1;

window.onload = function() {
  const formContainer = document.getElementById("api-form");
//  formContainer.classList.remove("hidden");

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
//    console.log(data);
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
  const messageInput = document.getElementById("input-text");
  const fileInput = document.getElementById('pdf-input');
  const uploadedFile = fileInput.files[0];
  let pdfLink = null;

  if (uploadedFile) {
    pdfLink = createPdfLink(uploadedFile);
  }

    function createPdfLink(file) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.target = '_blank';
      link.textContent = `View PDF: ${file.name}`;
      return link;
    }

  // Display the message in the chat area
  function addMessageToChatArea(message, messageType, pdfLink = null) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", messageType);
  messageDiv.textContent = message;
  if (pdfLink) {
    const breakElement = document.createElement('br');
    messageDiv.appendChild(breakElement);
    messageDiv.appendChild(pdfLink);
  }
  chatArea.appendChild(messageDiv);
  scrollToBottom();
}

function scrollToBottom() {
  chatArea.scrollTop = chatArea.scrollHeight;
}

if (messageInput.value.trim()) {
  addMessageToChatArea(messageInput.value, 'user-message', pdfLink);

    // Clear the input field for the message and file input
    messageInput.value = '';
    fileInput.value = '';
}
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
      // Display the bot's response
      setTimeout(() => {
    addMessageToChatArea(data.message, "bot-message");
  }, 1000); // Add a 1 second delay for the bot response
  })
  .catch(error => {
    console.error(error);
  });
});
