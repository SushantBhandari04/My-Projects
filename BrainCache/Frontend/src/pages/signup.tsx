import { useNavigate } from "react-router-dom";
import SignPage from "./signPage";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Signup() {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    async function signUpButton() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            if (response.status === 200) {
                alert("Signed up successfully.");
                navigate("/braincache/user/signin");
            } else {
                handleErrors(response.data.message);
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                handleErrors(e.response.data.message);
            } else {
                console.log("Error:", e);
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    }

    function handleErrors(message: string) {
        switch (message) {
            case "User already exists.":
                alert("This user already exists.");
                break;
            case "Invalid credentials!":
                alert("Invalid credentials. Username must contain 3-20 characters. Password must contain 8-20 characters with atleast 1 uppercase, 1 lowercase, 1 integer and 1 special character.");
                break;
            case "Username must be at least 6 characters":
                alert("Username must be at least 6 characters long.");
                break;
            case "Password must include a number":
                alert("Password must include at least one number.");
                break;
            default:
                alert(message);
        }
    }

    return (
        <SignPage
            title="Sign Up"
            buttonOnClick={() => signUpButton()}
            usernameRef={usernameRef}
            passwordRef={passwordRef}
            subTitle="Already have an account?"
            linkPath="/braincache/user/signin"
            linkName="Signin"
        />
    );
}

export default Signup;
