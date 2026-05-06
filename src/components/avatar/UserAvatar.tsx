import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";

type ClassNameProps = { className?: string }

export function UserAvatar({ className, ...rest }: ClassNameProps) {
    return (
        <Avatar className={cn("w-15 h-15 shrink-0", className)}>
            <AvatarImage
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                alt="user"
                {...rest}
            />
        </Avatar>
    )
}
