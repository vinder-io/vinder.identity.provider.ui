import axios from "axios";

import { tenantStore } from "@/stores/tenant/tenant-store";
import { StorageKeys } from "@/constants/storage-keys";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_IDENTITY_PROVIDER_URI,
});

httpClient.interceptors.request.use(
    (instance) => {
        const tenant = tenantStore.getState().tenant;
        const token = localStorage.getItem(StorageKeys.AccessToken);

        if (tenant) {
            instance.headers["X-Tenant"] = tenant;
            instance.headers["Authorization"] = `Bearer ${token}`;
        }

        return instance;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default httpClient;
