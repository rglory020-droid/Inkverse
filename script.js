fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    const navbar = document.getElementById("navbar");
    if (navbar) navbar.innerHTML = data;
  })
  .catch(err => console.error("Navbar load error:", err));

fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    const footer = document.getElementById("footer");
    if (footer) footer.innerHTML = data;
  })
  .catch(err => console.error("Footer load error:", err));


const searchInput = document.getElementById('searchInput');
const micButton = document.getElementById('micButton');

function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;
  
  window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query + " webtoon");
}

// Trigger search on Enter key
if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}



if (micButton) {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener('click', () => {
      recognition.start();
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      handleSearch();
    };

    recognition.onerror = (event) => console.error('Speech recognition error:', event.error);

  } else {
 
    micButton.style.display = 'none';
    console.warn('Mic not supported in this browser.');
  }
}
