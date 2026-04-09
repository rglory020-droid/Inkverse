document.addEventListener("DOMContentLoaded", () => {
  // Load Navbar
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("./navbar.html")
      .then(res => {
        if (!res.ok) throw new Error("Navbar not found");
        return res.text();
      })
      .then(data => {
        navbarContainer.innerHTML = data;
        navbarContainer.style.display = "block"; 
      })
      .catch(err => {
        console.error("Error loading navbar:", err);
        navbarContainer.style.display = "none";
      });
  }

  // Load Footer
  const footerContainer = document.getElementById("footer");
  if (footerContainer) {
    fetch("./footer.html")
      .then(res => {
        if (!res.ok) throw new Error("Footer not found");
        return res.text();
      })
      .then(data => {
        footerContainer.innerHTML = data;
        footerContainer.style.display = "block";
      })
      .catch(err => {
        console.error("Error loading footer:", err);
        footerContainer.style.display = "none";
      });
  }

  // Search and Mic
  const micButton = document.getElementById('micButton');
  const searchInput = document.getElementById('searchInput');

  function handleSearch() {
    const input = searchInput.value.trim();
    if (!input) return;
    window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(input + " webtoon");
  }

  if (micButton && searchInput) {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;

      micButton.addEventListener('click', () => recognition.start());

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        handleSearch(); 
      };

      recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
    } else {
      micButton.style.display = 'none'; 
    }
  }
});
