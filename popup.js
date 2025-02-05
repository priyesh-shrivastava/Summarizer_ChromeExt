require('dotenv').config();
// const cohereApiKey = process.env.COHERE_API_KEY;
const cohereApiKey = 'DH9wkqjhmVYLQwTAJgadqLvzfEV1ollrL3i369zb';
// console.log(cohereApiKey) 

document.getElementById('summarize').addEventListener('click', async () => {
    try { 
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: summarizePage,
            args: [cohereApiKey]
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

async function summarizePage() {
    try {
        const response = await fetch('https://api.cohere.ai/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cohereApiKey}`
            },
            body: JSON.stringify({
                prompt: document.body.innerText,
                max_tokens: 100
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('summary').innerText = data.summary;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('summary').innerText = 'Failed to generate summary.';
    }
} 

fetch('https://api.cohere.ai/v1/summarize', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${cohereApiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        // Your request body here
        prompt: "Once upon a time",
        max_tokens: 50
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
 


const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: '0drSIChZVJlsbFcFDgZN5vQUpDuLA17WjlhZUtu0', // Replace with your actual API key
});

// async function chatWithCohere() {
//   try {
//     const response = await cohere.chat({
//       model: 'command-r-plus', // Replace with the correct model name if necessary
//       messages: [
//         {
//           role: 'user',
//           content: 'hello world!',
//         },
//       ],
//     });

//     console.log(response);
//   } catch (error) {
//     console.error('Error communicating with Cohere:', error); 
//   }
// }

// chatWithCohere();
 