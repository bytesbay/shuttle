import * as THREE from 'three';
import Anime from 'animejs';

const animateAgentAppear = (flag, app) => {

  const agent = app.agent;

  if(flag) {
    if(!agent._is_popped) {

      if(agent._anim) {
        agent._anim.remove(agent._shuttle.position)
      }
      agent._anim = Anime({
        targets: agent._shuttle.position,
        y: 0,
        duration: 500,
        easing: 'easeOutQuad',
      })
      
      agent._is_popped = true;
    }
  } else {
    if(agent._is_popped) {

      if(agent._anim) {
        agent._anim.remove(agent._shuttle.position)
      }
      agent._anim = Anime({
        targets: agent._shuttle.position,
        y: 5,
        duration: 500,
        easing: 'easeInQuad',
      })

      agent._is_popped = false;
    }
  }
}

export { animateAgentAppear }