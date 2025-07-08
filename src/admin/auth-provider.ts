import { DefaultAuthProvider } from 'adminjs';

import componentLoader from './component-loader.js';
import { DEFAULT_ADMIN } from './constants.js';

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    console.log("email",email,'password',password, DEFAULT_ADMIN.password);
    if (email === DEFAULT_ADMIN.email && password == DEFAULT_ADMIN.password ) {
      return { email };
    }

    return null;
  },
});

export default provider;
