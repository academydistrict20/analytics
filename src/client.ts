import { AnalyticsContext, getContext } from './context'
import {
  AnalyticsEvent,
  pageViewEventFactory,
  AnalyticsEventData,
  actionEventFactory,
  clickEventFactory,
} from './events'

export interface AnalyticsClient {
  context: AnalyticsContext
  events: AnalyticsEvent[]
  pageView(options?: { label?: string; data?: AnalyticsEventData; timestamp?: number }): AnalyticsEvent
  click(options?: {
    label?: string
    data?: AnalyticsEventData
    event?: Event
    element?: Element
    timestamp?: number
  }): AnalyticsEvent
  action(options?: {
    label?: string
    data?: AnalyticsEventData
    event?: Event
    element?: Element
    timestamp?: number
  }): AnalyticsEvent
}

export default function createClient(): AnalyticsClient {
  const context = getContext()

  const client: AnalyticsClient = {
    context,
    events: [],
    pageView(options) {
      const event = pageViewEventFactory({ ...options, context })
      this.events.push(event)
      return event
    },
    click(options) {
      const event = clickEventFactory({ ...options, context })
      this.events.push(event)
      return event
    },
    action(options) {
      const event = actionEventFactory({ ...options, context })
      this.events.push(event)
      return event
    },
  }

  // TODO: Move into onload
  client.pageView()

  return client
}
