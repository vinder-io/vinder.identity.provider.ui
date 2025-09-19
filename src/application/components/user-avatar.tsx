import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProperties {
    userName: string;
    userImage?: string;
}

export function UserAvatar({ userName, userImage }: UserAvatarProperties) {
    const initials = userName?.trim()
        .slice(0, 2)
        .toUpperCase() ?? "?";

    return (
        <Avatar className="h-8 w-8">
            {userImage ? (
                <AvatarImage src={userImage} alt={userName} />
            ) : (
                <AvatarFallback>{initials}</AvatarFallback>
            )}
        </Avatar>
    );
}
