import { FormEvent, useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

export function ProfilePage() {
    const { user, updateProfile, logout, error } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName ?? '');

    useEffect(() => {
        setDisplayName(user?.displayName ?? '');
    }, [user?.displayName]);

    const submitProfile = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateProfile({ displayName });
    };

    return (
        <section className="auth-panel" aria-labelledby="profile-title">
            <div className="section-heading">
                <p className="eyebrow">Profile</p>
                <h2 id="profile-title">Current user profile</h2>
            </div>

            <p className="auth-summary">
                Update the display name used in scores and multiplayer rooms. Anonymous play does not
                require an account.
            </p>

            {error ? <p className="auth-status auth-status--error">{error}</p> : null}

            {user ? (
                <>
                    <dl className="profile-details">
                        <div>
                            <dt>Display name</dt>
                            <dd>{user.displayName}</dd>
                        </div>
                        <div>
                            <dt>Email</dt>
                            <dd>{user.email}</dd>
                        </div>
                        <div>
                            <dt>Provider</dt>
                            <dd>{user.authProvider ?? 'password'}</dd>
                        </div>
                    </dl>

                    <form className="auth-card" onSubmit={submitProfile}>
                        <label>
                            Display name
                            <input
                                name="profileDisplayName"
                                type="text"
                                value={displayName}
                                onChange={(event) => setDisplayName(event.target.value)}
                            />
                        </label>
                        <button type="submit">Save profile</button>
                        <button type="button" onClick={() => logout()}>
                            Log out
                        </button>
                    </form>
                </>
            ) : (
                <p className="auth-status">No account is signed in yet.</p>
            )}
        </section>
    );
}
