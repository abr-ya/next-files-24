import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { LoginLogoutButton } from ".";

const Header = () => (
  <header className="min-h-[100px] relative z-10 border-b py-5 bg-gray-50 flex items-center">
    <div className="items-center container mx-auto justify-between flex">
      <Link href="/" className="flex gap-2 items-center text-xl text-black">
        <Image src="/logo.png" width="50" height="50" alt="file drive logo" />
        MyNextDrive
      </Link>

      {/* Link to My Files List */}

      <div className="flex gap-2">
        <OrganizationSwitcher />
        <UserButton />
        <LoginLogoutButton />
      </div>
    </div>
  </header>
);

export default Header;
