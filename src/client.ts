import { AnalyticsContext, getContext } from './context'
import { AnalyticsEvent } from './events'

export interface AnalyticsClient {
  context: AnalyticsContext | null
  events: AnalyticsEvent[]
}

export default function createClient(): AnalyticsClient {
  const context = getContext()

  const client: AnalyticsClient = {
    context,
    events: [],
  }

  return client
}
