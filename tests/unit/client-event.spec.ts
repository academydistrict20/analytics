import { AnalyticsClient } from './../../src/client'
import { setupEnvironment } from './helpers/setup'

let client: AnalyticsClient

describe('client eventts', () => {
  beforeAll(() => {
    client = setupEnvironment()
  })

  test('exist', () => {
    expect(client.events).toBeDefined()
  })
})
