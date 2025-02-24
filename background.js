chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ extensionEnabled: true }, () => {
        console.log("Extension installed/updated. Setting default state to enabled.");
    });
});

// Example: Listen for changes in storage (optional, for more advanced behavior)
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value:`, oldValue, `, New value:`, newValue
        );
        // You can trigger other actions here based on storage changes, if needed
    }
});
