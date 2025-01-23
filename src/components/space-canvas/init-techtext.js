import * as THREE from 'three';
import bold_font from '@/assets/fonts/OpenSans-Bold.ttf';
import { Text } from 'troika-three-text'

const genText = (text, font, size, pos) => {
  const mesh = new Text();
  mesh.text = text;
  mesh.fontSize = size;
  mesh.font = font;
  mesh.position.copy(pos);
  mesh.anchorX = 'center'
  mesh.anchorY = 'middle'
  return mesh;
}

const initTechText = app => {

  const group = new THREE.Group();
  group.rotation.x = -90 * Math.rad;

  const text = genText(
    'Our technologies', 
    bold_font, 
    30, 
    new THREE.Vector3()
  );

  text._popped = true;
  text.rotation.y = 90 * Math.rad;

  const wrapper = new THREE.Group();
  wrapper.position.copy(
    (new THREE.Vector3())
      .setFromSphericalCoords(1050, 107 * Math.rad, 90 * Math.rad)
  );

  group.text = text;
  wrapper.add(text);
  group.add(wrapper);

  app.technologies_text = group;
  app.scene.add(group);

  app.on_render.push(() => {
    
  })
}

export { initTechText }