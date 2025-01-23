import * as THREE from 'three';
import { initAgentSat } from './init-agent-sat';
import Anime from 'animejs';

const initAgent = app => {
  const agent = new THREE.Group();
  app.agent = agent

  agent.setPos = function(pos, smooth_k) {
    this._trans.pos = pos;
    this._trans.smooth_k = smooth_k;
  }
  agent._trans = {};

  const del = 1;

  const gltf = app.assets.get('shuttle-model');
  const model = gltf.scene;
  model.gltf = gltf;
  model.scale.set(1/del, 1/del, 1/del);

  const mixer = new THREE.AnimationMixer(model);
  gltf.animations.forEach(clip => {
    mixer.clipAction(clip).play();
  });
  model.anim_mixer = mixer;

  const rotator = new THREE.Group();
  rotator.add(model);

  const clicker = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.1, 0.3),
    new THREE.MeshBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0
    }),
  );

  app.interactables.push(clicker)

  // model.traverse(n => {
  //   if(n.isMesh) {
  //     n.castShadow = true; //default is false
  //     n.receiveShadow = false; //default
  //   }
  // })

  app.agent._shuttle = model;
  app.agent._clicker = clicker;
  app.agent._rotator = rotator;
  app.agent.add(rotator);
  model.add(clicker)
  app.scene.add(app.agent);
  agent.position.copy(
    (new THREE.Vector3())
      .setFromSphericalCoords(1612.5, 90 * Math.rad, 69.5 * Math.rad)
  );
  
  // initAgentSat(app);

  app.agent._shuttle.rotation.z = 90 * Math.rad

  if(app.$is_mobile) {

    const camera = app.camera;

    const preventScroll = e => {

      e.preventDefault();

    }

    const onTouchMove = e => {

      e.preventDefault();
      e.stopPropagation();

      app.mouse_deviation = {
        az: (((window.innerHeight / 2) - e.touches[0].clientY) / 500),
        ze: (((window.innerWidth / 2) - e.touches[0].clientX) / 500),
      };
    }

    const onTouchEnd = e => {
      e.preventDefault();

      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)

      // if(camera._anim) {
      //   camera._anim.remove(camera.position)
      // }

      // camera._anim = Anime({
      //   targets: camera.position,
      //   z: camera._past_post.z,
      //   duration: 500,
      //   easing: 'spring(1, 80, 10, 0)',
      // })

      // camera._hard_dist = false;

      app.scroll_el.removeEventListener('touchmove', preventScroll)

      app.mouse_deviation = {
        az: 0,
        ze: 0,
      };
    }

    clicker.onClickStart = e => {

      e.preventDefault();
      e.stopPropagation();

      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onTouchEnd)
      window.addEventListener('touchcancel', onTouchEnd)

      app.scroll_el.addEventListener('touchmove', preventScroll)

      // camera._hard_dist = true;
      camera._past_post = camera.position;

      // if(camera._anim) {
      //   camera._anim.remove(camera.position)
      // }

      // camera._anim = Anime({
      //   targets: camera.position,
      //   z: 2,
      //   duration: 500,
      //   easing: 'spring(1, 80, 10, 0)',
      // })
    }
  }

  app.on_render.push(() => {
    // this.current_scroll += (this.getScroll() - this.current_scroll) * 0.05;

    const sk = agent._trans.smooth_k;

    if(agent._trans.pos) {
      agent.position.x += (agent._trans.pos.x - agent.position.x) * sk;
      agent.position.y += (agent._trans.pos.y - agent.position.y) * sk;
      agent.position.z += (agent._trans.pos.z - agent.position.z) * sk;
    }
    
  })
}

export { initAgent }