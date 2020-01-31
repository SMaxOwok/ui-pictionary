const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export function request(endpoint, method = 'GET', params = {}) {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  headers.append('X-CSRF-Token', csrf);

  const options = {
    method: method,
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(params)
  }

  return fetch(endpoint, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  });
}
