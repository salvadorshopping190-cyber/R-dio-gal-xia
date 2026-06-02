const produtosData = [
    { id:1, nome:'Camiseta Supernova', categoria:'camisetas', preco:149.90, precoAntigo:199.90, estoque:45, emoji:'💥', descricao:'Camiseta 100% algodão premium. Estampa exclusiva.', cores:['Preto','Branco','Cinza'], tamanhos:['P','M','G','GG'], lancamento:true },
    { id:2, nome:'Camiseta Event Horizon', categoria:'camisetas', preco:159.90, precoAntigo:null, estoque:32, emoji:'🕳️', descricao:'Estampa artística do horizonte de eventos.', cores:['Preto','Azul Escuro'], tamanhos:['P','M','G','GG'], lancamento:true },
    { id:3, nome:'Camiseta Plasma', categoria:'camisetas', preco:139.90, precoAntigo:179.90, estoque:28, emoji:'⚡', descricao:'Design energético com foil metálico.', cores:['Preto'], tamanhos:['M','G','GG'] },
    { id:4, nome:'Moletom Nebulosa', categoria:'moletons', preco:329.90, precoAntigo:399.90, estoque:22, emoji:'🌠', descricao:'Moletom premium forro felpado.', cores:['Preto','Azul Marinho'], tamanhos:['P','M','G','GG'], bestseller:true, colecao:'colecao-nebulosa' },
    { id:5, nome:'Moletom Dark Matter', categoria:'moletons', preco:349.90, precoAntigo:null, estoque:15, emoji:'🖤', descricao:'Moletom canguru oversized.', cores:['Preto','Cinza Chumbo'], tamanhos:['M','G','GG'] },
    { id:6, nome:'Jaqueta Cosmos', categoria:'jaquetas', preco:599.90, precoAntigo:749.90, estoque:12, emoji:'🧥', descricao:'Jaqueta corta-vento premium.', cores:['Preto','Prata'], tamanhos:['P','M','G','GG'], bestseller:true },
    { id:7, nome:'Jaqueta Astronaut', categoria:'jaquetas', preco:649.90, precoAntigo:null, estoque:8, emoji:'👨‍🚀', descricao:'Jaqueta bomber espacial.', cores:['Branco Gelo','Preto'], tamanhos:['M','G','GG'] },
    { id:8, nome:'Shorts Plasma', categoria:'shorts', preco:189.90, precoAntigo:239.90, estoque:35, emoji:'🩳', descricao:'Shorts sarja premium.', cores:['Preto','Cinza'], tamanhos:['P','M','G','GG'] },
    { id:9, nome:'Boné Orbit', categoria:'bones', preco:99.90, precoAntigo:null, estoque:60, emoji:'🧢', descricao:'Boné snapback.', cores:['Preto','Branco'], tamanhos:['Único'] },
    { id:10, nome:'Boné Nebulosa', categoria:'bones', preco:109.90, precoAntigo:139.90, estoque:45, emoji:'🧢', descricao:'Boné 5-panel.', cores:['Preto','Roxo'], tamanhos:['Único'] },
    { id:11, nome:'Mochila Galactic', categoria:'acessorios', preco:299.90, precoAntigo:379.90, estoque:14, emoji:'🎒', descricao:'Mochila urbana.', cores:['Preto'], tamanhos:['Único'] },
    { id:12, nome:'Pochete Cosmos', categoria:'acessorios', preco:149.90, precoAntigo:null, estoque:28, emoji:'👝', descricao:'Pochete transversal.', cores:['Preto','Prata'], tamanhos:['Único'] },
];

const cuponsData = [
    { codigo:'COSMOS10', desconto:10, tipo:'percentual', validoAte:'2026-12-31', usoMinimo:0 },
    { codigo:'GALAXIA20', desconto:20, tipo:'percentual', validoAte:'2026-06-30', usoMinimo:200 },
    { codigo:'FRETEGRATIS', desconto:100, tipo:'frete', validoAte:'2026-12-31', usoMinimo:299 },
];

window.RADIOGALAXIA = window.RADIOGALAXIA || {};
window.RADIOGALAXIA.produtos = produtosData;
window.RADIOGALAXIA.cupons = cuponsData;
