import * as Bowser from 'bowser'
export interface AnalyticsContext {
  networkMbps: number | null
  url: string | null
  referrer: string | null
  domain: string | null
  path: string | null

  browser: string | null
  browserVersion: string | null
  os: string | null
  osVersion: string | null
  platform: string | null
  width: number | null
  height: number | null

  /**
   * Think of this as a channel.
   * e.g. Social, Organic, Paid, Email, Affiliates
   * @type {(string | null)}
   * @memberof AnalyticsContext
   */
  utmMedium: string | null
  /**
   * An individual source within a medium.
   * For example, Facebook would be one of the sources within
   * your Social medium for any unpaid links that you post to
   * Facebook. If you’re running a Facebook ad or spending money
   * to promote a link, you’d want to label Facebook as a source
   * within Paid. If you’re building a link for email,
   * define which list that you’re sending the email to
   * @type {(string | null)}
   * @memberof AnalyticsContext
   */
  utmSource: string | null
  /**
   * The specific campaign that you’re running.
   * Feel free to fill this in however it makes sense to you.
   * Names that allow you to easily identify product launches,
   * promotional campaigns, individual emails or posts, etc.
   * @type {(string | null)}
   * @memberof AnalyticsContext
   */
  utmCampaign: string | null
  /**
   * If you have multiple links in the same campaign,
   * like two links in the same email, you can fill in
   * this value so you can differentiate them.
   * For most marketers, this data is more detailed
   * than they really need.
   *
   * @type {(string | null)}
   * @memberof AnalyticsContext
   */
  utmContent: string | null
  /**
   * Search term used in relationship to this
   * action or page so you can track specific keywords
   * for paid organic campaigns. Not used very often.
   *
   * @type {(string | null)}
   * @memberof AnalyticsContext
   */
  utmTerm: string | null
}

interface AnalyticsClient {
  context: AnalyticsContext | null
}

function getNetworkMbps(): number {
  if (typeof window === undefined || !window.performance || !window.performance.getEntriesByType) return 0
  const mbpsSamples = window.performance
    .getEntriesByType('resource')
    .filter((r) => (r as PerformanceResourceTiming).transferSize && r.duration)
    .map(
      (r) =>
        ((r as PerformanceResourceTiming).transferSize * 8) /
        (((r as PerformanceResourceTiming).responseEnd - (r as PerformanceResourceTiming).responseStart) / 1000) /
        1000000,
    )

  return Math.round(mbpsSamples.reduce((a, b) => a + b) / mbpsSamples.length)
}

function getContext(): AnalyticsContext | null {
  if (typeof window === undefined) return null

  const ua = Bowser.getParser(window.navigator.userAgent)
  const params = new URLSearchParams(window.location.search.slice(1))

  return {
    networkMbps: getNetworkMbps(),
    url: window.location.href,
    referrer: document.referrer,
    domain: window.location.hostname,
    path: window.location.pathname,
    browser: ua.getBrowserName() || null,
    browserVersion: ua.getBrowserVersion() || null,
    os: ua.getOSName(),
    osVersion: ua.getOSVersion(),
    platform: ua.getPlatformType(),
    width: window.innerWidth,
    height: window.innerHeight,
    utmMedium: params.get('utm_medium'),
    utmSource: params.get('utm_source'),
    utmCampaign: params.get('utm_campaign'),
    utmContent: params.get('utm_content'),
    utmTerm: params.get('utm_term'),
  }
}

function createClient(): AnalyticsClient {
  const client: AnalyticsClient = {
    context: getContext(),
  }
  return client
}

export default createClient
