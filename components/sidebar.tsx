"use client";
import AddIssueDialog from "@/components/add-issue-dialog";
import GoogleSignInButton from "@/components/google-sign-in-button";
import SidebarItem from "@/components/sidebar-item";
import SidebarProjects from "@/components/sidebar-projects";
import SignOutButton from "@/components/sign-out-button";
import { projectsState } from "@/states/projects-state";

import { userState } from "@/states/user-state";
import { IconList } from "@tabler/icons-react";
import Image from "next/image";
import { useRecoilValue } from "recoil";

type Props = {
  isLoadingUser: boolean;
};

export default function Sidebar({ isLoadingUser }: Props) {
  const user = useRecoilValue(userState);
  const projects = useRecoilValue(projectsState);

  return (
    <aside>
      <div className="h-screen w-52"></div>
      <nav className="fixed left-0 top-0 flex h-screen w-52 flex-col items-stretch border-r bg-white p-2">
        <div className="flex flex-1 flex-col gap-y-8">
          <div className="flex justify-between">
            <a href="/" className="flex items-center text-lg font-bold">
              <Image
                src="/img/snow-capped-mountain.png"
                alt="profile_avatar"
                width={32}
                height={32}
                className="mb-1 rounded-full"
              />
              Montabase
            </a>
            {projects.length > 0 && <AddIssueDialog />}
          </div>
          <div className="flex flex-col">
            <SidebarItem
              label="All issues"
              icon={<IconList size={16} />}
              link="/"
            />
            <SidebarProjects />
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-1">
          {user && (
            <>
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt="profile_avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              ) : (
                <div></div>
              )}
              <span className="truncate">{user.name}</span>
            </>
          )}
          {isLoadingUser ? null : user ? (
            <SignOutButton />
          ) : (
            <GoogleSignInButton />
          )}
        </div>
      </nav>
    </aside>
  );
}
