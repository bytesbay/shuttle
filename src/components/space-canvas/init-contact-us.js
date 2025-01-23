import * as THREE from 'three';
import { createButton } from './create-btn';
import { createText } from './create-text';

const initContactUs = app => {

  const div = new THREE.Group();
  const btn = createButton(app, 'Contact us', 100, () => {
    app.$root.modal_contact_opened = true;
  });
  div.add(btn)
  div.visible = false

  const az = 90 * Math.rad
  const ze = 65 * Math.rad
  div.scale.set(0, 0, 0)
  div.position.setFromSphericalCoords(151, az, ze)
  div.up = new THREE.Vector3(1, 0, 0)
  div.lookAt(
    (new THREE.Vector3())
      .setFromSphericalCoords(156, az, ze)
  );

  app.contact_us = div;
  app.moon_object._model.add(div);

  app.on_render.push(() => {

  })
}

export { initContactUs }