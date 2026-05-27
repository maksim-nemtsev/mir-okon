import { SignUp } from '@clerk/nextjs';

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SignUpPage() {
  if (!clerkPublishableKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--background) px-4 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-(--foreground)">
            Authentication is not configured
          </h1>
          <p className="mt-3 max-w-md text-(--muted-foreground)">
            Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to enable sign up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--background)">
      <SignUp />
    </div>
  );
}
