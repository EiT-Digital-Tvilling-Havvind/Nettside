//failure-modes
export default [ 
  {
    name: 'Rotor (Hub)',
    id: 'rotor',
    modes: [
      {
        id: 'rotor.aero_asym',
        title: 'Aerodynamic asymmetry',
      },
      {
        id: 'rotor.yaw_mis',
        title: 'Yaw misalignment',
      },
      {
        id: 'rotor.creep_corr',
        title: 'Creep and corrosion fatigue',
      },
      {
        id: 'rotor.non_uni_air',
        title: 'Non-uniform air gap (bearings)',
      },
      {
        id: 'rotor.hub_spin',
        title: 'Hub spinning on shaft',
      },
      {
        id: 'rotor.shaft_mis',
        title: 'Shaft misalignment',
      },
      {
        id: 'rotor.tors_osci',
        title: 'Torsional oscillation',
      },
      {
        id: 'rotor.devi_tor_spd',
        title: 'Deviation in the torque-speed ratio',
      },
      {
        id: 'rotor.mass_imbal',
        title: 'Mass imbalance',
      },
    ]
  },
  {
    name: 'Pitch control',
    id: 'pitch',
    modes: [
      {
        id: 'pitch.prem_brake',
        title: 'Premature brake activation',
      },
      {
        id: 'pitch.exce_load_mit',
        title: 'Inability of excessive operational load mitigation',
      },
      {
        id: 'pitch.hydr_sys_fail',
        title: 'Operation instability due to hydraulic system failure',
      },
      {
        id: 'pitch.air_contam_hydr',
        title: 'Air contamination in the hydraulic system',
      },
      {
        id: 'pitch.inab_aero_brak',
        title: 'Inability of aerodynamic braking',
      },
      {
        id: 'pitch.hydr_fluid_red',
        title: 'Hydraulic fluid bulk modulus reduction',
      },
      {
        id: 'pitch.leak_hydr_sys',
        title: 'Leakage in the hydraulic system',
      },
      {
        id: 'pitch.asym_pitch',
        title: 'Asymmetry in pitch angle',
      },
    ]
  },
  {
    name: 'Power electronics and electric controls',
    id: 'power',
    modes: [
      {
        id: 'power.semi_dev_def',
        title: 'Semiconductor devices defects',
      },
      {
        id: 'power.open_3ph_pow',
        title: 'Open circuit failure in 3-phase power converter',
      },
      {
        id: 'power.short_3ph_pow',
        title: 'Short circuit failure in 3-phase power converter',
      },
      {
        id: 'power.gate_drv_3ph_pow',
        title: 'Gate-drive circuit failure in 3-phase power converter',
      },
      {
        id: 'power.overheat',
        title: 'Overheating',
      },
      {
        id: 'power.err_wind_meas',
        title: 'Error in wind speed/direction measurement',
      },
    ]
  },
  {
    name: 'Blades',
    id: 'blades',
    modes: [
      {
        id: 'blades.cracks',
        title: 'Cracks',
      },
      {
        id: 'blades.delam_comp',
        title: 'Delaminations of the composite',
      },
      {
        id: 'blades.surf_wear',
        title: 'Surface wear',
      },
      {
        id: 'blades.incr_rough',
        title: 'Increased surface roughness',
      },
      {
        id: 'blades.fatigue',
        title: 'Fatigue',
      },
      {
        id: 'blades.lightning',
        title: 'Lightning strikes',
      },
      {
        id: 'blades.high_vibr',
        title: 'High vibrations',
      },
      {
        id: 'blades.flap_fatigue',
        title: 'Flapwise fatigue damage',
      },
      {
        id: 'blades.unst_air',
        title: 'Unsteady blades air loads',
      },
      {
        id: 'blades.fracture',
        title: 'Blade fracture',
      },
      {
        id: 'blades.unst_perf',
        title: 'Unsteady performance',
      },
      {
        id: 'blades.corrosion',
        title: 'Corrosion',
      },
    ]
  },
  {
    name: 'Gearbox (bearings and gears)',
    id: 'gearbox',
    modes: [
      {
        id: 'gearbox.gear_tooth_dam',
        title: 'Gear tooth damage',
      },
      {
        id: 'gearbox.pitting',
        title: 'Pitting',
      },
      {
        id: 'gearbox.cracking',
        title: 'Cracking',
      },
      {
        id: 'gearbox.gear_ecce',
        title: 'Gear eccentricity',
      },
      {
        id: 'gearbox.tooth_crack',
        title: 'Tooth crack',
      },
      {
        id: 'gearbox.shaft_gear_fail',
        title: 'Shaft-Gearbox coupling failure',
      },
      {
        id: 'gearbox.scratching',
        title: 'Scratching (abrasive wear)',
      },
      {
        id: 'gearbox.scoring',
        title: 'Scoring (adhesive wear)',
      },
      {
        id: 'gearbox.lub_visc_change',
        title: 'Lubricant viscosity changes',
      },
      {
        id: 'gearbox.lub_loss_water_cont',
        title: 'Lubricant loss of water content',
      },
      {
        id: 'gearbox.add_deb_lub',
        title: 'Presence of additives/debris in the lubricant',
      },
    ]
  },
  {
    name: 'Generator (Bearing Stator and Rotor)',
    id: 'generator',
    modes: [
      {
        id: 'generator.inter_short',
        title: 'Inter turn short circuit',
      },
      {
        id: 'generator.abn_conn_stator',
        title: 'Abnormal connection of the stator winding',
      },
      {
        id: 'generator.dyn_ecc',
        title: 'Dynamic eccentricity',
      },
      {
        id: 'generator.open_short_stator_rotor',
        title: 'Opening or shorting of stator or rotor winding circuits',
      },
      {
        id: 'generator.rotor_ecc',
        title: 'Rotor eccentricity',
      },
      {
        id: 'generator.rotor_brok_bar',
        title: 'Rotor broken bar',
      },
      {
        id: 'generator.rotor_crack_end',
        title: 'Rotor cracked end-ring',
      },
      {
        id: 'generator.torque_red',
        title: 'Torque reduction',
      },
      {
        id: 'generator.exce_stress',
        title: 'Excessive stresses during operation',
      },
      {
        id: 'generator.air_gap_ecce',
        title: 'Static and/or dynamic air gap eccentricities',
      },
      {
        id: 'generator.incr_trq_puls',
        title: 'Increased torque pulsation',
      },
      {
        id: 'generator.exce_heat_wind',
        title: 'Excessive heating in the winding',
      },
      {
        id: 'generator.incr_loss_eff_red',
        title: 'Increase in losses and efficiency reduction',
      },
      {
        id: 'generator.rotor_misa',
        title: 'Rotor misalignment',
      },
      {
        id: 'generator.imb_harm_air_flux',
        title: 'Imbalances and harmonics in the air gap flux',
      },
      {
        id: 'generator.short_wind_coil',
        title: 'Shorted winding coil (reduction in generator reactance)',
      },
    ]
  },
  {
    name: 'Tower and Foundation',
    id: 'tower_foundation',
    modes: [
      {
        id: 'tower_foundation.fatigue',
        title: 'Fatigue',
      },
      {
        id: 'tower_foundation.cracks',
        title: 'Cracks',
      },
      {
        id: 'tower_foundation.corro',
        title: 'Corrosion',
      },
      {
        id: 'tower_foundation.exce_foul_found',
        title: 'Excessive fouling of foundation',
      },
      {
        id: 'tower_foundation.loss_cap_found_cycl',
        title: 'Loss of capacity in foundation due to cyclic loading',
      },
      {
        id: 'tower_foundation.soil_instab',
        title: 'Soil instability',
      },
      {
        id: 'tower_foundation.earthq',
        title: 'Earthquakes',
      },
      {
        id: 'tower_foundation.change_modal_cycl',
        title: 'Change of modal parameters due to cyclic loading',
      },
      {
        id: 'tower_foundation.scour',
        title: 'Scour',
      },
    ]
  },
]