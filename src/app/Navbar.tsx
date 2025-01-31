import { Suspense } from "react";

async function RightSide() {
    const user = null // fetch authenticated user

    if (!user) {
        return (
            <div>
                <button>Login</button>
                <button>Signup</button>
            </div>
        )
    }

    return (
        <div>
            <button>Logout</button>
        </div>
    )

}

export default function Navbar() {
    return (
        <div>
            <div>Left side</div>
            <Suspense fallback={<div>Loading...</div>}>
                <RightSide />
            </Suspense>
        </div>
    )
}