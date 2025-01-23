import * as THREE from 'three';
import BezierEasing from 'bezier-easing';

import { text_intro } from './steps/text-intro.step';
import { rotate_step } from './steps/rotate.step';
import { main_step } from './steps/main.step';
import { orbit_step } from './steps/orbit.step';
import { maneur_step } from './steps/maneur.step';

const steps = [
  text_intro,
  rotate_step,
  main_step,
  orbit_step,
  // maneur_step,
];

class StepsProcessor {
  steps = steps;

  constructor(app) {
    this.app = app;

    for (const i in this.steps) {
      this.steps[i].handler = this.steps[i].handler.bind(this);
      this.steps[i].index = i + 1;
    }

    this._last_step = null;
  }

  moveVector(
    vec,
    k, 
    dist_range,
    deg_az_range,
    deg_ze_range,
    vec_around,
    lookat_mesh,
  ) {

    const _vec = new THREE.Vector3();

    _vec.setFromSphericalCoords(
      k.fmap(dist_range[0], dist_range[1]),
      k.map(0, 1, deg_az_range[0], deg_az_range[1]) * Math.rad,
      k.map(0, 1, deg_ze_range[0], deg_ze_range[1]) * Math.rad,
    );
    vec.copy(_vec.add(vec_around));

    if(lookat_mesh) {
      k = 1;
      _vec.setFromSphericalCoords(
        k.fmap(dist_range[0], dist_range[1]),
        k.map(0, 1, deg_az_range[0], deg_az_range[1]) * Math.rad,
        k.map(0, 1, deg_ze_range[0], deg_ze_range[1]) * Math.rad,
      );
      lookat_mesh.lookAt(_vec.add(vec_around));
    }
  }

  moveCamera(
    k, 
    dist_range,
    deg_az_range,
    deg_ze_range,
    vec_around, 
    deg_z_range,
    smooth_k
  ) {
    // ease = BezierEasing(.07,.4,.07,.6)

    // const vec = new THREE.Vector3();
    const camera = this.app.camera;

    camera.setPos(
      k.fmap(dist_range[0], dist_range[1]),
      vec_around,
      k.fmap(deg_az_range[0], deg_az_range[1]) * Math.rad,
      k.fmap(deg_ze_range[0], deg_ze_range[1]) * Math.rad,
      k.fmap(deg_z_range[0], deg_z_range[1]) * Math.rad,
      smooth_k
    );
    // dist, pos, rot_az, rot_ze, rot_z, smooth = false
    // camera.jak.rotation.z = ;
    // camera.jak.rotation.y = ;

    // camera.jak.position.copy(vec_around);
  }

  tick(scroll_offset) {

    // get koef
    let k = scroll_offset.map(0, this.app.scroll_el.scrollHeight - document.body.clientHeight, 0, 1);

    if(k > 1) {
      k = 1;
    }

    if(k < 0) {
      k = 0;
    }

    // this.app.camera.setDist(k.map(0, 1, 10, 10));
    // const vec_from = (new THREE.Vector3())
    //   .setFromSphericalCoords(1300, 90 * Math.rad, 50 * Math.rad);
    // const vec_to = (new THREE.Vector3())
    //   .setFromSphericalCoords(230, 90 * Math.rad, 130 * Math.rad)
    //   .add(this.app.moon_object.position);
    // this.app.camera.jak.position.set(
    //   k.map(0, 1, vec_from.x, vec_to.x),
    //   k.map(0, 1, vec_from.y, vec_to.y),
    //   k.map(0, 1, vec_from.z, vec_to.z)
    // );

    // get step
    let step = this.steps.find(n => {
      if(k >= n.range_from && k < n.range_to) {
        return n;
      }
    });

    if(!step && k == 1) {
      step = steps[steps.length - 1];
    }

    // move main object & move camera
    if(step) {
      if(step.handler) {
        step.handler(step, k);
      }
    }
  }
}

export { StepsProcessor, steps } 