// fake database
export default {
  turbines: [
    {
      name: 'EQ_142',
      latLng: [ 59.340193, 4.903874 ],
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
      name: 'EQ_143',
      latLng: [ 59.343869, 4.929984 ],
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
      name: 'EQ_144',
      latLng: [ 59.346670, 4.946131 ],
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
      name: 'EQ_145',
      latLng: [ 59.356646, 4.924548 ],
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