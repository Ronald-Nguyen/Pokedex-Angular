export interface Pokemon {
    id: number;
    name: string;
    sprite_front: string;
    sprite_back: string;
    weight: number;
    base_experience: number;
    height: number;
    abilities:string[];
    liked: boolean;
  }