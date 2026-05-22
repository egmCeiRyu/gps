// bundle.js — Versão Alinhada com o Pipeline oficial do 8th Wall

AFRAME.registerComponent('alvo-persistente', {
  init: function () {
    const el = this.el;
    const cubo = el.querySelector('#cubo');

    // Escuta quando o motor encontra a foto
    el.addEventListener('xrimagefound', () => {
      console.log('🎯 Imagem Encontrada!');
      
      const status = document.getElementById('status');
      if (status) {
        status.textContent = '🎯 Imagem encontrada!';
        status.className = 'found';
      }
      
      if (cubo) cubo.setAttribute('visible', 'true');
    });

    // Escuta quando a imagem sai da câmera
    el.addEventListener('xrimagelost', () => {
      console.log('🔍 Imagem perdida.');
      const status = document.getElementById('status');
      if (status) {
        status.textContent = '🔍 Aponte para a imagem...';
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

  // Passa as configurações da raiz para o leitor interno
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: targetJson.name,
        imagePath: './' + targetJson.imagePath, 
        metadata: targetJson
      }
    ]
  });

  // Força o scanner a ligar procurando o nome do alvo
  XR8.XrController.configure({ imageTargets: [targetJson.name] });
  console.log('🎯 Scanner ativado para:', targetJson.name);
};

window.addEventListener('xrloaded', () => {
  console.log('✅ XR8 Carregado');

  fetch('./20_Element_Fire.json')
    .then(r => {
      if (!r.ok) throw new Error('JSON não encontrado (' + r.status + ')');
      return r.json();
    })
    .then(targetJson => {
      inicializarAR(targetJson);
    })
    .catch(err => {
      console.error('🚨', err);
      const s = document.getElementById('status');
      if (s) s.textContent = '🚨 ' + err.message;
    });
});