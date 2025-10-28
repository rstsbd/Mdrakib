// 📸 স্লাইড শো লজিক
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // প্রতি ৩ সেকেন্ডে পরিবর্তন
}

// 📰 SheetDB API থেকে নিউজ ফিড লোড
fetch("https://sheetdb.io/api/v1/YOUR_SHEETDB_ID")
  .then(response => response.json())
  .then(data => {
    let newsItems = data.map(item => item.news);
    let randomNews = newsItems.sort(() => 0.5 - Math.random()).slice(0, 5);
    document.getElementById("news-feed").textContent = randomNews.join(" | ");
  })
  .catch(error => {
    document.getElementById("news-feed").textContent = "নিউজ লোড করতে সমস্যা হচ্ছে!";
    console.error(error);
  });
