// নিউজ টিকার
async function loadNews() {
    try {
        const res = await fetch(CONFIG.NEWS_SHEETDB);
        const news = await res.json();
        const ticker = document.getElementById('ticker-text');
        const texts = news.map(n => n.text).join('  •  ');
        ticker.textContent = texts || 'কোনো খবর নেই।';
    } catch (err) {
        document.getElementById('ticker-text').textContent = 'খবর লোড করতে ব্যর্থ।';
    }
}

loadNews();
