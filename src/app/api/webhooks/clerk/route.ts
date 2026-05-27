// app/api/webhooks/clerk/route.ts
import Env from '@/env';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

import { prisma } from '@/lib/prisma';

type ClerkEmailAddress = {
  email_address?: string;
  verification?: {
    status?: string;
  };
};

type ClerkUserWebhookData = {
  id?: string;
  first_name?: string | null;
  last_name?: string | null;
  image_url?: string | null;
  email_addresses?: ClerkEmailAddress[];
};

type ClerkWebhookEvent = {
  type: string;
  data: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isClerkWebhookEvent = (event: unknown): event is ClerkWebhookEvent =>
  isRecord(event) && typeof event.type === 'string' && 'data' in event;

const isClerkUserWebhookData = (data: unknown): data is ClerkUserWebhookData =>
  isRecord(data);

const isUserWebhookEvent = (
  event: ClerkWebhookEvent
): event is ClerkWebhookEvent & {
  type: 'user.created' | 'user.updated';
  data: ClerkUserWebhookData;
} =>
  (event.type === 'user.created' || event.type === 'user.updated') &&
  isClerkUserWebhookData(event.data);

const getPrimaryEmail = (data: ClerkUserWebhookData) =>
  data.email_addresses?.find((email) => email.email_address);

export async function POST(req: Request) {
  const { CLERK_WEBHOOK_SECRET } = Env;
  if (!CLERK_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    );
  }

  const body = await req.text();

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);
  let evt: ClerkWebhookEvent;

  try {
    const verifiedEvent = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });

    if (!isClerkWebhookEvent(verifiedEvent)) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    evt = verifiedEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 400 }
    );
  }

  if (isUserWebhookEvent(evt)) {
    const { data } = evt;
    const primaryEmail = getPrimaryEmail(data);

    if (!data.id || !primaryEmail?.email_address) {
      return NextResponse.json(
        { error: 'Invalid user webhook payload' },
        { status: 400 }
      );
    }

    const name = data.first_name
      ? `${data.first_name} ${data.last_name || ''}`.trim()
      : null;
    const emailVerified =
      primaryEmail.verification?.status === 'verified' ? new Date() : null;

    try {
      await prisma.user.upsert({
        where: { clerkId: data.id },
        update: {
          name,
          email: primaryEmail.email_address,
          emailVerified,
          image: data.image_url || null,
          updatedAt: new Date(),
        },
        create: {
          clerkId: data.id,
          name,
          email: primaryEmail.email_address,
          emailVerified,
          image: data.image_url || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Prisma error:', error);
      return NextResponse.json(
        { error: 'Failed to process user data' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
