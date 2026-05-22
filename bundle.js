// bundle.js — Versão Definitiva anti-tarja preta!

const inicializarAR = (targetJson) => {
  if (!XR8.XrController) {
    console.log('⏳ Aguardando XrController...');
    setTimeout(() => inicializarAR(targetJson), 100);
    return;
  }

  console.log('🎯 XrController pronto! Configurando alvo:', targetJson.name);

  // 🔥 A CORREÇÃO DE SINTAXE: Formatando os dados exatamente como o 8th Wall exige
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: targetJson.name,
        imagePath: './' + targetJson.imagePath, // Aponta para a imagem de luminância na raiz
        metadata: targetJson
      }
    ]
  });

  // Força o scanner a ligar procurando o nome exato do alvo
  XR8.XrController.configure({ imageTargets: [targetJson.name] });
  console.log('🎯 Scanner ativado com sucesso para:', targetJson.name);

  // Inicia os módulos de interface
  XR8.addCameraPipelineModule(XRExtras.Loading.pipelineModule());
  XR8.addCameraPipelineModule(XRExtras.RuntimeError.pipelineModule());

  // Liga a câmera na cena A-Frame
  const scene = document.querySelector('a-scene');
  scene.setAttribute('xrweb', 'local-tracking: true;');

  // Captura de eventos na tela
  const status = document.getElementById('status');
  const target = document.querySelector('a-named-image-target');

  status.textContent = '🔍 Aponte para a imagem do fogo...';

  if (target) {
    target.addEventListener('xrimagefound', () => {
      console.log('🎯 Encontrou a imagem!');
      status.textContent = '🎯 Imagem encontrada!';
      status.className = 'found';
    });

    target.addEventListener('xrimagelost', () => {
      status.textContent = '🔍 Aponte para a imagem do fogo...';
      status.className = '';
    });
  }
};

// Dispara o fluxo assim que a biblioteca base carregar
window.addEventListener('xrloaded', () => {
  console.log('✅ XR8 base carregado. Buscando JSON...');

  fetch('./20_Element_Fire.json')
    .then(r => {
      if (!r.ok) throw new Error('JSON não encontrado (' + r.status + ')');
      return r.json();
    })
    .then(targetJson => {
      console.log('📄 JSON baixado com sucesso!');
      inicializarAR(targetJson);
    })
    .catch(err => {
      console.error('🚨 Erro no Fetch:', err);
      const s = document.getElementById('status');
      if (s) {
        s.textContent = '🚨 ' + err.message;
        s.className = 'error';
      }
    });
});