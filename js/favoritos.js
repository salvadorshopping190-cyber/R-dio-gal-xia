class FavoritesManager {
    constructor() {
        this.storageKey = 'radiogalaxia_favorites';
        this.favorites = this.loadFavorites();
        this.updateBadge();
    }
    loadFavorites() { try { return JSON.parse(localStorage.getItem(this.storageKey)) || []; } catch(e) { return []; } }
    saveFavorites() { localStorage.setItem(this.storageKey, JSON.stringify(this.favorites)); this.updateBadge(); window.dispatchEvent(new CustomEvent('favoritesUpdated')); }
    toggle(id) {
        const idx = this.favorites.indexOf(id);
        if (idx > -1) { this.favorites.splice(idx,1); this.saveFavorites(); return false; }
        else { this.favorites.push(id); this.saveFavorites(); return true; }
    }
    isFavorite(id) { return this.favorites.includes(id); }
    getCount() { return this.favorites.length; }
    updateBadge() {
        const count = this.getCount();
        document.querySelectorAll('#favBadge').forEach(b => { b.textContent = count || ''; b.style.display = count ? 'flex' : 'none'; });
    }
    getFavoriteProducts() {
        return (window.RADIOGALAXIA?.produtos || []).filter(p => this.favorites.includes(p.id));
    }
}
window.RADIOGALAXIA = window.RADIOGALAXIA || {};
window.RADIOGALAXIA.favorites = new FavoritesManager();
