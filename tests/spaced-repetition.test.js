import assert from 'node:assert/strict';
import { nextIntervalHours, scheduleReview, nodeShouldFade, hoursUntilFade } from '../lib.js';

assert.equal(nextIntervalHours(0, true), 1);
assert.equal(nextIntervalHours(2, true), 6);
assert.equal(nextIntervalHours(3, false), 6);
assert.equal(scheduleReview(new Date('2026-01-01T00:00:00.000Z'), 1, true).toISOString(), '2026-01-01T02:00:00.000Z');
assert.equal(nodeShouldFade('2026-01-01T00:00:00.000Z', new Date('2026-01-02T00:00:00.000Z')), true);
assert.equal(hoursUntilFade('2026-01-02T12:00:00.000Z', new Date('2026-01-02T10:00:00.000Z')), 2);

console.log('spaced repetition tests passed');
