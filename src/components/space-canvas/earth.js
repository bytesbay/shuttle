import * as THREE from 'three';
import { initRings } from './init-rings';
import { generatePlanet } from './planet-generator';

const initEarth = app => {
  app.earth_object = new THREE.Group();
  const light = new THREE.PointLight( 0xffffff, 0.7, 6000 );

  const model = generatePlanet(1000, 90, 90, 2);
  app.earth_object.add(model);
  app.earth_object._model = model;

  app.earth_object.add(light);
  app.scene.add(app.earth_object);

  app.on_render.push(() => {
    app.earth_object._model.rotation.y -= 0.0001;
  })

  // initRings(app);
}

export { initEarth }