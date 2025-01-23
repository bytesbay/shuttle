import * as THREE from 'three';

const initAgentSat = app => {
  const wrapper = new THREE.Group();
  const sat = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 0.07, 32), 
    new THREE.MeshBasicMaterial({ color: 0xFF2A75 })
  );
  sat.rotation.x = 90 * Math.rad
  // sat.position.y = 0.02;
  app._bloomEffect.selection.add(sat)

  wrapper.add(sat);

  app.agent_sat = wrapper;
  app.agent_sat.model = sat;
  app.scene.add(wrapper);
}

export { initAgentSat }