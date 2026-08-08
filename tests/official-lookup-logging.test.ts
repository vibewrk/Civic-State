import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { lookupFederalOfficials } = await import('../apps/api/src/lib/officials/congress.js');
const { lookupStateOfficials } = await import('../apps/api/src/lib/officials/openstates.js');
const { lookupLocalOfficials } = await import('../apps/api/src/lib/officials/cicero.js');

const originalOpenStatesKey = process.env.OPENSTATES_API_KEY;
const originalCiceroKey = process.env.CICERO_API_KEY;

function restoreEnv(name: 'OPENSTATES_API_KEY' | 'CICERO_API_KEY', value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

function loggedPayload(calls: unknown[][]): string {
  return calls
    .flat()
    .map((part) => (part instanceof Error ? `${part.name}: ${part.message}` : String(part)))
    .join('\n');
}

describe('official lookup fallback logging', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
    delete process.env.OPENSTATES_API_KEY;
    delete process.env.CICERO_API_KEY;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    restoreEnv('OPENSTATES_API_KEY', originalOpenStatesKey);
    restoreEnv('CICERO_API_KEY', originalCiceroKey);
  });

  it('does not log the raw ZIP when Census geocoder returns an error response', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      }),
    );

    await expect(lookupFederalOfficials('90210')).resolves.toEqual([]);

    expect(warnSpy).toHaveBeenCalledWith('Census geocoder returned 503 for requested ZIP');
    const payload = loggedPayload(warnSpy.mock.calls);
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('902');
  });

  it('redacts ZIP-like values from Census geocoder thrown errors', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network failure for /geocoder?zip=90210-1234')),
    );

    await expect(lookupFederalOfficials('90210')).resolves.toEqual([]);

    const payload = loggedPayload(warnSpy.mock.calls);
    expect(payload).toContain('[ZIP]');
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('90210-1234');
  });

  it('redacts ZIP-like values from Census geocoder error names', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const err = new Error('network failure');
    err.name = 'FetchError zip=90210-1234';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(err));

    await expect(lookupFederalOfficials('90210')).resolves.toEqual([]);

    const payload = loggedPayload(warnSpy.mock.calls);
    expect(payload).toContain('[ZIP]');
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('90210-1234');
  });

  it('does not throw or log the raw ZIP when an Error accessor throws', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('placeholder');
    Object.defineProperty(err, 'message', {
      get() {
        throw new Error('message accessor failed for /geocoder?zip=90210-1234');
      },
    });
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(err));

    await expect(lookupFederalOfficials('90210')).resolves.toEqual([]);

    const payload = loggedPayload([...warnSpy.mock.calls, ...errorSpy.mock.calls]);
    expect(payload).toContain('[unreadable error message]');
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('90210-1234');
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('does not throw or log the raw ZIP when an Error name accessor throws', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('network failure');
    Object.defineProperty(err, 'name', {
      get() {
        throw new Error('name accessor failed for /geocoder?zip=90210-1234');
      },
    });
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(err));

    await expect(lookupFederalOfficials('90210')).resolves.toEqual([]);

    const payload = loggedPayload([...warnSpy.mock.calls, ...errorSpy.mock.calls]);
    expect(payload).toContain('[unreadable error name]');
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('90210-1234');
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('redacts ZIP-like values from non-Error Census geocoder rejections', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue('network failure for /geocoder?zip=90210-1234'),
    );

    await expect(lookupFederalOfficials('90210')).resolves.toEqual([]);

    const payload = loggedPayload(warnSpy.mock.calls);
    expect(payload).toContain('[ZIP]');
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('90210-1234');
  });

  it('does not throw or log the raw ZIP when a non-Error rejection cannot be stringified', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const hostileRejection = {
      toString() {
        throw new Error('stringify failure for /geocoder?zip=90210-1234');
      },
    };
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(hostileRejection));

    await expect(lookupFederalOfficials('90210')).resolves.toEqual([]);

    const payload = loggedPayload([...warnSpy.mock.calls, ...errorSpy.mock.calls]);
    expect(payload).toContain('[unformattable official lookup error]');
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('90210-1234');
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('does not throw or log the raw ZIP when a rejection breaks instanceof checks', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const hostileRejection = new Proxy(
      {},
      {
        getPrototypeOf() {
          throw new Error('prototype lookup failed for /geocoder?zip=90210-1234');
        },
      },
    );
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(hostileRejection));

    await expect(lookupFederalOfficials('90210')).resolves.toEqual([]);

    const payload = loggedPayload([...warnSpy.mock.calls, ...errorSpy.mock.calls]);
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('90210-1234');
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('does not log the raw ZIP when OpenStates cannot map the requested ZIP', async () => {
    process.env.OPENSTATES_API_KEY = 'test-openstates-key';
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(lookupStateOfficials('00000')).resolves.toEqual([]);

    const payload = loggedPayload(warnSpy.mock.calls);
    expect(payload).toContain('Could not map requested ZIP to a state');
    expect(payload).not.toContain('00000');
    expect(payload).not.toContain('000');
  });

  it('does not log the raw ZIP when the Cicero local lookup stub is reached', async () => {
    process.env.CICERO_API_KEY = 'test-cicero-key';
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    await expect(lookupLocalOfficials('90210')).resolves.toEqual([]);

    const payload = loggedPayload(infoSpy.mock.calls);
    expect(payload).toContain('Cicero stub called for requested ZIP');
    expect(payload).not.toContain('90210');
    expect(payload).not.toContain('902');
  });
});
