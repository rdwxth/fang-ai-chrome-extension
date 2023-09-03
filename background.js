// background.js
chrome.commands.onCommand.addListener(function (command) {
    if (command === "_execute_browser_action") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: generateResponse,
        });
      });
    }
  });
  
  function generateResponse() {
    chrome.runtime.sendMessage({ action: "generateResponse" });
  }
  