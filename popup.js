document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['rayId', 'keybind'], function (data) {
      if (data.rayId && data.keybind) {
        document.getElementById('rayId').value = data.rayId;
        document.getElementById('keybind').value = data.keybind;
      }
    });
  
    document.getElementById('saveSettings').addEventListener('click', function () {
      const rayId = document.getElementById('rayId').value;
      const keybind = document.getElementById('keybind').value;
  
      chrome.storage.sync.set({ rayId, keybind }, function () {
        alert('Settings saved.');
      });
    });
  });
  