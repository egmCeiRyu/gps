// ✅ MANTÉM O SEU COMPONENTE QUE VOCÊ JÁ TINHA!
AFRAME.registerComponent('alvo-persistente', {
  init: function () {
    const el = this.el; 
    const modelo3d = el.querySelector('a-entity'); 

    el.addEventListener('xrimagefound', () => {
      console.log("Imagem encontrada! Objeto alinhado ao panfleto.");
      modelo3d.setAttribute('visible', 'true');
    });

    el.addEventListener('xrimagelost', () => {
      console.log("Imagem perdida! O SLAM assumiu o controle e segurou o objeto no mundo.");
      // Não mudamos a visibilidade para o cacto continuar fixo no espaço!
    });
  }
});

const onxrloaded = () => {
  // 1. Passamos as rotas exatas apontando tudo para .png!
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: '20_Element_Fire',
        imagePath: 'image/image-targets/20_Element_Fire_original.png', // CORRIGIDO PARA .PNG!
        metadata: 'image/image-targets/20_Element_Fire.json'
      }
    ]
  });

  // 2. Ativa o scanner em tempo real para a carta de fogo
  XR8.XrController.configure({imageTargets: ['20_Element_Fire']});

  console.log("🎯 Scanner ativado para a carta de Fogo (TUDO EM PNG)!");
}

// Executa assim que o motor do 8th Wall carregar
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);