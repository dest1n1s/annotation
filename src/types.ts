export enum ErrorType {
  NoError,
  WrongOrder,
  Repeat,
  Incoherent,
  Unrelated,
  Missing,
  Other
}

export interface Step {
  content: string
  type: ErrorType
  info?: string
  checked: boolean
}
