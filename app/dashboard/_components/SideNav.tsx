"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-40 flex flex-col gap-4">
      <h2>Navigation ...</h2>
      <Link href="/dashboard/files">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes("/dashboard/files"),
          })}
        >
          <FileIcon /> All Files
        </Button>
      </Link>

      {/* todo: favourites */}

      {/* todo: trash */}
    </div>
  );
};

export default SideNav;
