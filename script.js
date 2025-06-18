
const initial = [
  {title:'ChatGPT', url:'https://chat.openai.com/'},
  {title:'Gemini', url:'https://gemini.google.com/'},
  {title:'Copilot', url:'https://github.com/features/copilot'},
  {title:'Perplexity', url:'https://www.perplexity.ai/'},
  {title:'NotebookLM', url:'https://notebooklm.google.com/'},
  {title:'Fero', url:'https://fero.ai/'},
  {title:'GenSpark', url:'https://genspark.com/'},
  {title:'YouTube', url:'https://www.youtube.com/'},
  {title:'Googleスプレッドシート', url:'https://docs.google.com/spreadsheets/'}
];
let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || 'null') || initial;

function render() {
  const list = document.getElementById('bookmarks');
  list.innerHTML = '';
  bookmarks.forEach((bm,i)=>{
    const el = document.createElement('div');
    el.className = 'bookmark-container';
    el.setAttribute('data-id',i);
    const iconUrl = 'https://www.google.com/s2/favicons?sz=64&domain=' + new URL(bm.url).hostname;
    el.innerHTML = `
      <button class="delete" onclick="deleteBookmark(${i})">×</button>
      <a class="bookmark" href="${bm.url}" target="_blank">
        <img src="${iconUrl}" alt="${bm.title}">
        <div>${bm.title}</div>
      </a>`;
    list.appendChild(el);
  });
}
function addBookmark(){
  const t=document.getElementById('title').value, u=document.getElementById('url').value;
  if(!t||!u)return alert('名前とURLを入力してください');
  bookmarks.push({title:t,url:u});
  saveAndRender();
}
function deleteBookmark(i){
  bookmarks.splice(i,1); saveAndRender();
}
function saveAndRender(){
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  render();
}
new Sortable(document.getElementById('bookmarks'),{
  animation:150, onEnd:e=>{
    const [m]=bookmarks.splice(e.oldIndex,1);
    bookmarks.splice(e.newIndex,0,m);
    saveAndRender();
  }
});
render();
