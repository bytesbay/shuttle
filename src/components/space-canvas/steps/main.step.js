import * as THREE from 'three';
import BezierEasing from 'bezier-easing';
import { animateSprites } from './sprites';
import { animateCargo } from './cargo'
import { animateWhatWeDo, toggleAllWhatWeDo } from './animate-whatwedo'
import { clearAgentSat, animateAgentSat } from './animate-agent-sat'
import { animateAgentAppear } from './animate-agent-appear';
import { agentLookAt } from './agent-lookat';

const main_step = {
  range_from: 0.3,
  range_to: 0.78,

  handler(ctx, k) {

    const normalized_k = k.map(ctx.range_from, ctx.range_to, 0, 1);

    const vec = new THREE.Vector3();
    moveFromToDirect({
      vec: vec,
      k: normalized_k,
      from: (new THREE.Vector3())
        .setFromSphericalCoords(1600, 90 * Math.rad, 70 * Math.rad),
      to: (new THREE.Vector3())
        .setFromSphericalCoords(170, 90 * Math.rad, 115 * Math.rad)
        .add(this.app.moon_object.position),
    })
    this.app.agent.setPos(vec, 0.05);

    animateSprites(this.app, 1);
    toggleAllWhatWeDo(this.app, true);
    animateWhatWeDo(this.app, normalized_k);
    
    if(normalized_k > 0.8) {
      animateCargo(normalized_k.map(0.8, 1, 0, 0.5), this.app);
      // animateAgentSat(0, this.app);
    } else {
      animateCargo(0, this.app);
      // clearAgentSat(this.app);
    }

    this.app.text_preview.visible = false;
    if(normalized_k > 0.5) {
      this.app.technologies.visible = false;
    }

    this.moveCamera(
      normalized_k, 
      [4, 0.8], 
      // [2000, 2000], 
      [90, 90], 
      [45, 30], 
      vec,
      [-90, -90],
      0.05,
    );

    agentLookAt(this.app);
  },
};

export { main_step }