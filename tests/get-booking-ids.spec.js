import request from 'supertest';
import { deleteAllBookings, generateBooking } from '../utils/';

const url = process.env.BASEURL;
const route = '/booking';

describe('GET ' + route, () => {
  beforeEach(async() => {
    await deleteAllBookings();
  });

  it('should return one list of two bookings', async() => {
    await generateBooking(2);

    const { body } = await request(url).get(route).expect(200);

    expect(body).toHaveLength(2);
  });

  it('should return an array empty', async() => {
    const { body } = await request(url).get(route).expect(200);

    expect(body).toEqual([]);
  });
});
