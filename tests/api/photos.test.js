import {expect, test} from '@playwright/test';

test('Should retrieve photos from city', ({request}) => {
  return request.get('http://localhost:3000/api/photos?city=london')
    .then(response => {
      return expect(response.status()).toBe(200);
    })
});

test('Should fail when no city param', ({request}) => {
  return request.get('http://localhost:3000/api/photos')
    .then(response => {
      expect(response.status()).toBe(400);
      return response.json();
    })
    .then(json => {
      expect(json.error).toBe('city param is required');
    });
});
