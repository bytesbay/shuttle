import Anime from 'animejs';

export const animateProjects = (app, deg) => {

  const projects = app.projects;
  deg = deg - 65;

  projects.forEach(n => {
    if(n.deg - 20 < deg && n.deg + 20 > deg) {
      if(!n.is_popped) {
        n.item._sprite.visible = true;
        if(n.anim_1) {
          n.anim_1.remove(n.item._sprite.scale)
          // n.anim_2.remove(n.item.scale)
          n.item._sprite._tags.forEach(n => {
            if(n.anim) {
              n.anim.remove()
            }
          })
        }
        n.anim_1 = Anime({
          targets: n.item._sprite.scale,
          x: 1,
          y: 1,
          z: 1,
          duration: 200,
          easing: 'easeOutQuad',
        })

        n.item._sprite._tags.forEach((n, i) => {
          n.anim = Anime({
            targets: n.scale,
            x: 1,
            y: 1,
            z: 1,
            duration: 200,
            delay: i * 100,
            easing: 'spring(1, 80, 10, 0)',
          })
        })

        n.item._model.material.wireframe = false;
        n.is_popped = true;
      }
    } else {
      if(n.is_popped) {
        if(n.anim_1) {
          n.anim_1.remove(n.item._sprite.scale)
          // n.anim_2.remove(n.item.scale)
          n.item._sprite._tags.forEach(n => {
            if(n.anim) {
              n.anim.remove()
            }
          })
        }
        n.anim_1 = Anime({
          targets: n.item._sprite.scale,
          x: 0,
          y: 0,
          z: 0,
          duration: 200,
          easing: 'easeInQuad',
          complete() {
            n.item._sprite.visible = false;

            n.item._sprite._tags.forEach((n, i) => {
              n.scale.set(0, 0, 0)
            })
          }
        })
        
        // n.anim_2 = Anime({
        //   targets: n.item.scale,
        //   x: 1,
        //   y: 1,
        //   z: 1,
        //   duration: 500,
        //   easing: 'spring(1, 80, 10, 0)',
        // })
        n.item._model.material.wireframe = true;
        n.is_popped = false;
      }
    }
  })
}

export const toggleProjects = (app, flag) => {
  if(!flag) {
    
  }
}