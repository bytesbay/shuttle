import * as THREE from 'three';
import { genRing } from './items/ring.item';
import { createText } from './create-text';
import bold_font from '@/assets/fonts/OpenSans-Bold.ttf';
import code_font from '@/assets/fonts/FiraMono-Regular.ttf';
import { Text } from 'troika-three-text'


const genPlate = (width, height, radius) => {

  const wrapper = new THREE.Group();

  const shape = new THREE.Shape();
  shape.moveTo( 0, radius );
  shape.lineTo( 0, height - radius );
  shape.quadraticCurveTo( 0, height, radius, height );
  shape.lineTo( width - radius, height) ;
  shape.quadraticCurveTo( width, height, width, height - radius );
  shape.lineTo( width, radius );
  shape.quadraticCurveTo( width, 0, width - radius, 0 );
  shape.lineTo( radius, 0 );
  shape.quadraticCurveTo( 0, 0, 0, radius );
  const mesh = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
    })
  );
  mesh.position.x = -width/2;
  mesh.position.y = -height/2;
  wrapper.add(mesh);
  wrapper._model = mesh;

  return wrapper;
}

const genNode = (app, text, pos, height, textarea) => {

  const mesh = new Text()
  mesh.text = text
  mesh.fontSize = 18
  mesh.font = bold_font
  mesh.color = 0xFFFFFF
  mesh.anchorX = 'center'
  mesh.position.copy(pos);

  const base_rotator = new THREE.Group();
  base_rotator.add(mesh);

  const plate = (() => {
    const width = 200;
    const group = new THREE.Group();
    const plate = genPlate(width, height, 10);
    plate.position.y = -((height/2) + 30);
    plate._model.material.opacity = 0;
    group._model = plate._model;

    const desc = (() => {
      const text = new Text();
      text.fontSize = 8
      text.font = code_font;
      text.text = textarea;
      text.color = 0x000000
      text.lineHeight = 1.5;
      text.position.set(-((width/2) - 10), -35, 1)
      text.material.opacity = 0;
      return text;
    })();
    // new THREE.Vector3(, -( + (i * (font_size * 2))), 1),
    group.add(desc);
    group.add(plate);
    return group;
  })();
  plate._is_popped = false;
  
  // const ring = genRing(app, 2);
  // ring.position.z = 1;
  // base_rotator.add(ring);
  base_rotator.add(plate);


  const rotator = new THREE.Group();
  rotator.add(base_rotator);

  const wrapper = new THREE.Group();
  wrapper._rotator = rotator;
  wrapper._base_rotator = base_rotator;
  wrapper._text = mesh;
  wrapper._plate = plate;
  wrapper.add(rotator);

  wrapper._base_rotator.rotation.set(0, 0, -90 * Math.rad);

  return wrapper;
}

const initWhatWeDo = app => {

  const text1 = genNode(
    app,
    'WEB-SERVICES', 
    new THREE.Vector3(0, 0, 0),
    84,
    [
      '— Corporate sites',
      '— Complex web services',
      'and integrations',
      '— Highly loaded projects',
      '— Promo sites',
      '— Chat bots',
    ].join('\n')
  );

  const text2 = genNode(
    app,
    'MOBILE', 
    new THREE.Vector3(0, 0, 0),
    60,
    [
      '— Mobile applications for iOS',
      'and Android',
      '— VR applications',
      '— Support of mobile applications',
    ].join('\n')
  );

  const text3 = genNode(
    app,
    'BLOCKCHAIN', 
    new THREE.Vector3(0, 0, 0),
    60,
    [
      '— Projects based on Ethereum',
      '— Decentralized Finance (DeFi)',
      '— Non-Fungible Tokens (NFT)',
      '— Consulting',
    ].join('\n')
  );

  // app.on_render.push(() => {
    
  // })

  const arr = [
    {
      item: text1,
      k: 0.4,
      step: 'main',
    },
    {
      item: text2,
      k: 0.6,
      step: 'main',
    },
    {
      item: text3,
      k: 0.8,
      step: 'main',
    },
  ];

  app.what_we_do = arr;

  return arr;
}

export { initWhatWeDo }