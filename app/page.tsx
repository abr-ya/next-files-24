"use client";

import { useMutation, useQuery } from "convex/react";
import { useSession } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

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

      {allFiles?.map(({ _id: id, name }) => <div key={id}>file: {name}</div>)}

      <Button onClick={createFileHandler}>CreateFile</Button>
    </>
  );
};

export default Home;
