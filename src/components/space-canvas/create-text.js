import * as THREE from 'three';

export const createText = (text, font, size, pos, additional = {}, center = true) => {
  const geo = new THREE.TextGeometry(text, {
    font: new THREE.Font(font),
    size: size,
    height: 0,
  });
  geo.computeBoundingBox();
  geo.computeVertexNormals();
  if(center) {
    geo.center();
  }
  const mesh = new THREE.Mesh(
    geo, 
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      ...additional,
    }),
  );
  mesh.position.copy(pos);
  
  return mesh
}