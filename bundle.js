(() => {
  var e = {
    574(e, a, t) {
      const r = () => {
        if (!XR8.XrController) {
          setTimeout(r, 100);
          return;
        }
        // Injeta as configurações do marcador na memória do motor
        XR8.XrController.configure({ imageTargetData: [t(43)] });
        console.log("🎯 Scanner ativado para o alvo: marker");
      };
      window.XR8 ? r() : window.addEventListener("xrloaded", r);
    },
    43(e) {
      "use strict";
      // Metadados oficiais gerados pelo seu marker.json
      e.exports = JSON.parse('{"type":"PLANAR","properties":{"top":0,"left":144,"width":941,"height":1254,"isRotated":false,"originalWidth":1254,"originalHeight":1254},"imagePath":"image-targets/marker_luminance.png","metadata":{"type":"PLANAR","properties":{"top":0,"left":144,"width":941,"height":1254,"isRotated":false,"originalWidth":1254,"originalHeight":1254},"imagePath":"image-targets/marker_luminance.png","metadata":null,"name":"marker","resources":{"originalImage":"marker_original.png","croppedImage":"marker_cropped.png","thumbnailImage":"marker_thumbnail.png","luminanceImage":"marker_luminance.png"},"created":1777364648883,"updated":1777366647349},"name":"marker","resources":{"originalImage":"marker_original.png","croppedImage":"marker_cropped.png","thumbnailImage":"marker_thumbnail.png","luminanceImage":"marker_luminance.png"},"created":1777364648883,"updated":1777367342718}');
    }
  },
  a = {};
  
  function t(r) {
    var n = a[r];
    if (void 0 !== n) return n.exports;
    var s = a[r] = { id: r, exports: {} };
    return e[r].call(s.exports, s, s.exports, t), s.exports;
  }
  
  // Inicializa o módulo core
  t(574);
})();