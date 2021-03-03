// fake database
export default {
  turbines: [
    {
      id: 1,
      name: 'EQ_142',
      latLng: [ 59.340193, 4.903874 ],
      image: 'https://i.imgur.com/WjlyfAb.png',
      status: 'running',
      effect_mw: 3.4,
      direction: 288,
    },
    {
      id: 2,
      name: 'EQ_143',
      latLng: [ 59.343869, 4.929984 ],
      image: 'https://i.imgur.com/fzfOlmq.png',
      status: 'running',
      direction: 270,
      effect_mw: 2.8,
    },
    {
      id: 3,
      name: 'EQ_144',
      latLng: [ 59.346670, 4.946131 ],
      image: 'https://i.imgur.com/6b44yl7.jpg',
      status: 'maintenance',
      direction: 218,
      effect_mw: 0,
    },
    {
      id: 4,
      name: 'EQ_145',
      latLng: [ 59.356646, 4.924548 ],
      image: 'https://i.imgur.com/Z0jJhS5.png',
      status: 'error',
      direction: 0,
      effect_mw: 0,
    },
  ],

  mechanics: [
    {
      id: 1,
      name: 'Donald Duck',
      experience: 'Hydroelektriske superlativer, og andre koselige ting.'
    },
    {
      id: 2,
      name: 'Dolly Duck',
      experience: 'Ekstremt dyktig på å bygge greier!'
    },
    {
      id: 3,
      name: 'Mikke Mus',
      experience: 'Får til mye som har med strøm å gjøre'
    },
  ],

  maintenances: [
    {
      id: 1,
      turbine_id: 1,
      mechanic_id: 1,
      timestamp: '2021-02-19T14:30:00',
      preventive: false,
      fault_mode: 'gearbox.gear_tooth_dam',
      comment: 'Rotorblad erstattet, nytt er bestilt for å etterfylle lageret. Signert Donald Duck.',
      completed: true,
    },
    {
      id: 2,
      turbine_id: 2,
      mechanic_id: 1,
      timestamp: '2021-02-17T12:30:00',
      preventive: true,
      fault_mode: null,
      comment: 'Vedlikehold gjennomført, ingen feil funnet. Vasket gulvet i båten etterpå, for å ha noe å gjøre.',
      completed: true,
    },
    {
      id: 3,
      turbine_id: 3,
      mechanic_id: 3,
      timestamp: '2021-02-28T12:30:00',
      preventive: true,
      fault_mode: null,
      comment: null,
      completed: false,
    },
    {
      id: 4,
      turbine_id: 4,
      mechanic_id: 2,
      timestamp: '2021-02-22T08:30:00',
      preventive: false,
      fault_mode: 'generator.rotor_brok_bar',
      comment: null,
      completed: false,
    },
    {
      id: 5,
      turbine_id: 1,
      mechanic_id: 3,
      timestamp: '2021-02-11T13:15:00',
      preventive: true,
      fault_mode: null,
      comment: 'Vedlikehold gjennomført, alt var bra. Signert Mikke Mus.',
      completed: true,
    },
    {
      id: 6,
      turbine_id: 2,
      mechanic_id: 3,
      timestamp: '2021-02-10T11:25:00',
      preventive: true,
      fault_mode: null,
      comment: 'Alt var bra. -Mikke.',
      completed: true,
    },
    {
      id: 7,
      turbine_id: 3,
      mechanic_id: 3,
      timestamp: '2021-02-08T11:25:00',
      preventive: true,
      fault_mode: null,
      comment: 'Faktisk var det masse problemer denne gangen, har satt opp nytt vedlikehold med en mekaniker (Donald) som kan mye mer enn meg (Mikke). Merker at jeg var skikkelig underkvalifisert til dette.',
      completed: true,
    },
    {
      id: 8,
      turbine_id: 3,
      mechanic_id: 1,
      timestamp: '2021-05-12T11:25:00',
      preventive: false,
      fault_mode: 'rotor.yaw_mis',
      comment: 'Forstår ikke helt hvorfor dette har skjedd, må sjekkes!.',
      completed: true,
    },
  ]

}