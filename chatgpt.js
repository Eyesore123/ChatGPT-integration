// Load the environment variables from the .env file

// const dotenv = await import('dotenv');
// const env = dotenv.config();

// Create a JavaScript object to store the environment variables
//const API_KEY = env.parsed.API_KEY;

const API_KEY = ''

const container = document.getElementById('message-container');
const inputField = document.getElementById('user-message');

inputField.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      const userMessage = inputField.value.trim();
      if (!userMessage) return;
  
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error('Invalid response from API');
        }
        const responseText = data.choices[0].message.content;
        container.innerHTML += `<div>You: ${userMessage}</div><div>Assistant: ${responseText}</div>`;
  
      } catch (error) {
        console.error('Error:', error);
        if (error.message) {
          container.innerHTML += `<div>Error: ${error.message}</div>`;
        }
      }
  
      inputField.value = '';
    }
  });