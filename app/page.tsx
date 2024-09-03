"use client";

import Link from "next/link";
import { useSession } from "@clerk/nextjs";
import { FileIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { session } = useSession(); // isSignedIn
  const { toast } = useToast();

  const renderHello = () => {
    if (!session?.publicUserData) {
      return "Hello, Guest from Next Files App!";
    }

    const { firstName, lastName } = session.publicUserData;

    return `Hello, ${firstName} ${lastName} == Your Files will be here soon...`;
  };

  const clickHandler = () => {
    toast({
      variant: "success",
      title: "Something went wrong",
      description: "Your file could not be uploaded, try again later",
    });
  };

  return (
    <>
      <h1 className="text-2xl">{renderHello()}</h1>

      <Link href="/dashboard/files">
        <Button variant={"link"} className="flex gap-2">
          <FileIcon /> All Files
        </Button>
      </Link>
      <Button onClick={clickHandler}>Toast</Button>
    </>
  );
};

export default Home;
