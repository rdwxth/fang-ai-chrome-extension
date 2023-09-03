// Create a context menu item
chrome.contextMenus.create({
    title: "Generate AI Response",
    contexts: ["selection"], // Show this item when text is selected
    onclick: function(info, tab) {
        const selectedText = info.selectionText;

        // Check if there is selected text
        if (selectedText) {
            // Retrieve the "ray_id" from storage
            chrome.storage.local.get(["ray_id"], function(result) {
                const rayId = result.ray_id;

                if (rayId) {
                    // Use the "ray_id" in your API call
                    sendMessage(selectedText, rayId);
                } else {
                    console.error("Ray ID is not set. Please configure it in the popup.");
                }
            });
        }
    }
});

// foreground.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "generateResponse") {
      // Get the selected text
      const selectedText = window.getSelection().toString();
  
      // Check if there is selected text
      if (selectedText) {
        // Retrieve the "ray_id" from storage
        chrome.storage.local.get(["ray_id"], function (result) {
          const rayId = result.ray_id;
  
          if (rayId) {
            // Use the "ray_id" in your API call
            sendMessage(selectedText, rayId);
          } else {
            console.error("Ray ID is not set. Please configure it in the popup.");
          }
        });
      }
    }
  });
  

function sendMessage(message, rayId) {
const apiUrl = 'https://prod-1-eu-germany.trykai.xyz/api/chat';
let messageList = [];

const userMessage = {
    id: generateUniqueId(),
    role: 'user',
    content: message,
    who: 'User: ',
    timestamp: Date.now(),
};

messageList.push(userMessage);

const requestData = {
    ray_id: rayId,
    message: message,
    message_list: messageList,
};

fetch(apiUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
})
    .then((response) => response.json())
    .then((data) => {
    // Handle the API response here
    const reply = JSON.parse(data.response).reply;

    // Copy the generated response to the clipboard
    navigator.clipboard.writeText(reply)
        .then(() => {
        console.log('Response copied to clipboard:', reply);
        })
        .catch((error) => {
        console.error('Error copying response to clipboard:', error);
        });
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function generateUniqueId() {
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let result = '';
const length = 16;
for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
}
return result;
}
