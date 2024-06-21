import {PostHog} from 'posthog-node'
import {tldevDb} from './db.js'

export async function trackEvent(event: string, properties: any = {}) {
  const client = new PostHog('phc_N8gp4UfqK0IGNWq9S6IApE04VG9wF1kM198mKzFqKC0', {
    host: 'https://us.i.posthog.com',
    disableGeoip: false,
  })
  client.capture({
    distinctId: tldevDb.data.user.distinctId,
    event: event,
    properties: {
      ...properties,
      platform: tldevDb.data.user.platform,
    },
  })
  // Send queued events immediately
  await client.shutdown()
}
