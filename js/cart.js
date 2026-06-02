class CartManager {
    constructor() {
        this.storageKey = 'radiogalaxia_cart';
        this.cart = this.loadCart();
        this.updateBadge();
    }
    loadCart() { try { return JSON.parse(localStorage.getItem(this.storageKey)) || []; } catch(e) { return []; } }
    saveCart() { localStorage.setItem(this.storageKey, JSON.stringify(this.cart)); this.updateBadge(); window.dispatchEvent(new CustomEvent('cartUpdated')); }
    addItem(produto, qtd=1, cor=null, tam=null) {
        const key = `${produto.id}-${cor||produto.cores[0]}-${tam||produto.tamanhos[0]}`;
        const exist = this.cart.find(i => i.key === key);
        if (exist) exist.quantidade += qtd;
        else this.cart.push({ key, id:produto.id, nome:produto.nome, preco:produto.preco, emoji:produto.emoji, quantidade:qtd, cor:cor||produto.cores[0], tamanho:tam||produto.tamanhos[0] });
        this.saveCart();
    }
    removeItem(key) { this.cart = this.cart.filter(i => i.key !== key); this.saveCart(); }
    updateQuantity(key, qtd) { const item = this.cart.find(i => i.key === key); if (item) { item.quantidade = Math.max(1, qtd); this.saveCart(); } }
    getTotal() { return this.cart.reduce((t,i) => t + i.preco*i.quantidade, 0); }
    getItemCount() { return this.cart.reduce((t,i) => t + i.quantidade, 0); }
    getItems() { return [...this.cart]; }
    clearCart() { this.cart = []; this.saveCart(); }
    updateBadge() {
        const count = this.getItemCount();
        document.querySelectorAll('#cartBadge').forEach(b => { b.textContent = count || ''; b.style.display = count ? 'flex' : 'none'; });
    }
    aplicarCupom(codigo) {
        const cupom = (window.RADIOGALAXIA?.cupons || []).find(c => c.codigo === codigo.toUpperCase());
        if (!cupom) return { valido: false, mensagem: 'Cupom não encontrado.' };
        if (cupom.validoAte < new Date().toISOString().split('T')[0]) return { valido: false, mensagem: 'Cupom expirado.' };
        const subtotal = this.getTotal();
        if (subtotal < cupom.usoMinimo) return { valido: false, mensagem: `Mínimo R$${cupom.usoMinimo}.` };
        let desconto = 0;
        if (cupom.tipo === 'percentual') desconto = subtotal * (cupom.desconto/100);
        return { valido: true, cupom, desconto, mensagem: `Cupom ${cupom.codigo} aplicado! Desconto: R$${desconto.toFixed(2)}` };
    }
}
window.RADIOGALAXIA = window.RADIOGALAXIA || {};
window.RADIOGALAXIA.cart = new CartManager();
