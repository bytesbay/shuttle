import * as THREE from 'three';
import BezierEasing from 'bezier-easing';
import { animateSprites } from './sprites';
import { animateSpritesText } from './text-sprites';
import { toggleAllWhatWeDo } from './animate-whatwedo';
import { animateAgentAppear } from './animate-agent-appear';
import { agentLookAt } from './agent-lookat';

const rotate_step = {
  range_from: 0.05,
  range_to: 0.3,

  handler(ctx, k) {

    const normalized_k = k.map(ctx.range_from, ctx.range_to, 0, 1);

    // move text and rotate
    const vec1 = new THREE.Vector3();
    this.moveVector(
      vec1,
      1, 
      [0, 1600], 
      [0, 90], 
      [0, 69.7], 
      new THREE.Vector3()
    );
    const static_text_look_at_vec = new THREE.Vector3();
    this.moveVector(
      static_text_look_at_vec,
      1, 
      [0, 4], 
      [0, 90], 
      [0, 75], 
      vec1
    );
    this.moveVector(
      this.app.text_preview.position,
      1, 
      [0, 1600], 
      [0, 90], 
      [0, 69.7], 
      new THREE.Vector3()
    );
    this.app.text_preview.lookAt(static_text_look_at_vec);
    

    this.moveVector(
      this.app.text_preview.position,
      k.map(ctx.range_from, ctx.range_to, 0, 1), 
      [1600, 1600], 
      [90, 90], 
      [69.7, 69.7], 
      new THREE.Vector3()
    );

    // move lookat vector around camera
    const vec = new THREE.Vector3();
    this.moveVector(
      vec,
      normalized_k, 
      [1600, 1600], 
      [90, 90], 
      [69.7, 70], 
      new THREE.Vector3(),
    );
    
    this.moveCamera(
      normalized_k, 
      [4, 4], 
      [90, 90], 
      [75, 45], 
      vec,
      [-90, -90],
      0.05,
    );

    const _vec = new THREE.Vector3()
    this.moveVector(
      _vec,
      1, 
      [1600, 1600], 
      [0, 90], 
      [0, 70], 
      new THREE.Vector3()
    );

    const __vec = new THREE.Vector3()
    moveFromToDirect({
      vec: __vec,
      k: normalized_k,
      from: (new THREE.Vector3())
        .setFromSphericalCoords(1612.5, 90 * Math.rad, 69.5 * Math.rad),
      to: (new THREE.Vector3())
        .setFromSphericalCoords(1600, 90 * Math.rad, 70 * Math.rad),
    })

    this.app.agent.setPos(__vec, 0.05);

    // text smooth dissappear
    const _k = (k.map(0, ctx.range_from + 0.05, 0, 1));
    const text_wrapper = this.app.text_preview.wrapper;
    let __k = _k.map(0, 1, 1, 0)
    __k = __k > 0 ? __k : 0;
    text_wrapper.scale.x = __k;
    text_wrapper.scale.y = __k;
    text_wrapper.position.z = _k.map(0, 1, 0, -1);
    text_wrapper.children.forEach(n => {
      n.material.opacity = __k;
    });

    // this.app.agent._shuttle.rotation.z = 0 * Math.rad

    animateSprites(this.app, normalized_k);
    animateSpritesText(this.app, normalized_k);
    toggleAllWhatWeDo(this.app, false);
    // animateAgentAppear(false, this.app);

    this.app.text_preview.visible = true;
    this.app.technologies.visible = true;

    agentLookAt(this.app);
  },
};

export { rotate_step }