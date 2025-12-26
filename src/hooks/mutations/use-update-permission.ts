import { useMutation } from "@tanstack/react-query";
import { PermissionsClient } from "@/clients/permissions-client";
import type { Permission } from "@/types/identity/permission";
import { z } from "zod";

export const permissionEditSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters.").max(64, "Name must be at most 64 characters.").nonempty("Name is required."),
  description: z.string().max(256, "Description must be at most 256 characters.").optional().or(z.literal("")),
});

export function useUpdatePermissionMutation(options?: {
  onSuccess?: (permission: Permission) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { name: string; description?: string } }) => {
      const permission: Permission = {
        id,
        name: data.name,
        description: data.description ?? ""
      };
      const result = await PermissionsClient.updatePermissionAsync(id, permission);
      if (result.isSuccess && result.data) return result.data;
      throw result.error ?? "Unknown error";
    },
    ...options,
  });
}
