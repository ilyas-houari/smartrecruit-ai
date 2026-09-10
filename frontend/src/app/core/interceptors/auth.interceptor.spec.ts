import { HttpRequest } from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';


describe('authInterceptor', () => {

  beforeEach(() => {

    localStorage.clear();

  });


  it('attaches an Authorization header when a token is present', () => {

    localStorage.setItem('token', 'abc123');

    const request = new HttpRequest('GET', '/api/jobs');

    const next = vi.fn((req: HttpRequest<unknown>) => req);

    authInterceptor(request, next as never);

    const forwardedRequest = next.mock.calls[0][0] as HttpRequest<unknown>;

    expect(forwardedRequest.headers.get('Authorization')).toBe('Bearer abc123');

  });


  it('forwards the request unchanged when there is no token', () => {

    const request = new HttpRequest('GET', '/api/jobs');

    const next = vi.fn((req: HttpRequest<unknown>) => req);

    authInterceptor(request, next as never);

    const forwardedRequest = next.mock.calls[0][0] as HttpRequest<unknown>;

    expect(forwardedRequest.headers.has('Authorization')).toBe(false);
    expect(forwardedRequest).toBe(request);

  });

});
