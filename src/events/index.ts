import { v4 as uuid } from 'uuid'
import finder from '@medv/finder'
import { AnalyticsContext } from '../context'

export enum EventTypes {
  pageView = 'pageView',
  event = 'event',
  action = 'action',
  click = 'click',
  error = 'error',
}

export interface AnalyticsEventData {
  elementSelector?: string
  elementText?: string
  [key: string]: unknown
}

export interface AnalyticsEvent {
  id: string
  type: string
  label: string
  timestamp: number
  data: AnalyticsEventData
  context: AnalyticsContext
}

/**
 * Creates a new base AnalyticsEvent object
 *
 * @export
 * @param {{
 *   context: AnalyticsContext
 *   type?: EventTypes
 *   label?: string
 *   data?: AnalyticsEventData
 *   event?: Event
 *   element?: Element
 *   timestamp?: number
 * }} options
 * @returns {AnalyticsEvent}
 */
export function eventFactory(options: {
  context: AnalyticsContext
  type?: EventTypes
  label?: string
  data?: AnalyticsEventData
  event?: Event
  element?: Element
  timestamp?: number
}): AnalyticsEvent {
  // Try and resolve the element
  const element = options.element || (options.event?.target as Element)

  // Create new event
  const event: AnalyticsEvent = {
    id: uuid(),
    context: options.context,
    label: options.label || 'Event',
    type: options.type || EventTypes.event,
    data: {},
    timestamp: options.timestamp || new Date().valueOf(),
  }

  // If element exists, record details about it
  if (element != null) {
    event.data.elementSelector = finder(element)
    if (element.textContent != null) event.data.elementText = element.textContent.trim()
  }

  // Merge input data if any
  if (options.data && typeof options.data === 'object') {
    event.data = { ...event.data, ...options.data }
  }

  return event
}

export function errorEventFactory(options: {
  label?: string
  data?: AnalyticsEventData
  context: AnalyticsContext
  timestamp?: number
}): AnalyticsEvent {
  return { ...eventFactory(options), label: options.label || 'Error', type: EventTypes.error }
}

export function pageViewEventFactory(options: {
  label?: string
  data?: AnalyticsEventData
  context: AnalyticsContext
  timestamp?: number
}): AnalyticsEvent {
  return { ...eventFactory(options), label: options.label || 'Page View', type: EventTypes.pageView }
}

export function actionEventFactory(options: {
  context: AnalyticsContext
  data?: AnalyticsEventData
  label?: string
  event?: Event
  element?: Element
  timestamp?: number
}): AnalyticsEvent {
  return { ...eventFactory(options), label: options.label || 'Action', type: EventTypes.action }
}

export function clickEventFactory(options: {
  label?: string
  data?: AnalyticsEventData
  event?: Event
  element?: Element
  timestamp?: number
  context: AnalyticsContext
}): AnalyticsEvent {
  return { ...eventFactory(options), label: options.label || 'Click', type: EventTypes.click }
}
