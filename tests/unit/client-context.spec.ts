import { clear, mockUserAgent } from 'jest-useragent-mock'
import client from '../../src/client'
import { AnalyticsContext } from '../../src/context'

let context: AnalyticsContext | null
const agent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
const referrer = 'https://someothersite.com'
const path =
  '/sub-path/index.html?utm_medium=email&utm_source=active%20users&utm_campaign=feature%20launch&utm_content=bottom%20cta%20button&utm_term=turtles'

describe('client', () => {
  beforeAll(() => {
    // Set userAgent
    mockUserAgent(agent)
    // Set Referrer
    Object.defineProperty(document, 'referrer', { value: referrer, configurable: true })
    // Set window.location
    window.history.pushState({}, '', path)
    // Create client, store context
    context = client().context
  })
  afterAll(() => {
    clear()
  })
  test('exists', () => {
    expect(client).toBeDefined()
  })

  test('is function', () => {
    expect(typeof client).toBe('function')
  })

  test('returns with context', () => {
    expect(context).toBeDefined()
  })

  test('has url', () => {
    expect(context?.url).toBeDefined()
  })

  test('has referrer', () => {
    expect(context?.referrer).toBeDefined()
    expect(context?.referrer).toBe(referrer)
  })

  test('has domain', () => {
    expect(context?.domain).toBeDefined()
    expect(context?.domain).toBe('www.website.com')
  })

  test('has path', () => {
    expect(context?.path).toBeDefined()
    expect(context?.path).toBe('/sub-path/index.html')
  })

  test('has networkMbps', () => {
    expect(context?.networkMbps).toBeDefined()
  })

  test('has width/height', () => {
    expect(context?.width).toBe(1024)
    expect(context?.height).toBe(768)
  })

  test('parses userAgent', () => {
    expect(context?.browser).toBe('Chrome')
    expect(typeof context?.browserVersion === 'string').toBeTruthy()
    expect(context?.browserVersion?.slice(0, 2)).toBe('80')
    expect(context?.os).toBe('Windows')
    expect(context?.platform).toBe('desktop')
  })

  test('parses UTM params', () => {
    expect(context?.utmMedium).toBe('email')
    expect(context?.utmSource).toBe('active users')
    expect(context?.utmCampaign).toBe('feature launch')
    expect(context?.utmContent).toBe('bottom cta button')
    expect(context?.utmTerm).toBe('turtles')
  })
})
