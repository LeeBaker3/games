import { FormEvent, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
    const { login, register, user, error, loading } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await login({ email, password });
    };

    const submitRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await register({ displayName, email, password });
    };

    return (
        <section className="auth-panel" aria-labelledby="login-title">
            <div className="section-heading">
                <p className="eyebrow">Accounts</p>
                <h2 id="login-title">Sign in or create an account</h2>
            </div>

            <p className="auth-summary">
                Accounts unlock leaderboards, profile details, and private multiplayer. Anonymous play
                stays available for supported single-player games.
            </p>

            {loading ? <p className="auth-status">Loading account status…</p> : null}
            {error ? <p className="auth-status auth-status--error">{error}</p> : null}

            <div className="auth-status">
                {user ? `Signed in as ${user.displayName}` : 'You are currently playing as a guest.'}
            </div>

            <div className="auth-grid">
                <form className="auth-card" onSubmit={submitLogin}>
                    <h3>Log in</h3>
                    <label>
                        Email
                        <input
                            autoComplete="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            autoComplete="current-password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                    <button type="submit">Log in</button>
                </form>

                <form className="auth-card" onSubmit={submitRegister}>
                    <h3>Create account</h3>
                    <label>
                        Display name
                        <input
                            autoComplete="nickname"
                            name="displayName"
                            type="text"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.target.value)}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            autoComplete="email"
                            name="registerEmail"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            autoComplete="new-password"
                            name="registerPassword"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </section>
    );
}
