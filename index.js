document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");

    // Load the saved state from storage
    chrome.storage.sync.get("extensionEnabled", (data) => {
        const isEnabled = data.extensionEnabled !== false; // Default to enabled if not set
        toggleButton.checked = isEnabled;
    });

    // Listen for changes to the toggle button
    toggleButton.addEventListener("change", () => {
        const isEnabled = toggleButton.checked;

        // Save the state to storage
        chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
            console.log("Extension enabled state saved:", isEnabled);
        });
    });
});