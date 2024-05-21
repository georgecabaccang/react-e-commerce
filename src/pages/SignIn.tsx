import { useState } from "react";
import Form from "../components/reusables/form/Form";
import ShowIcon from "../assets/icons/view.png";
import HideIcon from "../assets/icons/hidden.png";

import styles from "./modules/SingIn.module.css";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

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
                        >
                            Email:
                        </Form.Input>
                        <Form.Input
                            name="password"
                            value={password}
                            onChangeFunction={handlePassword}
                            type={passwordShown ? "text" : "password"}
                            icon={passwordShown ? ShowIcon : HideIcon}
                            iconFunction={handleShowPassword}
                        >
                            Password:
                        </Form.Input>
                        <Form.Button type="submit" name="submit">
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
