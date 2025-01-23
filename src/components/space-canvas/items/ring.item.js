import * as THREE from 'three';

export const genRing = (app, count) => {
  const group = new THREE.Group();

  for (let i = 0; i < 360; i += (360 / count)) {

    const ring_deg = (Math.PI / count) * 0.9;
    const ring_radius = 0.5;

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(ring_radius, 0.03, 8, 8, ring_deg), 
      new THREE.MeshBasicMaterial({ color: 0xFF2A75, side: THREE.DoubleSide })
    );

    // const light = new THREE.PointLight(0xFF2A75, 0.5, 1)
    // group.add(light);
    // light.position.setFromSphericalCoords(ring_radius, 0, (i + (ring_deg / 2)) * Math.rad)

    app._bloomEffect.selection.add(torus)

    group.add(torus);
    torus.rotation.z = i * Math.rad;
  }

  
  app.on_render.push(() => {
    group.rotation.z += (0.1 + (Math.random() * 0.3));
  })

  return group;
}