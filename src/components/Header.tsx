import Image from "next/image";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import Link from "next/link";
import UserInfo from "./UserInfo";
const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-white">
      <div className="mx-auto  border-b border-gray-200  flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {/* Logo and Date */}
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/">
            <Image
              src={"/logo.jpg"}
              alt="Logo"
              width={40}
              height={40}
              className="shrink-0 rounded-md object-cover"
            />
          </Link>

          <div className="min-w-0">
            <h1 className="text-base font-bold text-gray-800 sm:text-lg">
              বাজার দর
            </h1>

            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>

        {/* Authentication Buttons */}
        <UserInfo />
      </div>
      <NavLinks />
      <Marquee />
    </header>
  );
};

export default Header;
