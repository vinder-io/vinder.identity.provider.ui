import { useMutation } from "@tanstack/react-query";
import { PermissionsClient } from "@/clients/permissions-client";
import type { PermissionCreationScheme } from "@/types/permissions/permission-creation-scheme";
import type { Permission } from "@/types/identity/permission";
import { z } from "zod";

export const permissionCreationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters.").max(64, "Name must be at most 64 characters.").nonempty("Name is required."),
  description: z.string().max(256, "Description must be at most 256 characters.").optional().or(z.literal("")),
});

export function useCreatePermissionMutation(options?: {
  onSuccess?: (permission: Permission) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: async (data: PermissionCreationScheme) => {
      const result = await PermissionsClient.createPermissionAsync(data);
      if (result.isSuccess && result.data) return result.data;
      throw result.error ?? "Unknown error";
    },
    ...options,
  });
}
