export interface StatValues {
  fuerza: number;
  inteligencia: number;
  carisma: number;
  suerte: number;
  combate: number;
  defensa: number;
  especialVal: number;
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
  variantData?: Record<string, VariantDetail>;
}

export interface CharacterDetail {
  id: string;
  name: string;
  category: string;
  isSecondary?: boolean;
  image: string;
  fullBody: string;
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
  loreNote?: string;
  extras?: Record<string, string>;
  portadaImages?: string[];
  fichaImages?: string[];
}
