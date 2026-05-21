// Registra o componente que combina Image Target + SLAM
AFRAME.registerComponent('alvo-persistente', {
  init: function () {
    const el = this.el; // Este é o <a-named-image-target>
    
    // Procura o modelo 3D que está dentro do target
    const modelo3d = el.querySelector('a-entity'); 

    // 1. Quando o celular ENCONTRAR a imagem
    el.addEventListener('xrimagefound', () => {
      console.log("Imagem encontrada! Objeto alinhado ao panfleto.");
      
      // Garante que o modelo está visível e grudado na imagem
      modelo3d.setAttribute('visible', 'true');
    });

    // 2. Quando o celular PERDER a imagem de vista
    el.addEventListener('xrimagelost', () => {
      console.log("Imagem perdida! O SLAM assumiu o controle e segurou o objeto no mundo.");
      
      /* MÁGICA DO 8TH WALL: 
        Por padrão, o componente 'xrweb' mantém o mapeamento do SLAM ativo.
        Para o objeto CONTINUAR no lugar, nós simplesmente NÃO escondemos o modelo3d.
        O motor do 8th Wall automaticamente calcula a última posição espacial 
        e fixa o objeto ali usando o rastreamento de superfície (World Tracking).
      */
    });
  }
});