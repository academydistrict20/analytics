import { AnalyticsContext, getContext } from './context'
import { AnalyticsEvent, AnalyticsEventData, EventTypes, eventFactory } from './events'

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
  error(options?: {
    label?: string
    data?: AnalyticsEventData
    event?: Event
    element?: Element
    timestamp?: number
    message?: string
    source?: string
    lineno?: number
    colno?: number
    error?: Error
  }): AnalyticsEvent
}

export default function createClient(): AnalyticsClient {
  const context = getContext()

  const client: AnalyticsClient = {
    context,
    events: [],
    pageView(options) {
      const event = eventFactory({
        ...options,
        label: options?.label || 'Page View',
        type: EventTypes.pageView,
        context,
      })
      this.events.push(event)
      return event
    },
    click(options) {
      const event = eventFactory({ ...options, label: options?.label || 'Click', type: EventTypes.click, context })
      this.events.push(event)
      return event
    },
    action(options) {
      const event = eventFactory({ ...options, label: options?.label || 'Action', type: EventTypes.action, context })
      this.events.push(event)
      return event
    },
    error(options) {
      const event = eventFactory({ ...options, label: options?.label || 'Error', type: EventTypes.error, context })
      this.events.push(event)
      return event
    },
  }

  // TODO: Move into onload
  client.pageView()

  return client
}
