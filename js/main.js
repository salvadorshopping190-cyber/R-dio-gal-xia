document.addEventListener('DOMContentLoaded', () => {
    // Navegação mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Header scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    // Barra de busca
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => searchBar.classList.toggle('active'));
        searchClose?.addEventListener('click', () => searchBar.classList.remove('active'));
        searchInput?.addEventListener('input', () => {
            const q = searchInput.value.trim().toLowerCase();
            if (!searchResults) return;
            if (q.length < 2) { searchResults.innerHTML = ''; return; }
            const prods = window.RADIOGALAXIA?.produtos || [];
            const res = prods.filter(p => p.nome.toLowerCase().includes(q) || p.categoria.includes(q)).slice(0,6);
            searchResults.innerHTML = res.map(p => `<a href="produto.html?id=${p.id}" style="display:block;padding:10px;background:#1a1a1a;border-radius:6px;margin-bottom:4px;">${p.emoji} ${p.nome} - R$${p.preco.toFixed(2)}</a>`).join('');
        });
    }

    // Partículas
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i=0; i<60; i++) {
            const p = document.createElement('div');
            p.classList.add('hero__particle');
            p.style.left = Math.random()*100+'%';
            p.style.animationDuration = (Math.random()*8+6)+'s';
            p.style.animationDelay = Math.random()*8+'s';
            particlesContainer.appendChild(p);
        }
    }

    // Timer promocional
    const timerDays = document.getElementById('timerDays'), timerHours = document.getElementById('timerHours'), timerMins = document.getElementById('timerMins'), timerSecs = document.getElementById('timerSecs');
    if (timerDays && timerHours) {
        const end = new Date(); end.setDate(end.getDate()+3);
        setInterval(() => {
            const diff = end - new Date();
            if (diff <= 0) return;
            timerDays.textContent = String(Math.floor(diff/86400000)).padStart(2,'0');
            timerHours.textContent = String(Math.floor((diff%86400000)/3600000)).padStart(2,'0');
            timerMins.textContent = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
            timerSecs.textContent = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
        }, 1000);
    }

    // Home: categorias e destaques
    const categoriesGrid = document.getElementById('categoriesGrid');
    const featuredGrid = document.getElementById('featuredGrid');
    if (categoriesGrid) {
        const prods = window.RADIOGALAXIA?.produtos || [];
        const cats = ['camisetas','moletons','jaquetas','shorts','bones','acessorios'];
        const emojis = { camisetas:'👕', moletons:'🧥', jaquetas:'🧥', shorts:'🩳', bones:'🧢', acessorios:'🎒' };
        categoriesGrid.innerHTML = cats.map(c => `<a href="produtos.html?cat=${c}" class="category-card"><div class="category-card__img">${emojis[c]}</div><h3>${c.charAt(0).toUpperCase()+c.slice(1)}</h3><p>${prods.filter(p=>p.categoria===c).length} produtos</p></a>`).join('');
    }
    if (featuredGrid) {
        const prods = window.RADIOGALAXIA?.produtos || [];
        const destaques = prods.filter(p => p.lancamento || p.bestseller).slice(0,6);
        featuredGrid.innerHTML = destaques.map(p => window.RADIOGALAXIA.renderProductCard(p)).join('');
    }

    // Newsletter
    document.getElementById('newsletterForm')?.addEventListener('submit', e => { e.preventDefault(); showToast('Bem-vindo à órbita! 🌌'); e.target.reset(); });

    // Toast global
    window.showToast = function(msg, type='success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(100%)'; toast.style.transition='all 0.3s ease'; setTimeout(() => toast.remove(), 300); }, 3000);
    };
});

// Função auxiliar de renderização de card de produto (usada em várias páginas)
window.RADIOGALAXIA = window.RADIOGALAXIA || {};
window.RADIOGALAXIA.renderProductCard = function(produto) {
    const fav = window.RADIOGALAXIA?.favorites?.isFavorite(produto.id) || false;
    const desconto = produto.precoAntigo ? Math.round((1 - produto.preco / produto.precoAntigo) * 100) : 0;
    return `
    <div class="product-card">
        <a href="produto.html?id=${produto.id}" class="product-card__img">
            <span>${produto.emoji}</span>
            ${desconto > 0 ? `<span class="product-card__badge">-${desconto}%</span>` : ''}
            ${produto.lancamento && !desconto ? `<span class="product-card__badge" style="background:#10b981;">Novo</span>` : ''}
        </a>
        <button class="product-card__fav ${fav ? 'active' : ''}" data-id="${produto.id}">♥</button>
        <div class="product-card__info">
            <p class="product-card__cat">${produto.categoria}</p>
            <h3 class="product-card__name">${produto.nome}</h3>
            <div>
                ${produto.precoAntigo ? `<span class="product-card__price-old">R$${produto.precoAntigo.toFixed(2)}</span>` : ''}
                <span class="product-card__price">R$${produto.preco.toFixed(2)}</span>
            </div>
            <p class="product-card__installments">ou 3x R$${(produto.preco/3).toFixed(2)}</p>
            <button class="product-card__btn" data-id="${produto.id}">Adicionar ao Carrinho</button>
        </div>
    </div>`;
};

// Event delegation para cards de produto (adicionar carrinho / favoritos)
document.addEventListener('click', function(e) {
    const btnCart = e.target.closest('.product-card__btn');
    const btnFav = e.target.closest('.product-card__fav');
    if (btnCart) {
        e.preventDefault();
        const id = parseInt(btnCart.dataset.id);
        const produto = (window.RADIOGALAXIA?.produtos || []).find(p => p.id === id);
        if (produto) {
            window.RADIOGALAXIA?.cart?.addItem(produto);
            showToast(`${produto.nome} adicionado ao carrinho!`);
        }
    }
    if (btnFav) {
        e.preventDefault();
        const id = parseInt(btnFav.dataset.id);
        const isFav = window.RADIOGALAXIA?.favorites?.toggle(id);
        btnFav.classList.toggle('active', isFav);
        showToast(isFav ? 'Favoritado!' : 'Removido dos favoritos.');
    }
});
