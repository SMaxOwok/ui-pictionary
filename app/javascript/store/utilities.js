const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export function request(endpoint, method = 'GET', params = {}) {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  headers.append('X-CSRF-Token', csrf);

  return fetch(endpoint, {
    method: method,
    headers: headers,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(params)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  });
}
