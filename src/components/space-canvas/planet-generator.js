import * as THREE from 'three';

export const generatePlanet = (radius, dig_i, dig_j, depth) => {

  const group = new THREE.Group();

  const geometry = new THREE.Geometry();

  const step_i = 360 / dig_i;
  const step_j = 180 / dig_j;
  
  for (let i = 0; i < 360; i += step_i) {
    const verts = [];
    const faces = [];
    // const debug = [];
    for (let j = 0; j < 180; j += step_j) {

      const index_i = i / step_i;
      const index_j = j / step_j;

      const pos_top_left = (index_i * dig_j) + index_j;
      const pos_top_right = (index_i * dig_j) + index_j + dig_j
      const pos_bot_left = (index_i * dig_j) + index_j + 1;
      const pos_bot_right = (index_i * dig_j) + index_j + dig_j + 1;

      const rand = (Math.random() * depth);

      let rand_deg_ze = (Math.random() * (step_j * 2)) * Math.rad;
      let rand_deg_az = (Math.random() * (step_i * 2)) * Math.rad;

      rand_deg_ze -= rand_deg_ze / 2;
      rand_deg_az -= rand_deg_az / 2;

      verts.push(
        (new THREE.Vector3())
          .setFromSphericalCoords(
            radius - rand, 
            (j * Math.rad) + rand_deg_ze, 
            (i * Math.rad) + rand_deg_az
          )
      );
      
      if(index_j == (dig_j - 1)) {
        continue;
      }

      if(index_i != (dig_i - 1)) {
        faces.push(new THREE.Face3(pos_top_left, pos_bot_right, pos_top_right));
        faces.push(new THREE.Face3(pos_top_left, pos_bot_left, pos_bot_right));
      } else {
        faces.push(new THREE.Face3(pos_top_left, index_j + 1, index_j));
        faces.push(new THREE.Face3(pos_top_left, pos_bot_left, index_j + 1));
      }

      // debug.push([[pos_top_left, pos_top_right],[pos_bot_left, pos_bot_right]])
    }
    geometry.vertices.push(...verts);
    geometry.faces.push(...faces);
    // console.log(debug);
  }
  
  geometry.mergeVertices();
  geometry.computeFaceNormals();
  
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshLambertMaterial({ color: 0x505668 }),
  );

  // const wire = new THREE.Mesh(
  //   geometry,
  //   new THREE.MeshBasicMaterial({
  //     color: 0xFF2A75,
  //     wireframe: true,
  //   }),
  // );
  // wire.scale.set(1.01, 1.01, 1.01)

  group.add(mesh);
  // group.add(wire);

  return group;
}