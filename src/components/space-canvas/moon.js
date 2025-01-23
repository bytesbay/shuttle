import * as THREE from 'three';
import { initProjects } from './init-projects';
import { initSats } from './init-sats';
import { generatePlanet } from './planet-generator';

const initMoon = app => {
  app.moon_object = new THREE.Group();
  app.moon_object._model = generatePlanet(150, 90, 90, 1);
  app.moon_object.add(app.moon_object._model);
  app.moon_object.position.setFromSphericalCoords(2800, 90 * Math.rad, 180 * Math.rad);
  app.scene.add(app.moon_object);

  // initSats(app, 10);
  initProjects(app);

  app.on_render.push(() => {
    // app.moon_object.sats.children.forEach(n => {
    //   n.rotation_wrapper.rotation.y += 0.002;
    // })
  })
}

export { initMoon }