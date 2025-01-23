import * as THREE from 'three'
import bold_font from '@/assets/fonts/OpenSans-ExtraBold.ttf';
import regular_font from '@/assets/fonts/OpenSans-Regular.ttf';
import { Text } from 'troika-three-text'

const initTextPreview = app => {

  const group = new THREE.Group();
  const wrapper = new THREE.Group();
  wrapper.rotation.z = -90 * Math.rad

  const logo = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 2),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(require('@/assets/full-logo.png')),
      transparent: true,
    })
  )
  logo.position.z = -0.2;
  logo.position.y = 0.05;
  // app._bloomEffect.selection.add(logo)

  wrapper.add(logo);

  const addText = (text, font, size, pos) => {
    const mesh = new Text();
    mesh.anchorX = 'center'
    mesh.anchorY = 'middle'
    mesh.text = text;
    mesh.font = font;
    mesh.fontSize = size;
    mesh.position.copy(pos);
    wrapper.add(mesh);
  }

  // 'SHUTTLE'.split('').forEach((n, i) => {
  //   const edge = -0.8;
  //   const step = Math.abs(edge / 3);
  //   addText(
  //     n, 
  //     font_asset_bold, 
  //     0.2, 
  //     new THREE.Vector3(edge + (step * i), 0.15, 0)
  //   );
  // });

  addText(
    'We will', 
    bold_font, 
    0.3, 
    new THREE.Vector3(0, 0.15, 0)
  );

  addText(
    'get you to a stable orbit', 
    regular_font, 
    0.13, 
    new THREE.Vector3(0, -0.15, 0)
  );

  app.text_preview = group;
  group.add(wrapper);
  group.wrapper = wrapper;
  app.scene.add(group);
}

export { initTextPreview }