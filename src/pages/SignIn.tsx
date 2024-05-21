import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleShowPassword() {
        setPasswordShown((prev) => !prev);
    }

    return (
        <div>
            <label>
                <div>Email:</div>

                <input value={email} onChange={(event) => handleEmail(event)} name="email" />
            </label>
            <label>
                <div>Password:</div>
                <input
                    value={password}
                    onChange={(event) => handlePassword(event)}
                    type={passwordShown ? "text" : "password"}
                    name="password"
                />
            </label>
            <button
                type="button"
                onClick={() => {
                    handleShowPassword();
                }}
            >
                Show Password
            </button>
        </div>
    );
}
