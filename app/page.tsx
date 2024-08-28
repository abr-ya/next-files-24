"use client";

import { useMutation, useQuery } from "convex/react";
import { useOrganization, useSession, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

const Home = () => {
  const organization = useOrganization();
  const user = useUser();

  const ownerId = organization.isLoaded && user.isLoaded ? (organization.organization?.id ?? user.user?.id) : null;

  const { session } = useSession(); // isSignedIn

  const renderHello = () => {
    if (!session?.publicUserData) {
      return "Hello, Guest from Next Files App!";
    }

    const { firstName, lastName } = session.publicUserData;

    return `Hello, ${firstName} ${lastName} == Your Files will be here soon...`;
  };

  const createFileMutation = useMutation(api.files.createFile);
  const allFiles = useQuery(api.files.getFiles, ownerId ? { ownerId } : "skip");

  const createFileHandler = () => {
    if (!ownerId) {
      console.log("OwnerId is empty - exit...");
      return;
    }
    createFileMutation({ name: "HelloWorld", ownerId });
  };

  return (
    <>
      <h1 className="text-2xl">{renderHello()}</h1>

      {allFiles?.map(({ _id: id, name }) => <div key={id}>file: {name}</div>)}

      <Button onClick={createFileHandler}>CreateFile</Button>
    </>
  );
};

export default Home;
