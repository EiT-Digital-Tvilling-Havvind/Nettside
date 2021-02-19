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
      last_service: {
        technician: 'Donald Duck',
        comment: 'Byttet slitt girkasse (GK115-Z2) i tårn, notert i vedlikeholdsmappe.',
        timestamp: '2020-02-04T14:18:04.514Z',
      },
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
      timestamp: '2020-02-19T14:30:00',
      preventive: false,
      fault_mode: 'Svikt',
      task_description: 'Rotorblad 2 har falt av og må erstattes.',
      comment: 'Rotorblad erstattet, nytt er bestilt for å etterfylle lageret. Signert Donald Duck.',
    },
    {
      id: 2,
      turbine_id: 2,
      mechanic_id: 1,
      timestamp: '2020-02-17T12:30:00',
      preventive: true,
      fault_mode: null,
      task_description: 'Rutinemessig vedlikehold på EQ_143. Gjennomføres etter lovverk for vindmøllevedlikehold §17.3.',
      comment: 'Vedlikehold gjennomført, ingen feil funnet. Vasket gulvet i båten etterpå, for å ha noe å gjøre.',
    },
    {
      id: 3,
      turbine_id: 3,
      mechanic_id: 3,
      timestamp: '2020-02-28T12:30:00',
      preventive: true,
      fault_mode: null,
      task_description: 'Rutinemessig vedlikehold på EQ_144. Gjennomføres etter lovverk for vindmøllevedlikehold §17.3.',
      comment: null,
    },
    {
      id: 4,
      turbine_id: 4,
      mechanic_id: 2,
      timestamp: '2020-02-22T08:30:00',
      preventive: false,
      fault_mode: 'Svikt',
      task_description: 'Mølla har uventet sluttet å produsere, dette må vi få orden på! Rykk ut snarest og se hva det er!',
      comment: null,
    },
    {
      id: 5,
      turbine_id: 1,
      mechanic_id: 3,
      timestamp: '2020-02-11T13:15:00',
      preventive: true,
      fault_mode: null,
      task_description: 'Rutinemessig vedlikehold, rapporter tilbake før du gjør noe mer.',
      comment: 'Vedlikehold gjennomført, alt var bra. Signert Mikke Mus.',
    },
    {
      id: 6,
      turbine_id: 2,
      mechanic_id: 3,
      timestamp: '2020-02-10T11:25:00',
      preventive: true,
      fault_mode: null,
      task_description: 'Vedlikehold etter rutine, bør gå helt fint!',
      comment: 'Alt var bra. -Mikke.',
    },
    {
      id: 7,
      turbine_id: 3,
      mechanic_id: 3,
      timestamp: '2020-02-08T11:25:00',
      preventive: true,
      fault_mode: null,
      task_description: 'Sjekk hele mølla, da!',
      comment: 'Faktisk var det masse problemer denne gangen, har satt opp nytt vedlikehold med en mekaniker (Donald) som kan mye mer enn meg (Mikke). Merker at jeg var skikkelig underkvalifisert til dette.',
    },
    {
      id: 7,
      turbine_id: 3,
      mechanic_id: 1,
      timestamp: '2020-02-12T11:25:00',
      preventive: false,
      fault_mode: 'Defekt',
      task_description: 'DONALD! Gjør alt du klarer her, mølla jobber bare på 40 % effekt, selv med perfekte vindforhold! Her trengs du, ta med skiftenøkkel og godt humør!',
      comment: 'Viste seg at Mikke hadde fått krøll på ledningen ut fra vindmølla, og at det var derfor den produserte redusert. Han bør nok få sparken.',
    },
  ]

}