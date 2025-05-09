import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
    const container_ref = useRef(null);
    const density_factor = 0.00009;

    useEffect(() => {
        let engine;
        let resize_timeout;

        const current_id = "tsparticles";

        const calculate_particle_count = () => {
            const area = window.innerWidth * window.innerHeight;
            return Math.round(area * density_factor);
        };

        const load_particles = async (count) => {
            const { tsParticles } = await import("https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.1.0/+esm");
            const { loadAll } = await import("https://cdn.jsdelivr.net/npm/@tsparticles/all@3.1.0/+esm");

            engine = tsParticles;
            await loadAll(engine);

            const configs = {
                particles: {
                    number: {
                        value: count,
                        density: { enable: false }
                    },
                    color: { value: "#ffffff" },
                    links: { enable: true, distance: 200 },
                    shape: { type: "circle" },
                    opacity: { value: 1 },
                    size: { value: { min: 4, max: 6 } },
                    move: { enable: true, speed: 2 }
                },
                background: {
                    color: "transparent"
                },
                poisson: {
                    enable: true
                }
            };

            await engine.load({ id: current_id, options: configs });
        };

        const reload_particles = async () => {
            if (!engine) return;

            const count = calculate_particle_count();
            const existing = engine.domItem(0);
            if (existing) {
                await existing.load({
                    particles: {
                        ...existing.options.particles,
                        number: {
                            value: count,
                            density: { enable: false }
                        }
                    },
                    background: existing.options.background,
                    poisson: existing.options.poisson
                });
            }
        };

        const on_resize = () => {
            clearTimeout(resize_timeout);
            resize_timeout = setTimeout(() => {
                reload_particles();
            }, 300);
        };

        const init = async () => {
            const initial_count = calculate_particle_count();
            await load_particles(initial_count);
        };

        init();
        window.addEventListener("resize", on_resize);

        return () => {
            window.removeEventListener("resize", on_resize);
            clearTimeout(resize_timeout);
            engine?.domItem(0)?.destroy();
        };
    }, []);

    return <div id="tsparticles" ref={container_ref} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }} />;
}
