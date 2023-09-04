chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.text && message.fromKeybind) {
      // Retrieve user settings from Chrome storage
      chrome.storage.sync.get(['rayId'], function (data) {
        const rayId = data.rayId;
  
        if (!rayId) {
          alert('Please set your Ray ID in the extension settings.');
          return;
        }
  
        // Send the selected text to your API with the user's ray_id and handle the response here.
        const selectedText = message.text;
  
        fetch('https://prod-1-eu-germany.trykai.xyz/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${rayId}` // Use the user's ray_id as the API key
          },
          body: JSON.stringify({
            ray_id: rayId,
            message: selectedText
          })
        })
        .then(response => response.json())
        .then(data => {
          const reply = JSON.parse(data.response).reply;
          
          // Copy the reply to the clipboard
          const tempInput = document.createElement('input');
          tempInput.value = reply;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          
          // Notify the user that the response has been copied
          alert('Response copied to clipboard: ' + reply);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    }
  
    if (message.contextMenuClick) {
      // Handle context menu click
      // Send the selected text to your API with the user's ray_id and handle the response here.
      const selectedText = message.text;
  
      // Retrieve user settings from Chrome storage
      chrome.storage.sync.get(['rayId'], function (data) {
        const rayId = data.rayId;
  
        if (!rayId) {
          alert('Please set your Ray ID in the extension settings.');
          return;
        }
  
        // Send the selected text to your API with the user's ray_id and handle the response here.
        fetch('https://prod-1-eu-germany.trykai.xyz/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${rayId}` // Use the user's ray_id as the API key
          },
          body: JSON.stringify({
            ray_id: rayId,
            message: selectedText
          })
        })
        .then(response => response.json())
        .then(data => {
          const reply = JSON.parse(data.response).reply;
          
          // Copy the reply to the clipboard
          const tempInput = document.createElement('input');
          tempInput.value = reply;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          
          // Notify the user that the response has been copied
          alert('Response copied to clipboard: ' + reply);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    }
  });
  