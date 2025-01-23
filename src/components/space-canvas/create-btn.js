import Anime from 'animejs';
import * as THREE from 'three';
import { Text } from 'troika-three-text'
import bold_font from '@/assets/fonts/OpenSans-Bold.ttf';

export const createButton = (app, text, width, onClick) => {
  const shape = new THREE.Shape();
  const height = width / 3;
  const radius = height / 4;

  shape.moveTo( 0, radius );
  shape.lineTo( 0, height - radius );
  shape.quadraticCurveTo( 0, height, radius, height );
  shape.lineTo( width - radius, height) ;
  shape.quadraticCurveTo( width, height, width, height - radius );
  shape.lineTo( width, radius );
  shape.quadraticCurveTo( width, 0, width - radius, 0 );
  shape.lineTo( radius, 0 );
  shape.quadraticCurveTo( 0, 0, 0, radius );

  const btn = new THREE.Group();
  const _btn_bg = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshBasicMaterial({
      color: 0xFF2A75,
      transparent: true,
    })
  ); 
  app._bloomEffect.selection.add(_btn_bg)
  _btn_bg.position.x = -(width/2)
  _btn_bg.position.y = -(height/2)

  _btn_bg.cursor_pointer = true;
  const onClickEnd = e => {
    if(btn._anim) {
      btn._anim.remove(btn.scale)
    }
    btn._anim = Anime({
      targets: btn.scale,
      x: 1,
      y: 1,
      z: 1,
      duration: 50,
      easing: 'spring(1, 80, 10, 0)',
    })

    if(app.$is_mobile) {
      window.removeEventListener('touchcancel', onClickEnd)
      window.removeEventListener('touchend', onClickEnd)
    } else {
      window.removeEventListener('mouseup', onClickEnd)
    }
  }
  _btn_bg.onClick = onClick;
  _btn_bg.onClickStart = e => {
    if(btn._anim) {
      btn._anim.remove(btn.scale)
    }
    btn._anim = Anime({
      targets: btn.scale,
      x: 0.8,
      y: 0.8,
      z: 0.8,
      duration: 50,
      easing: 'spring(1, 80, 10, 0)',
    })

    if(app.$is_mobile) {
      window.addEventListener('touchcancel', onClickEnd)
      window.addEventListener('touchend', onClickEnd)
    } else {
      window.addEventListener('mouseup', onClickEnd)
    }
  }
  btn.add(_btn_bg)
  app.interactables.push(_btn_bg);

  const _text = new Text();
  _text.text = text;
  _text.font = bold_font;
  _text.anchorX = 'center';
  _text.anchorY = 'middle';
  _text.fontSize = height / 3;
  _text.position.copy(new THREE.Vector3(0, 0, width / 50))
  btn.add(_text)

  return btn;
}