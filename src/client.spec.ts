import createClient, { AnalyticsClient } from './client'
import { setupEnvironment } from '../tests/unit/helpers/setup'
import { EventTypes } from './events/index'

let client: AnalyticsClient

describe('client', () => {
  beforeAll(() => {
    client = setupEnvironment()
  })

  it('has events', () => {
    expect(client.events).toBeDefined()
  })

  it('creates pageView event automatically', () => {
    expect(client.events.find((e) => e.type === EventTypes.pageView)).toBeDefined()
  })

  it('pageView() returns event with default label', () => {
    client.pageView({ data: { id: 'defualt-label' } })
    expect(client.events.find((e) => e.data.id === 'defualt-label' && e.label === 'Page View')).toBeDefined()
  })

  it('pageView() adds a new pageView event with data we specified', () => {
    client.pageView({ data: { id: 'page' } })
    expect(client.events.find((e) => e.type === EventTypes.pageView && e.data.id === 'page')).toBeDefined()
  })

  it('action() adds a new action event with label specified', () => {
    client.action({ label: 'Dismissed Notification' })
    expect(
      client.events.find((e) => e.type === EventTypes.action && e.label === 'Dismissed Notification'),
    ).toBeDefined()
  })

  it('click() adds a new click event with label specified', () => {
    client.click({ label: 'Clicked Buy' })
    expect(client.events.find((e) => e.type === EventTypes.click && e.label === 'Clicked Buy')).toBeDefined()
  })

  describe('errors', () => {
    it('error() adds a new error event with data specified', () => {
      client.error({
        label: 'Custom Error',
        data: {
          message: 'Error Message',
          source: 'file.js',
          lineno: 10,
          colno: 13,
          error: null,
        },
      })
      expect(client.events.find((e) => e.type === EventTypes.error && e.label === 'Custom Error')).toBeDefined()
    })
    it('throwing an error creates a new error event', () => {
      window.onerror?.call('', 'My Error', 'file.js', 1, 0)
      const errorEvent = client.events[client.events.length - 1]
      expect(window.onerror).toBeCalled
      expect(errorEvent).toBeDefined()
      expect(errorEvent?.data.message).toBe('My Error')
    })
  })
})
