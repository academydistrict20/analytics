import { AnalyticsClient } from './client'
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
})
