import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req) => {
  if (req.user) {
    delete req.user.password;
    return req.user;
  }
  return undefined;
});
