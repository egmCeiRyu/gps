// bundle.js — aguarda XR8 e JSON antes de configurar

function startAR(XR8) {
  fetch('./image-targets/20_Element_Fire.json')
    .then(r => {
      if (!r.ok) throw new Error('JSON 404 - verifique se está em image-targets/')
      return r.json()
    })
    .then(targetJson => {
      console.log('📄 JSON ok:', targetJson.name)

      XR8.XrController.configure({
        imageTargetData: [targetJson],
      })

      console.log('🎯 Configure ok!')
      document.getElementById('status').textContent = '🔍 Aponte para a imagem do fogo...'

      // Eventos do target
      const target = document.querySelector('a-named-image-target')
      const status = document.getElementById('status')

      if (!target) {
        console.error('a-named-image-target não encontrado no DOM')
        return
      }

      target.addEventListener('xrimagefound', () => {
        console.log('🎯 Imagem encontrada!')
        status.textContent = '🎯 Imagem encontrada!'
        status.className = 'found'
      })

      target.addEventListener('xrimagelost', () => {
        status.textContent = '🔍 Aponte para a imagem do fogo...'
        status.className = ''
      })
    })
    .catch(err => {
      console.error('🚨 Erro:', err)
      const s = document.getElementById('status')
      if (s) { s.textContent = '🚨 ' + err.message; s.className = 'error' }
    })
}

// Erro global do XR8
window.addEventListener('xrerror', (e) => {
  console.error('🚨 XR Error:', e.detail)
  const s = document.getElementById('status')
  if (s) { s.textContent = '🚨 XR: ' + (e.detail?.message || 'erro desconhecido'); s.className = 'error' }
})

// Aguarda o XR8 carregar — polling seguro como fallback
function waitForXR8(attempts) {
  if (attempts <= 0) {
    console.error('XR8 não carregou após timeout')
    const s = document.getElementById('status')
    if (s) { s.textContent = '🚨 Engine não carregou — verifique conexão'; s.className = 'error' }
    return
  }
  if (window.XR8 && window.XR8.XrController) {
    console.log('✅ XR8 disponível via polling')
    startAR(window.XR8)
  } else {
    setTimeout(() => waitForXR8(attempts - 1), 300)
  }
}

// Tenta via evento primeiro, polling como fallback
window.addEventListener('xrloaded', () => {
  console.log('✅ XR8 carregado via evento')
  startAR(window.XR8)
})

// Inicia polling após DOM pronto
document.addEventListener('DOMContentLoaded', () => {
  waitForXR8(30) // tenta por 9 segundos (30 x 300ms)
})