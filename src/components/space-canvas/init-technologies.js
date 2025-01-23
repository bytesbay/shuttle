import * as THREE from 'three';

const initTechnologies = app => {

  const stripes = [
    [
      {
        img: require('@/assets/techs/kubernetes.png'),
        ratio: 1,
        name: 'Kubernetes',
      },
      {
        img: require('@/assets/techs/nestjs.png'),
        ratio: 1.035598705501618,
        name: 'NestJS',
      },
      {
        img: require('@/assets/techs/docker.png'),
        ratio: 1.170731707317073,
        name: 'Docker',
      },
      {
        img: require('@/assets/techs/react.png'),
        ratio: 1.415094339622642,
        name: 'React',
      },
    ],
    [
      {
        img: require('@/assets/techs/laravel.png'),
        ratio: 0.961538461538462,
        name: 'Laravel',
      },
      {
        img: require('@/assets/techs/ionic.png'),
        ratio: 1,
        name: 'Ionic',
      },
      {
        img: require('@/assets/techs/js.png'),
        ratio: 1,
        name: 'JavaScript',
      },
    ],
    [
      {
        img: require('@/assets/techs/vuejs.png'),
        ratio: 1.153996101364522,
        name: 'VueJS',
      },
      {
        img: require('@/assets/techs/ethereum.png'),
        ratio: 0.613880742913001,
        name: 'Blockchain (solidity)',
      },
      {
        img: require('@/assets/techs/nodejs.png'),
        ratio: 1.634738186462324,
        name: 'NodeJS',
      },
      {
        img: require('@/assets/techs/solidity.png'),
        ratio: 0.644468313641246,
        name: 'Blockchain (solidity)',
      },
    ],
  ];

  const technologies = new THREE.Group();
  technologies.rotation.x = -90 * Math.rad;

  for (const i in stripes) {

    const stripe = stripes[i];
    const stripe_group = new THREE.Group();
    
    for (const j in stripe) {

      const tech_group = new THREE.Group();

      const logo = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(50 * stripe[j].ratio, 50, 1),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(stripe[j].img),
          transparent: true,
        })
      );

      // const bg = new THREE.Mesh(
      //   new THREE.PlaneBufferGeometry(60 * stripe[j].ratio, 60),
      //   new THREE.MeshBasicMaterial({
      //     color: 0xffffff,
      //     transparent: true,
      //   })
      // )
  
      tech_group.add(logo);

      const shape = new THREE.Shape();
      (() => {
        const height = 70, width = 70 * stripe[j].ratio, radius = 10;
        shape.moveTo( 0, radius );
        shape.lineTo( 0, height - radius );
        shape.quadraticCurveTo( 0, height, radius, height );
        shape.lineTo( width - radius, height) ;
        shape.quadraticCurveTo( width, height, width, height - radius );
        shape.lineTo( width, radius );
        shape.quadraticCurveTo( width, 0, width - radius, 0 );
        shape.lineTo( radius, 0 );
        shape.quadraticCurveTo( 0, 0, 0, radius );
      })()
      const mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(shape),
        new THREE.MeshBasicMaterial({
          color: stripe[j].name === 'JavaScript' ? 0xF7E116 : 0xffffff,
          // transparent: true,
        })
      );
      mesh.position.set(-((70 * stripe[j].ratio) / 2), -35, 0);

      tech_group.add(mesh);

      const az = (90 + (i * 5)) * Math.rad;
      const ze = (90 + (j * 6)) * Math.rad;
      const radius = 1005;
      const look_at_point = (new THREE.Vector3()).setFromSphericalCoords(radius + 500, az, ze)
  
      tech_group.position.setFromSphericalCoords(radius, az, ze);
      logo.position.z = 1;
      tech_group.lookAt(look_at_point);

      stripe_group.add(tech_group);
    }

    stripe_group._popped = true;

    technologies.add(stripe_group);
  }

  app.scene.add(technologies);
  app.technologies = technologies;

  app.on_render.push(() => {
    
  })
}

export { initTechnologies }