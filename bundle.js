// bundle.js — componente A-Frame para controle do image target

AFRAME.registerComponent('alvo-persistente', {
  init: function () {
    const el = this.el;
    const modelo = el.querySelector('#targetModel');

    el.addEventListener('xrimagefound', () => {
      console.log('🔥 Imagem encontrada!');
      if (modelo) modelo.setAttribute('visible', 'true');
    });

    el.addEventListener('xrimagelost', () => {
      console.log('👁️ Imagem perdida — mantendo visível');
      // Comentado de propósito: objeto permanece mesmo após perder o tracking
      // if (modelo) modelo.setAttribute('visible', 'false');
    });
  }
});

// NÃO configure o XR8 aqui — já está no index.html
// Manter bundle.js apenas com componentes A-Frame