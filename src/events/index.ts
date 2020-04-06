import { AnalyticsContext } from '../context'

export interface AnalyticsEvent extends AnalyticsContext {
  id: string
  type: string
  label: string
  timestamp: number
  data: never | null
}
