import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes";
import { useEffect } from "react";
import { messaging } from "./utils/config/firebaseConfig";
import { getToken } from "firebase/messaging";

const App = () => {
    async function requestNotificationPermission() {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging,
                {
                    vapidKey: 'BFW7vp64K3JejBgMZplSJhYPMbOSjHH7e0iU5Ng47eR7iM8PTF-r7wS2S7j47wi1MRi2HcA_HZfNLlbLNlJ5KZU'
                })
            console.log(token)
        } else if (permission === "denied") {
            alert("You have denied the notification permission.");
        }
    }

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
};

export default App;
