import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ToastNotification } from "../entities/Toast";
import { useToastHook } from "../hooks/useToast";
import { revokeSession } from "../services/sessionService";
import useModalStore from "../stores/modals";
import useAccountStore from "../stores/user";
import FavoriteMoviesModal from "./movie/FavoriteMoviesModal";

const UserAvatarMenu = () => {
  const { setToast } = useToastHook();
  const { user, sessionId, removeUser, removeSessionId } = useAccountStore();
  const { setShowFavoriteMovie } = useModalStore();
  if (!user || !sessionId) return null;

  const onLogout = async () => {
    try {
      const { success } = await revokeSession(sessionId);
      if (!success) {
        throw new Error("Failed to log out");
      }

      const successToast: ToastNotification = {
        title: "Success",
        description: "You have been logged out.",
        status: "success",
        duration: 5000,
      };
      setToast(successToast);

      setTimeout(() => {
        removeUser();
        removeSessionId();
      }, 1000);
    } catch (err) {
      const errorToast: ToastNotification = {
        title: "Failed to logout",
        description: String(err),
        status: "error",
        duration: 5000,
      };
      setToast(errorToast);
    }
  };

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar size="sm" name={user.username} />
        </MenuButton>
        <MenuList>
          <MenuGroup title="My Lists" fontWeight="semibold">
            <MenuItem
              fontWeight="semibold"
              onClick={() => setShowFavoriteMovie(true)}
            >
              Favorite Movies
            </MenuItem>
            <MenuItem fontWeight="semibold">Favorite TV</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem onClick={onLogout}>
            <Text color="red.400" fontWeight="semibold">
              Logout
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <FavoriteMoviesModal />
    </>
  );
};

export default UserAvatarMenu;
