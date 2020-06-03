// TODO: Test this
import * as Sentry from '@sentry/browser';

class ReusableRequest {
  makeRequest(address, queryParams) {
    const result = new Promise((resolve) => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        if (this.controller) this.controller.abort();

        const controller = new AbortController();
        const { signal } = controller;
        const url = new URL(address);
        const params = new URLSearchParams(queryParams);
        url.search = params;
        this.controller = controller;

        fetch(url, { signal })
          .then((response) => resolve(response.json()))
          .catch((error) => Sentry.captureException(error));
      }, 500);
    });
    return result;
  }
}

export default ReusableRequest;
