import '../../asset/css/style.css'
import * as THREE from 'three'
// 导入轨迹控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 导入动画库
import gsap from 'gsap'

// import particles from '@/asset/textures/particles/diamond2.png'
// import particles2 from '@/asset/textures/particles/snow.png'

import * as dat from 'dat.gui'
console.log('Three', THREE)
const PI = Math.PI

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 40)

camera.position.set(0, 0, 30)

// 添加物体
// 纹理加载
const textureLoader = new THREE.TextureLoader()

// 创建物体

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial(
   {
    wireframe: true
   }
)

const redMaterial = new THREE.MeshBasicMaterial(
    {
     wireframe: true,
     color: '#ff0000'
    }
 )
const cubeArr = []

for (let i = 0; i < 5 ; i++) {
    for (let j = 0; j < 5 ; j++) {
        for (let k = 0; k < 5 ; k++) {
            const cube = new THREE.Mesh(cubeGeometry, material)
            cube.position.set(i, j, k)
            scene.add(cube)
            cubeArr.push(cube)
        }
    }
}

// 镭射光线
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector3()

// 监听鼠标位置
window.addEventListener(
    'click',
    (event) => {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 -1
        mouse.y = -(( event.clientY / window.innerHeight ) * 2 -1)
        raycaster.setFromCamera(mouse, camera)
        const result = raycaster.intersectObjects( cubeArr)
        result[0] && (result[0].object.material = redMaterial)
        console.log('mouseover',result,)
    }
)

// scene.add(sphere)


// 初始化渲染器

const renderer = new THREE.WebGLRenderer()

// 设置渲染尺寸
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的内容添加到body中
document.body.appendChild(renderer.domElement)

// 使用渲染器渲染
renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

// 添加坐标辅助器, 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

// 设置时间
const clock = new THREE.Clock()


function render() {
    const time = clock.getElapsedTime()
    controls.update()
    // points1.rotation.x = time * 0.3
    // cube.rotation.x += 0.01
    renderer.render(scene, camera)
    // 下一帧渲染调用
    requestAnimationFrame(render)
}

render()



// 监听画面变化，更新视图
window.addEventListener('resize', () => {
    // 重新计算画面
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新摄像机投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(window.innerWidth , window.innerHeight )
    // 设置像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})

// 引入gui
const gui = new dat.GUI()

