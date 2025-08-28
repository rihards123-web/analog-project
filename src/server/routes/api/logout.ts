import { defineEventHandler, deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'user_id');
  return { message: 'Izrakstīšanās veiksmīga' };
});