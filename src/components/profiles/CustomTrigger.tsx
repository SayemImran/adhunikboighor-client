import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";


type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    role?: string;
}
type CustomTriggerProps = {
    userData: User;
};


export default function CustomTrigger({ userData }: CustomTriggerProps) {

    const router = useRouter();
    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
        window.location.href = "/";
    }
    return (
        <Dropdown>
            <Dropdown.Trigger className="rounded-full">
                <Avatar>
                    <Avatar.Image
                        alt="Junior Garcia"
                        src={userData.image ?? undefined}

                    />
                    <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1 bg-white/15 p-5 shadow-[0_16px_50px_rgba(58,42,29,0.16)] backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <Avatar size="sm">
                            <Avatar.Image
                                alt="Jane"
                                src={userData.image ?? undefined}

                            />
                            <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                            <p className="text-sm leading-5 font-medium">{userData.name}</p>
                            <p className="text-xs leading-none text-muted">{userData.email}</p>
                        </div>
                    </div>
                </div>
                <Dropdown.Menu>

                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                        <Link href={`/dashboard/${userData.role ?? "buyer"}`}>
                            <Label>Dashboard</Label>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="profile" textValue="Profile">
                        <Label>Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item id="logout" textValue="Logout" variant="danger" onClick={handleSignOut}>
                        <div className="flex w-full items-center justify-between gap-2">
                            <Label>Log Out</Label>
                            <ArrowRightFromSquare className="size-3.5 text-danger" />
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}