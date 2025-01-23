import * as THREE from 'three';
import { initContactUs } from './init-contact-us';

const initStation = app => {

  const div = new THREE.Group();

  const del = 5;

  const gltf = app.assets.get('station-model');
  const model = gltf.scene;
  model.traverse(n => {
    if(n.isMesh && n.name === 'Cylinder_5') {
      console.log('added');
      app._bloomEffect.selection.add(n)
    }
  })
  // const wrapper = new THREE.Group();
  // wrapper.rotation.x = 90 * Math.rad;
  // wrapper.add(model);
  model.gltf = gltf;
  model.scale.set(1/del, 1/del, 1/del);

  const lookat_vector = (new THREE.Vector3())
    .setFromSphericalCoords(2970, 90 * Math.rad, 163 * Math.rad);
    
  // const light = new THREE.PointLight( 0xffffff, 1.5, 2970 );

  div.add(model)
  div.position.setFromSphericalCoords(2970, 90 * Math.rad, 163.05 * Math.rad);
  div.lookAt(lookat_vector);

  div.rotation.z = -90 * Math.rad;

  model.position.x = -1;
  model.position.z = 2;
  model.position.y = -1;
  // model.add(light);
  // model.rotation.z = -90 * Math.rad

  div.model = model;
  app.station = div;
  app.scene.add(div);

  initContactUs(app);

  app.on_render.push(() => {
    model.rotation.y += 0.001;
  })

}

export { initStation }