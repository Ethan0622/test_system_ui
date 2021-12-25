export interface ItemObject {
  content: string
  id: number
  type: number
  option_A: string | null
  option_B: string | null
  option_C: string | null
  option_D: string | null
}

export interface postParams {
  urlParams?: number | null
  data: Record<string, unknown>
  success: any
  failure: any
}

export interface getParams {
  urlParams?: number
  success: any
  failure: any
}
