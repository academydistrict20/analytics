import { AnalyticsContext, getContext } from './context'

export interface AnalyticsClient {
  context: AnalyticsContext | null
}

export default function createClient(): AnalyticsClient {
  const context = getContext()
  const client: AnalyticsClient = {
    context,
  }
  return client
}
