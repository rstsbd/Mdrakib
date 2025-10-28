// admin.js
if (window.location.pathname.includes('admin-login.html')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === CONFIG.ADMIN.username && password === CONFIG.ADMIN.password) {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'admin-dashboard.html';
        } else {
            document.getElementById('loginStatus').innerHTML = '<span style="color:red">ভুল তথ্য!</span>';
        }
    });
}

if (window.location.pathname.includes('admin-dashboard.html')) {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
    }

    async function loadData() {
        const search = document.getElementById('search').value.toLowerCase();
        const category = document.getElementById('filterCategory').value;
        const status = document.getElementById('filterStatus').value;

        try {
            const res = await fetch(CONFIG.SHEETDB_API);
            const data = await res.json();

            let filtered = data.filter(row => {
                const matchesSearch = row.name?.toLowerCase().includes(search) || row.message?.toLowerCase().includes(search);
                const matchesCategory = !category || row.category === category;
                const matchesStatus = !status || row.status === status;
                return matchesSearch && matchesCategory && matchesStatus;
            });

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
