import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

const authOptions: NextAuthOptions = {
  // In demo mode, skip the DB adapter — no Turso credentials are needed.
  ...(!isDemoMode && { adapter: PrismaAdapter(prisma) }),
  providers: isDemoMode
    ? [
        CredentialsProvider({
          id: 'demo',
          name: 'Demo',
          credentials: {},
          async authorize() {
            return {
              id: 'demo-user',
              name: 'Demo User',
              email: 'demo@example.com',
              image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
            };
          },
        }),
      ]
    : [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    signIn({ user }) {
      if (isDemoMode) return true;
      const allowedEmails = ['nicodemosgcosta@gmail.com', 'nicodemos.alvaro@gmail.com'];
      return allowedEmails.includes(user.email ?? '');
    },
  },
};

export default authOptions;
