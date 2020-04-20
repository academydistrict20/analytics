import { v4 as uuid } from 'uuid'
import finder from '@medv/finder'
import { AnalyticsContext } from '../context'

export enum EventTypes {
  pageView = 'pageView',
  action = 'action',
  click = 'click',
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

export function pageViewEventFactory(options: {
  label?: string
  data?: AnalyticsEventData
  context: AnalyticsContext
  timestamp?: number
}): AnalyticsEvent {
  return {
    id: uuid(),
    label: options.label || 'Page View',
    type: EventTypes.pageView,
    data: options.data || {},
    context: options.context,
    timestamp: new Date().valueOf(),
  }
}

export function actionEventFactory(options: {
  context: AnalyticsContext
  data?: AnalyticsEventData
  label?: string
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
    label: options.label || 'Action',
    type: EventTypes.action,
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

export function clickEventFactory(options: {
  label?: string
  data?: AnalyticsEventData
  event?: Event
  element?: Element
  timestamp?: number
  context: AnalyticsContext
}): AnalyticsEvent {
  return { ...actionEventFactory(options), label: options.label || 'Click', type: EventTypes.click }
}
