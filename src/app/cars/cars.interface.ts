export interface ICar {
  id: number;
  marca: string;
  linea: string;
  referencia: string;
  modelo: Date;
  kilometraje: number;
  color: string;
  imagen: string;
}


export interface ITotalCars {
  nombre: string;
  cantidad: number;
}
