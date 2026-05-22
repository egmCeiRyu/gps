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
  // Configuração explícita injetando a localização correta detetada na estrutura
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: 'seu-panfleto',
        // Caminho exato com base na pasta "image" que está dentro de "gps"
        imagePath: 'image/image-targets/seu-panfleto_original.png',
        metadata: 'image/image-targets/seu-panfleto.json'
      }
    ]
  })
  console.log("🎯 Alvo configurado com o caminho: image/image-targets/");
}

// Inicializa o motor assim que estiver pronto
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);