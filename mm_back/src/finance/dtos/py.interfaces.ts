export enum PandasOHLCV_Columns {
  Date = 'Date',
  Open = 'Open',
  High = 'High',
  Low = 'Low',
  Close = 'Close',
  Volume = 'Volume',
  Change = 'Change',
}

export interface PandasOHLCV {
  columns: PandasOHLCV_Columns[];
  index: number[];
  data: number[][];
}
