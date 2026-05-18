"use client";

export function NeonSpinnerPro({ size = 50 }: { size?: number }) {
    return (
        <>
            <div
                className="animate-spin"
                style={{
                    width: size, height: size,
                    boxShadow: "0 0 15px #60a5fa, 0 0 30px #3b82f6", borderRadius: "50px", borderTopColor: "rgb(96 165 250)", borderWidth: "4px", position: "absolute",
                }}
            ></div>
            <div
                className="animate-spin"
                style={{
                    width: size, height: size,
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                    boxShadow: "0 0 10px #3b82f6, 0 0 20px #1d4ed8", borderRadius: "50px", borderTopColor: "rgb(59 130 246)", position: "absolute"
                }}
            ></div>
        </>
    );
}