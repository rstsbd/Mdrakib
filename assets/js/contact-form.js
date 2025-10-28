// contact-form.js
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        category: document.getElementById('category').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString('bn-BD'),
        status: 'পেন্ডিং'
    };

    const statusEl = document.getElementById('status');
    statusEl.textContent = 'জমা হচ্ছে...';

    try {
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data)
        });

        statusEl.innerHTML = '<span style="color:green">সফলভাবে জমা হয়েছে!</span>';
        document.getElementById('contactForm').reset();
    } catch (err) {
        statusEl.innerHTML = '<span style="color:red">ত্রুটি হয়েছে। আবার চেষ্টা করুন।</span>';
    }
});
