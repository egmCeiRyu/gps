// bundle.js — Versão com sintaxe 100% corrigida e sem chaves sobrando!

window.addEventListener('xrloaded', () => {
  console.log('✅ XR8 Open Source pronto.');

  // 1. Módulo de pipeline para interceptar os eventos da imagem
  const moduloImagemPipeline = () => {
    return {
      name: 'meu-rastreador-fogo',
      listeners: [
        {
          event: 'reality.imagefound',
          process: (event) => {
            if (event.detail.name === '20_Element_Fire') {
              console.log('🎯 Carta de Fogo Encontrada!');
              
              const status = document.getElementById('status');
              if (status) {
                status.textContent = '🎯 Imagem encontrada!';
                status.className = 'found';
              }

              const cubo = document.getElementById('cubo');
              if (cubo) {
                cubo.setAttribute('visible', 'true');
              }
            }
          }
        },
        {
          event: 'reality.imagelost',
          process: (event) => {
            if (event.detail.name === '20_Element_Fire') {
              console.log('🔍 Imagem Perdida');
              
              const status = document.getElementById('status');
              if (status) {
                status.textContent = '🔍 Aponte para a imagem do fogo...';
                status.className = '';
              }
            }
          }
        }
      ]
    };
  };

  const inicializarAR = (targetJson) => {
    if (!XR8.XrController) {
      setTimeout(() => inicializarAR(targetJson), 100);
      return;
    }

    console.log('⚙️ Configurando Alvo...');

    // 2. Configura o leitor com a imagem de luminância da raiz
    XR8.XrController.configure({
      imageTargetData: [
        {
          name: targetJson.name,
          imagePath: './' + targetJson.imagePath, 
          metadata: targetJson
        }
      ]
    });

    // 3. Ativa o scanner
    XR8.XrController.configure({ imageTargets: [targetJson.name] });

    // 4. Injeta os módulos na câmera
    XR8.addCameraPipelineModule(moduloImagemPipeline());
    XR8.addCameraPipelineModule(XRExtras.Loading.pipelineModule());
    XR8.addCameraPipelineModule(XRExtras.RuntimeError.pipelineModule());

    console.log('🚀 Sistema pronto!');
  };

  // 5. Executa o download do JSON na raiz
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
      if (s) {
        s.textContent = '🚨 ' + err.message;
        s.className = 'error';
      }
    });
}); // CHAVE E PARÊNTESIS FECHADOS CORRETAMENTE AQUI!