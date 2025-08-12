const POSTS_JSON = 'posts.json';
const postsContainer = document.querySelector('.posts-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

function formatDate(dstr){
  const d = new Date(dstr);
  if (isNaN(d)) return dstr;
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}

function excerpt(text, n = 140){
  const t = text.replace(/(<([^>]+)>)/ig, ""); // quitar tags
  return t.length > n ? t.slice(0,n).trim() + '…' : t;
}

function openModal(post){
  modalContent.innerHTML = `
    <h1>${post.title}</h1>
    <div class="meta">${formatDate(post.date)}</div>
    <div class="post-full">${post.content}</div>
  `;
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalContent.innerHTML = '';
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

fetch(POSTS_JSON)
  .then(res => res.json())
  .then(posts => {
    // ordenar descendente por fecha (más nuevo primero)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    postsContainer.innerHTML = ''; // limpio container antes

    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
        <div class="card-body">
          <h2>${post.title}</h2>
          <div class="meta">${formatDate(post.date)}</div>
          <p>${excerpt(post.content || post.excerpt)}</p>
          <a class="read-more" href="#" data-id="${post.id}">Leer más →</a>
        </div>
      `;
      postsContainer.appendChild(card);
    });
  });

