AFRAME.registerComponent('alvo-persistente', {
  init: function () {
    const el = this.el; 
    // CORREÇÃO: Busca o cubo de teste ou qualquer modelo que estiver dentro do target
    const modelo3d = el.querySelector('#targetModel') || el.querySelector('a-entity'); 

    el.addEventListener('xrimagefound', () => {
      console.log("🔥 Imagem encontrada!");
      if (modelo3d) modelo3d.setAttribute('visible', 'true');
    });

    el.addEventListener('xrimagelost', () => {
      console.log("Imagem perdida do sensor.");
    });
  }
});

const onxrloaded = () => {
  XR8.XrController.configure({
    imageTargetData: [
      {
        name: '20_Element_Fire',
        imagePath: './20_Element_Fire_original.png', 
        metadata: './20_Element_Fire.json'          
      }
    ]
  });

  XR8.XrController.configure({imageTargets: ['20_Element_Fire']});
  console.log("🎯 Scanner ativado para arquivos da raiz!");
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);