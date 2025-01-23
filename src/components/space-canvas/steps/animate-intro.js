import Anime from 'animejs';
import * as THREE from 'three';

export const animateContactAppear = (app, k) => {

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
  const _k = k.map(0, 1.5, 0, 1);
  const text_wrapper = this.app.text_preview.wrapper;
  text_wrapper.scale.x = _k.map(0, 1, 1, 0.5);
  text_wrapper.scale.y = _k.map(0, 1, 1, 0.5);
  text_wrapper.position.z = _k.map(0, 1, 0, -1);
  text_wrapper.children.forEach(n => {
    n.material.opacity = _k.map(0, 1, 1, 0);
  });


}