
let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

function render() {
  const list = document.getElementById('bookmarks');
  list.innerHTML = '';
  bookmarks.forEach((bm, i) => {
    const el = document.createElement('div');
    el.className = 'bookmark-container';
    el.setAttribute('data-id', i);
    const iconUrl = 'https://www.google.com/s2/favicons?sz=64&domain_url=' + encodeURIComponent(bm.url);
    el.innerHTML = `
      <button class="delete" onclick="deleteBookmark(${i})">×</button>
      <a class="bookmark" href="${bm.url}" target="_blank">
        <img src="${iconUrl}" alt="${bm.title}" />
        <div>${bm.title}</div>
      </a>`;
    list.appendChild(el);
  });
}

function addBookmark() {
  const title = document.getElementById('title').value;
  const url = document.getElementById('url').value;
  if (!title || !url) return alert('名前とURLは必須です');
  bookmarks.push({ title, url });
  saveAndRender();
}

function deleteBookmark(i) {
  bookmarks.splice(i, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  render();
}

new Sortable(document.getElementById('bookmarks'), {
  animation: 150,
  onEnd: function (evt) {
    const movedItem = bookmarks.splice(evt.oldIndex, 1)[0];
    bookmarks.splice(evt.newIndex, 0, movedItem);
    saveAndRender();
  }
});

render();
