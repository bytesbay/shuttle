import * as THREE from 'three';

const initSats = (app, num = 1) => {
  const moon = app.moon_object;
  const group = new THREE.Group();

  moon.sats = group;
  moon.add(group);

  for (let i = 0; i < num; i++) {

    const orbit = new THREE.Group();
    group.add(orbit)
    const height = 150 + (i * 5);

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(height, 1, 8, 8, Math.PI / 16), 
      new THREE.MeshBasicMaterial({ color: 0xFF2A75, side: THREE.DoubleSide })
    );

    app._bloomEffect.selection.add(torus)

    orbit.add(torus);

    orbit.rotation.z = (Math.random() * 360) * Math.rad;
    orbit.rotation.x = (Math.random() * 360) * Math.rad;
    orbit.rotation.y = (Math.random() * 360) * Math.rad;

    app.on_render.push(() => {
      app.moon_object.sats.children.forEach(n => {
        n.children[0].rotation.z += 0.005;
      })
    })
  }
}


export { initSats }