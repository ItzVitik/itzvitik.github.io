// Set dynamic copyright year
        document.getElementById('year-copy').textContent = new Date().getFullYear();

        /* TYPEWRITER ANIMATION (Erasing & Retyping) */
        document.addEventListener('DOMContentLoaded', () => {
            const typewriterElement = document.getElementById("typewriter-text");
            if (typewriterElement) {
                const typewriterPhrases = [
                    "ItzVitik",
                    "Full-Stack Developer",
                    "Software Engineer",
                    "Discord Bot Architect",
                    "Minecraft Plugin Creator",
                    "Systems & API Engineer",
                    "itzvitik.dev"
                ];
                let phraseIndex = 0;
                let charIndex = typewriterPhrases[0].length;
                let isDeleting = true;
                let typeSpeed = 100;

                function typeLoop() {
                    const currentPhrase = typewriterPhrases[phraseIndex];
                    
                    if (isDeleting) {
                        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                        charIndex--;
                        typeSpeed = 40;
                    } else {
                        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                        charIndex++;
                        typeSpeed = 80;
                    }

                    if (!isDeleting && charIndex === currentPhrase.length) {
                        typeSpeed = 2000; // Pause at full word
                        isDeleting = true;
                    } else if (isDeleting && charIndex === 0) {
                        isDeleting = false;
                        phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
                        typeSpeed = 300; // Pause before typing next phrase
                    }

                    setTimeout(typeLoop, typeSpeed);
                }

                // Start typewriter loop
                setTimeout(typeLoop, 1500);
            }
        });

        /* CUSTOM RING CURSOR ANIMATION */
        const crosshair = document.getElementById('custom-crosshair');
        const cursorDot = document.getElementById('custom-cursor-dot');

        if (crosshair && cursorDot) {
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let crosshairX = mouseX;
            let crosshairY = mouseY;

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            });

            function renderCursor() {
                crosshairX += (mouseX - crosshairX) * 0.25;
                crosshairY += (mouseY - crosshairY) * 0.25;

                crosshair.style.left = `${crosshairX}px`;
                crosshair.style.top = `${crosshairY}px`;

                requestAnimationFrame(renderCursor);
            }
            renderCursor();

            // Hover effects on interactive elements
            const interactiveSelectors = 'a, button, input, textarea, .card-interactive, [onclick]';
            document.querySelectorAll(interactiveSelectors).forEach(el => {
                el.addEventListener('mouseenter', () => {
                    crosshair.style.width = '48px';
                    crosshair.style.height = '48px';
                    crosshair.style.borderColor = '#e3b39c';
                    crosshair.style.backgroundColor = 'rgba(210, 151, 126, 0.05)';
                });
                el.addEventListener('mouseleave', () => {
                    crosshair.style.width = '34px';
                    crosshair.style.height = '34px';
                    crosshair.style.borderColor = 'rgba(210, 151, 126, 0.85)';
                    crosshair.style.backgroundColor = 'transparent';
                });
            });
        }

        // Mobile navigation
        const mobileMenu = document.getElementById("mobile-menu");
        const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
        mobileMenuTrigger?.addEventListener("click", () => {
            mobileMenu?.classList.toggle("hidden");
        });
        document.querySelectorAll(".mobile-nav-link").forEach(link => {
            link.addEventListener("click", () => mobileMenu?.classList.add("hidden"));
        });

        // Copy Email function
        // Inline SVG icon set (no external icon-font dependency, so icons always render)
        const ICONS = {
            copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-inline"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
            check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-inline"><polyline points="20 6 9 17 4 12"></polyline></svg>',
            globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"></path></svg>',
            discord: '<svg viewBox="0 0 24 24" fill="currentColor" class="icon-inline"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.419 2.157-2.419 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.419 2.1569-2.419 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419Z"></path></svg>',
            "cubes-stacked": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-inline"><path d="M16.5 9.4 7.5 4.21"></path><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>',
            "shield-halved": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-inline"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><line x1="12" y1="2" x2="12" y2="22"></line></svg>',
            "wand-magic-sparkles": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-inline"><path d="m12 3-1.9 4.9L5 10l4.9 1.9L12 17l1.9-5.1L19 10l-5.1-2.1L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>',
            "code-merge": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-inline"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path></svg>'
        };

        // Shared clipboard helper (works even without the Clipboard API / on non-secure origins)
        function copyTextToClipboard(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
            } else {
                legacyCopy(text);
            }
        }
        function legacyCopy(text) {
            const input = document.createElement("textarea");
            input.value = text;
            input.style.position = "fixed";
            input.style.opacity = "0";
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
        }

        function copyEmail() {
            const email = "smithvitek@gmail.com";
            copyTextToClipboard(email);

            const btnText = document.getElementById("copy-email-btn-text");
            const btnIcon = document.getElementById("copy-email-btn-icon");
            if (btnText) {
                const originalText = btnText.textContent;
                const originalIconHTML = btnIcon ? btnIcon.innerHTML : null;
                btnText.textContent = "Copied!";
                if (btnIcon) btnIcon.innerHTML = ICONS.check;
                setTimeout(() => {
                    btnText.textContent = originalText;
                    if (btnIcon && originalIconHTML) btnIcon.innerHTML = originalIconHTML;
                }, 2000);
            }
        }

        // Generic "click anywhere on the row to copy" handler used by the
        // Find Me Everywhere cards (email / github / discord).
        function copyRow(rowEl, text) {
            if (!rowEl) return;
            copyTextToClipboard(text);

            rowEl.classList.add("is-copied");

            const defaultIcon = rowEl.querySelector(".copy-icon-default");
            const checkIcon = rowEl.querySelector(".copy-icon-check");
            if (defaultIcon) defaultIcon.classList.add("hidden");
            if (checkIcon) checkIcon.classList.remove("hidden");

            clearTimeout(rowEl._copyResetTimer);
            rowEl._copyResetTimer = setTimeout(() => {
                rowEl.classList.remove("is-copied");
                if (defaultIcon) defaultIcon.classList.remove("hidden");
                if (checkIcon) checkIcon.classList.add("hidden");
            }, 1800);
        }

        // Contact Form Submission Mock
        function handleContactSubmit(e) {
            e.preventDefault();
            const form = e.currentTarget;
            const name = form.querySelector('input[type="text"]')?.value.trim() || "";
            const email = form.querySelector('input[type="email"]')?.value.trim() || "";
            const message = form.querySelector('textarea')?.value.trim() || "";

            const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
            const body = encodeURIComponent(`Name / Company: ${name}\nEmail: ${email}\n\n${message}`);

            const btn = document.getElementById("contact-submit-btn");
            const btnIcon = document.getElementById("contact-submit-icon");
            const btnText = document.getElementById("contact-submit-text");
            if (btn && btnText && btnIcon) {
                const originalIconHTML = btnIcon.innerHTML;
                const originalText = btnText.textContent;
                btn.disabled = true;
                btnIcon.innerHTML = ICONS.check;
                btnText.textContent = "Opening your email app...";
                setTimeout(() => {
                    btn.disabled = false;
                    btnIcon.innerHTML = originalIconHTML;
                    btnText.textContent = originalText;
                }, 2500);
            }

            window.location.href = `mailto:smithvitek@gmail.com?subject=${subject}&body=${body}`;
        }

        // Escape key closes the full-page project view and mobile menu
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                if (!document.getElementById("project-page")?.classList.contains("hidden")) {
                    closeProjectPage();
                }
                mobileMenu?.classList.add("hidden");
            }
        });

        // Project data + dedicated URL slug for each project (e.g. /ethernalservercore)
        const projectsData = {
            logiclyweb: { slug:"logiclyweb", title:"Logicly Web", tag:"WEB APPLICATION", year:"2026", status:"Live", closed:false, tagline:"Custom storefront for digital goods, wired live into a Discord bot", role:"Full-Stack Developer", stack:"Node.js · React", icon:"fa-globe", bannerImage:"assets/img/project-logicly-web.jpg", desc:"A fully custom storefront for keys, accounts and skins, synced live with the Logicly Discord bot for orders, restocks and account linking — no off-the-shelf shop platform anywhere in the stack.", features:["Custom storefront, checkout and delivery flow built from scratch","Two-way sync with the Discord bot for orders, restocks and account linking","Admin panel operated through Discord instead of a separate dashboard"], link:"https://www.logicly.space" },
            logiclybot: { slug:"logiclydiscordbot", title:"Logicly Discord Bot", tag:"DISCORD BOT", year:"2026", status:"Private", closed:true, tagline:"The other half of Logicly — orders, restocks and admin from Discord", role:"Bot Developer", stack:"Node.js · Discord.js", icon:"fa-discord", bannerImage:"assets/img/project-logicly-bot.jpg", desc:"Handles order and restock events from the store in real time and exposes its entire admin panel as Discord commands. Private and not publicly invitable.", features:["Order and restock events pushed live from the store","Account linking between Discord users and store accounts","Full admin panel exposed as Discord commands"], link:"https://example.com" },
            voidex: { slug:"voidex", title:"play.voidex.cz", tag:"MINECRAFT SERVER", year:"2025", status:"Archived", closed:true, tagline:"The most custom-built server of the bunch, never publicly launched", role:"Builder & Developer", stack:"Java · Paper", icon:"fa-cubes-stacked", bannerImage:"assets/img/project-voidex.jpg", desc:"The most modern server I worked on — an in-house account manager and almost no off-the-shelf plugins. Ran earlier as starlex.cz and moonix.cz before folding.", features:["Custom account manager and core systems written from scratch","Latest Minecraft version, almost no off-the-shelf plugins","Never launched as voidex.cz — ran earlier as starlex.cz and moonix.cz"], link:"https://example.com" },
            gemoria: { slug:"gemoria", title:"play.gemoria.eu", tag:"MINECRAFT SERVER", year:"2024", status:"Archived", closed:true, tagline:"A gem-themed server shelved before it ever opened its doors", role:"Developer", stack:"Java · Paper", icon:"fa-cubes-stacked", bannerImage:"assets/img/project-gemoria.jpg", desc:"A gem-themed server built on custom jackpot, plot and infinite-pass plugins. Shelved before launch when the two owners fell out.", features:["Custom jackpot, plot and infinite pass plugins written in-house","Mixed stack of configured and fully custom plugins","Never officially launched — shelved after the owners fell out"], link:"https://example.com" },
            anxious: { slug:"anxiousbox", title:"Anxious Box", tag:"MINECRAFT · ELYTRAPVP", year:"2026", status:"Archived", closed:true, tagline:"A from-scratch ElytraPvP server that peaked at 45 players", role:"Owner", stack:"Skript · Java · Paper", icon:"fa-shield-halved", bannerImage:"assets/img/project-anxious-box.jpg", desc:"An ElytraPvP server with custom kits, arenas, economy and anticheat, all written in-house. Peaked at 45 concurrent players before closing.", features:["Fully custom ocean-themed map, hand-decorated so it fits the players perfectly","Custom ban & combat plugins plus an in-house anticheat with triggerbot, aim assist, rocket-boost and more checks","Launched with several updates shipped, closed once there wasn't enough time to keep maintaining it"], link:"https://example.com" }
        };

        // Build slug -> key lookup once
        const slugToKey = {};
        Object.keys(projectsData).forEach(k => { slugToKey[projectsData[k].slug] = k; });

        const PROJECT_ORDER = ["logiclyweb", "logiclybot", "voidex", "gemoria", "anxious"];

        function renderProjectPage(key) {
            const item = projectsData[key];
            if (!item) return false;

            document.getElementById("page-project-title").textContent = item.title;
            document.getElementById("page-project-year").textContent = item.year;
            document.getElementById("page-project-tagline").textContent = item.tagline || item.tag;
            document.getElementById("page-project-blurb").textContent = item.desc;

            const statusColors = {
                "Live": "emerald-400",
                "Production": "emerald-400",
                "Maintained": "emerald-400",
                "Private": "purple-400",
                "Research": "amber-400",
                "Prototype": "purple-400",
                "Beta": "amber-400",
                "Archived": "zinc-500"
            };
            const statusColor = statusColors[item.status] || "zinc-500";
            const pulse = statusColor === "emerald-400" ? " animate-pulse" : "";
            const statusEl = document.getElementById("page-project-status");
            statusEl.className = `inline-flex items-center gap-1.5 text-${statusColor}`;
            statusEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-${statusColor}${pulse}"></span> ${item.status}`;

            document.getElementById("project-page-url").textContent = `itzvitik.dev/#/${item.slug}`;
            document.getElementById("project-page-year-copy").textContent = new Date().getFullYear();
            document.title = `${item.title} · ItzVitik`;

            // Two short stat facts instead of a wall of prose: role + primary stack.
            const stackFirst = (item.stack || "").split(" · ").slice(0, 2).join(" + ");
            document.getElementById("page-project-stat1-value").textContent = item.role;
            document.getElementById("page-project-stat1-label").textContent = "role";
            document.getElementById("page-project-stat2-value").textContent = stackFirst;
            document.getElementById("page-project-stat2-label").textContent = "stack";

            // Primary action: live link, or an inert "Closed" / "Private" label when there's
            // nothing to actually open.
            const linkEl = document.getElementById("page-project-link");
            const linkText = document.getElementById("page-project-link-text");
            const linkIcon = document.getElementById("page-project-link-icon");
            if (item.closed) {
                linkEl.removeAttribute("href");
                linkEl.removeAttribute("target");
                linkEl.setAttribute("aria-disabled", "true");
                linkEl.classList.add("pointer-events-none", "text-zinc-600");
                linkEl.classList.remove("text-neon-orange", "hover:text-neon-glow");
                linkText.textContent = item.status === "Private" ? "Private" : "Closed";
                linkIcon.innerHTML = '<circle cx="12" cy="12" r="10"></circle><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"></line>';
            } else {
                linkEl.href = item.link;
                linkEl.target = "_blank";
                linkEl.removeAttribute("aria-disabled");
                linkEl.classList.remove("pointer-events-none", "text-zinc-600");
                linkEl.classList.add("text-neon-orange", "hover:text-neon-glow");
                linkText.textContent = "Live";
                linkIcon.innerHTML = '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>';
            }

            // Browser-chrome url bar above the hero shot.
            let heroUrl = `itzvitik.dev/#/${item.slug}`;
            if (!item.closed) {
                try { heroUrl = new URL(item.link).hostname.replace(/^www\./, ""); } catch (e) {}
            }
            document.getElementById("page-project-hero-url").textContent = heroUrl;

            const heroEl = document.getElementById("page-project-hero");
            const iconEl = document.getElementById("page-project-icon");
            if (item.bannerImage) {
                heroEl.style.backgroundImage = `url('${item.bannerImage}')`;
                iconEl.style.display = "none";
            } else {
                heroEl.style.backgroundImage = "";
                iconEl.style.display = "";
                iconEl.innerHTML = ICONS[item.icon.replace(/^fa-/, "")] || ICONS.globe;
            }

            // Highlights — short dash-led bullets instead of padded boxes.
            const list = document.getElementById("page-project-highlights");
            list.innerHTML = item.features.map(f =>
                `<li class="flex gap-3 text-sm text-zinc-300 leading-relaxed"><span class="text-neon-orange shrink-0 mt-0.5">&mdash;</span><span>${f}</span></li>`
            ).join("");

            // Built-with tags, reusing the same pill style as the Experience timeline.
            const tags = document.getElementById("page-project-tags");
            tags.innerHTML = (item.stack || "").split(" · ").map(t =>
                `<span class="tech-pill">${t}</span>`
            ).join("");

            // Next project footer link.
            const idx = PROJECT_ORDER.indexOf(key);
            const nextKey = PROJECT_ORDER[(idx + 1) % PROJECT_ORDER.length];
            window.__nextProjectKey = nextKey;
            document.getElementById("page-project-next-title").innerHTML =
                `${projectsData[nextKey].title} <span class="inline-block">&rarr;</span>`;

            return true;
        }

        // Wraps history.pushState so it never throws. Sandboxed preview environments
        // (e.g. srcdoc iframes used by some editors/AI tools) disallow pushing a URL
        // that doesn't match the document's real origin/location.
        function safePushState(state, url) {
            try {
                history.pushState(state, "", url);
            } catch (err) {
                // Silently ignore: deep-link URL updates just won't apply in this context.
            }
        }

        function openProjectPage(key, pushUrl = true) {
            if (!renderProjectPage(key)) return;
            const page = document.getElementById("project-page");
            page.classList.remove("hidden");
            page.scrollTop = 0;
            document.body.classList.add("overflow-hidden");

            if (typeof gsap !== "undefined") {
                gsap.killTweensOf(page);
                gsap.fromTo(page,
                    { autoAlpha: 0, y: 28 },
                    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }
                );
                const features = document.querySelectorAll("#page-project-features li");
                if (features.length) {
                    gsap.fromTo(features,
                        { opacity: 0, y: 18 },
                        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.2, ease: "power2.out" }
                    );
                }
            }

            if (pushUrl) {
                safePushState({ project: key }, `#/${projectsData[key].slug}`);
            }
        }

        function closeProjectPage(pushUrl = true) {
            const page = document.getElementById("project-page");
            const finish = () => {
                page?.classList.add("hidden");
                document.body.classList.remove("overflow-hidden");
                document.title = "ItzVitik · Full-Stack Developer Portfolio";
            };

            if (page && typeof gsap !== "undefined") {
                gsap.killTweensOf(page);
                gsap.to(page, { autoAlpha: 0, y: 20, duration: 0.3, ease: "power2.in", onComplete: finish });
            } else {
                finish();
            }

            if (pushUrl) {
                safePushState({}, "#/");
            }
        }

        // Deep-link support: opening itzvitik.dev/#/anxiousbox directly loads that project page.
        // Hash-based on purpose — GitHub Pages (and most static hosts) serve only real files,
        // so a path-based deep link like /anxiousbox would 404 on refresh or direct visit.
        // Everything after "#/" never leaves the browser, so index.html always loads first.
        function resolveHashRoute(pushUrl) {
            const hash = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
            if (hash && slugToKey[hash]) {
                openProjectPage(slugToKey[hash], pushUrl);
            } else {
                closeProjectPage(pushUrl);
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            const hash = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
            if (hash && slugToKey[hash]) {
                openProjectPage(slugToKey[hash], false);
            }
        });

        // Handle browser back/forward AND manual hash edits/links.
        window.addEventListener("popstate", () => resolveHashRoute(false));
        window.addEventListener("hashchange", () => resolveHashRoute(false));

        // Project Filter
        function filterProjects(category) {
            const buttons = document.querySelectorAll(".filter-btn");
            buttons.forEach(btn => {
                btn.classList.remove("bg-zinc-800", "text-white");
                btn.classList.add("text-zinc-400");
            });
            const activeButton = Array.from(buttons).find(btn => btn.dataset.filter === category);
            activeButton?.classList.add("bg-zinc-800", "text-white");
            activeButton?.classList.remove("text-zinc-400");

            const cards = document.querySelectorAll(".project-card");
            cards.forEach(card => {
                if (category === "all" || card.dataset.category === category) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        }

        // GSAP Scroll Reveal: sections & cards progressively fade/slide in as you scroll down the page
        window.addEventListener('load', () => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);

                const revealItems = gsap.utils.toArray(".reveal-item");
                gsap.set(revealItems, { opacity: 0, y: 28 });

                ScrollTrigger.batch(revealItems, {
                    start: "top 88%",
                    once: true,
                    onEnter: batch => gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "power2.out",
                        overwrite: true
                    })
                });
            }
        });

        /* =========================================================
           SKILL RADAR CHART + SKILL BARS
        ========================================================= */
        const skillsData = [
            { name: "Java", value: 88 },
            { name: "Discord.js", value: 92 },
            { name: "TypeScript", value: 84 },
            { name: "Node.js", value: 82 },
            { name: "React / Next", value: 78 },
            { name: "Databases", value: 76 },
            { name: "Docker / Linux", value: 70 },
            { name: "Networking", value: 66 }
        ];

        function renderSkillRadar(containerId, skills) {
            const el = document.getElementById(containerId);
            if (!el) return;
            const size = 320, center = size / 2, radius = 108;
            const angleSlice = (Math.PI * 2) / skills.length;
            const levels = 4;

            let ringsSVG = "";
            for (let l = 1; l <= levels; l++) {
                const r = (radius / levels) * l;
                const pts = skills.map((_, i) => {
                    const angle = angleSlice * i - Math.PI / 2;
                    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                }).join(" ");
                ringsSVG += `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>`;
            }

            let axesSVG = "", labelsSVG = "";
            skills.forEach((s, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const x2 = center + radius * Math.cos(angle);
                const y2 = center + radius * Math.sin(angle);
                axesSVG += `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>`;

                const lx = center + (radius + 26) * Math.cos(angle);
                const ly = center + (radius + 26) * Math.sin(angle);
                const anchor = Math.cos(angle) > 0.3 ? "start" : Math.cos(angle) < -0.3 ? "end" : "middle";
                labelsSVG += `<text x="${lx}" y="${ly}" fill="#a1a1aa" font-size="10.5" font-family="Fira Code, monospace" text-anchor="${anchor}" dominant-baseline="middle">${s.name}</text>`;
            });

            const dataPts = skills.map((s, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const r = radius * (s.value / 100);
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(" ");

            const dots = skills.map((s, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const r = radius * (s.value / 100);
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `<circle cx="${x}" cy="${y}" r="3.5" fill="#D2977E" stroke="#0e0e14" stroke-width="1.5"/>`;
            }).join("");

            el.innerHTML = `
                <svg viewBox="0 0 ${size} ${size}" class="w-full h-auto">
                    ${ringsSVG}
                    ${axesSVG}
                    <polygon points="${dataPts}" fill="rgba(210,151,126,0.26)" stroke="#D2977E" stroke-width="2" stroke-linejoin="round"/>
                    ${dots}
                    ${labelsSVG}
                </svg>`;
        }

        function renderSkillBars(containerId, skills) {
            const el = document.getElementById(containerId);
            if (!el) return;
            el.innerHTML = skills.map(s => `
                <div>
                    <div class="flex items-center justify-between font-mono text-xs mb-1.5">
                        <span class="text-zinc-300">${s.name}</span>
                        <span class="text-neon-orange font-bold">${s.value}%</span>
                    </div>
                    <div class="h-2 rounded-full bg-black border border-zinc-800 overflow-hidden">
                        <div class="h-full rounded-full bg-gradient-to-r from-neon-orange to-neon-glow skill-bar-fill" style="width:0%" data-target="${s.value}"></div>
                    </div>
                </div>
            `).join("");
        }

        function animateSkillBarsIn() {
            const bars = document.querySelectorAll(".skill-bar-fill");
            if (!bars.length) return;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        bar.style.width = bar.dataset.target + "%";
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.4 });
            bars.forEach(bar => observer.observe(bar));
        }

        document.addEventListener("DOMContentLoaded", () => {
            renderSkillRadar("skill-radar-chart", skillsData);
            renderSkillBars("skill-bars", skillsData);
            animateSkillBarsIn();
        });

        /* =========================================================
           LIVE BOT DEMO CHAT
        ========================================================= */
        const botDemoScripts = [
            [
                { author: "you", text: "/ticket create category:Support" },
                { author: "typing" },
                { author: "Nexus", isEmbed: true, text: `<div class="text-white font-bold text-[11px] mb-1">🎫 Ticket #482 opened</div><div class="text-zinc-400">Category: <span class="text-zinc-200">Support</span></div><div class="text-zinc-400">Assigned to: <span class="text-zinc-200">on-call staff</span></div>` }
            ],
            [
                { author: "you", text: "/warn user:@Gribbles reason:Spam in #general" },
                { author: "typing" },
                { author: "Nexus", isEmbed: true, text: `<div class="text-white font-bold text-[11px] mb-1">⚠️ Warning logged</div><div class="text-zinc-400">User: <span class="text-zinc-200">@Gribbles</span></div><div class="text-zinc-400">Strikes: <span class="text-zinc-200">1 / 3</span></div>` }
            ],
            [
                { author: "you", text: "/play query:lofi beats to code to" },
                { author: "typing" },
                { author: "Nexus", isEmbed: true, text: `<div class="text-white font-bold text-[11px] mb-1">🎵 Now playing</div><div class="text-zinc-400">Track: <span class="text-zinc-200">lofi beats to code to</span></div><div class="text-zinc-400">Queue: <span class="text-zinc-200">3 songs</span></div>` }
            ]
        ];

        function appendChatMessage(container, msg) {
            if (msg.author === "typing") {
                const wrap = document.createElement("div");
                wrap.className = "chat-msg chat-typing";
                wrap.innerHTML = `
                    <div class="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 bg-neon-orange/15 text-neon-orange border border-neon-orange/30">N</div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-0.5">
                            <span class="text-[11px] font-bold text-neon-orange">Nexus</span>
                            <span class="text-[9px] text-zinc-600">is typing</span>
                        </div>
                        <div class="typing-indicator"><span></span><span></span><span></span></div>
                    </div>`;
                container.appendChild(wrap);
                if (typeof gsap !== "undefined") gsap.fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 0.25 });
                container.scrollTop = container.scrollHeight;
                return wrap;
            }

            const isBot = msg.author === "Nexus";
            const wrap = document.createElement("div");
            wrap.className = "chat-msg";
            wrap.innerHTML = `
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${isBot ? "bg-neon-orange/15 text-neon-orange border border-neon-orange/30" : "bg-zinc-800 text-zinc-300 border border-zinc-700"}">${isBot ? "N" : "U"}</div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-0.5">
                        <span class="text-[11px] font-bold ${isBot ? "text-neon-orange" : "text-white"}">${isBot ? "Nexus" : "you"}</span>
                        ${isBot ? '<span class="text-[9px] text-zinc-600">BOT</span>' : ""}
                    </div>
                    ${msg.isEmbed
                        ? `<div class="bg-black/40 border-l-2 border-neon-orange rounded-r-lg p-3 space-y-0.5">${msg.text}</div>`
                        : `<div class="text-zinc-300">${msg.text}</div>`}
                </div>`;
            container.appendChild(wrap);
            if (typeof gsap !== "undefined") gsap.fromTo(wrap, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
            container.scrollTop = container.scrollHeight;
            return wrap;
        }

        function runBotDemoLoop() {
            const container = document.getElementById("bot-demo-chat");
            if (!container) return;
            let scriptIndex = 0;

            function playScript() {
                container.innerHTML = "";
                const script = botDemoScripts[scriptIndex % botDemoScripts.length];
                let step = 0;
                let typingEl = null;

                function next() {
                    if (step >= script.length) {
                        setTimeout(() => {
                            scriptIndex++;
                            playScript();
                        }, 2600);
                        return;
                    }
                    const msg = script[step];
                    if (msg.author === "typing") {
                        typingEl = appendChatMessage(container, msg);
                        step++;
                        setTimeout(next, 950);
                        return;
                    }
                    if (typingEl) {
                        typingEl.remove();
                        typingEl = null;
                    }
                    appendChatMessage(container, msg);
                    step++;
                    setTimeout(next, msg.author === "you" ? 900 : 1400);
                }
                next();
            }
            playScript();
        }

        document.addEventListener("DOMContentLoaded", runBotDemoLoop);

        /* =========================================================
           INTERACTIVE 3D MINECRAFT SKIN VIEWER (skinview3d, inlined above)
        ========================================================= */
        function initSkinViewer() {
            const canvas = document.getElementById("skin-viewer-canvas");
            const loadingEl = document.getElementById("skin-viewer-loading");
            if (!canvas) return;

            function showError(msg) {
                if (loadingEl) {
                    loadingEl.innerHTML = `<span class="text-zinc-600 text-center px-4">${msg}</span>`;
                    loadingEl.style.display = "flex";
                }
            }

            if (typeof skinview3d === "undefined") {
                showError("3D viewer library failed to load.");
                return;
            }

            let settled = false;
            const timeoutId = setTimeout(() => {
                if (!settled) {
                    settled = true;
                    showError("Skin is taking too long to load. Check your connection.");
                }
            }, 10000);

            try {
                const viewer = new skinview3d.SkinViewer({
                    canvas: canvas,
                    width: 260,
                    height: 320
                });
                viewer.zoom = 0.9;
                viewer.animation = new skinview3d.WalkingAnimation();

                viewer.loadSkin("assets/img/skin.png")
                    .then(() => {
                        if (settled) return;
                        settled = true;
                        clearTimeout(timeoutId);
                        if (loadingEl) loadingEl.style.display = "none";
                    })
                    .catch((err) => {
                        if (settled) return;
                        settled = true;
                        clearTimeout(timeoutId);
                        console.error("skinview3d loadSkin failed:", err);
                        showError("Couldn't load the skin texture.");
                    });
            } catch (err) {
                clearTimeout(timeoutId);
                console.error("skinview3d init failed:", err);
                showError("3D viewer failed to initialize.");
            }
        }

        document.addEventListener("DOMContentLoaded", initSkinViewer);
