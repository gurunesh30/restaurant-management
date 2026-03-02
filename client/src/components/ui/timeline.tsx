import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: React.ReactNode;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="w-full font-sans" ref={containerRef}>
            <div ref={ref} className="relative max-w-7xl mx-auto pb-20 px-4 md:px-8">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row justify-start pt-10 md:pt-28 md:gap-8"
                    >
                        {/* ── Left: sticky floor label ── */}
                        <div className="sticky z-40 top-28 self-start md:w-[280px] lg:w-[320px] flex-shrink-0 mb-6 md:mb-0">
                            {/* Dot on the line */}
                            <div
                                className="absolute w-[18px] h-[18px] rounded-full border-[3px] flex items-center justify-center"
                                style={{
                                    left: '21px',
                                    top: '4px',
                                    borderColor: 'var(--primary-color)',
                                    backgroundColor: 'var(--bg-light)',
                                    zIndex: 10,
                                }}
                            >
                                <div
                                    className="w-[7px] h-[7px] rounded-full"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                />
                            </div>

                            {/* Floor details – offset right of the line */}
                            <div className="pl-14">
                                {item.title}
                            </div>
                        </div>

                        {/* ── Right: content (table grid) ── */}
                        <div className="pl-14 md:pl-0 w-full">
                            {item.content}
                        </div>
                    </div>
                ))}

                {/* ── Vertical progress line ── */}
                <div
                    className="absolute top-0 overflow-hidden w-[3px]"
                    style={{ height: height + "px", left: '29px' }}
                >
                    {/* Background track */}
                    <div
                        className="absolute inset-0 w-full"
                        style={{
                            background: 'linear-gradient(to bottom, transparent 0%, rgba(128,128,128,0.15) 10%, rgba(128,128,128,0.15) 90%, transparent 100%)',
                        }}
                    />
                    {/* Active fill – purple to blue gradient */}
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-full rounded-full"
                    >
                        <div
                            className="absolute inset-0 w-full rounded-full"
                            style={{
                                background: 'linear-gradient(to bottom, #8b5cf6, #3b82f6, transparent)',
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
