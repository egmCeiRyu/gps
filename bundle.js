// bundle.js — Ajustado para garantir que o XrController não venha null!

const inicializarAR = (targetJson) => {
  // Verificação de segurança: se o controlador ainda não subiu, espera 100ms e tenta de novo
  if (!XR8.XrController) {
    console.log('⏳ Aguardando XrController inicializar...');
    setTimeout(() => inicializarAR(targetJson), 100);
    return;
  }

  console.log('🎯 XrController pronto! Configurando alvo:', targetJson.name);

  // 1. Configura a engine com os metadados do alvo que veio da raiz
  XR8.XrController.configure({
    imageTargetData: [targetJson],
  });

  // 2. Liga o scanner em tempo real para processar este alvo específico
  XR8.XrController.configure({ imageTargets: ['20_Element_Fire'] });
  console.log('🎯 Configure ok!');

  // 3. Inicia os módulos de interface visuais
  XR8.addCameraPipelineModule(XRExtras.Loading.pipelineModule());
  XR8.addCameraPipelineModule(XRExtras.RuntimeError.pipelineModule());

  // 4. Ativa o motor xrweb na cena do A-Frame
  const scene = document.querySelector('a-scene');
  scene.setAttribute('xrweb', 'local-tracking: true;');

  // 5. Mapeamento dos Eventos na Tela
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
  } else {
    console.error('🚨 Erro: Tag <a-named-image-target> não encontrada no HTML!');
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
      // Chama a função de inicialização passando o JSON
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

window.addEventListener('xrerror', (e) => {
  console.error('🚨 XR Error:', e.detail);
  const s = document.getElementById('status');
  if (s) {
    s.textContent = '🚨 ' + (e.detail?.message || 'erro desconhecido');
    s.className = 'error';
  }
});