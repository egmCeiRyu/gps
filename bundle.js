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
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: '20_Element_Fire',
        // Usamos "./" no começo para forçar o navegador a buscar a partir da pasta atual do site
        imagePath: './image/image-targets/20_Element_Fire_original.png', 
        metadata: './image/image-targets/20_Element_Fire.json'
      }
    ]
  });

  XR8.XrController.configure({imageTargets: ['20_Element_Fire']});
  console.log("🎯 Scanner configurado com caminhos relativos!");
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);