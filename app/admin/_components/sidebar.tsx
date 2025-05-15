"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SIDEBAR_MENU } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useUserStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Logout failed");
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <Link href={"/"} className="text-3xl font-semibold">
          alma
        </Link>
        <div className="flex flex-col gap-3">
          {SIDEBAR_MENU.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={cn(
                "text-xl",
                pathname === item.href ? "text-black" : "text-black/40"
              )}
              onClick={() => setOpen(false)} // close on mobile
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <p className="text-lg font-medium">Admin</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
        <button onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
        <span className="text-xl font-bold">alma</span>
        <div />
      </div>
      <aside className="hidden lg:flex border-r w-[250px] h-screen max-h-screen overflow-auto flex-col p-6">
        <SidebarContent />
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-[250px] bg-white p-6 shadow-lg">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
