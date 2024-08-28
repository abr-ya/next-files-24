"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { LoginLogoutButton } from "./_components";

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

  const createFileMutation = useMutation(api.files.createFile);
  const allFiles = useQuery(api.files.getFiles);

  const createFileHandler = () => {
    createFileMutation({ name: "HelloWorld" });
  };

  return (
    <>
      <h1 className="text-2xl">{renderHello()}</h1>

      <LoginLogoutButton />

      {allFiles?.map(({ _id: id, name }) => <div key={id}>file: {name}</div>)}

      <Button onClick={createFileHandler}>CreateFile</Button>
    </>
  );
};

export default Home;
