import { AnalyticsContext, getContext } from './context'
import { AnalyticsEvent, createPageViewEvent } from './events'

export interface AnalyticsClient {
  context: AnalyticsContext
  events: AnalyticsEvent[]
}

export default function createClient(): AnalyticsClient {
  const context = getContext()

  const client: AnalyticsClient = {
    context,
    events: [],
  }

  const pageViewEvent = createPageViewEvent({ context: context, data: {} })
  client.events.push(pageViewEvent)

  return client
}
