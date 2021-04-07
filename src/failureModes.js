//failure-modes
export default [ 
  {
    name: 'Rotor (nav)',
    id: 'rotor',
    modes: [
      {
        id: 'rotor.aero_asym',
        title: 'Aerodynamisk asymmetri',
      },
      {
        id: 'rotor.yaw_mis',
        title: 'Yaw misalignment',
      },
      {
        id: 'rotor.creep_corr',
        title: 'Siging og korrosjonsutmattelse',
      },
      {
        id: 'rotor.non_uni_air',
        title: 'Ujevnt luftgap (kulelager)',
      },
      {
        id: 'rotor.hub_spin',
        title: 'Nav spinner på akslingen',
      },
      {
        id: 'rotor.shaft_mis',
        title: 'Feiljustering av aksling',
      },
      {
        id: 'rotor.tors_osci',
        title: 'Torsjonsoscillasjon',
      },
      {
        id: 'rotor.devi_tor_spd',
        title: 'Avvik i dreiemoment-hastighetsforholdet',
      },
      {
        id: 'rotor.mass_imbal',
        title: 'Masse i ubalanse',
      },
    ]
  },
  {
    name: 'Stigningsvinkelkontroll',
    id: 'pitch',
    modes: [
      {
        id: 'pitch.prem_brake',
        title: 'For tidlig bremseaktivering',
      },
      {
        id: 'pitch.exce_load_mit',
        title: 'Manglende evne til overdreven belastningsreduksjon',
      },
      {
        id: 'pitch.hydr_sys_fail',
        title: 'Ustabil drift på grunn av svikt i hydraulikksystemet',
      },
      {
        id: 'pitch.air_contam_hydr',
        title: 'Luftforurensning i det hydrauliske systemet',
      },
      {
        id: 'pitch.inab_aero_brak',
        title: 'Manglende evne til aerodynamisk bremsing',
      },
      {
        id: 'pitch.hydr_fluid_red',
        title: 'Reduksjon av  kompresjonmotstandsevne for hydraulisk fluid',
      },
      {
        id: 'pitch.leak_hydr_sys',
        title: 'Lekkasje i hydraulikksystemet',
      },
      {
        id: 'pitch.asym_pitch',
        title: 'Asymmetri i stigningsvinkel',
      },
    ]
  },
  {
    name: 'Kraftelektronikk og elektriske kontroller',
    id: 'power',
    modes: [
      {
        id: 'power.semi_dev_def',
        title: 'Defekter i halvledere',
      },
      {
        id: 'power.open_3ph_pow',
        title: 'Brudd i 3-fase strømomformer',
      },
      {
        id: 'power.short_3ph_pow',
        title: 'Kortslutning i 3-faset strømomformer',
      },
      {
        id: 'power.gate_drv_3ph_pow',
        title: 'Port-driverfeil i 3-fase strømomformer',
      },
      {
        id: 'power.overheat',
        title: 'Overoppheting',
      },
      {
        id: 'power.err_wind_meas',
        title: 'Feil i måling av vindhastighet/-retning',
      },
    ]
  },
  {
    name: 'Vindmølleblader',
    id: 'blades',
    modes: [
      {
        id: 'blades.cracks',
        title: 'Sprekker',
      },
      {
        id: 'blades.delam_comp',
        title: 'Delamineringer av kompositten',
      },
      {
        id: 'blades.surf_wear',
        title: 'Overflateslitasje',
      },
      {
        id: 'blades.incr_rough',
        title: 'Økende overflateruhet',
      },
      {
        id: 'blades.fatigue',
        title: 'Utmattelse',
      },
      {
        id: 'blades.lightning',
        title: 'Lynnedslag',
      },
      {
        id: 'blades.high_vibr',
        title: 'Høyfrekvent vibrasjon',
      },
      {
        id: 'blades.flap_fatigue',
        title: 'Flappvis utmattelsesskade',
      },
      {
        id: 'blades.unst_air',
        title: 'Ubalanserte vindmølleblad',
      },
      {
        id: 'blades.fracture',
        title: 'Brudd på vindmølleblad ',
      },
      {
        id: 'blades.unst_perf',
        title: 'Ujevn ytelse',
      },
      {
        id: 'blades.corrosion',
        title: 'Korrosjon',
      },
    ]
  },
  {
    name: 'Girkasse (kulelager og gir)',
    id: 'gearbox',
    modes: [
      {
        id: 'gearbox.gear_tooth_dam',
        title: 'Overflateskader på tannhjul',
      },
      {
        id: 'gearbox.pitting',
        title: 'Grop korrosjon',
      },
      {
        id: 'gearbox.cracking',
        title: 'Brudd',
      },
      {
        id: 'gearbox.gear_ecce',
        title: 'Eksentrisitet for gir',
      },
      {
        id: 'gearbox.tooth_crack',
        title: 'Knekt tann på tannhjul',
      },
      {
        id: 'gearbox.shaft_gear_fail',
        title: 'Koblingsfeil mellom hovedaksling og girboks',
      },
      {
        id: 'gearbox.scratching',
        title: 'Riper',
      },
      {
        id: 'gearbox.scoring',
        title: 'Riper (klister-skader)',
      },
      {
        id: 'gearbox.lub_visc_change',
        title: 'Viskositetsendring i smøremiddel',
      },
      {
        id: 'gearbox.lub_loss_water_cont',
        title: 'Vanntap i smøremiddel',
      },
      {
        id: 'gearbox.add_deb_lub',
        title: 'Tilsetningsstoffer/rusk i smøremidlet',
      },
    ]
  },
  {
    name: 'Generator (kulelager, stator og rotor)',
    id: 'generator',
    modes: [
      {
        id: 'generator.inter_short',
        title: 'Sving-til-sving kortslutning',
      },
      {
        id: 'generator.abn_conn_stator',
        title: 'Unormal tilkobling av statorviklingen',
      },
      {
        id: 'generator.dyn_ecc',
        title: 'Dynamisk eksentrisitet',
      },
      {
        id: 'generator.open_short_stator_rotor',
        title: 'Brudd eller kortslutning i stator- eller rotorviklinger',
      },
      {
        id: 'generator.rotor_ecc',
        title: 'Rotoreksentrisitet',
      },
      {
        id: 'generator.rotor_brok_bar',
        title: 'Skade på rotorstav',
      },
      {
        id: 'generator.rotor_crack_end',
        title: 'Sprukket slutt-ring på rotor',
      },
      {
        id: 'generator.torque_red',
        title: 'Reduksjon av dreiemoment',
      },
      {
        id: 'generator.exce_stress',
        title: 'Overveldende belastning under drift',
      },
      {
        id: 'generator.air_gap_ecce',
        title: 'Statisk og/eller dynamisk luftgap eksentrisitet',
      },
      {
        id: 'generator.incr_trq_puls',
        title: 'Økt dreiemomentpulsering',
      },
      {
        id: 'generator.exce_heat_wind',
        title: 'Overdreven oppvarming i viklingen',
      },
      {
        id: 'generator.incr_loss_eff_red',
        title: 'Økning i tap og effektivitetsreduksjon',
      },
      {
        id: 'generator.rotor_misa',
        title: 'Feiljustering av rotor',
      },
      {
        id: 'generator.imb_harm_air_flux',
        title: 'Ubalanse og harmonisk i luft-rom fluksen',
      },
      {
        id: 'generator.short_wind_coil',
        title: 'Reduksjon i viklinger på spole (reduksjon av reaktans for generator)',
      },
    ]
  },
  {
    name: 'Tårn og fundament',
    id: 'tower_foundation',
    modes: [
      {
        id: 'tower_foundation.fatigue',
        title: 'Utmatting',
      },
      {
        id: 'tower_foundation.cracks',
        title: 'Brudd',
      },
      {
        id: 'tower_foundation.corro',
        title: 'Korrosjon',
      },
      {
        id: 'tower_foundation.exce_foul_found',
        title: 'Overveldende begroing på fundamentet',
      },
      {
        id: 'tower_foundation.loss_cap_found_cycl',
        title: 'Funksjonstap i fundament på grunn av syklisk belastning',
      },
      {
        id: 'tower_foundation.soil_instab',
        title: 'Ustabilitet i jord',
      },
      {
        id: 'tower_foundation.earthq',
        title: 'Jordskjelv',
      },
      {
        id: 'tower_foundation.change_modal_cycl',
        title: 'Endring av modalparametere på grunn av syklisk belastning',
      },
      {
        id: 'tower_foundation.scour',
        title: 'Jord-fjerning på sugeankeret til vindmøllen',
      },
    ]
  },
]