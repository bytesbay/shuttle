import * as THREE from 'three';
import BezierEasing from 'bezier-easing';
import { animateSprites } from './sprites';
import { animateSpritesText } from './text-sprites';
import { animateContactAppear } from './animate-contact-appear';
import { animateWhatWeDo, toggleAllWhatWeDo } from './animate-whatwedo'

const text_intro = {
  range_from: 0,
  range_to: 0.05,

  handler(ctx, k) {

    // dummy vector to lookat
    const vec = new THREE.Vector3();
    this.moveVector(
      vec,
      1, 
      [0, 1600], 
      [0, 90], 
      [0, 69.7], 
      new THREE.Vector3()
    );

    // camera stay static
    this.moveCamera(
      1, 
      [0, 4], 
      [0, 90], 
      [0, 75], 
      vec,
      [-90, -90],
      0.05,
    );

    // move text and rotate
    const static_text_look_at_vec = new THREE.Vector3();
    this.moveVector(
      static_text_look_at_vec,
      1, 
      [0, 4], 
      [0, 90], 
      [0, 75], 
      vec
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


    // text smooth dissappear
    const _k = k.map(ctx.range_from, ctx.range_to + 0.05, 0, 1);
    const text_wrapper = this.app.text_preview.wrapper;
    let __k = _k.map(0, 1, 1, 0)
    __k = __k > 0 ? __k : 0;
    text_wrapper.visible = true;
    text_wrapper.scale.x = __k;
    text_wrapper.scale.y = __k;
    text_wrapper.position.z = _k.map(0, 1, 0, -1);
    text_wrapper.children.forEach(n => {
      n.material.opacity = __k;
    });

    animateSprites(this.app, 0);
    animateSpritesText(this.app, 0)
    animateContactAppear(this.app, 0)
    toggleAllWhatWeDo(this.app, false);

    this.app.technologies.visible = true;
  },
}

export { text_intro }