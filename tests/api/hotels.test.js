import {expect, test} from '@playwright/test';

test('Should retrieve hotels from coords', ({request}) => {
  return request.get('http://localhost:3000/api/hotels?lat=48.8&lon=2.2')
    .then(response => {
      return expect(response.status()).toBe(200);
    })
});

test('Should fail without coords', ({request}) => {
  return request.get('http://localhost:3000/api/hotels')
    .then(response => {
      expect(response.status()).toBe(400);
      return response.json();
    })
    .then(json => {
      expect(json.error).toBe('lat/lon pair param is required');
    });
});

test('Should have hotels object in response', async ({request}) => {
    const _response = await request.get('http://localhost:3000/api/hotels?lat=48.8&lon=2.2')
    let firstObjResp = await _response.json();
    firstObjResp = firstObjResp[0];
    expect(await firstObjResp).toMatchObject({
        chainCode: 'NN',
        iataCode: 'PAR',
        dupeId: 700091187,
        name: 'CAMPANILE PARIS OUEST - CHAVILLE',
        hotelId: 'NNPARC28',
        geoCode: { latitude: 48.81212, longitude: 2.18867 },
        address: { countryCode: 'FR' },
        distance: { value: 1.58, unit: 'KM' }
      })
  });
  