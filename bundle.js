// bundle.js — Versão Open Source sem depender de JSON quebrado!

window.addEventListener('xrloaded', () => {
  console.log('✅ XR8 Open Source Carregado');

  const inicializarAR = () => {
    if (!XR8.XrController) {
      setTimeout(inicializarAR, 100);
      return;
    }

    // Passamos a imagem colorida direto para o motor ler, sem precisar do arquivo .json!
    XR8.XrController.configure({
      imageTargetData: [
        {
          name: '20_Element_Fire',
          imagePath: './20_Element_Fire_original.png', // Usa a foto colorida direto na raiz
          metadata: null
        }
      ]
    });

    // Liga o olho do scanner
    XR8.XrController.configure({ imageTargets: ['20_Element_Fire'] });
    console.log('🎯 Scanner forçado na imagem original!');

    XR8.addCameraPipelineModule(XRExtras.Loading.pipelineModule());
    XR8.addCameraPipelineModule(XRExtras.RuntimeError.pipelineModule());

    const scene = document.querySelector('a-scene');
    scene.setAttribute('xrweb', 'local-tracking: true;');

    const status = document.getElementById('status');
    const target = document.querySelector('a-named-image-target');

    if (status) status.textContent = '🔍 Aponte para a imagem do fogo...';

    if (target) {
      target.addEventListener('xrimagefound', () => {
        if (status) {
          status.textContent = '🎯 Imagem encontrada!';
          status.className = 'found';
        }
      });

      target.addEventListener('xrimagelost', () => {
        if (status) {
          status.textContent = '🔍 Aponte para a imagem do fogo...';
          status.className = '';
        }
      });
    }
  };

  inicializarAR();
});