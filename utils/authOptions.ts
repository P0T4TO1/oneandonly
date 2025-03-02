import NextAuth from 'next-auth';
import { getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';


import { dbUsers } from '../database';

export const authOptions = NextAuth({
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
    async session({ session, token, user }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
});

export const getSession = () => getServerSession(authOptions);