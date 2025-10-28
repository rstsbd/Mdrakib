if (!localStorage.getItem('adminLoggedIn')) window.location.href = 'admin-login.html';

// স্লাইড
document.getElementById('slideForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        image: document.getElementById('slideImage').value,
        caption: document.getElementById('slideCaption').value
    };
    await fetch(CONFIG.GOOGLE_SCRIPT_URL + '?type=slide', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    loadSlidesAdmin();
});

// নিউজ
document.getElementById('newsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { text: document.getElementById('newsText').value };
    await fetch(CONFIG.GOOGLE_SCRIPT_URL + '?type=news', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    loadNewsAdmin();
});

async function loadSlidesAdmin() {
    const res = await fetch(CONFIG.SLIDES_SHEETDB);
    const data = await res.json();
    const list = document.getElementById('slidesList');
    list.innerHTML = data.map(s => `
        <div class="admin-item">
            <img src="${s.image}" width="100">
            <p>${s.caption}</p>
            <button onclick="deleteItem('slides', '${s.id}')">মুছুন</button>
        </div>
    `).join('');
}

// অন্যান্য ফাংশন (নিউজ, কন্টাক্ট, ডিলিট) একইভাবে
            const tbody = document.querySelector('#dataTable tbody');
            tbody.innerHTML = '';

            filtered.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.timestamp || ''}</td>
                    <td>${row.name || ''}</td>
                    <td>${row.category || ''}</td>
                    <td>
                        <select onchange="updateStatus('${row.id}', this.value)">
                            <option value="পেন্ডিং" ${row.status === 'পেন্ডিং' ? 'selected' : ''}>পেন্ডিং</option>
                            <option value="সমাধান হয়েছে" ${row.status === 'সমাধান হয়েছে' ? 'selected' : ''}>সমাধান হয়েছে</option>
                        </select>
                    </td>
                    <td><button onclick="viewDetails('${row.id}')">দেখুন</button></td>
                `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            alert('ডাটা লোড করতে সমস্যা: ' + err.message);
        }
    }

    window.updateStatus = async (id, status) => {
        await fetch(`${CONFIG.SHEETDB_API}/id/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
    };

    window.viewDetails = (id) => {
        window.open(`https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0&range=A${id}`, '_blank');
    };

    window.logout = () => {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    };

    loadData();
                  }
