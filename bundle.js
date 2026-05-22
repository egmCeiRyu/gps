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

// ATUALIZE AS ÚLTIMAS LINHAS DO SEU BUNDLE.JS
const onxrloaded = () => {
  // 1. Passamos os dados da imagem (A placa de madeira)
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: 'toggle-slam',
        imagePath: 'image/image-targets/toggle-slam_original.jpg',
        metadata: 'image/image-targets/toggle-slam.json'
      }
    ]
  });

  // 🔥 O QUE FALTAVA: Comando obrigatório para ligar o scanner de imagem da câmera!
  XR8.XrController.configure({imageTargets: ['toggle-slam']});

  console.log("🎯 MOTOR DE IMAGEM LIGADO E ATIVADO!");
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);