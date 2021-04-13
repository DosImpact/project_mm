// producer - consumer 사이의 job 데이터 인터페이스 정의합니다.

export interface CounterUpJob {
  diff: number;
}

export interface CounterDownJob {
  diff: number;
}

export interface collectOHLCVJob {
  code: string;
  startDate: string;
  endDate: string;
}
