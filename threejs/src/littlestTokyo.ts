import {
  AnimationMixer,
  Clock,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer,
} from 'three'

import {
  RoomEnvironment,
  GLTFLoader,
  DRACOLoader,
  FirstPersonControls,
  PointerLockControls,
  FlyControls,
  // DRACOLoader,
} from 'three/addons'

const container = document.querySelector('#app')!

const clock = new Clock()

const renderer = new WebGLRenderer({ antialias: true })

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

container.appendChild(renderer.domElement)

const pmremGenerator = new PMREMGenerator(renderer)

const scene = new Scene()
scene.background = new Color(0xbfe3dd)

scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0).texture

const camera = new PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  100,
)
camera.position.set(0, 1.5, 10)

const controls = new FlyControls(camera, renderer.domElement)
controls.rollSpeed = 1
controls.movementSpeed = 5
// controls.target.set(0, 0.5, 0)
// controls.update()
// controls.enablePan = false
// controls.enableDamping = true

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

const loader = new GLTFLoader()
const draco = new DRACOLoader()
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader.setDRACOLoader(draco)

const gltf = await loader.loadAsync('/LittlestTokyo.glb')
const model = gltf.scene
model.position.set(1, 1, 0)
model.scale.set(0.01, 0.01, 0.01)
scene.add(model)

const mixer = new AnimationMixer(model)
mixer.clipAction(gltf.animations[0]!).play()

const light = new DirectionalLight(0xffffff, 5)
light.position.set(0, 2, -10)
scene.add(light)

const animate = () => {
  const delta = clock.getDelta()
  mixer.update(delta)
  controls.update(delta)

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
