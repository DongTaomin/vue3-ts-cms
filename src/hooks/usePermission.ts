import { useStore } from "vuex";

export function usePermission(pageName: string, handleName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;

  const verifyPermission = `system:${pageName}:${handleName}`;
  return Boolean(permissions.find((item: string) => item === verifyPermission));
}
