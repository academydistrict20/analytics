import uuid from 'uuid/v1'
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
}

export interface AnalyticsEvent {
  id: string
  type: string
  label: string
  timestamp: number
  data: AnalyticsEventData
  context: AnalyticsContext
}

export function createPageViewEvent(options: {
  context: AnalyticsContext
  data: AnalyticsEventData
  timestamp?: number
}): AnalyticsEvent {
  return {
    id: uuid(),
    label: 'Page View',
    type: EventTypes.pageView,
    data: {},
    context: options.context,
    timestamp: new Date().valueOf(),
  }
}

export function createActionEvent(options: {
  label: string | null
  context: AnalyticsContext
  data: AnalyticsEventData
  event?: Event
  element?: Element
  timestamp?: number
}): AnalyticsEvent {
  // Try and resolve the element
  const element = options.element || (options.event?.target as Element)

  // Create new event
  const event: AnalyticsEvent = {
    id: uuid(),
    label: options.label || 'Action',
    type: EventTypes.action,
    data: {},
    context: options.context,
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

export function createClickEvent(options: {
  label: string | null
  context: AnalyticsContext
  data: AnalyticsEventData
  timestamp?: number
  event?: Event
  element?: Element
}): AnalyticsEvent {
  return { ...createActionEvent(options), label: options.label || 'Click', type: EventTypes.click }
}
