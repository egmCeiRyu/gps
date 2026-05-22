// bundle.js

const onxrloaded = () => {
  console.log('✅ XR8 carregado')

  // Carrega o JSON e configura o image target
  fetch('./image-targets/20_Element_Fire.json')
    .then(r => r.json())
    .then(targetJson => {
      console.log('📄 JSON carregado:', targetJson.name)

      XR8.XrController.configure({
        imageTargetData: [targetJson],
      })

      console.log('🎯 Image target configurado!')
      document.getElementById('status').textContent = '🔍 Aponte para a imagem do fogo...'
    })
    .catch(err => {
      console.error('🚨 Erro ao carregar JSON:', err)
      const s = document.getElementById('status')
      s.textContent = '🚨 Erro: ' + err.message
      s.classList.add('error')
    })

  // Eventos do target
  const target = document.querySelector('a-named-image-target')
  const status = document.getElementById('status')

  target.addEventListener('xrimagefound', (e) => {
    console.log('🎯 Imagem encontrada!')
    status.textContent = '🎯 Imagem encontrada!'
    status.classList.add('found')
  })

  target.addEventListener('xrimagelost', () => {
    console.log('👁️ Imagem perdida')
    status.textContent = '🔍 Aponte para a imagem do fogo...'
    status.classList.remove('found')
  })

  window.addEventListener('xrerror', (e) => {
    console.error('🚨 XR Error:', e.detail)
    status.textContent = '🚨 XR Erro: ' + (e.detail?.message || 'desconhecido')
    status.classList.add('error')
  })
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)