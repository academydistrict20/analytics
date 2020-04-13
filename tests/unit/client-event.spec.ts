import { AnalyticsClient } from './../../src/client'
import { setupEnvironment } from './helpers/setup'
import { EventTypes } from '../../src/events'

let client: AnalyticsClient

describe('client events', () => {
  beforeAll(() => {
    client = setupEnvironment()
  })

  test('exist', () => {
    expect(client.events).toBeDefined()
  })

  test('create PageView event', () => {
    expect(client.events.find((e) => e.type === EventTypes.pageView)).toBeDefined()
  })
})
