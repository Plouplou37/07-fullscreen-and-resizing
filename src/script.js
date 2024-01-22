import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

window.addEventListener('resize', () => {
    console.log('resize')
    //update sizes for when user resize the window
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

// add double-click listner to resize in full screen. Can be useful for a game for example
window.addEventListener('dblclick', () => {
    console.log('double click');
    const fullscreenElement = document.fullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            console.log('Go to FullScreen');
            canvas.requestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            console.log('Quit FullScreen');
            document.exitFullscreen();
        }
    }
});


renderer.setSize(sizes.width, sizes.height)
// 2 or less is ok
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()