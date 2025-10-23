"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function FadeInWhenVisible({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.15, // Muncul saat 15% bagian terlihat
        triggerOnce: true, // Hanya animasi sekali
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
