import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LoginLogoutButton = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>SignIn</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <Button variant="destructive">SignOut</Button>
        </SignOutButton>
      </SignedIn>
    </>
  );
};

export default LoginLogoutButton;
