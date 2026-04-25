// Get DOM elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Image upload elements
const crushImageInput = document.getElementById('crush-image-input');
const designImageInput = document.getElementById('design-image-input');
const crushPreview = document.getElementById('crush-preview');
const designPreview = document.getElementById('design-preview');
const clearImagesButton = document.getElementById('clear-images-button');
const chatContainer = document.querySelector('.chat-container');

// Initialize
let messages = JSON.parse(localStorage.getItem('crushMessages')) || [];
let crushImage = localStorage.getItem('crushImage') || null;
let designImage = localStorage.getItem('designImage') || null;

// Load on page load
window.addEventListener('load', () => {
    displayMessages();
    loadImages();
    messageInput.focus();
});

// Send message events
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Image upload handlers
crushImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            crushImage = event.target.result;
            localStorage.setItem('crushImage', crushImage);
            displayCrushImage();
        };
        reader.readAsDataURL(file);
    }
});

designImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            designImage = event.target.result;
            localStorage.setItem('designImage', designImage);
            displayDesignImage();
        };
        reader.readAsDataURL(file);
    }
});

clearImagesButton.addEventListener('click', () => {
    crushImage = null;
    designImage = null;
    localStorage.removeItem('crushImage');
    localStorage.removeItem('designImage');
    crushPreview.innerHTML = '<p>No image uploaded</p>';
    designPreview.innerHTML = '<p>No image uploaded</p>';
    chatContainer.style.backgroundImage = 'none';
    crushImageInput.value = '';
    designImageInput.value = '';
});

function displayCrushImage() {
    if (crushImage) {
        crushPreview.innerHTML = `<img src="${crushImage}" alt="Crush Image">`;
    }
}

function displayDesignImage() {
    if (designImage) {
        designPreview.innerHTML = `<img src="${designImage}" alt="Design Image">`;
        // Apply design as chat background
        chatContainer.style.backgroundImage = `url(${designImage})`;
        chatContainer.style.backgroundSize = 'cover';
        chatContainer.style.backgroundPosition = 'center';
        // Add overlay for better text readability
        const messagesDiv = document.querySelector('.messages');
        messagesDiv.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}

function loadImages() {
    if (crushImage) {
        displayCrushImage();
    } else {
        crushPreview.innerHTML = '<p>No image uploaded</p>';
    }

    if (designImage) {
        displayDesignImage();
    } else {
        designPreview.innerHTML = '<p>No image uploaded</p>';
    }
}

function sendMessage() {
    const text = messageInput.value.trim();

    if (text === '') return;

    const message = {
        text: text,
        sent: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    messages.push(message);
    localStorage.setItem('crushMessages', JSON.stringify(messages));

    messageInput.value = '';
    displayMessages();

    // Auto-reply
    setTimeout(() => {
        const replies = [
            "That's so sweet! 😊",
            "I like that! 💕",
            "Tell me more! 😍",
            "You're amazing! ✨",
            "I feel the same way! 💫",
            "So romantic! 🌹",
            "You made my day! 😌",
            "Can't stop thinking about you! 💭",
            "I miss you! 💔",
            "You're my crush! 😘"
        ];

        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const reply = {
            text: randomReply,
            sent: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        messages.push(reply);
        localStorage.setItem('crushMessages', JSON.stringify(messages));
        displayMessages();
    }, 1000);
}

function displayMessages() {
    messagesDiv.innerHTML = '';

    messages.forEach((message) => {
        const messageEl = document.createElement('div');
        messageEl.classList.add('message');
        messageEl.classList.add(message.sent ? 'sent' : 'received');

        messageEl.innerHTML = `
            ${message.text}
            <div class="timestamp">${message.timestamp}</div>
        `;

        messagesDiv.appendChild(messageEl);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}