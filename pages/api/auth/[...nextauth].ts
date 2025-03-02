import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import { dbUsers } from '../../../database';

export default NextAuth({
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo:',
          type: 'email',
          placeholder: 'correo@google.com',
        },
        password: {
          label: 'Contraseña:',
          type: 'password',
          placeholder: 'Contraseña',
        },
      },
      async authorize(credentials) {
        const user = await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
        if (user) {
          // with this line i cant get the user id
          return { ...user, id: user._id };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  session: {
    maxAge: 259200,
    strategy: 'jwt',
    updateAge: 8640,
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAUthToDbUser(
              user?.email || '',
              user?.name || '',
              user?.image || ''
            );
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-expect-error property accessToken does not exist on type 'Session' but it does
      session.accessToken = token.accessToken;
      session.user = token.user as typeof session.user;
      return session;
    },
  },
});
