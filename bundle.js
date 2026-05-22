// bundle.js — Apenas controle dos eventos visuais

AFRAME.registerComponent('alvo-persistente', {
  init: function () {
    const el = this.el;
    const cubo = el.querySelector('#cubo');

    // Quando o olho do 8th Wall reconhecer os metadados da imagem
    el.addEventListener('xrimagefound', () => {
      console.log('🎯 Imagem do Fogo Encontrada!');
      
      // Atualiza a barra de status no topo
      const status = document.getElementById('status');
      if (status) {
        status.textContent = '🎯 Imagem encontrada!';
        status.className = 'found';
      }
      
      // Torna o cubo visível
      if (cubo) cubo.setAttribute('visible', 'true');
    });

    // Quando a câmera perder a imagem de vista
    el.addEventListener('xrimagelost', () => {
      console.log('🔍 Imagem perdida.');
      const status = document.getElementById('status');
      if (status) {
        status.textContent = '🔍 Aponte para a imagem do fogo...';
        status.className = '';
      }
    });
  }
});