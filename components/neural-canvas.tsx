'use client'

import { useEffect, useRef } from 'react'

const LINK_DISTANCE = 3.6

export function NeuralCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let cancelled = false
    let dispose = () => {}

    import('three').then((THREE) => {
      if (cancelled) return

      let renderer: import('three').WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      } catch {
        return
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      mount.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
      camera.position.z = 15

      const network = new THREE.Group()
      scene.add(network)

      const nodeCount = window.innerWidth < 768 ? 70 : 140
      const nodes: import('three').Vector3[] = []
      const nodePositions = new Float32Array(nodeCount * 3)
      for (let i = 0; i < nodeCount; i += 1) {
        const node = new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12,
        )
        nodes.push(node)
        node.toArray(nodePositions, i * 3)
      }

      const nodeGeometry = new THREE.BufferGeometry()
      nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
      const nodeMaterial = new THREE.PointsMaterial({
        color: 0x00e5ff,
        size: 0.11,
        transparent: true,
        opacity: 0.9,
      })
      network.add(new THREE.Points(nodeGeometry, nodeMaterial))

      const linkPositions: number[] = []
      for (let a = 0; a < nodeCount; a += 1) {
        for (let b = a + 1; b < nodeCount; b += 1) {
          if (nodes[a].distanceTo(nodes[b]) < LINK_DISTANCE) {
            linkPositions.push(...nodes[a].toArray(), ...nodes[b].toArray())
          }
        }
      }
      const linkGeometry = new THREE.BufferGeometry()
      linkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3))
      const linkMaterial = new THREE.LineBasicMaterial({
        color: 0x305eff,
        transparent: true,
        opacity: 0.32,
      })
      network.add(new THREE.LineSegments(linkGeometry, linkMaterial))

      const coreSource = new THREE.IcosahedronGeometry(4.4, 1)
      const coreGeometry = new THREE.WireframeGeometry(coreSource)
      const coreMaterial = new THREE.LineBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.14,
      })
      const core = new THREE.LineSegments(coreGeometry, coreMaterial)
      core.position.set(7, 0, -4)
      scene.add(core)

      const pointer = { x: 0, y: 0 }
      const onPointerMove = (event: PointerEvent) => {
        pointer.x = event.clientX / window.innerWidth - 0.5
        pointer.y = event.clientY / window.innerHeight - 0.5
      }

      const resize = () => {
        const { clientWidth, clientHeight } = mount
        if (!clientWidth || !clientHeight) return
        renderer.setSize(clientWidth, clientHeight, false)
        camera.aspect = clientWidth / clientHeight
        camera.updateProjectionMatrix()
        renderer.render(scene, camera)
      }

      let frame = 0
      let running = false
      const render = () => {
        network.rotation.y += 0.0009
        network.rotation.x += (pointer.y * 0.25 - network.rotation.x) * 0.03
        network.position.x += (pointer.x * -1.2 - network.position.x) * 0.03
        core.rotation.x += 0.0016
        core.rotation.y += 0.0022
        renderer.render(scene, camera)
        frame = requestAnimationFrame(render)
      }
      const start = () => {
        if (running || reduced) return
        running = true
        frame = requestAnimationFrame(render)
      }
      const stop = () => {
        running = false
        cancelAnimationFrame(frame)
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(mount)
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      })
      visibilityObserver.observe(mount)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      resize()

      dispose = () => {
        stop()
        resizeObserver.disconnect()
        visibilityObserver.disconnect()
        window.removeEventListener('pointermove', onPointerMove)
        nodeGeometry.dispose()
        nodeMaterial.dispose()
        linkGeometry.dispose()
        linkMaterial.dispose()
        coreSource.dispose()
        coreGeometry.dispose()
        coreMaterial.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    })

    return () => {
      cancelled = true
      dispose()
    }
  }, [])

  return <div className="hero__canvas" ref={mountRef} aria-hidden="true" data-parallax="10" />
}
