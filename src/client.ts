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

export default function createClient(options?: { disableErrorWatching?: boolean }): AnalyticsClient {
  options = options || { disableErrorWatching: false }

  const context = getContext()

  const client: AnalyticsClient = {
    context,
    events: [],

    pageView(options) {
      const event = eventFactory({
        label: 'Page View',
        ...options,
        type: EventTypes.pageView,
        context,
      })
      this.events.push(event)
      return event
    },

    click(options) {
      const event = eventFactory({ label: 'Click', ...options, type: EventTypes.click, context })
      this.events.push(event)
      return event
    },

    action(options) {
      const event = eventFactory({ label: 'Action', ...options, type: EventTypes.action, context })
      this.events.push(event)
      return event
    },

    error(options) {
      const event = eventFactory({ label: 'Error', ...options, type: EventTypes.error, context })
      this.events.push(event)
      return event
    },
  }

  const handleError: OnErrorEventHandlerNonNull = (
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error,
  ) => {
    client.error({
      data: { message, source, lineno, colno, error },
    })
  }

  // TODO: Move into onload
  client.pageView()

  if (!options.disableErrorWatching) {
    window.onerror = handleError
  }

  return client
}
