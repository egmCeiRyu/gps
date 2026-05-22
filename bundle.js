// bundle.js — Controle de eventos e injeção de alvos na raiz

AFRAME.registerComponent('alvo-persistente', {
  init: function () {
    const el = this.el;
    const cubo = el.querySelector('#cubo');

    // Quando o olho do sensor reconhecer a imagem
    el.addEventListener('xrimagefound', () => {
      console.log('油 Encontrou a imagem do fogo!');
      
      const status = document.getElementById('status');
      if (status) {
        status.textContent = '油 Imagem encontrada!';
        status.className = 'found';
      }
      
      if (cubo) cubo.setAttribute('visible', 'true');
    });

    // Quando perder a imagem de vista
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

const inicializarAR = (targetJson) => {
  if (!XR8.XrController) {
    setTimeout(() => inicializarAR(targetJson), 100);
    return;
  }

  console.log('⚙️ Injetando metadados do alvo...');

  // Configura a engine com os dados que vieram do fetch do JSON
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: targetJson.name,
        imagePath: './' + targetJson.imagePath, // Vai buscar em image-targets/20_Element_Fire_luminance.png
        metadata: targetJson
      }
    ]
  });

  // Força a ativação do scanner para o ID do fogo
  XR8.XrController.configure({ imageTargets: [targetJson.name] });
  console.log('🎯 Scanner 8th Wall ativado com sucesso!');
};

// Escuta o sinal do runtime.js local para iniciar o processo
window.addEventListener('xrloaded', () => {
  console.log('✅ Motor XR8 detectado. Buscando JSON da raiz...');

  fetch('./20_Element_Fire.json')
    .then(r => {
      if (!r.ok) throw new Error('JSON não encontrado (' + r.status + ')');
      return r.json();
    })
    .then(targetJson => {
      inicializarAR(targetJson);
    })
    .catch(err => {
      console.error('🚨 Erro de inicialização:', err);
      const s = document.getElementById('status');
      if (s) {
        s.textContent = '🚨 ' + err.message;
      }
    });
});