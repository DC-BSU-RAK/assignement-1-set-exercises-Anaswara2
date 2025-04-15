// index.js

// audio files
const samples = [
    { name: "Ah-ha!", file: "ah-ha.mp3" },
    { name: "Back of the net", file: "back-of-the-net.mp3" },
    { name: "Bang out of order", file: "bangoutoforder.mp3" },
    { name: "Dan!", file: "dan.mp3" },
    { name: "Email of the evening", file: "emailoftheevening.mp3" },
    { name: "Hello Partridge", file: "hellopartridge.mp3" },
    { name: "I ate a Scotch egg", file: "iateascotchegg.mp3" },
    { name: "I'm Confused", file: "imconfused.mp3" },
  ];
  
  // Number of samples displayed per page
  const samplesPerPage = 9;
  
  // Keeps track of which page we’re on
  let currentPage = 0;
  
  const sampleGrid = document.getElementById("sampleGrid");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const sampleBankTitle = document.getElementById("sampleBankTitle");
  
  function renderSamples() {
    sampleGrid.innerHTML = "";
  
    // Calculate slice range for current page
    const start = currentPage * samplesPerPage;
    const end = start + samplesPerPage;
    const currentSamples = samples.slice(start, end);
  
    // Create a button for each sample
    currentSamples.forEach(sample => {
      const button = document.createElement("button");
      button.className = "sample-button";
      button.textContent = sample.name;
  
      // Create and load the audio
      const audio = new Audio(`audio/${sample.file}`);
  
      // Once audio metadata is loaded, show the duration
      audio.addEventListener("loadedmetadata", () => {
        const duration = document.createElement("div");
        duration.className = "sample-duration";
        duration.textContent = `${audio.duration.toFixed(1)} sec`;
        button.appendChild(duration);
      });
  
      // Play audio when button is clicked
      button.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
      });
  
      // Add the button to the grid
      sampleGrid.appendChild(button);
    });
  
    // Show or hide navigation buttons based on page position
    prevBtn.style.display = currentPage === 0 ? "none" : "inline-block";
    nextBtn.style.display = (currentPage + 1) * samplesPerPage >= samples.length ? "none" : "inline-block";
  
    // Update the sample bank title
    sampleBankTitle.textContent = `CLICK TO PLAY`;
  }
  
  // Event listener for previous page button
  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderSamples();
    }
  });
  
  // Event listener for next page button
  nextBtn.addEventListener("click", () => {
    if ((currentPage + 1) * samplesPerPage < samples.length) {
      currentPage++;
      renderSamples();
    }
  });
  
  // Text-to-Speech feature
  const ttsInput = document.getElementById("ttsInput");
  const sayButton = document.getElementById("sayButton");
  
  // Speak the text from the textarea when the "Say it" button is clicked
  sayButton.addEventListener("click", () => {
    const text = ttsInput.value.trim();
    if (text !== "") {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  });
  
  // Initial rendering of the sample buttons
  renderSamples();
