export interface ItemObject {
  id: number
  type: number
  content: string
  correct: string
  knowledge_id: number
  option_A: string
  option_B: string
  option_C: string
  option_D: string
  discrimination: number | undefined
  difficulty: number | undefined
  guessing: number | undefined
}

export interface ClassObject {
  id: number
  class_name: string
  create_time: string
  invitation_code: string
  teacher_id: number
}

export interface UserObject {
  id: number
  type: number
  number: string
  email: string
  realname: string
  token: string
  joined_class: number | undefined
}

export interface UnfinishedTest {
  isUnfinished: boolean
  unfinishedInfo:
    | {
        finish_object_test: boolean | null
        start_time: string
        test_id: number
      }
    | undefined
}

export interface GetParams {
  urlParams?: number
  params?: Record<string, unknown>
  success: any
  failure: any
}

export interface PostParams {
  urlParams?: number | null
  data: Record<string, unknown>
  success: any
  failure: any
}

export interface UploadParams {
  data: FormData
  success: any
  failure: any
}

export interface DeleteParams {
  urlParams?: number
  success: any
  failure: any
}
