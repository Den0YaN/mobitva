function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }

function getRussianStyleText(styleValue) {
    switch(styleValue) {
        case "rare": return "Урон";
        case "uncommon": return "Уворот";
        case "armor": return "Броня";
        case "epic": return "Элита";
        default: return styleValue || "—";
    }
}

function getStatIconClass(statName) {
    const map = { урон: "stat-icon-урон", точность: "stat-icon-точность", уворот: "stat-icon-уворот", броня: "stat-icon-броня", блок: "stat-icon-блок", оглушение: "stat-icon-оглушение", здоровье: "stat-icon-здоровье" };
    return map[statName.toLowerCase()] || "";
}

function checkAuth() { const user = localStorage.getItem('user'); return user ? JSON.parse(user) : null; }

function displayAdminPanel() {
    const user = checkAuth();
    const adminPanel = document.getElementById('adminPanel');
    const userPanel = document.getElementById('userPanel');
    const addBtn = document.getElementById('addItemBtn');
    if(!user) {
        if(adminPanel) adminPanel.style.display = 'none';
        if(userPanel) userPanel.style.display = 'none';
        if(addBtn) addBtn.style.display = 'none';
        return;
    }
    if(user.role === 'admin') {
        if(adminPanel) adminPanel.style.display = 'block';
        if(userPanel) userPanel.style.display = 'none';
        if(addBtn) addBtn.style.display = 'block';
        const nameSpan = document.getElementById('adminName');
        if(nameSpan) nameSpan.textContent = user.name;
    } else {
        if(adminPanel) adminPanel.style.display = 'none';
        if(userPanel) userPanel.style.display = 'block';
        if(addBtn) addBtn.style.display = 'none';
        const nameSpan = document.getElementById('userName');
        if(nameSpan) nameSpan.textContent = user.name;
    }
}

function logout() { localStorage.removeItem('user'); window.location.href = 'auth.html'; }
function openAdminPanel() { window.location.href = 'admin.html'; }

function closeModal(id) { const m = document.getElementById(id); if(m) { m.style.display = 'none'; document.body.style.overflow = ''; } }
window.onclick = function(e) {
    const ids = ['runesModal', 'demonModal', 'runeModal', 'totemModal', 'editModal', 'editNewsModal', 'item-modal', 'editItemModal'];
    for(let id of ids) { const m = document.getElementById(id); if(m && e.target === m) { closeModal(id); break; } }
};
function openRunesModal() { const m = document.getElementById('runesModal'); if(m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; } }
function closeRunesModal() { closeModal('runesModal'); }