if (typeof window.__dbClient === 'undefined') { 
    const SUPABASE_URL = 'https://gmcqxgxwtczjlwyifwew.supabase.co'; 
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtY3F4Z3h3dGN6amx3eWlmd2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MjIxMTAsImV4cCI6MjA5MDk5ODExMH0.cM6xm9qCRbl-c1h-pWOWKSeAozYUy7KpJjua79JgFuk'; 
    window.__dbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 
}
const db = window.__dbClient;

async function getItems() { const { data, error } = await db.from('items').select('*').order('level'); if (error) return []; return data; }
async function getDemons() { const { data, error } = await db.from('demons').select('*').order('sort_order'); if (error) return []; return data; }
async function getTotems() { const { data, error } = await db.from('totems').select('*').order('sort_order'); if (error) return []; return data; }
async function getMasterRunes() { const { data, error } = await db.from('runes_master').select('*').order('sort_order'); if (error) return []; return data; }
async function getDruidsRunes() { const { data, error } = await db.from('runes_druids').select('*').order('sort_order'); if (error) return []; return data; }
async function getNews() { const { data, error } = await db.from('news').select('*').order('date', { ascending: false }); if (error) return []; return data; }
async function getUsers() { const { data, error } = await db.from('users').select('*'); if (error) return []; return data; }
async function saveItem(item) { const { data, error } = await db.from('items').upsert(item).select(); if (error) return null; return data; }
async function saveDemon(demon) { const { data, error } = await db.from('demons').upsert(demon).select(); if (error) return null; return data; }
async function saveTotem(totem) { const { data, error } = await db.from('totems').upsert(totem).select(); if (error) return null; return data; }
async function saveMasterRune(rune) { const { data, error } = await db.from('runes_master').upsert(rune).select(); if (error) return null; return data; }
async function saveDruidsRune(rune) { const { data, error } = await db.from('runes_druids').upsert(rune).select(); if (error) return null; return data; }
async function saveNewsItem(news) { const { data, error } = await db.from('news').upsert(news).select(); if (error) return null; return data; }
async function deleteItemById(id) { const { error } = await db.from('items').delete().eq('id', id); return !error; }
async function deleteDemonById(id) { const { error } = await db.from('demons').delete().eq('id', id); return !error; }
async function deleteTotemById(id) { const { error } = await db.from('totems').delete().eq('id', id); return !error; }
async function deleteMasterRuneById(id) { const { error } = await db.from('runes_master').delete().eq('id', id); return !error; }
async function deleteDruidsRuneById(id) { const { error } = await db.from('runes_druids').delete().eq('id', id); return !error; }
async function deleteNewsById(id) { const { error } = await db.from('news').delete().eq('id', id); return !error; }
async function loginUser(login, password) { const { data, error } = await db.from('users').select('*').eq('login', login).eq('password', password); if (error || !data || data.length === 0) return null; return data[0]; }
async function registerUser(login, password, email) { const { data: existing } = await db.from('users').select('*').eq('login', login); if (existing && existing.length > 0) return { success: false, message: '❌ Пользователь уже существует' }; const { count } = await db.from('users').select('*', { count: 'exact', head: true }); const role = count === 0 ? 'admin' : 'user'; const { error } = await db.from('users').insert([{ login, password, email, role, name: login }]); if (error) return { success: false, message: '❌ Ошибка регистрации' }; return { success: true, message: role === 'admin' ? '✅ Вы стали АДМИНИСТРАТОРОМ!' : '✅ Регистрация успешна!' }; }
async function isFirstUser() { const { count, error } = await db.from('users').select('*', { count: 'exact', head: true }); if (error) return true; return count === 0; }
async function initAuth() { const first = await isFirstUser(); if (first) { await registerUser('admin', 'admin123', 'admin@mmobitva.ru'); const users = await getUsers(); if (users && users.length > 0) { await db.from('users').update({ role: 'admin' }).eq('id', users[0].id); } } }