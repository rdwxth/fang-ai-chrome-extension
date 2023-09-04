// content.js

// Listen for messages from the background script or other parts of your extension
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.text) {
      console.log('Received message from background script:', message);
  
      // Send the selected text to your API and handle the response here.
      const selectedText = message.text;
      console.log('Selected text:', selectedText);
  
      // Retrieve user settings (Ray ID) from Chrome storage
      chrome.storage.sync.get(['rayId'], function (data) {
        const rayId = data.rayId;
  
        if (!rayId) {
          alert('Please set your Ray ID in the extension settings.');
          console.log('Ray ID not set.');
          return;
        }
        console.log('Ray ID:', rayId);
  
        // Send the selected text to your API without authorization headers
        fetch('https://prod-1-eu-germany.trykai.xyz/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ray_id: rayId,
            message: selectedText
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('API response:', data);
  
          const reply = JSON.parse(data.response).reply;
          console.log('API reply:', reply);
  
          // Copy the reply to the clipboard
          const tempInput = document.createElement('input');
          tempInput.value = reply;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
  
          console.log('Response copied to clipboard:', reply);
  
          // Notify the user that the response has been copied
          alert('Response copied to clipboard: ' + reply);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    }
    // Handle other message types as needed
  });
  
  