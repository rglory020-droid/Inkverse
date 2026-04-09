fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });


const micButton = document.getElementById('micButton');
const searchInput = document.getElementById('searchInput');


function handleSearch() {
  const input = searchInput.value.trim();
  if (!input) return;
  window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(input + " webtoon");
}


if (micButton && 'webkitSpeechRecognition' in window) {
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
} else if (micButton) {
  micButton.style.display = 'none'; 
}
