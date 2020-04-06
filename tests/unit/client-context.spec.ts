import { AnalyticsClient } from './../../src/client'
import { setupEnvironment, REFERRER } from './helpers/setup'
import { getNetworkMbps } from '../../src/context/utils'

let client: AnalyticsClient

describe('client.context', () => {
  beforeAll(() => {
    client = setupEnvironment()
  })

  test('is defined', () => {
    expect(client.context).toBeDefined()
  })

  test('has url', () => {
    expect(client.context?.url).toBeDefined()
  })

  test('has referrer', () => {
    expect(client.context?.referrer).toBeDefined()
    expect(client.context?.referrer).toBe(REFERRER)
  })

  test('has domain', () => {
    expect(client.context?.domain).toBeDefined()
    expect(client.context?.domain).toBe('www.website.com')
  })

  test('detects unique', () => {
    expect(client.context?.unique).toBeTruthy()
  })

  test('has path', () => {
    expect(client.context?.path).toBeDefined()
    expect(client.context?.path).toBe('/sub-path/index.html')
  })

  test('networkMbps is correct', () => {
    const mbps = getNetworkMbps([
      {
        size: 300000,
        start: 0,
        end: 1000,
      },
      {
        size: 300000,
        start: 0,
        end: 1000,
      },
    ])
    expect(mbps).toBe(2)
  })

  test('has networkMbps', () => {
    expect(client.context?.networkMbps).toBeDefined()
  })

  test('has width/height', () => {
    expect(client.context?.width).toBe(1024)
    expect(client.context?.height).toBe(768)
  })

  test('parses userAgent', () => {
    expect(client.context?.browser).toBe('Chrome')
    expect(typeof client.context?.browserVersion === 'string').toBeTruthy()
    expect(client.context?.browserVersion?.slice(0, 2)).toBe('80')
    expect(client.context?.os).toBe('Windows')
    expect(client.context?.platform).toBe('desktop')
  })

  test('parses UTM params', () => {
    expect(client.context?.utmMedium).toBe('email')
    expect(client.context?.utmSource).toBe('active users')
    expect(client.context?.utmCampaign).toBe('feature launch')
    expect(client.context?.utmContent).toBe('bottom cta button')
    expect(client.context?.utmTerm).toBe('turtles')
  })
})
