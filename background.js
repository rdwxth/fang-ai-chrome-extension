chrome.contextMenus.create({
    title: 'Send to Kai Assist',
    contexts: ['selection'],
    id: 'sendToKaiAssist'
  });
  
  // Check if the context menu item already exists before creating it
  if (!chrome.contextMenus.onClicked.hasListener(handleContextMenuClick)) {
    chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
  }
  
  function handleContextMenuClick(info, tab) {
    if (info.menuItemId === 'sendToKaiAssist') {
      chrome.tabs.sendMessage(tab.id, { text: info.selectionText });
    }
  }
  