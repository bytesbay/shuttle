import * as THREE from 'three';
import BezierEasing from 'bezier-easing';

const animateAgentSat = (k, app) => {
  app.agent_sat.position.copy(app.agent.position)
  app.agent_sat.model.rotation.z = app.agent._shuttle.rotation.z;

  app.agent_sat.rotation.x = app.agent._rotator.rotation.x;
  app.agent_sat.rotation.y = app.agent._rotator.rotation.y + (90 * Math.rad);

  // start animate
  const ease = BezierEasing(.99,.01,.99,.01);
  app.agent_sat.model.position.z = k.map(0, 1, 0.01, 0.3)
  app.agent_sat.model.position.x = ease(k).map(0, 1, 0, 1)
}

const clearAgentSat = (app) => {
  app.agent_sat.position.set(0, 0, 0)
}

export { animateAgentSat, clearAgentSat }