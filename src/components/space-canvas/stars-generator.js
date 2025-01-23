import * as THREE from 'three';

const StarsGenerator = {

  colors: [
    0xffffff,
    0xFF2A75,
    0xFFD416,
  ],

  generate(scene) {

    const amount = 2000;
    const radius = 9000;

    const group = new THREE.Group();

    for (let i = 0; i < amount; i++) {
      
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];

      const ze = Math.floor(Math.random() * 360);
      const az = Math.floor(Math.random() * 360);

      var size = 0;
      if(Math.random() < 0.1) {
        size = 8;
      }
      else if(Math.random() < 0.2) {
        size = 5;
      }
      else {
        size = 3;
      }

      const vec = new THREE.Vector3(0, 0, 0);
      vec.setFromSphericalCoords(radius, ze * Math.rad, az * Math.rad);

      const star = new THREE.Mesh(
        new THREE.SphereGeometry(size, 2, 2),
        new THREE.MeshBasicMaterial({ color })
      );

      star.position.copy(vec);
      
      star.matrixAutoUpdate = false;
      star.updateMatrix();
      group.add(star);
      
    }

    group.matrixAutoUpdate = false;
    scene._stars = group;
    scene.add(group);
  }
}

export { StarsGenerator }