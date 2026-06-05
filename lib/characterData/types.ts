export interface StatValues {
  fuerza: number;
  inteligencia: number;
  carisma: number;
  suerte: number;
  combate: number;
  defensa: number;
  especialVal: number;
}

export interface SuitImages {
  default?: string;
  alt?: string;
  ficha?: string;
  ficha2?: string;
  combat?: string;
  fichaAlt?: string;
  archor?: string;
}

export interface VariantDetail {
  label: string;
  habilidades: string[];
  significa: string;
  crisis: string;
}

export interface PowersInfo {
  role: string;
  habilidades: string[];
  significa: string;
  crisis: string;
  stats: StatValues;
  suitImages?: SuitImages;
  variantData?: Record<string, VariantDetail>;
}

export interface CharacterDetail {
  id: string;
  name: string;
  category: 'pibes' | 'secundarios' | 'voughtverse' | 'matis' | 'antagonistas' | 'entidades';
  isSecondary?: boolean;
  image: string;
  fullBody: string;
  altImage?: string;
  overloadImage?: string;
  fichaImage?: string;
  color: string;
  role: string;
  visualCode: string;
  perfil: string[];
  crisis: string;
  stats: StatValues;
  especialLabel: string;
  hint?: string;
  powers: PowersInfo;
  incognito?: boolean;
  displayName?: string;
  displayColor?: string;
}
