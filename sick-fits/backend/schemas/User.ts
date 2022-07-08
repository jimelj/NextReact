import { password, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true }),
    password: password(),
    // TODO: Add roles, cart and orders
  },
});
