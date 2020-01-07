import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req) => {
  delete req.user.password;
  return req.user;
});
