// bundle.js — configure ANTES de iniciar o engine

window.addEventListener('xrloaded', () => {
  console.log('✅ XR8 carregado')

  fetch('./image-targets/20_Element_Fire.json')
    .then(r => {
      if (!r.ok) throw new Error('JSON não encontrado (' + r.status + ')')
      return r.json()
    })
    .then(targetJson => {
      console.log('📄 JSON ok:', targetJson.name)

      // 1. Configure PRIMEIRO — antes de qualquer coisa
      XR8.XrController.configure({
        imageTargetData: [targetJson],
      })
      console.log('🎯 Configure ok!')

      // 2. Agora inicia o engine com xrweb
      XR8.addCameraPipelineModule(XRExtras.Loading.pipelineModule())
      XR8.addCameraPipelineModule(XRExtras.RuntimeError.pipelineModule())

      // 3. Inicia a cena A-Frame
      const scene = document.querySelector('a-scene')
      scene.setAttribute('xrweb', '')

      // 4. Eventos
      const status = document.getElementById('status')
      const target = document.querySelector('a-named-image-target')

      status.textContent = '🔍 Aponte para a imagem do fogo...'

      target.addEventListener('xrimagefound', () => {
        console.log('🎯 Encontrou!')
        status.textContent = '🎯 Imagem encontrada!'
        status.className = 'found'
      })

      target.addEventListener('xrimagelost', () => {
        status.textContent = '🔍 Aponte para a imagem do fogo...'
        status.className = ''
      })
    })
    .catch(err => {
      console.error('🚨', err)
      const s = document.getElementById('status')
      s.textContent = '🚨 ' + err.message
      s.className = 'error'
    })
})

window.addEventListener('xrerror', (e) => {
  console.error('🚨 XR Error:', e.detail)
  const s = document.getElementById('status')
  s.textContent = '🚨 ' + (e.detail?.message || 'erro desconhecido')
  s.className = 'error'
})