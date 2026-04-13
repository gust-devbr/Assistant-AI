import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "../modal/AuthModal";
import { Button } from "../ui/button";

export function Header() {
    const { user, logout } = useAuth();

  {user ? (
        <Button onClick={logout}>Logout</Button>
    ) : (
        <AuthModal />
    )
}
};