import * as THREE from 'three';
import { genPlate } from './create-plate';
import { genRing } from './items/ring.item';
import { projects } from './projects.data';
import bold_font from '@/assets/fonts/OpenSans-Bold.ttf';
import code_font from '@/assets/fonts/FiraMono-Regular.ttf';
import { Text } from 'troika-three-text'
import { createButton } from './create-btn';

const genTags = (app, item, jak) => {

  const tags = [];

  for (const i in item.techs) {
    const tech = item.techs[i]
    const tag = new THREE.Group();
    tag.rotation.z = -90 * Math.rad;
    
    const rand = () => {

      const getRand = (val, min, max, mmin, mmax) => {
        const num = Math.random() * val;

        if(num > min && num < max) {
          return getRand(val, min, max, mmin, mmax);
        }

        else if(num < mmin && num > mmax) {
          return getRand(val, min, max, mmin, mmax);
        }

        return num * Math.rad;
      }

      let ze = getRand(180, 50, 150, 45, 165);
      let az = Math.random() * (90 * Math.rad);

      tag.position.setFromSphericalCoords(
        60, 
        ze, 
        az
      );

      tags.forEach(n => {
        if(tag.position.distanceTo(n.position) < 15) {
          rand();
          return false
        }
      })
    }
    rand();

    const lookat_point = new THREE.Vector3(500, 0, 0);
    jak.add(lookat_point)

    tag.lookAt(lookat_point);
    const rotator = new THREE.Group()
    rotator.rotation.set(90 * Math.rad, -90 * Math.rad, 0);
    tag.add(rotator)
    
    const text = (() => {
      const text = new Text();
      text.fontSize = 5
      text.font = code_font;
      text.text = tech;
      text.color = 0x000000
      text.lineHeight = 1.5;
      text.anchorX = 'center';
      text.position.z = 1;
      return text;
    })();
    rotator.add(text);

    text.sync(() => {

      const width = (text.geometry.boundingBox.max.x * 2) + 6;
      const height = 6 + 2;

      const plate = genPlate(width, height, height/2);
      plate.position.y = (-height/2)
      rotator.add(plate);
    })

    jak.add(tag);
    tag.scale.set(0, 0, 0)
    tags.push(tag)
  }

  jak._tags = tags;
}

const genItem = (app, item) => {

  var bbox = null;

  const group = new THREE.Group();
  
  const model = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xFF2A75,
      wireframe: true,
    })
  );
  app._bloomEffect.selection.add(model)
  group._model = model;
  group.add(model);

  const front = new THREE.Group();
  front.rotation.z = -90 * Math.rad

  const plate = new THREE.Group();
  plate.position.z = 15;
  plate.scale.set(0, 0, 0)
  plate.add(front);
  group.add(plate);
  group._sprite = plate;
  
  const logo = new THREE.Group();
  const _logo = new THREE.Mesh(
    new THREE.CircleGeometry(20, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: new THREE.TextureLoader().load(item.img),
    })
  )
  logo.add(_logo);
  logo.position.z = 5;
  front.add(logo);

  const title = (() => {
    const text = new Text();
    text.fontSize = 8
    text.font = bold_font;
    text.text = item.name;
    text.color = 0x000000
    text.lineHeight = 1.5;
    text.maxWidth = 40;
    text.position.x = 0;
    text.position.y = -25;
    text.position.z = 1;
    text.anchorX = 'center';
    return text;
  })();
  front.add(title);

  title.sync(() => {
    const btn = createButton(app, 'Link', 40, () => {
      window.open(item.link, '_blank');
    })
    bbox = title.geometry.boundingBox.min;
    const btn_pos_y = -25 + bbox.y - 15;
    console.log(btn_pos_y);
    btn.position.y = btn_pos_y;
    btn.position.z = 3;
    front.add(btn)

    bbox = new THREE.Box3().setFromObject(btn).getSize();
    const height = -(btn_pos_y) + bbox.y + 20 + 20;
    console.log(-(btn_pos_y), bbox.y, 20, 20);
    const bg = genPlate(60, height + 10, 10);
    // bg.position.y = -10
    front.add(bg)

    front.position.x = (height / 2);
    bg.position.y = -(height / 4);
  });

  genTags(app, item, plate);

  return group;
}

const initProjects = app => {

  const moon = app.moon_object._model;
  const group = new THREE.Group();
  moon.add(group)

  projects.forEach((n, i) => {
    const item = genItem(app, n);

    const ze = 90 * Math.rad
    const az = -((i * (270 / projects.length)) * Math.rad)

    item.position.setFromSphericalCoords(149, ze, az)
    n.deg = Math.abs(az * (180/Math.PI));
    n.item = item;
    
    item.lookAt(
      (new THREE.Vector3()).setFromSphericalCoords(150, ze, az)
    )
    group.add(item);
  })

  app.projects = projects;
}

export { initProjects }