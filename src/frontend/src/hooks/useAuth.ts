import { useEffect, useState } from 'react';

import {
    getCurrentUser,
    loginAccount,
    logoutAccount,
    registerAccount,
    updateProfile,
} from '../services/authClient';
import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    UpdateProfilePayload,
    UserProfile,
} from '../types/api';

type AuthState = {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
};

const listeners = new Set<(state: AuthState) => void>();
let sharedState: AuthState = {
    user: null,
    loading: true,
    error: null,
};
let hydrationPromise: Promise<void> | null = null;

function publishState(partialState: Partial<AuthState>): void {
    sharedState = {
        ...sharedState,
        ...partialState,
    };
    listeners.forEach((listener) => listener(sharedState));
}

function subscribe(listener: (state: AuthState) => void): () => void {
    listeners.add(listener);
    listener(sharedState);
    return () => {
        listeners.delete(listener);
    };
}

async function hydrateAuthState(): Promise<void> {
    if (hydrationPromise) {
        return hydrationPromise;
    }

    hydrationPromise = getCurrentUser()
        .then((currentUser) => {
            publishState({ user: currentUser });
        })
        .catch(() => {
            publishState({ user: null });
        })
        .finally(() => {
            publishState({ loading: false });
        });

    return hydrationPromise;
}

export function useAuth() {
    const [state, setState] = useState<AuthState>(sharedState);

    useEffect(() => subscribe(setState), []);

    useEffect(() => {
        void hydrateAuthState();
    }, []);

    const runAuthAction = async (
        action: () => Promise<AuthResponse | UserProfile | { status: string }>,
    ): Promise<AuthResponse | UserProfile | { status: string }> => {
        try {
            publishState({ error: null });
            const result = await action();
            if ('user' in result) {
                publishState({ user: result.user });
            } else if ('displayName' in result) {
                publishState({ user: result });
            } else if ('status' in result && result.status === 'logged_out') {
                publishState({ user: null });
            }
            return result;
        } catch (actionError) {
            const message = actionError instanceof Error ? actionError.message : 'Request failed';
            publishState({ error: message });
            throw actionError;
        }
    };

    return {
        user: state.user,
        loading: state.loading,
        error: state.error,
        register: (payload: RegisterPayload) => runAuthAction(() => registerAccount(payload)),
        login: (payload: LoginPayload) => runAuthAction(() => loginAccount(payload)),
        logout: () => runAuthAction(() => logoutAccount()),
        updateProfile: (payload: UpdateProfilePayload) => runAuthAction(() => updateProfile(payload)),
    };
}
