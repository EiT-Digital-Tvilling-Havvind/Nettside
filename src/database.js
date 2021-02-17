// fake database
export default {
  turbines: [
    {
      id: 0,
      name: 'EQ_142',
      latLng: [ 59.340193, 4.903874 ],
      image: 'https://i.imgur.com/WjlyfAb.png',
      status: 'running',
      effect_mw: 3.4,
      direction: 288,
      last_service: {
        technician: 'Donald Duck',
        comment: 'Byttet slitt girkasse (GK115-Z2) i tårn, notert i vedlikeholdsmappe.',
        timestamp: '2020-02-04T14:18:04.514Z',
      },
    },
    {
      id: 1,
      name: 'EQ_143',
      latLng: [ 59.343869, 4.929984 ],
      image: 'https://i.imgur.com/fzfOlmq.png',
      status: 'running',
      direction: 270,
      effect_mw: 2.8,
      last_service: {
        technician: 'Donald Duck',
        comment: 'Rutinesjekk, ingen problemer.',
        timestamp: '2020-02-04T11:23:01.514Z',
      },
    },
    {
      id: 2,
      name: 'EQ_144',
      latLng: [ 59.346670, 4.946131 ],
      image: 'https://i.imgur.com/6b44yl7.jpg',
      status: 'maintenance',
      direction: 218,
      effect_mw: 0,
      last_service: {
        technician: 'Mikke Mus',
        comment: 'Rutinesjekk påbegynt.',
        timestamp: (new Date()).toISOString(),
      },
    },
    {
      id: 3,
      name: 'EQ_145',
      latLng: [ 59.356646, 4.924548 ],
      image: 'https://i.imgur.com/Z0jJhS5.png',
      status: 'error',
      direction: 0,
      effect_mw: 0,
      last_service: {
        technician: 'Petter Smart',
        comment: 'Rutinesjekk, ingen problemer.',
        timestamp: '2020-01-012T11:36:12.514Z',
      },
    },
  ],

}