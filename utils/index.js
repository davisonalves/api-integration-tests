import request from 'supertest';
import { faker } from '@faker-js/faker';

const url = process.env.BASEURL;
const user = process.env.USER;
const pass = process.env.PASS;

const route = '/booking';

function generatePayload() {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    totalprice: faker.datatype.number(),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: faker.date.past(),
      checkout: faker.date.future()
    }
  };
}

async function deleteAllBookings() {
  const { body } = await request(url).get(route);

  const promisses = body.map(async(_element, indice) => {
    await request(url).delete(route + `/${body[indice].bookingid}`).set('Accept', 'application/json').auth(user, pass);
  });

  await Promise.all(promisses);
};

async function generateBooking(quantity = 1) {
  for (let index = 0; index < quantity; index++) {
    const payload = generatePayload();
    await request(url).post(route).set('Accept', 'application/json').send(payload);
  }
}

export { generatePayload, deleteAllBookings, generateBooking };
