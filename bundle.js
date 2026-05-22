// bundle.js — Versão Oficial Adaptada para o Motor Open Source da 8th Wall

window.addEventListener('xrloaded', () => {
  console.log('✅ XR8 Open Source pronto.');

  // 1. Criamos um módulo de pipeline para interceptar a imagem encontrada/perdida
  const moduloImagemPipeline = () => {
    return {
      name: 'meu-rastreador-fogo',
      
      // Escuta nativa da engine (não depende de tags HTML)
      listeners: [
        {
          event: 'reality.imagefound',
          process: (event) => {
            if (event.detail.name === '20_Element_Fire') {
              console.log('🎯 Carta de Fogo Encontrada!');
              
              // Muda o status na tela
              const status = document.getElementById('status');
              if (status) {
                status.textContent = '🎯 Imagem encontrada!';
                status.className = 'found';
              }

              // Faz o cubo aparecer e grudar na posição física da imagem
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

    // 2. Registramos a imagem de luminância da raiz usando a estrutura padrão
    XR8.XrController.configure({
      imageTargetData: [
        {
          name: targetJson.name,
          imagePath: './' + targetJson.imagePath, // 20_Element_Fire_luminance.png na raiz
          metadata: targetJson
        }
      ]
    });

    // 3. Forçamos o motor a caçar esse alvo específico
    XR8.XrController.configure({ imageTargets: [targetJson.name] });

    // 4. Injetamos o nosso módulo customizado dentro do fluxo da câmera
    XR8.addCameraPipelineModule(moduloImagemPipeline());
    XR8.addCameraPipelineModule(XRExtras.Loading.pipelineModule());
    XR8.addCameraPipelineModule(XRExtras.RuntimeError.pipelineModule());

    console.log('🚀 Sistema pronto e escutando o Pipeline!');
  };

  // 5. Baixa o JSON da raiz e chama a inicialização
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