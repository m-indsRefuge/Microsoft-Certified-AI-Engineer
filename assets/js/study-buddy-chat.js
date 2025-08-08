document.addEventListener('DOMContentLoaded', () => {
    const toggleChatBtn = document.getElementById('toggle-chat-btn');
    const chatWidget = document.getElementById('chat-widget');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');

    // Toggle the chat widget visibility
    toggleChatBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('hidden');
    });

    // Function to display a message in the chat container
    function displayMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('p-4', 'rounded-lg', 'max-w-[80%]', 'relative', 'shadow-md');

        if (sender === 'user') {
            messageElement.classList.add('bg-secondary-cyan', 'text-deep-black', 'ml-auto', 'rounded-br-none');
        } else {
            messageElement.classList.add('bg-card-bg', 'text-text-light', 'rounded-bl-none', 'border', 'border-border-dark');
        }
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the bottom
    }

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prompt = userInput.value.trim();
        if (!prompt) return;

        displayMessage('user', prompt);
        userInput.value = '';

        // Display a loading message
        const loadingElement = document.createElement('div');
        loadingElement.id = 'loading-indicator';
        loadingElement.classList.add('p-4', 'rounded-lg', 'bg-card-bg', 'text-text-light', 'border', 'border-border-dark');
        loadingElement.textContent = 'Thinking...';
        chatContainer.appendChild(loadingElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        try {
            const chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            
                        const apiUrl = "https://ai-102-gemini-proxy.nolanaug.workers.dev";

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            
            let botMessage = "Sorry, I couldn't get a response. Please try again.";
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                botMessage = result.candidates[0].content.parts[0].text;
            }

            document.getElementById('loading-indicator').remove();
            displayMessage('bot', botMessage);
        } catch (error) {
            console.error('Error fetching from Gemini API:', error);
            if (document.getElementById('loading-indicator')) {
                document.getElementById('loading-indicator').textContent = 'Error: Failed to get a response.';
            }
        }
    });
});