// bundle.js — Ajustado para buscar tudo na raiz sem dar nó!

window.addEventListener('xrloaded', () => {
  console.log('✅ XR8 carregado')

  // Buscando o arquivo corrigido direto na raiz
  fetch('./20_Element_Fire.json')
    .then(r => {
      if (!r.ok) throw new Error('JSON não encontrado (' + r.status + ')')
      return r.json()
    })
    .then(targetJson => {
      console.log('📄 JSON ok:', targetJson.name)

      // 1. Configura a engine com os metadados do alvo
      XR8.XrController.configure({
        imageTargetData: [targetJson],
      })

      // 🔥 CORREÇÃO OBRIGATÓRIA: Liga o scanner em tempo real para processar este alvo!
      XR8.XrController.configure({imageTargets: ['20_Element_Fire']})
      console.log('🎯 Configure ok!')

      // 2. Inicia os módulos visuais do engine
      XR8.addCameraPipelineModule(XRExtras.Loading.pipelineModule())
      XR8.addCameraPipelineModule(XRExtras.RuntimeError.pipelineModule())

      // 3. Ativa o motor xrweb na cena do A-Frame
      const scene = document.querySelector('a-scene')
      scene.setAttribute('xrweb', 'local-tracking: true;')

      // 4. Mapeamento dos Eventos
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