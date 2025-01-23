import BezierEasing from 'bezier-easing';

const animateCargo = (k, app) => {
  
  app.agent._shuttle.anim_mixer.setTime(k.map(0, 1, 0, 2.5));

}

export { animateCargo }