import * as THREE from 'three';
import { genRing } from './items/ring.item';

const genPaperShape = (height, width, radius) => {
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
  return shape
}

const genItem = (name, link, logo, preview) => {
  const group = new THREE.Group();
  
  const _preview = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(70, 30, 10),
    new THREE.MeshBasicMaterial({
      // color: 0xffffff,
      map: new THREE.TextureLoader().load(preview),
    })
  );
  _preview.position.x = -35
  _preview.position.y = -15
  _preview.rotation.z = -90 * Math.rad

  const _logo = new THREE.Mesh(
    new THREE.ShapeGeometry(genPaperShape(20, 20, 5)),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(logo),
    })
  );
  _logo.position.z = 0.5

  group.add(_logo)
  group.add(_preview)

  return group;
}

const initPortfolio = app => {

  // const item1 = genItem(
  //   'Ridny Krai', 
  //   'https://ua.ridnykrai.com',
  //   'https://www.freelogodesign.org/Content/img/logo-samples/flooop.png',
  //   require('@/assets/ridnykrai.jpg')
  // );

  const arr = [
    {
      item: genRing(app, 3),
      k: 0.3,
      step: 'maneur',
    },
    {
      item: genRing(app, 2),
      k: 0.5,
      step: 'maneur',
    },
    {
      item: genRing(app, 5),
      k: 0.7,
      step: 'maneur',
    },
  ];

  // for (let i = 0; i < 40; i++) {
  //   arr.push({
  //     item: genRing(app, 2),
  //     k: 0.1 + (i * 0.02),
  //     step: 'maneur',
  //   },);
  // }

  app.protfolio = arr;

  return arr;
}

export { initPortfolio }