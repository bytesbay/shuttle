import * as THREE from 'three';

const initRings = app => {

  const group = new THREE.Group();
  // group.rotation.x = 5 * Math.rad
  app.scene.add(group)

  for (let i = 0; i < 360; i += 0.2) {

    const num_of_asteroids = 10;
    
    for (let j = 0; j < num_of_asteroids; j++) {

      const size = (Math.random() * 1) + 0.2;

      const item = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
      );

      const plus_range = (2 * Math.random()) - 1;
      const plus_radius = (6 * Math.random()) - 3;

      item.position.setFromSphericalCoords(
        2900 + (j * 20) + plus_radius, 
        90 * Math.rad, 
        (i + plus_range) * Math.rad
      );
      item.position.y = (14 * Math.random()) - 7
      item.matrixAutoUpdate = false;

      item.rotation.set(
        (360 * Math.random()) * Math.rad,
        (360 * Math.random()) * Math.rad,
        (360 * Math.random()) * Math.rad
      );

      group.add(item);
      item.updateMatrix()
    }
  }

  console.log(group);
}

export { initRings }