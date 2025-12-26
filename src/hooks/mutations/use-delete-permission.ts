import { useMutation } from "@tanstack/react-query";
import { PermissionsClient } from "@/clients/permissions-client";

export function useDeletePermissionMutation(options?: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await PermissionsClient.deletePermissionAsync(id);
      if (result.isSuccess) return;
      throw result.error ?? "Unknown error";
    },
    ...options,
  });
}
