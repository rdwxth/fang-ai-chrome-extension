chrome.contextMenus.create({
    title: 'Send to Kai Assist',
    contexts: ['selection'],
    id: 'sendToKaiAssist'
  });
  
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === 'sendToKaiAssist') {
      chrome.tabs.sendMessage(tab.id, { text: info.selectionText });
    }
  });
  