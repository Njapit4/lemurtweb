const editableSelectors = ['.trip span', '.trip h3', '.trip p', '.trip strong', '.journal time', '.journal h3', '.journal p', '.about h2', '.about p:last-child', '.cta h2', '.details span'];
const editableItems = [...document.querySelectorAll(editableSelectors.join(','))];
const savedEdits = JSON.parse(localStorage.getItem('lemurt-site-edits') || '{}');

editableItems.forEach((item, index) => {
  item.dataset.editKey = `content-${index}`;
  if (savedEdits[item.dataset.editKey]) item.innerHTML = savedEdits[item.dataset.editKey];
});

const toolbar = document.createElement('div');
toolbar.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:99;display:flex;gap:8px;padding:9px;background:#101a1e;border:1px solid #f7bf45;border-radius:6px;box-shadow:0 8px 30px rgba(0,0,0,.35)';
toolbar.innerHTML = '<button id="edit-site" style="border:0;background:#f7bf45;color:#111;padding:10px 14px;font:600 12px Arial;cursor:pointer;border-radius:3px">Edit content</button><button id="save-site" style="display:none;border:1px solid #f7bf45;background:transparent;color:#fff;padding:10px 14px;font:600 12px Arial;cursor:pointer;border-radius:3px">Save changes</button><button id="reset-site" style="border:0;background:transparent;color:#d0d4d4;padding:10px 5px;font:12px Arial;cursor:pointer">Reset</button>';
document.body.append(toolbar);

const editButton = document.querySelector('#edit-site');
const saveButton = document.querySelector('#save-site');
document.querySelector('#edit-site').addEventListener('click', () => {
  editableItems.forEach((item) => { item.contentEditable = 'true'; item.style.outline = '2px dashed #f7bf45'; item.style.outlineOffset = '4px'; item.style.cursor = 'text'; });
  editButton.style.display = 'none'; saveButton.style.display = 'block';
});
saveButton.addEventListener('click', () => {
  const edits = {}; editableItems.forEach((item) => { edits[item.dataset.editKey] = item.innerHTML; item.contentEditable = 'false'; item.style.outline = ''; item.style.outlineOffset = ''; item.style.cursor = ''; });
  localStorage.setItem('lemurt-site-edits', JSON.stringify(edits)); saveButton.style.display = 'none'; editButton.style.display = 'block'; editButton.textContent = 'Saved ✓'; setTimeout(() => { editButton.textContent = 'Edit content'; }, 1600);
});
document.querySelector('#reset-site').addEventListener('click', () => { if (confirm('Remove all saved changes on this browser?')) { localStorage.removeItem('lemurt-site-edits'); location.reload(); } });

document.querySelectorAll('nav a[href^="#"]').forEach((link) => link.addEventListener('click', () => { document.querySelectorAll('nav a').forEach((item) => item.classList.remove('active')); link.classList.add('active'); }));
