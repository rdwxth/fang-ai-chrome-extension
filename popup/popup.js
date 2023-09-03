// popup.js
document.addEventListener("DOMContentLoaded", function () {
    const rayIdInput = document.getElementById("rayIdInput");
    const saveRayIdButton = document.getElementById("saveRayIdButton");
  
    // Load the stored "ray_id" (if it exists) when the popup is opened
    chrome.storage.local.get(["ray_id"], function (result) {
      if (result.ray_id) {
        rayIdInput.value = result.ray_id;
      }
    });
  
    // Save the user's "ray_id" when they click the save button
    saveRayIdButton.addEventListener("click", function () {
      const newRayId = rayIdInput.value;
  
      // Store the "ray_id" in Chrome's local storage
      chrome.storage.local.set({ ray_id: newRayId }, function () {
        console.log("Ray ID saved: " + newRayId);
      });
    });
  });
  