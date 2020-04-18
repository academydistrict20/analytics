import { AnalyticsClient } from './client'
import { setupEnvironment } from '../tests/unit/helpers/setup'
import { EventTypes } from './events/index'

let client: AnalyticsClient

describe('client events', () => {
  beforeAll(() => {
    client = setupEnvironment()
  })

  it('exist', () => {
    expect(client.events).toBeDefined()
  })

  it('create PageView event', () => {
    expect(client.events.find((e) => e.type === EventTypes.pageView)).toBeDefined()
  })
})
