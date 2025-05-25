export interface Icon {
  color: string;
  id: string;
}

export interface Counter {
  id: string;
  name: string;
  icon: Icon;
  color: string;
  locked: boolean;
  count: number;
  stepSize: number;
}

export interface Settings {
  clickSound: boolean;
}
