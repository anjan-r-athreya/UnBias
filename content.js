// Function to get the highlighted text from the webpage
function getHighlightedText() {
    const selection = window.getSelection();
    return selection.toString().trim();
  }
  
  // Function to send data to the Python backend
  function sendToPythonServer(text) {
    console.log("Sending text to Python server:", text); // Confirm sending
    fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sentiment analysis result:", data);
        displayAnalysisResult(data); // Display the result
      })
      .catch((error) => {
        console.error("Error sending data to Python server:", error);
        displayAnalysisResult({ error: "Failed to send data to the server" }); // Send to display function
      });
  }
  
  function displayAnalysisResult(result) {
    let analysisResultDiv = document.getElementById("analysisResult");
  
    if (!analysisResultDiv) {
      analysisResultDiv = document.createElement("div");
      analysisResultDiv.id = "analysisResult";
      document.body.appendChild(analysisResultDiv);
      analysisResultDiv.style.cssText = `
                  position: fixed;
                  top: 10px;
                  right: 10px;
                  background-color: rgba(255, 255, 255, 0.8);
                  border: 1px solid black;
                  padding: 5px;
                  z-index: 1000;
              `;
    }
  
    analysisResultDiv.innerHTML = "";
    if (result && result.error) {
      analysisResultDiv.textContent = `Error: ${result.error}`;
    } else if (result) {
      analysisResultDiv.innerHTML = `Classification: ${result.classification}, Label: ${result.analysis.label}, Confidence: ${result.analysis.confidence}`;
    } else {
      analysisResultDiv.textContent = "No result received";
    }
  }
  
  // Trigger analysis on mouseup
  document.addEventListener("mouseup", () => {
    const selectedText = getHighlightedText();
      chrome.storage.sync.get("extensionEnabled", (data) => {
          const isEnabled = data.extensionEnabled !== false; // Default to enabled if not set
           if (isEnabled && selectedText) {
              sendToPythonServer(selectedText);
          }
      });
  });
  