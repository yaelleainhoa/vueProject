<template>
  <div id="none">
    <div id="NoResults"></div>
    <h2 class="text"> No results...<br> Please try another research</h2>
  </div>
</template>

<script>

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { onBeforeUnmount, ref } from 'vue';

export default {
  name: "NoResults",
  data() {
    return {
      scene: undefined,
      camera: undefined,
      renderer: undefined,
      container: undefined
    };
  },
  props: {
    containerId: {
      type: String,
      required: true
    }
  },
  setup() {
    const timer = ref(null);

    timer.value = setInterval(() => {
      renderScene();
    }, 10);

    onBeforeUnmount(() => {
      clearInterval(timer.value);
    });

    const renderScene = () => {
    };

    return {
      renderScene,
    };
  },
  mounted: 
  async function(){
    this.init();
    this.renderScene();
  },
  methods: {
    async init() {
      this.scene = new THREE.Scene();
      this.scene.background = null;
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputColorSpace = THREE.sRGBEncoding;
      this.container = document.getElementById(this.containerId);
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
      this.container.appendChild(this.renderer.domElement);
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.container.offsetWidth / this.container.offsetHeight,
        0.25,
        20
      );
      this.camera.position.set(-5, 5,5);
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.target.set(0, 0, 0);
      controls.addEventListener("change", this.renderScene); 
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(0, 1, 0);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);
      const lightpoint = new THREE.PointLight("#70ffc1", 1);
      lightpoint.position.set(0, 600, 1000);
      this.scene.add(lightpoint);

      const lightpoint2 = new THREE.PointLight("#ff4714", 1);
      lightpoint2.position.set(0, 100, -1000);
      this.scene.add(lightpoint2)

      var light = new THREE.HemisphereLight(0xf6e86d, 0x404040, 0.5);
      light.position.set(0, 1, 0);
      this.scene.add(light);


      const loader = new GLTFLoader();
      loader.crossOrigin = false;
      let me = this;
      let path = "/threeAssets/fridge.glb"

      loader.load(path,
      function(gltf){
        if(gltf){
          let object = gltf.scene;
          object.position.set(0,-1.5,0);
          object.scale.set(0.2,0.2,0.2);
          object.name = "fridge";
          me.scene.add(object);
          me.renderScene();
        }
        me.renderScene();
      })
      this.renderScene()
    },

    renderScene() {
      this.rotateObject();
      this.renderer.render(this.scene, this.camera);
    },

    rotateObject(){
      var SPEED = 0.0005;
      let object = this.scene.getObjectByName("fridge");
      if(object){
        object.rotation.y -= SPEED;
      }
    }

  }
};

</script>

<style scoped>

#none{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 10%;
}

#NoResults{
  width:500px;
  height: 30vh;
}

.text{
  text-align: center;
  top: 450px;
}

</style>