import { SMAAImageLoader } from "postprocessing";
import * as THREE from "three";
import { GLTFLoader } from '@/three/loaders/GLTFLoader';
// import { DRACOLoader } from '@/three/loaders/DRACOLoader';
import { preloadFont } from 'troika-three-text'

import bolder_font from '@/assets/fonts/OpenSans-ExtraBold.ttf';
import bold_font from '@/assets/fonts/OpenSans-Bold.ttf';
import regular_font from '@/assets/fonts/OpenSans-Regular.ttf';
import code_font from '@/assets/fonts/FiraMono-Regular.ttf';

// import mars_image from '@/assets/mars.jpg';
// import qwe_image from '@/assets/qwe.jpg';
// import shuttle_model from '@/assets/models/shuttle/whitetest.obj';
// import shuttle_mtl from '@/assets/models/shuttle/whitetest.mtl';


const statics_url = process.env['VUE_APP_STATICS_URL'];

/**
 * Loads scene assets.
 *
 * @return {Promise} A promise that returns a collection of assets.
 */

export async function load() {

  const assets = new Map();
  const manager = new THREE.LoadingManager();

  const smaa_image_loader = new SMAAImageLoader(manager);
  const gltf_loader = new GLTFLoader(manager);
  // const draco_loader = new DRACOLoader();

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  // draco_loader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  // draco_loader.setDecoderConfig({ type: 'js' });
  // gltf_loader.setDRACOLoader(draco_loader);

  // await new Promise((resolve, reject) => {
  //   mtl_loader.load(shuttle_mtl, function (materials) {
  //     materials.preload();
  //     assets.set('shuttle-mtl', materials);
  //     console.log('Shuttle mtl loaded');
  //     resolve()
  //   });
  // }),

  smaa_image_loader.load(([ search, area ]) => {
    assets.set('smaa-search', search);
    assets.set('smaa-area', area);
    console.log('SMAA loaded');
  });

  // texture_loader.load(statics_url + 'mars.jpg', texture => {
  //   assets.set('mars-image', texture);
  //   console.log('Mars texture loaded');
  // });

  // texture_loader.load(qwe_image, texture => {
  //   assets.set('qwe-image', texture);
  //   console.log('Mars texture loaded');
  // });

  gltf_loader.load(statics_url + 'shuttle.glb', gltf => {
    assets.set('shuttle-model', gltf);
    console.log('Shuttle obj loaded');
  });

  gltf_loader.load(statics_url + 'station.glb', gltf => {
    assets.set('station-model', gltf);
    gltf.scene.traverse(n => {
      if(n.isMesh) {
        if(n.name === 'Cylinder_5') {
          n.material = new THREE.MeshBasicMaterial({ color: n.material.color })
        }
      }
    })
    console.log('Station loaded', gltf);
  });


  // obj_loader
  //   // .setMaterials(assets.get('shuttle-mtl'))
  //   .load(shuttle_model, model => {
  //     assets.set('shuttle-model', model);
  //     console.log('Shuttle obj loaded');
  //   });

  await Promise.all([
    new Promise((resolve, reject) => {
      manager.onError = reject;
      manager.onLoad = () => {
        resolve()
      };
    }),
    new Promise((resolve, reject) => {
      preloadFont({
        font: bold_font,
      }, () => {
        resolve()
      })
    }),
    new Promise((resolve, reject) => {
      preloadFont({
        font: regular_font,
      }, () => {
        resolve()
      })
    }),
    new Promise((resolve, reject) => {
      preloadFont({
        font: bolder_font,
      }, () => {
        resolve()
      })
    }),
    new Promise((resolve, reject) => {
      preloadFont({
        font: code_font,
      }, () => {
        resolve()
      })
    }),
  ])

  return assets;
}
