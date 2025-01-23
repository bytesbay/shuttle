import * as THREE from 'three';
import BezierEasing from 'bezier-easing';
import { animateCargo } from './cargo'
import { toggleAllWhatWeDo } from './animate-whatwedo';
import { animateAgentSat } from './animate-agent-sat';
import { animateProjects } from './animate-projects';
import { animateContactUs } from './animate-contact-us';

const orbit_step = {
  range_from: 0.78,
  range_to: 1,

  handler(ctx, k) {

    const normalized_k = k.map(ctx.range_from, ctx.range_to, 0, 1);

    // this.moveVector(
    //   this.app.agent.position,
    //   k.map(ctx.range_from, ctx.range_to, 0, 1), 
    //   [170, 170], 
    //   [90, 90], 
    //   [115, 270], 
    //   this.app.moon_object.position,
    //   this.app.agent._rotator,
    // );

    this.moveCamera(
      k.map(ctx.range_from, ctx.range_to, 0, 1), 
      [500, 500], 
      [0, 0], 
      [65, 65], 
      this.app.moon_object.position,
      [0, 0],
      0.05,
    );

    this.app.agent._shuttle.rotation.z = 90 * Math.rad
    
    animateCargo(normalized_k.map(0, 1, 0.5, 1), this.app);
    // animateAgentSat(normalized_k, this.app);

    // this.app.base_mouse_deviation = {
    //   az: 0,
    //   ze: -normalized_k.map(0, 1, 0, 20) * Math.rad,
    // };

    toggleAllWhatWeDo(this.app, false);
    animateProjects(this.app, normalized_k.map(0, 1, 0, 360))
    animateContactUs(this.app, k);

    this.app.moon_object._model.rotation.y = normalized_k.map(0, 1, 0, 360) * Math.rad
  },
};

export { orbit_step }