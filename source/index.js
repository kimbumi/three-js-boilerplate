// This is the entry file
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import img from '../static/img.png';
import vertexGlsl from './shader/vertex.glsl'
import fragmentGlsl from './shader/fragment.glsl'


class App{
    constructor(){
        this.initialize()
        this.render()
        window.addEventListener('resize', () => {
            this.resize()
        })
    }
    initialize(){
        // create renderer and canvas
        this.renderer = new THREE.WebGLRenderer({antialias:true})
        document.body.appendChild( this.renderer.domElement )

        // create scene
        this.scene = new THREE.Scene();

        // create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth/window.innerHeight,
            0.1,
            100
        )
        this.camera.position.z = 3


        

        // create model
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.ShaderMaterial({
                vertexShader: vertexGlsl,
                fragmentShader: fragmentGlsl,
                uniforms:{
                    
                }
            })
        )

        // add to the scene
        this.scene.add(this.cube)
        this.scene.add(this.camera)

        // orbit control
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.control.enableDamping = true
    }
    // update animation
    update(){
        this.control.autoRotate = true
        this.control.update()
    }
    // render and update every frames
    render(){
        this.update()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.render(this.scene,this.camera)
        requestAnimationFrame(()=>{
            this.render()
        })
    }
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerHeight,window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
}

window.addEventListener('load',()=>{
    const app = new App()
})