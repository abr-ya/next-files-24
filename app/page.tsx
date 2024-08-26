"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useSession } from "@clerk/nextjs";

const Home = () => {
  const { isLoaded, session } = useSession(); // isSignedIn
  console.log(isLoaded, session?.publicUserData);

  const renderHello = () => {
    if (!session?.publicUserData) {
      return "Hello, Guest from Next Files App!";
    }

    const { firstName, lastName } = session.publicUserData;

    return `Hello, ${firstName} ${lastName} == Your Files will be here soon...`;
  };

  return (
    <>
      <h1 className="text-2xl">{renderHello()}</h1>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>SignIn</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <h2>{}</h2>
        <SignOutButton>
          <Button variant="destructive">SignOut</Button>
        </SignOutButton>
      </SignedIn>
    </>
  );
};

export default Home;
