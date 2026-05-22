// bundle.js — Image Target com 8th Wall engine-binary (sem A-Frame, sem runtime local)

const imageTargetData = null  // será carregado via fetch

// Pipeline module que detecta a imagem
const imageTargetModule = {
  name: 'image-target-module',

  onStart: ({canvas}) => {
    console.log('✅ Engine iniciado')
    updateStatus('🔍 Aponte para a imagem do fogo...')
  },

  onImageFound: (e) => {
    console.log('🎯 Imagem encontrada!', e.name)
    updateStatus('🎯 Imagem encontrada!', 'found')

    // Aqui você pode criar elementos 3D sobre a imagem
    // e.detail.position, e.detail.rotation, e.detail.scale
    // estão disponíveis para posicionar objetos
  },

  onImageUpdated: (e) => {
    // chamado a cada frame enquanto a imagem está visível
  },

  onImageLost: (e) => {
    console.log('👁️ Imagem perdida')
    updateStatus('🔍 Aponte para a imagem do fogo...')
  },
}

function updateStatus(msg, cls) {
  const el = document.getElementById('status')
  if (!el) return
  el.textContent = msg
  el.className = cls || ''
}

// Carrega o JSON do image target via fetch e inicia o engine
async function loadAndStart() {
  try {
    updateStatus('⏳ Carregando image target...')

    const response = await fetch('./image-targets/20_Element_Fire.json')
    if (!response.ok) throw new Error('JSON não encontrado: ' + response.status)
    const targetJson = await response.json()

    console.log('📄 JSON carregado:', targetJson.name)

    const onxrloaded = () => {
      console.log('✅ XR8 carregado')

      XR8.XrController.configure({
        imageTargetData: [targetJson],
      })

      XR8.addCameraPipelineModule(LandingPage.pipelineModule())
      XR8.addCameraPipelineModule(imageTargetModule)

      XR8.run({
        canvas: document.getElementById('camerafeed') || createCanvas(),
      })

      updateStatus('🔍 Aponte para a imagem do fogo...')
    }

    window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)

  } catch (err) {
    console.error('🚨 Erro:', err)
    updateStatus('🚨 Erro: ' + err.message, 'error')
  }
}

function createCanvas() {
  const canvas = document.createElement('canvas')
  canvas.id = 'camerafeed'
  document.getElementById('canvas-container').appendChild(canvas)
  return canvas
}

window.addEventListener('xrerror', (e) => {
  console.error('🚨 XR Error:', e.detail)
  updateStatus('🚨 XR Erro: ' + (e.detail?.message || 'desconhecido'), 'error')
})

// Inicia quando a página carregar
window.addEventListener('load', loadAndStart)