import { useEffect, useState } from "react";
import Form from "../components/reusables/form/Form";
import ShowIcon from "../assets/icons/view.png";
import HideIcon from "../assets/icons/hidden.png";

import styles from "./modules/SingIn.module.css";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [disbaled, setDisabled] = useState(true);

    function handleEmail(value: string) {
        setEmail(value);
    }

    function handlePassword(value: string) {
        setPassword(value);
    }

    function handleShowPassword() {
        setPasswordShown((prev) => !prev);
    }

    function handleSubmit(event: React.FormEvent) {
        event?.preventDefault();
        console.log(email, password);
    }

    useEffect(() => {
        if (email && password) {
            return setDisabled(false);
        }
        setDisabled(true);
    }, [email, password]);

    return (
        <div className={styles.main_container}>
            <div className={styles.upper_parent_container}>
                <div className={styles.container_left}></div>
                <div className={styles.container_mid}></div>
                <div className={styles.container_right}></div>
            </div>

            <div className={styles.parent_container}>
                <div className={styles.container}></div>

                <div className={styles.main_content}>
                    <h1>Welcome Back!</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            name="email"
                            value={email}
                            onChangeFunction={handleEmail}
                            type="email"
                            placeholder="Email Address"
                        />

                        <Form.Input
                            name="password"
                            value={password}
                            onChangeFunction={handlePassword}
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            icon={passwordShown ? ShowIcon : HideIcon}
                            iconFunction={handleShowPassword}
                        />

                        <Form.Button type="submit" name="submit" disabled={disbaled}>
                            Submit
                        </Form.Button>
                    </Form>
                </div>
                <div className={styles.container}></div>
            </div>
            <div className={styles.lower_parent_container}>
                <div className={styles.container_left}></div>
                <div className={styles.container_mid}></div>
                <div className={styles.container_right}></div>
            </div>
        </div>
    );
}
