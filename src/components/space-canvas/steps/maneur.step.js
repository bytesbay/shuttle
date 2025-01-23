import * as THREE from 'three';
import BezierEasing from 'bezier-easing';
import { animateCargo } from './cargo'
import { animateContactAppear } from './animate-contact-appear';

const maneur_step = {
  range_from: 0.95,
  range_to: 1,

  handler(ctx, k) {

    this.app.camera.rot_wrapper.rotation.z = -90 * Math.rad

    const vec_around_moon = (new THREE.Vector3())
      .setFromSphericalCoords(170, 90 * Math.rad, 160 * Math.rad);
    
    vec_around_moon.add(
      (new THREE.Vector3())
        .setFromSphericalCoords(2800, 90 * Math.rad, 160 * Math.rad)
    );

    const spherical_around_moon_from_earth = (new THREE.Spherical())
      .setFromVector3(vec_around_moon);

    this.moveVector(
      this.app.agent.position,
      k.map(ctx.range_from, ctx.range_to, 0, 1), 
      [spherical_around_moon_from_earth.radius, 2970], 
      [90, 90], 
      [spherical_around_moon_from_earth.theta * (180 / Math.PI), 163], 
      new THREE.Vector3(),
      this.app.agent._rotator,
    );

    this.moveCamera(
      k.map(ctx.range_from, ctx.range_to, 0, 1), 
      [0.8, 0.5], 
      [90, 90], 
      [70, 70], 
      this.app.agent.position
    );

    this.app.agent._shuttle.rotation.z = 90 * Math.rad

    // this.app.camera.fov = k.map(ctx.range_from, ctx.range_to, 50, 80);
    // this.app.camera.updateProjectionMatrix();

    // this.app.base_mouse_deviation = {
    //   az: 0,
    //   ze: -20 * Math.rad,
    // };

    animateCargo(k.map(ctx.range_from, ctx.range_to, 1, 0), this.app);
    animateContactAppear(this.app, k.map(ctx.range_from, ctx.range_to, 0, 1))
  },
};

export { maneur_step }