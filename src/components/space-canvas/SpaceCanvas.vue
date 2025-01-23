<template>
  <div class="space-canvas">
    <div ref="canvas" class="canvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three';

import {
  EffectComposer, 
  EffectPass, 
  RenderPass,
  NoiseEffect,
  VignetteEffect,
  SMAAEffect,
  GodRaysEffect,
  SelectiveBloomEffect,
  BlendFunction,
  Selection,
  KernelSize,
  SMAAPreset,
  EdgeDetectionMode,
} from 'postprocessing';

import { StepsProcessor } from './steps-processor';
import { StarsGenerator } from './stars-generator';
import { load } from './assets';

import { initStation } from './init-station';
import { initParallax } from './init-parallax';
import { initTextPreview } from './init-text-preview';
import { initCamera } from './camera';
import { initMoon } from './moon';
import { initEarth } from './earth';
import { initTechnologies } from './init-technologies';
import { initTracer } from './init-tracer';
import { initTechText } from './init-techtext';
import { initWhatWeDo } from './init-whatwedo';
import { initAgent } from './init-agent';
import { initContactUs } from './init-contact-us';

export default {
  data() {
    return {
      selected: null,
    }
  },


  methods: {

    initLight() {
      this.light = new THREE.DirectionalLight( 0xffffff, 1 );
      
      this.light.position.setFromSphericalCoords(4000, 90 * Math.rad, 155 * Math.rad)
      this.light.lookAt(new THREE.Vector3())

      this.scene.add(new THREE.AmbientLight(0xffffff, 0.1));
      this.scene.add(this.light);
    },

    initScene() {
      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
        alpha: false,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      this.clock = new THREE.Clock();

      const body = document.body;
      if(this.$is_mobile) {
        body.addEventListener('touchstart', this.onClickStart)
        // body.addEventListener('touchend', this.onClickEnd)
        body.addEventListener('touchmove', this.onMouseMove)
      } else {
        body.addEventListener('mousedown', this.onClickStart)
        // body.addEventListener('mouseup', this.onClickEnd)
        body.addEventListener('mousemove', this.onMouseMove)
      }
      body.addEventListener('click', this.onClick)

      this.$refs['canvas'].appendChild( this.renderer.domElement );

      // create stars
      // StarsGenerator.generate(this.scene);

      window.addEventListener('resize', this.onResize)
      
    },

    getScroll() {
      return this.scroll_el.scrollTop;
    },

    initPostprocessing() {
      this.composer = new EffectComposer(this.renderer, {
        frameBufferType: THREE.HalfFloatType
      });
      
      const smaaEffect = new SMAAEffect(
        this.assets.get("smaa-search"),
        this.assets.get("smaa-area"),
        SMAAPreset.HIGH,
			  EdgeDetectionMode.DEPTH
      );

      smaaEffect.edgeDetectionMaterial.setEdgeDetectionThreshold(0.05); 
      // smaaEffect.edgeDetectionMaterial.setPredicationMode(PredicationMode.DEPTH); 
      // smaaEffect.edgeDetectionMaterial.setPredicationThreshold(0.002); 
      // smaaEffect.edgeDetectionMaterial.setPredicationScale(1.0); 

      // const noiseEffect = new NoiseEffect({ premultiply: true });
      // const vignetteEffect = new VignetteEffect();

      const bloomEffect = new SelectiveBloomEffect(this.scene, this.camera, {
        blendFunction: BlendFunction.SCREEN,
        kernelSize: KernelSize.LARGE,
        luminanceThreshold: 0.12,
        luminanceSmoothing: 0.37,
        height: 480
      })

      bloomEffect.blurPass.scale = 1;
			bloomEffect.intensity = 2.27;
      
      this._bloomEffect = bloomEffect;

      const renderPass = new RenderPass(this.scene, this.camera);
      const effectPass = new EffectPass(
        this.camera,
        // noiseEffect,
        // vignetteEffect,
        // smaaEffect,
        bloomEffect,
      );

      // effectPass.renderToScreen = true;
      // noiseEffect.blendMode.opacity.value = 0.75;

      this.composer.addPass(renderPass);
      this.composer.addPass(effectPass);
    },

    onAnimate() {
      requestAnimationFrame(this.onAnimate);

      this.current_scroll += (this.getScroll() - this.current_scroll) * 0.05;
      if(Math.abs(this.getScroll() - this.current_scroll) > 0.00001) {
        this.steps_proc.tick(this.current_scroll);
      }

      this.on_render.forEach(n => n())

      this.renderer.render(this.scene, this.camera);
      this.composer.render(this.clock.getDelta())
    },

    initScroll() {
      this.current_scroll = this.getScroll();
      this.steps_proc = new StepsProcessor(this);
      window.addEventListener('scroll', this.onScroll);
    },

    onClick(event) {
      this.onEvent(event, 'onClick')
    },
    
    onClickStart(event) {
      this.onEvent(event, 'onClickStart')
    },

    onClickEnd(event) {
      this.onEvent(event, 'onClickEnd')
    },

    onMouseMove(event) {
      if(this.onEvent(event)) {
        document.body.classList.add('cursor-pointer');
      } else {
        document.body.classList.remove('cursor-pointer');
      }
    },

    onEvent(event, event_name) {

      if(this.$root.isAnyOverlayOpened) {
        return false;
      }

      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();

      const coord_x = event.clientX || event.touches[0].clientX;
      const coord_y = event.clientY || event.touches[0].clientY;

      mouse.x = (coord_x / this.renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (coord_y / this.renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      var intersects = raycaster.intersectObjects(this.interactables);
      
      if(event_name) {
        intersects.forEach(n => {
          if(n.object[event_name]) {
            n.object[event_name](event);
          }
        });
      } else {
        return !!intersects.find(n => n.object.cursor_pointer);
      }

    },

    init(assets) {

      this.assets = assets;
      
      console.log('Init scene...');
      this.initScene();
      initCamera(this);
      this.initPostprocessing();
      this.initLight();

      console.log('Init agent...');
      initAgent(this);

      console.log('Init earth...');
      initEarth(this);

      console.log('Init moon...');
      initMoon(this);
      
      console.log('Init intro...');
      initTextPreview(this);

      console.log('Init technologies...');
      initTechnologies(this);

      console.log('Init contact us...');
      initContactUs(this);

      console.log('Init tracer...');
      initTracer(this, [
        ...initWhatWeDo(this),
      ]);

      console.log('Init tech text...');
      initTechText(this);

      console.log('Init finished!');
      this.initScroll();
      initParallax(this);
      this.steps_proc.tick(this.getScroll());

      this.onAnimate();
    },

    // onScroll(e) {
    //   this.current_scroll = window.scrollY;
    // },

    onResize() {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.composer.setSize(window.innerWidth, window.innerHeight);
    },
  },

  mounted() {

    this.scroll_el = document.querySelector('#scroll_elem');

    load()
      .then(assets => this.init(assets))
      .finally(() => this.$emit('load'));
  },

  created() {
    this.on_destroy = [];
    this.on_render = [];
    this.interactables = [];
    this.bloomed_objects = [];
  },

  destroyed() {

    this.on_destroy.forEach(n => n())

    this.destroyParallax();
  },
}
</script>

<style lang="scss" scoped>

.space-canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  user-select: none;
}

</style>