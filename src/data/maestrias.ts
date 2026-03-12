export interface Maestria {
  id: number;
  nombre: string;
  precioBruto: number;
  inscripcion: number;

  vFinal20Dscto: number;
  cuotas12_20Dscto: number | null;
  cuotas16_20Dscto: number | null;
  cuotas18_20Dscto: number | null;

  vFinal25Dscto: number;
  cuotas12_25Dscto: number | null;
  cuotas16_25Dscto: number | null;

  visible?: boolean;
}

export const maestrias: Maestria[] = [
  {
    id: 1,
    nombre: "Maestría en Ciberseguridad (En Línea)", // AEL-MAE. CYBERSEGURIDAD
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 2,
    nombre: "Maestría en Derecho Digital mención Innovación Legal y Nuevas Tecnologías", // MAEL DERECHO DIGITAL
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 3,
    nombre: "Maestría en Administración Educativa", // AEL-MAE. ADMINISTRACION EDUCATIVA
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 4,
    nombre: "Maestría en Gestión de Cadena de Suministro, Tecnología y Sostenibilidad", // MAEL GESTION DE CADENA DE SUMIN, TECN Y SOSTEN
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 5,
    nombre: "Maestría en Educación mención Innovaciones Pedagógicas", // AEL-MAE. EDUCACION INNOV. PEDAG.
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 6,
    nombre: "Maestría de Comunicación mención Comunicación Digital", // AEL-MAE. COMUNICACIÓN
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 7,
    nombre: "Maestría en Neuropsicología mención Neuropsicología del Aprendizaje", // AEL-MAE. NEUROPSICOLOGIA PROFESIONAL
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 8,
    nombre: "Tecnología e Inteligencia Artificial para la Educación", // No text match in image exactly, mapped as 3600
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 9,
    nombre: "Maestría en Pedagogía de los Idiomas Nacionales y Extranjeros mención Enseñanza en Inglés", // AEL-MAE. PEDAG. DE LOS IDIOMAS
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 10,
    nombre: "Maestría en Administración Pública (En Línea)", // AEL-MAE. ADMINISTRACION PUBLICA
    precioBruto: 3600.00,
    inscripcion: 100,
    vFinal20Dscto: 2880.00,
    cuotas12_20Dscto: 240.00,
    cuotas16_20Dscto: 180.00,
    cuotas18_20Dscto: 160.00,
    vFinal25Dscto: 2700.00,
    cuotas12_25Dscto: 225.00,
    cuotas16_25Dscto: 168.75,
  },
  {
    id: 11,
    nombre: "Maestría en Administración de Empresas mención Analítica de Negocios", // MBA - ADMINISTRACION DE EMPRESAS
    precioBruto: 4800.00,
    inscripcion: 100,
    vFinal20Dscto: 3840.00,
    cuotas12_20Dscto: 320.00,
    cuotas16_20Dscto: 240.00,
    cuotas18_20Dscto: 213.33,
    vFinal25Dscto: 3600.00,
    cuotas12_25Dscto: 300.00,
    cuotas16_25Dscto: 225.00,
  },
  {
    id: 12,
    nombre: "Maestría en Marketing Estratégico mención Inteligencia Artificial y Ciencia de Datos", // MAEL MARKETING ESTRATEGICO
    precioBruto: 4800.00,
    inscripcion: 100,
    vFinal20Dscto: 3840.00,
    cuotas12_20Dscto: 320.00,
    cuotas16_20Dscto: 240.00,
    cuotas18_20Dscto: 213.33,
    vFinal25Dscto: 3600.00,
    cuotas12_25Dscto: 300.00,
    cuotas16_25Dscto: 225.00,
  },
  {
    id: 13,
    nombre: "Maestría en Inteligencia Artificial y Ciencia de Datos", // MAEL INTELIGENCIA ARTIFICIAL Y ANALITICA DE DATOS
    precioBruto: 4800.00,
    inscripcion: 100,
    vFinal20Dscto: 3840.00,
    cuotas12_20Dscto: 320.00,
    cuotas16_20Dscto: 240.00,
    cuotas18_20Dscto: 213.33,
    vFinal25Dscto: 3600.00,
    cuotas12_25Dscto: 300.00,
    cuotas16_25Dscto: 225.00,
  },
];
