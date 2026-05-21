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

// 🚀 ADICIONE ESTE BLOCO LOGO ABAIXO PARA FORÇAR O MOTOR A ESCANEAR A IMAGEM
const onxrloaded = () => {
  // Configura o controlador injetando os caminhos corretos dos arquivos locais
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: 'seu-panfleto', // Deve bater com o name da tag <a-named-image-target>
        imagePath: './image-targets/seu-panfleto_original.png', 
        metadata: './image-targets/seu-panfleto.json' // Mantenha o arquivo com .json na pasta!
      }
    ]
  })
  console.log("🎯 Dados do Kanji injetados! Pronto para escanear.");
}

// Acorda o motor do 8th Wall
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);