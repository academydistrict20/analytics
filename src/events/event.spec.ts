import { AnalyticsClient } from '../client'
import { setupEnvironment } from '../../tests/unit/helpers/setup'
import { EventTypes, pageViewEventFactory, actionEventFactory, clickEventFactory } from '.'

let client: AnalyticsClient

describe('events', () => {
  beforeAll(() => {
    client = setupEnvironment()
  })

  describe('pageViewEventFactory', () => {
    it('outputs pageView event', () => {
      const event = pageViewEventFactory({
        context: client.context,
        data: {},
      })
      expect(event).toBeDefined()
      expect(event.type).toBe(EventTypes.pageView)
    })
  })

  describe('actionEventFactory', () => {
    beforeAll(() => {
      const el = document.createElement('button')
      el.id = 'my-btn'
      el.innerHTML = 'Btn Label'
      document.body.appendChild(el)
    })
    afterAll(() => {
      const el = document.getElementById('my-btn')
      if (el) document.body.removeChild(el)
    })

    it('outputs action event', () => {
      const event = actionEventFactory({
        label: 'User Performed Action',
        context: client.context,
        data: {},
      })
      expect(event).toBeDefined()
      expect(event.type).toBe(EventTypes.action)
    })

    it('given button element, returns element text', () => {
      const el = document.getElementById('my-btn')
      const event = actionEventFactory({
        label: 'User Performed Action',
        context: client.context,
        data: {},
        element: el || undefined,
      })
      expect(event.data.elementText).toBe('Btn Label')
    })

    it('given button element, returns element selector', () => {
      const el = document.getElementById('my-btn')
      const event = actionEventFactory({
        label: 'User Performed Action',
        context: client.context,
        data: {},
        element: el || undefined,
      })
      expect(event.data.elementSelector).toBe('#my-btn')
    })

    it('merges input data with output data', () => {
      const el = document.getElementById('my-btn')

      const event = actionEventFactory({
        label: 'User Performed Action',
        context: client.context,
        data: {
          someOtherData: 'some value',
        },
        element: el || undefined,
      })
      expect(event.data.someOtherData).toBe('some value')
      expect(event.data.elementSelector).toBe('#my-btn')
      expect(event.data.elementText).toBe('Btn Label')
    })

    it('given just an event, returns element selector', (done) => {
      const el = document.getElementById('my-btn')
      if (el) {
        el.addEventListener('click', (e) => {
          const event = actionEventFactory({
            label: 'User Performed Action',
            context: client.context,
            data: {},
            event: e,
          })

          expect(event.data.elementSelector).toBe('#my-btn')

          done()
        })

        el.click()
      }
    })
  })

  describe('clickEventFactory', () => {
    beforeAll(() => {
      const el = document.createElement('button')
      el.id = 'my-btn'
      el.innerHTML = 'Btn Label'
      document.body.appendChild(el)
    })
    afterAll(() => {
      const el = document.getElementById('my-btn')
      if (el) document.body.removeChild(el)
    })

    it('outputs click event', () => {
      const event = clickEventFactory({
        context: client.context,
        data: {},
      })
      expect(event).toBeDefined()
      expect(event.type).toBe(EventTypes.click)
    })

    it('outputs allows label override', () => {
      const event = clickEventFactory({
        label: 'Clickity',
        context: client.context,
        data: {},
      })
      expect(event).toBeDefined()
      expect(event.label).toBe('Clickity')
    })
  })
})
