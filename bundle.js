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
        name: 'seu-panfleto',
        // Injetamos a pasta 'image/' que estava faltando no caminho!
        imagePath: 'image/image-targets/seu-panfleto_original.jpg',
        metadata: 'image/image-targets/seu-panfleto.json'
      }
    ]
  })
  console.log("🎯 Caminho corrigido com sucesso!");
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);