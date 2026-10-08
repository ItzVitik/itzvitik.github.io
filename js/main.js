/* ==========================================================
   ItzVitik portfolio v4
   Particle name, smooth scroll, cursor, sections, project pages.
   Vendors (GSAP, ScrollTrigger, Lenis, skinview3d) live in js/vendor.
========================================================== */
(function () {
    'use strict';

    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

    var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var root = document.documentElement;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Vendor scripts missing: leave a readable static page.
        root.classList.remove('js');
        var yr0 = $('#year');
        if (yr0) yr0.textContent = new Date().getFullYear();
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    var EMAIL = 'smithvitek@gmail.com';
    var DEFAULT_TITLE = document.title;

    /* ---------- Data ---------- */
    var PROJECTS = {
        logiclyweb: {
            slug: 'logiclyweb', title: 'Logicly Web', type: 'Web application', cat: 'web', year: '2026',
            status: 'Live', closed: false,
            tagline: 'Custom storefront for digital goods, wired live into a Discord bot',
            role: 'Full-Stack Developer',
            stack: ['Node.js', 'Express', 'React', 'PostgreSQL', 'NOWPayments API'],
            img: 'assets/img/project-logicly-web.jpg',
            desc: 'A fully custom storefront for digital goods: keys, game accounts, skins and similar items. Paired with the Logicly Discord bot, which the store talks to about orders, restocks and account linking. No off-the-shelf shop platform anywhere in the stack.',
            features: [
                'Custom storefront, checkout and delivery flow built from scratch',
                'Two-way sync with the Discord bot for orders, restocks and account linking',
                'Admin panel operated through Discord instead of a separate dashboard'
            ],
            link: 'https://www.logicly.space'
        },
        logiclybot: {
            slug: 'logiclydiscordbot', title: 'Logicly Discord Bot', type: 'Discord bot', cat: 'bot', year: '2026',
            status: 'Private', closed: true,
            tagline: 'The other half of Logicly: orders, restocks and admin from Discord',
            role: 'Bot Developer',
            stack: ['Node.js', 'Discord.js', 'PostgreSQL', 'Redis', 'REST API'],
            img: 'assets/img/project-logicly-bot.jpg',
            desc: 'Companion bot to the Logicly store and the second half of the same system: order notifications, restock announcements, account linking and an admin panel run entirely through Discord commands. Private and not publicly invitable.',
            features: [
                'Order and restock events pushed live from the store',
                'Account linking between Discord users and store accounts',
                'Full admin panel exposed as Discord commands'
            ],
            link: ''
        },
        voidex: {
            slug: 'voidex', title: 'play.voidex.cz', type: 'Minecraft server', cat: 'plugin', year: '2025',
            status: 'Archived', closed: true,
            tagline: 'The most custom-built server of the bunch, never publicly launched',
            role: 'Builder & Developer',
            stack: ['Java', 'Paper', 'Skript', 'MySQL', 'MongoDB', 'Custom account system'],
            img: 'assets/img/project-voidex.jpg',
            desc: 'The most modern server I worked on, running the latest Minecraft version with almost every system written in-house, including a custom account manager. Ran earlier as starlex.cz and moonix.cz; never launched as voidex.cz before the team moved on to university and exams.',
            features: [
                'Custom account manager and core systems written from scratch',
                'Latest Minecraft version, almost no off-the-shelf plugins',
                'Never launched as voidex.cz, ran earlier as starlex.cz and moonix.cz'
            ],
            link: ''
        },
        gemoria: {
            slug: 'gemoria', title: 'play.gemoria.eu', type: 'Minecraft server', cat: 'plugin', year: '2024',
            status: 'Archived', closed: true,
            tagline: 'A gem-themed server shelved before it ever opened its doors',
            role: 'Developer',
            stack: ['Java', 'Paper', 'Skript', 'MySQL', 'MongoDB', 'Custom jackpot & plots'],
            img: 'assets/img/project-gemoria.jpg',
            desc: 'A gem-themed server built on a mix of configured and custom plugins: a custom jackpot plugin, plot plugin, infinite pass and more. Never officially launched, the two owners fell out before release.',
            features: [
                'Custom jackpot, plot and infinite pass plugins written in-house',
                'Mixed stack of configured and fully custom plugins',
                'Never officially launched, shelved after the owners fell out'
            ],
            link: ''
        },
        anxious: {
            slug: 'anxiousbox', title: 'Anxious Box', type: 'Minecraft server', cat: 'plugin', year: '2026',
            status: 'Archived', closed: true,
            tagline: 'A from-scratch ElytraPvP server that peaked at 45 players',
            role: 'Owner',
            stack: ['Skript', 'Java', 'Paper', 'MySQL', 'MongoDB'],
            img: 'assets/img/project-anxious-box.jpg',
            desc: 'ElytraPvP server built entirely on custom scripts and plugins: economy, kits, arenas and matchmaking all written in-house. Peaked at 45 concurrent players before closing due to lack of time to keep maintaining it.',
            features: [
                'Fully custom ocean-themed map, hand-decorated so it fits the players perfectly',
                'Custom ban and combat plugins plus an in-house anticheat with triggerbot, aim assist, rocket-boost and more checks',
                'Launched with several updates shipped, closed once there was not enough time to keep maintaining it'
            ],
            link: ''
        }
    };
    var ORDER = ['logiclyweb', 'logiclybot', 'voidex', 'gemoria', 'anxious'];
    var SLUG2KEY = {};
    ORDER.forEach(function (k) { SLUG2KEY[PROJECTS[k].slug] = k; });

    var SKILLS = [
        { name: 'Java', value: 88 },
        { name: 'Discord.js', value: 92 },
        { name: 'TypeScript', value: 84 },
        { name: 'Node.js', value: 82 },
        { name: 'React / Next', value: 78 },
        { name: 'Databases', value: 76 },
        { name: 'Docker / Linux', value: 70 },
        { name: 'Networking', value: 66 }
    ];

    var TECH = ['Java', 'TypeScript', 'Node.js', 'discord.js', 'React', 'Skript', 'Paper', 'PostgreSQL', 'Redis', 'MongoDB', 'Docker', 'Linux', 'Express', 'Python'];

    var I = {
        ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
        alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
        music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
        check: '<polyline points="20 6 9 17 4 12"/>',
        copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
        send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
        arrow: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
        ban: '<circle cx="12" cy="12" r="10"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"/>'
    };
    function svg(name, extra) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + I[name] + '</svg>';
    }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

    var yr = $('#year');
    if (yr) yr.textContent = new Date().getFullYear();

    /* ==========================================================
       Smooth scroll (Lenis) wired into GSAP's ticker
    ========================================================== */
    var lenis = null;
    if (!RM && typeof Lenis !== 'undefined') {
        lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
    }

    function scrollToTarget(sel) {
        var el = $(sel);
        if (!el) return;
        var y = sel === '#home' ? 0 : el.getBoundingClientRect().top + window.scrollY;
        if (lenis) {
            lenis.scrollTo(y, { duration: 1.6, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
        } else {
            window.scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
        }
    }

    /* ==========================================================
       Mobile menu
    ========================================================== */
    var burger = $('#nav-burger');
    var menu = $('#menu');
    var menuOpen = false;

    function setMenu(open) {
        if (open === menuOpen) return;
        menuOpen = open;
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        menu.setAttribute('aria-hidden', String(!open));
        if (open) {
            if (lenis) lenis.stop();
            root.classList.add('is-locked');
            gsap.set(menu, { visibility: 'visible' });
            gsap.to(menu, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            gsap.fromTo('.menu-inner a', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: 'power3.out', delay: 0.1 });
        } else {
            root.classList.remove('is-locked');
            if (lenis) lenis.start();
            gsap.to(menu, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: function () { if (!menuOpen) gsap.set(menu, { visibility: 'hidden' }); } });
        }
    }
    burger.addEventListener('click', function () { setMenu(!menuOpen); });

    $$('[data-scroll]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var target = a.getAttribute('data-scroll');
            if (menuOpen) setMenu(false);
            scrollToTarget(target);
        });
    });
    if ($('#to-top')) $('#to-top').addEventListener('click', function () { scrollToTarget('#top'); });

    /* ==========================================================
       Nav: sliding pill, scroll spy, progress
    ========================================================== */
    var nav = $('#nav');
    var navLinks = $$('#nav-links a');
    var pill = $('.nav-pill');
    var activeLink = null;

    function placePill(el, animate) {
        if (!el) return;
        var vars = { x: el.offsetLeft, width: el.offsetWidth, opacity: 1 };
        if (animate && !RM) {
            gsap.to(pill, Object.assign({ duration: 0.6, ease: 'power3.out', overwrite: true }, vars));
        } else {
            gsap.set(pill, vars);
        }
    }
    function setActive(name) {
        var next = null;
        navLinks.forEach(function (a) {
            var on = a.getAttribute('data-spy') === name;
            a.classList.toggle('is-active', on);
            if (on) next = a;
        });
        activeLink = next;
        if (next) placePill(next, true);
        else gsap.to(pill, { opacity: 0, duration: 0.3, overwrite: true });
    }
    navLinks.forEach(function (a) {
        a.addEventListener('pointerenter', function () { if (FINE) placePill(a, true); });
    });
    $('#nav-links').addEventListener('pointerleave', function () {
        if (!FINE) return;
        if (activeLink) placePill(activeLink, true);
        else gsap.to(pill, { opacity: 0, duration: 0.3, overwrite: true });
    });
    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(function () { if (activeLink) placePill(activeLink, false); }).observe($('#nav-links'));
    }

    var PAGE = document.body.getAttribute('data-page');

    ScrollTrigger.create({
        start: 60, end: 'max',
        onUpdate: function (self) { nav.classList.toggle('is-scrolled', self.scroll() > 60); }
    });
    gsap.to('#nav-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

    /* ==========================================================
       Custom cursor (fine pointers only)
    ========================================================== */
    if (FINE) {
        var ring = $('#cursor-ring');
        var dot = $('#cursor-dot');
        var label = $('#cursor-label');
        var cx = window.innerWidth / 2, cy = window.innerHeight / 2, rx = cx, ry = cy, seen = false;
        root.classList.add('has-cursor');

        window.addEventListener('pointermove', function (e) {
            cx = e.clientX; cy = e.clientY;
            if (!seen) { seen = true; rx = cx; ry = cy; ring.style.opacity = 1; dot.style.opacity = 1; }
            dot.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
        }, { passive: true });
        document.addEventListener('mouseleave', function () { ring.style.opacity = 0; dot.style.opacity = 0; });
        document.addEventListener('mouseenter', function () { if (seen) { ring.style.opacity = 1; dot.style.opacity = 1; } });
        gsap.ticker.add(function () {
            rx += (cx - rx) * 0.2; ry += (cy - ry) * 0.2;
            ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
        });

        document.addEventListener('pointerover', function (e) {
            var t = e.target;
            if (!t || !t.closest) return;
            var lab = t.closest('[data-cursor-label]');
            if (lab) {
                label.textContent = lab.getAttribute('data-cursor-label');
                ring.classList.add('is-label');
                ring.classList.remove('is-hover');
                dot.classList.add('is-hidden');
                return;
            }
            ring.classList.remove('is-label');
            dot.classList.remove('is-hidden');
            ring.classList.toggle('is-hover', !!t.closest('a, button, [role="button"], input, textarea, label'));
        });
    }

    /* Magnetic buttons */
    if (FINE && !RM) {
        $$('[data-magnetic]').forEach(function (el) {
            var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
            var yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
            el.addEventListener('pointermove', function (e) {
                var r = el.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
            });
            el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
        });
    }

    /* ==========================================================
       Background grid canvas
    ========================================================== */
    function initGrid() {
        var cv = $('#bg-grid');
        if (!cv) return;
        var ctx = cv.getContext('2d');
        var W = 0, H = 0, dpr = 1, GAP = 54;
        var px = -9999, py = -9999, sx = -9999, sy = -9999, pointerSeen = false;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth; H = window.innerHeight;
            cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
            if (RM) draw(0);
        }
        window.addEventListener('resize', resize);
        resize();

        if (FINE) {
            window.addEventListener('pointermove', function (e) {
                px = e.clientX; py = e.clientY;
                if (!pointerSeen) { pointerSeen = true; sx = px; sy = py; }
            }, { passive: true });
        }

        function draw(t) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);

            var tx, ty;
            if (pointerSeen) { tx = px; ty = py; }
            else { tx = W * (0.5 + 0.34 * Math.sin(t * 0.00028)); ty = H * (0.5 + 0.3 * Math.sin(t * 0.00021 + 1.3)); }
            if (sx < -9000) { sx = tx; sy = ty; }
            sx += (tx - sx) * 0.08; sy += (ty - sy) * 0.08;

            var g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 380);
            g.addColorStop(0, 'rgba(238,238,238,0.075)');
            g.addColorStop(1, 'rgba(238,238,238,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);

            var off = (window.scrollY * 0.12) % GAP;
            var near = [];
            ctx.fillStyle = 'rgba(245,245,245,0.085)';
            for (var y = -GAP + off; y < H + GAP; y += GAP) {
                for (var x = GAP / 2; x < W + GAP; x += GAP) {
                    var dx = x - sx, dy = y - sy;
                    var d2 = dx * dx + dy * dy;
                    if (d2 < 57600) { near.push(x, y, 1 - Math.sqrt(d2) / 240); }
                    else {
                        ctx.fillRect(x - 3, y - 0.5, 6, 1);
                        ctx.fillRect(x - 0.5, y - 3, 1, 6);
                    }
                }
            }
            for (var i = 0; i < near.length; i += 3) {
                var n = near[i + 2], a = 0.12 + n * n * 0.7, s = 3 + n * 5;
                ctx.fillStyle = 'rgba(238,238,238,' + a.toFixed(3) + ')';
                ctx.fillRect(near[i] - s, near[i + 1] - 0.75, s * 2, 1.5);
                ctx.fillRect(near[i] - 0.75, near[i + 1] - s, 1.5, s * 2);
            }
        }

        if (RM) { draw(0); return; }
        gsap.ticker.add(function (time) { draw(time * 1000); });
    }

    /* ==========================================================
       Hero: the name made of voxel particles
    ========================================================== */
    function initName() {
        var wrap = $('#name-wrap');
        var cv = $('#name-canvas');
        if (!wrap || !cv) return { start: function () {} };

        var ctx = cv.getContext('2d');
        var W = 0, H = 0, dpr = 1, size = 3;
        var N = 0, X, Y, VX, VY, HX, HY, DL, S, B;
        var started = false, visible = true, last = 0, t0 = 0, tNow = 0;
        var mouse = { x: -9999, y: -9999, active: false, px: 0, py: 0, speed: 0 };
        var rings = [];
        var COLORS = ['rgba(245,245,245,0.96)', 'rgba(255,255,255,0.98)', 'rgba(238,238,238,1)', 'rgba(170,170,170,1)'];
        var TEXT = 'ItzVitik';
        var family = '"Bricolage Grotesque", system-ui, sans-serif';

        function build(initial) {
            var rect = wrap.getBoundingClientRect();
            var nw = Math.max(1, Math.round(rect.width));
            var nh = Math.max(1, Math.round(rect.height));
            if (!initial && nw === W && Math.abs(nh - H) < 4) return;
            W = nw; H = nh;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);

            var off = document.createElement('canvas');
            off.width = W; off.height = H;
            var o = off.getContext('2d', { willReadFrequently: true });
            var fs = H * 0.95;
            function setFont() {
                o.font = '800 ' + fs + 'px ' + family;
                try { o.letterSpacing = (-0.035 * fs) + 'px'; } catch (e) { /* older browsers */ }
            }
            setFont();
            var m = o.measureText(TEXT);
            fs *= Math.min(1, (W * 0.95) / m.width);
            setFont();
            m = o.measureText(TEXT);
            o.textAlign = 'center';
            o.textBaseline = 'alphabetic';
            o.fillStyle = '#fff';
            var y = H / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
            o.fillText(TEXT, W / 2, y);

            var data = o.getImageData(0, 0, W, H).data;
            var step = clamp(W / 300, 2.3, 4);
            size = step * 0.74;
            var pts = [];
            for (var py = 0; py < H; py += step) {
                for (var pxx = 0; pxx < W; pxx += step) {
                    if (data[((py | 0) * W + (pxx | 0)) * 4 + 3] > 140) {
                        pts.push(pxx + (Math.random() - 0.5) * step * 0.4, py + (Math.random() - 0.5) * step * 0.4);
                    }
                }
            }
            N = pts.length / 2;
            X = new Float32Array(N); Y = new Float32Array(N);
            VX = new Float32Array(N); VY = new Float32Array(N);
            HX = new Float32Array(N); HY = new Float32Array(N);
            DL = new Float32Array(N); S = new Float32Array(N); B = new Uint8Array(N);
            for (var i = 0; i < N; i++) {
                HX[i] = pts[i * 2]; HY[i] = pts[i * 2 + 1];
                if (initial || !started) {
                    var ang = Math.random() * Math.PI * 2;
                    var rad = (0.25 + Math.random() * 0.75) * Math.max(W, 400) * 0.55;
                    X[i] = HX[i] + Math.cos(ang) * rad;
                    Y[i] = HY[i] + Math.sin(ang) * rad * 0.7;
                    DL[i] = (HX[i] / W) * 0.9 + Math.random() * 0.45;
                } else {
                    X[i] = HX[i]; Y[i] = HY[i]; DL[i] = 0;
                }
            }
            if (RM) drawStatic();
        }

        function drawStatic() {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = COLORS[0];
            for (var i = 0; i < N; i++) ctx.fillRect(HX[i] - size / 2, HY[i] - size / 2, size, size);
        }

        function blast(bx, by) {
            var R = 280;
            for (var i = 0; i < N; i++) {
                var dx = X[i] - bx, dy = Y[i] - by;
                var d = Math.sqrt(dx * dx + dy * dy) + 1;
                if (d < R) {
                    var f = 1 - d / R;
                    VX[i] += (dx / d) * f * f * 26 + (Math.random() - 0.5) * 3;
                    VY[i] += (dy / d) * f * f * 26 + (Math.random() - 0.5) * 3;
                }
            }
            rings.push({ x: bx, y: by, t: tNow });
        }

        function frame(now) {
            requestAnimationFrame(frame);
            if (!visible || !started) return;
            var dt = Math.min(2.2, (now - last) / 16.667);
            last = now;
            tNow = (now - t0) / 1000;

            var R = clamp(W * 0.13, 70, 150), R2 = R * R;
            var mx = mouse.x, my = mouse.y, act = mouse.active;
            mouse.speed += (clamp(Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py), 0, 60) - mouse.speed) * 0.2;
            mouse.px = mouse.x; mouse.py = mouse.y;
            var boost = 1 + clamp(mouse.speed / 30, 0, 1.6);
            var damp = Math.pow(0.84, dt), k = 0.05 * dt;

            for (var i = 0; i < N; i++) {
                if (tNow < DL[i]) { B[i] = 255; continue; }
                var x = X[i], y = Y[i], vx = VX[i], vy = VY[i];
                var hx = HX[i] + Math.sin(tNow * 1.1 + HY[i] * 0.04) * 0.45;
                var hy = HY[i] + Math.cos(tNow * 0.9 + HX[i] * 0.04) * 0.45;
                vx += (hx - x) * k; vy += (hy - y) * k;
                if (act) {
                    var dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
                    if (d2 < R2) {
                        var d = Math.sqrt(d2) + 0.001, f = 1 - d / R, f2 = f * f;
                        var push = f2 * 1.9 * boost * dt, sw = f2 * 0.9 * dt;
                        vx += (dx / d) * push - (dy / d) * sw;
                        vy += (dy / d) * push + (dx / d) * sw;
                    }
                }
                vx *= damp; vy *= damp;
                x += vx * dt; y += vy * dt;
                X[i] = x; Y[i] = y; VX[i] = vx; VY[i] = vy;
                var disp = Math.abs(x - HX[i]) + Math.abs(y - HY[i]);
                B[i] = disp < 2.5 ? 0 : disp < 14 ? 1 : disp < 40 ? 2 : 3;
                S[i] = size * clamp((tNow - DL[i]) * 3, 0, 1);
            }

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);
            for (var b = 0; b < 4; b++) {
                ctx.fillStyle = COLORS[b];
                for (var j = 0; j < N; j++) {
                    if (B[j] === b) { var s = S[j]; ctx.fillRect(X[j] - s / 2, Y[j] - s / 2, s, s); }
                }
            }
            for (var r = rings.length - 1; r >= 0; r--) {
                var age = tNow - rings[r].t;
                if (age > 1.1) { rings.splice(r, 1); continue; }
                ctx.strokeStyle = 'rgba(238,238,238,' + ((1 - age / 1.1) * 0.35).toFixed(3) + ')';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(rings[r].x, rings[r].y, age * 420, 0, Math.PI * 2); ctx.stroke();
            }
        }

        function toLocal(e) {
            var r = cv.getBoundingClientRect();
            return { x: e.clientX - r.left, y: e.clientY - r.top };
        }
        window.addEventListener('pointermove', function (e) {
            var p = toLocal(e);
            mouse.x = p.x; mouse.y = p.y;
            mouse.active = p.x > -160 && p.x < W + 160 && p.y > -160 && p.y < H + 160;
        }, { passive: true });
        document.addEventListener('mouseleave', function () { mouse.active = false; });
        cv.addEventListener('pointerdown', function (e) {
            if (!started || RM) return;
            var p = toLocal(e);
            blast(p.x, p.y);
        });
        cv.setAttribute('data-cursor-label', 'Boom');

        if (typeof IntersectionObserver !== 'undefined') {
            new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(wrap);
        }
        var rt;
        window.addEventListener('resize', function () {
            clearTimeout(rt);
            rt = setTimeout(function () { build(false); }, 200);
        });

        var fontReady = Promise.race([
            document.fonts && document.fonts.load ? document.fonts.load('800 120px "Bricolage Grotesque"', TEXT) : Promise.resolve(),
            new Promise(function (res) { setTimeout(res, 2500); })
        ]);
        var built = fontReady.then(function () { build(true); });

        return {
            start: function () {
                built.then(function () {
                    started = true;
                    t0 = performance.now(); last = t0;
                    if (!RM) requestAnimationFrame(frame);
                });
            }
        };
    }

    /* ==========================================================
       Hero intro + rolling role line
    ========================================================== */
    function playIntro(nameApi) {
        gsap.set(nav, { xPercent: -50, x: 0, y: -90 });
        gsap.set('#bg-grid', { opacity: 0 });
        revealCurtain();
        if (PAGE !== 'home') {
            gsap.set(nav, { y: 0, opacity: 1 });
            gsap.set('#bg-grid', { opacity: 1 });
            gsap.set('.intro', { opacity: 1 });
            root.classList.add('intro-done');
            return;
        }

        if (RM) {
            gsap.set(nav, { y: 0, opacity: 1 });
            gsap.set('#bg-grid', { opacity: 1 });
            gsap.set('.intro', { opacity: 1 });
            root.classList.add('intro-done');
            nameApi.start();
            return;
        }

        nameApi.start();
        var tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: function () { root.classList.add('intro-done'); } });
        tl.to('#bg-grid', { opacity: 1, duration: 2.4, ease: 'power1.inOut' }, 0)
          .fromTo('.hero .status', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.2)
          .fromTo('.hero .roles', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.2)
          .fromTo('.hero .hero-lead', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.35)
          .fromTo('.hero .hero-actions', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.5)
          .fromTo('.hero .hero-hint', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 2.1)
          .to(nav, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, 1.1);

        // Role line rolls upward, one line at a time
        var track = $('#roles-track');
        var rolesN = track.children.length - 1;
        var roll = gsap.timeline({ repeat: -1, delay: 2.6 });
        for (var i = 1; i <= rolesN; i++) {
            roll.to(track, { yPercent: -(100 / (rolesN + 1)) * i, duration: 0.9, ease: 'power4.inOut' }, '+=1.9');
        }
        roll.set(track, { yPercent: 0 });

        // Hero drifts away as you scroll
        gsap.to('.hero-inner', {
            yPercent: -10, opacity: 0, scale: 0.97, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 25%', scrub: true }
        });
    }

    /* ==========================================================
       Section animations
    ========================================================== */
    function splitWords(el) {
        var txt = el.textContent.trim();
        el.setAttribute('aria-label', txt);
        el.innerHTML = txt.split(/\s+/).map(function (w) {
            return '<span class="w" aria-hidden="true"><span class="wi">' + esc(w) + '</span></span>';
        }).join(' ');
        return $$('.wi', el);
    }

    function initReveals() {
        $$('[data-split]').forEach(function (h) {
            var words = splitWords(h);
            if (RM) return;
            gsap.set(words, { yPercent: 118, rotate: 6, transformOrigin: '0% 100%' });
            ScrollTrigger.create({
                trigger: h, start: 'top 90%', once: true,
                onEnter: function () { gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.2, ease: 'power4.out', stagger: 0.07 }); }
            });
        });

        $$('[data-reveal]').forEach(function (el) {
            if (RM) return;
            gsap.set(el, { opacity: 0, y: 36 });
            ScrollTrigger.create({
                trigger: el, start: 'top 92%', once: true,
                onEnter: function () { gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }); }
            });
        });

        $$('[data-count]').forEach(function (el) {
            if (RM) return;
            var end = parseFloat(el.getAttribute('data-count'));
            var o = { v: 0 };
            el.textContent = '0';
            ScrollTrigger.create({
                trigger: el, start: 'top 92%', once: true,
                onEnter: function () {
                    gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(o.v); } });
                }
            });
        });

        // Service rows: hairline draws in
        $$('.row').forEach(function (r) {
            if (RM) return;
            gsap.set(r, { clipPath: 'inset(0 0 100% 0)', y: 30 });
            ScrollTrigger.create({
                trigger: r, start: 'top 92%', once: true,
                onEnter: function () { gsap.to(r, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, ease: 'power3.out', clearProps: 'clipPath,transform' }); }
            });
        });
    }

    /* ==========================================================
       About: tilt card + 3D skin
    ========================================================== */
    function initTilt() {
        var tilt = $('#tilt'), card = $('#tilt-card');
        if (!tilt || !card || !FINE || RM) return;
        var rxTo = gsap.quickTo(card, 'rotationX', { duration: 0.9, ease: 'power3.out' });
        var ryTo = gsap.quickTo(card, 'rotationY', { duration: 0.9, ease: 'power3.out' });
        tilt.addEventListener('pointermove', function (e) {
            var r = tilt.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            ryTo(px * 14); rxTo(-py * 14);
        });
        tilt.addEventListener('pointerleave', function () { rxTo(0); ryTo(0); });
    }

    function initSkin() {
        var canvas = $('#skin-canvas'), loading = $('#skin-loading'), stage = $('#skin-stage');
        if (!canvas) return;
        function fail(msg) { loading.innerHTML = '<span>' + msg + '</span>'; loading.style.display = 'flex'; }
        if (typeof skinview3d === 'undefined') { fail('3D viewer failed to load.'); return; }

        var settled = false;
        var timer = setTimeout(function () { if (!settled) { settled = true; fail('Skin is taking too long to load.'); } }, 10000);
        try {
            var w = Math.max(200, Math.min(320, stage.clientWidth - 20));
            var h = Math.max(260, stage.clientHeight || 340);
            var viewer = new skinview3d.SkinViewer({ canvas: canvas, width: w, height: h });
            viewer.zoom = 0.9;
            viewer.animation = new skinview3d.WalkingAnimation();
            try { viewer.autoRotate = true; viewer.autoRotateSpeed = 0.7; } catch (e1) { /* optional */ }
            if (viewer.controls) { viewer.controls.enableZoom = false; }

            viewer.loadSkin('assets/img/skin.png').then(function () {
                if (settled) return;
                settled = true; clearTimeout(timer);
                loading.style.display = 'none';
            }).catch(function (err) {
                if (settled) return;
                settled = true; clearTimeout(timer);
                console.error('skinview3d loadSkin failed:', err);
                fail('Could not load the skin texture.');
            });

            if (typeof ResizeObserver !== 'undefined' && typeof viewer.setSize === 'function') {
                new ResizeObserver(function () {
                    var nw = Math.max(200, Math.min(320, stage.clientWidth - 20));
                    var nh = Math.max(260, stage.clientHeight || 340);
                    viewer.setSize(nw, nh);
                }).observe(stage);
            }
            if (typeof IntersectionObserver !== 'undefined') {
                new IntersectionObserver(function (en) {
                    try { viewer.renderPaused = !en[0].isIntersecting; } catch (e2) { /* optional */ }
                }, { threshold: 0 }).observe(stage);
            }
        } catch (err) {
            clearTimeout(timer);
            console.error('skinview3d init failed:', err);
            fail('3D viewer failed to start.');
        }
    }

    /* ==========================================================
       Skills: radar + bars
    ========================================================== */
    function initSkills() {
        var el = $('#skill-radar');
        if (el) {
            var size = 360, c = size / 2, radius = 118, n = SKILLS.length, slice = Math.PI * 2 / n, levels = 4;
            var rings = '', axes = '', labels = '', pts = [], dots = '';
            for (var l = 1; l <= levels; l++) {
                var r = radius / levels * l;
                var p = SKILLS.map(function (_, i) { var a = slice * i - Math.PI / 2; return (c + r * Math.cos(a)).toFixed(1) + ',' + (c + r * Math.sin(a)).toFixed(1); }).join(' ');
                rings += '<polygon points="' + p + '" fill="none" stroke="rgba(245,245,245,0.09)" stroke-width="1"/>';
            }
            SKILLS.forEach(function (s, i) {
                var a = slice * i - Math.PI / 2;
                axes += '<line x1="' + c + '" y1="' + c + '" x2="' + (c + radius * Math.cos(a)).toFixed(1) + '" y2="' + (c + radius * Math.sin(a)).toFixed(1) + '" stroke="rgba(245,245,245,0.09)"/>';
                var lx = c + (radius + 24) * Math.cos(a), ly = c + (radius + 24) * Math.sin(a);
                var anchor = Math.cos(a) > 0.3 ? 'start' : Math.cos(a) < -0.3 ? 'end' : 'middle';
                labels += '<text class="radar-label" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" fill="#a69d97" font-size="11.5" font-family="JetBrains Mono, monospace" text-anchor="' + anchor + '" dominant-baseline="middle">' + esc(s.name) + '</text>';
                var rr = radius * s.value / 100;
                var x = c + rr * Math.cos(a), y = c + rr * Math.sin(a);
                pts.push(x.toFixed(1) + ',' + y.toFixed(1));
                dots += '<rect x="' + (x - 3.5).toFixed(1) + '" y="' + (y - 3.5).toFixed(1) + '" width="7" height="7" fill="#eeeeee" stroke="#111111" stroke-width="1.5" transform="rotate(45 ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"/>';
            });
            el.innerHTML = '<svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="Skill radar chart">' + rings + axes +
                '<g class="radar-data"><polygon points="' + pts.join(' ') + '" fill="rgba(238,238,238,0.24)" stroke="#eeeeee" stroke-width="2" stroke-linejoin="round"/>' + dots + '</g>' + labels + '</svg>';

            if (!RM) {
                var g = $('.radar-data', el);
                gsap.set(g, { scale: 0.01, opacity: 0, svgOrigin: c + ' ' + c });
                gsap.set($$('.radar-label', el), { opacity: 0 });
                ScrollTrigger.create({
                    trigger: el, start: 'top 80%', once: true,
                    onEnter: function () {
                        gsap.to(g, { scale: 1, opacity: 1, svgOrigin: c + ' ' + c, duration: 1.8, ease: 'elastic.out(1, 0.75)' });
                        gsap.to($$('.radar-label', el), { opacity: 1, duration: 0.8, stagger: 0.06, delay: 0.3 });
                    }
                });
            }
        }

        var bars = $('#skill-bars');
        if (bars) {
            bars.innerHTML = SKILLS.map(function (s) {
                return '<div class="bar"><div class="bar-top"><span>' + esc(s.name) + '</span><span class="bar-val">' + (RM ? s.value : 0) + '%</span></div>' +
                    '<div class="bar-track"><div class="bar-fill" data-v="' + s.value + '"' + (RM ? ' style="transform:scaleX(' + (s.value / 100) + ')"' : '') + '></div></div></div>';
            }).join('');
            if (!RM) {
                $$('.bar', bars).forEach(function (b, i) {
                    var fill = $('.bar-fill', b), val = $('.bar-val', b), v = SKILLS[i].value, o = { n: 0 };
                    ScrollTrigger.create({
                        trigger: b, start: 'top 92%', once: true,
                        onEnter: function () {
                            gsap.to(fill, { scaleX: v / 100, duration: 1.6, ease: 'power3.out' });
                            gsap.to(o, { n: v, duration: 1.6, ease: 'power3.out', onUpdate: function () { val.textContent = Math.round(o.n) + '%'; } });
                        }
                    });
                });
            }
        }
    }

    /* ==========================================================
       Marquee
    ========================================================== */
    function initMarquee() {
        var lines = $$('.marquee-line');
        if (!lines.length) return;
        lines.forEach(function (line, idx) {
            var arr = TECH.slice(idx * 5).concat(TECH.slice(0, idx * 5));
            var html = arr.map(function (t) { return '<span>' + esc(t) + '<i></i></span>'; }).join('');
            line.innerHTML = html + html;
        });
        if (RM) return;

        var state = lines.map(function (line) { return { el: line, x: 0, half: 0, dir: parseFloat(line.getAttribute('data-dir')) || -1 }; });
        function measure() {
            state.forEach(function (s) {
                s.half = s.el.scrollWidth / 2;
                if (s.dir > 0 && s.x === 0) s.x = -s.half;
            });
        }
        var visible = false, lastY = window.scrollY, boost = 0, skew = 0;
        var host = $('.marquee');
        if (typeof IntersectionObserver !== 'undefined') {
            new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { rootMargin: '100px' }).observe(host);
        } else { visible = true; }
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
        window.addEventListener('resize', measure);
        measure();

        gsap.ticker.add(function () {
            var y = window.scrollY, dy = y - lastY; lastY = y;
            boost += (Math.min(Math.abs(dy), 80) * 0.18 - boost) * 0.1;
            skew += (clamp(-dy * 0.12, -10, 10) - skew) * 0.12;
            if (!visible) return;
            var speed = 0.9 + boost;
            state.forEach(function (s) {
                if (!s.half) return;
                s.x += s.dir * speed;
                if (s.dir < 0 && s.x <= -s.half) s.x += s.half;
                if (s.dir > 0 && s.x >= 0) s.x -= s.half;
                s.el.style.transform = 'translate3d(' + s.x.toFixed(2) + 'px,0,0) skewX(' + skew.toFixed(2) + 'deg)';
            });
        });
    }

    /* ==========================================================
       Work list (+ floating preview, filters, project pages)
    ========================================================== */
    var current = null;
    var lastOrigin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function initWork() {
        var list = $('#work-list');
        if (!list) return;

        list.innerHTML = ORDER.map(function (k) {
            var p = PROJECTS[k];
            var sc = p.status.toLowerCase();
            return '<a class="work-row" href="#/' + p.slug + '" data-key="' + k + '" data-cat="' + p.cat + '" data-cursor-label="Open">' +
                '<h3>' + esc(p.title) + '</h3>' +
                '<div class="work-meta"><b>' + esc(p.type) + '</b>' + esc(p.stack.slice(0, 3).join(', ')) + '</div>' +
                '<div class="work-meta"><b class="st st-' + sc + '">' + esc(p.status) + '</b>' + esc(p.year) + '</div>' +
                '<svg class="work-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>' +
                '<img class="work-thumb" src="' + p.img + '" alt="" loading="lazy" width="1080" height="608">' +
                '</a>';
        }).join('');

        var rows = $$('.work-row', list);

        rows.forEach(function (r) {
            r.addEventListener('click', function (e) {
                e.preventDefault();
                var k = r.getAttribute('data-key');
                var hasPos = e.clientX || e.clientY;
                openProject(k, true, hasPos ? { x: e.clientX, y: e.clientY } : null);
            });
        });

        // Floating preview that follows the cursor
        var prev = $('#work-preview');
        if (FINE && prev) {
            ORDER.forEach(function (k) {
                var d = document.createElement('div');
                d.className = 'wp-img';
                d.setAttribute('data-key', k);
                d.style.backgroundImage = "url('" + PROJECTS[k].img + "')";
                prev.appendChild(d);
            });
            gsap.set(prev, { xPercent: -50, yPercent: -50, scale: 0.85, autoAlpha: 0 });
            var xTo = gsap.quickTo(prev, 'x', { duration: 0.7, ease: 'power3.out' });
            var yTo = gsap.quickTo(prev, 'y', { duration: 0.7, ease: 'power3.out' });
            var rTo = gsap.quickTo(prev, 'rotation', { duration: 0.7, ease: 'power3.out' });
            var lastX = 0, shown = false;
            list.addEventListener('pointermove', function (e) {
                var half = prev.offsetWidth / 2;
                var tx = e.clientX + half + 40;
                if (tx + half > window.innerWidth - 20) tx = e.clientX - half - 40;
                xTo(tx); yTo(e.clientY);
                rTo(clamp((e.clientX - lastX) * 0.3, -9, 9));
                lastX = e.clientX;
            });
            rows.forEach(function (r) {
                r.addEventListener('pointerenter', function (e) {
                    var k = r.getAttribute('data-key');
                    $$('.wp-img', prev).forEach(function (d) { d.classList.toggle('on', d.getAttribute('data-key') === k); });
                    if (!shown) {
                        shown = true;
                        gsap.set(prev, { x: e.clientX + prev.offsetWidth / 2 + 40, y: e.clientY });
                        gsap.to(prev, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
                    }
                });
            });
            list.addEventListener('pointerleave', function () {
                shown = false;
                gsap.to(prev, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: 'power3.in', overwrite: 'auto' });
            });
        }

        // Filters
        var chips = $$('#filters .chip');
        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var f = chip.getAttribute('data-filter');
                chips.forEach(function (c) { c.classList.toggle('is-on', c === chip); });
                var show = rows.filter(function (r) { return f === 'all' || r.getAttribute('data-cat') === f; });
                rows.forEach(function (r) { r.classList.toggle('is-hidden', show.indexOf(r) === -1); });
                if (!RM) {
                    gsap.fromTo(show, { y: 36, clipPath: 'inset(0 0 100% 0)' },
                        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'clipPath,transform' });
                }
                ScrollTrigger.refresh();
            });
        });

        // First reveal
        if (!RM) {
            gsap.set(rows, { clipPath: 'inset(0 0 100% 0)', y: 36 });
            ScrollTrigger.batch(rows, {
                start: 'top 94%', once: true,
                onEnter: function (batch) {
                    gsap.to(batch, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, stagger: 0.1, ease: 'power3.out', clearProps: 'clipPath,transform' });
                }
            });
        }
    }

    /* ---------- Project page ---------- */
    function renderProject(key) {
        var p = PROJECTS[key];
        if (!p) return false;
        $('#pp-title').textContent = p.title;
        $('#pp-year').textContent = p.year;
        $('#pp-tagline').textContent = p.tagline;
        var st = $('#pp-status');
        st.className = 'st st-' + p.status.toLowerCase();
        st.textContent = p.status;
        $('#pp-desc').textContent = p.desc;
        $('#pp-role').textContent = p.role;
        $('#pp-stack-main').textContent = p.stack.slice(0, 2).join(' + ');
        $('#pp-url').textContent = 'itzvitik.dev/#/' + p.slug;

        var link = $('#pp-link'), ltext = $('#pp-link-text'), licon = $('#pp-link-icon');
        if (p.closed) {
            link.removeAttribute('href'); link.removeAttribute('target');
            link.setAttribute('aria-disabled', 'true');
            link.classList.add('is-disabled');
            ltext.textContent = p.status === 'Private' ? 'Private project' : 'Closed';
            licon.innerHTML = I.ban;
        } else {
            link.href = p.link; link.target = '_blank';
            link.removeAttribute('aria-disabled');
            link.classList.remove('is-disabled');
            ltext.textContent = 'Visit live site';
            licon.innerHTML = I.arrow;
        }

        var host = 'itzvitik.dev/#/' + p.slug;
        if (!p.closed && p.link) { try { host = new URL(p.link).hostname.replace(/^www\./, ''); } catch (e) { /* keep default */ } }
        $('#pp-frame-url').textContent = host;
        var img = $('#pp-img');
        img.src = p.img; img.alt = p.title + ' preview';
        img.style.transform = '';

        $('#pp-list').innerHTML = p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
        $('#pp-tags').innerHTML = p.stack.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');

        var next = ORDER[(ORDER.indexOf(key) + 1) % ORDER.length];
        $('#pp-next').setAttribute('data-next', next);
        $('#pp-next-title').textContent = PROJECTS[next].title;
        document.title = p.title + ' - ItzVitik';
        return true;
    }

    function safePush(url) {
        try { history.pushState({}, '', url); } catch (e) { /* sandboxed preview */ }
    }

    function openProject(key, push, origin, instant) {
        if (!renderProject(key)) return;
        var page = $('#project-page');
        var wasOpen = !!current;
        current = key;
        page.setAttribute('aria-hidden', 'false');
        if (push) safePush('#/' + PROJECTS[key].slug);

        gsap.killTweensOf(page);
        var parts = $$('.pp-anim', page);

        if (wasOpen) {
            page.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });
            if (!RM) gsap.fromTo(parts, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity' });
            return;
        }

        lastOrigin = origin || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        if (menuOpen) setMenu(false);
        if (lenis) lenis.stop();
        root.classList.add('is-locked');
        page.style.visibility = 'visible';
        page.scrollTop = 0;

        if (RM || instant) {
            gsap.set(page, { clearProps: 'clipPath' });
            if (!RM) gsap.fromTo(parts, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity' });
            return;
        }
        var R = Math.hypot(window.innerWidth, window.innerHeight);
        gsap.fromTo(page,
            { clipPath: 'circle(0px at ' + lastOrigin.x + 'px ' + lastOrigin.y + 'px)' },
            { clipPath: 'circle(' + R + 'px at ' + lastOrigin.x + 'px ' + lastOrigin.y + 'px)', duration: 1.05, ease: 'power3.inOut', onComplete: function () { gsap.set(page, { clearProps: 'clipPath' }); } });
        gsap.fromTo(parts, { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.07, ease: 'power3.out', delay: 0.5, clearProps: 'transform,opacity' });
    }

    function closeProject(push) {
        if (!current) return;
        var page = $('#project-page');
        current = null;
        page.setAttribute('aria-hidden', 'true');
        document.title = DEFAULT_TITLE;
        if (push) safePush(window.location.pathname + window.location.search);

        function finish() {
            page.style.visibility = 'hidden';
            gsap.set(page, { clearProps: 'clipPath' });
            root.classList.remove('is-locked');
            if (lenis) lenis.start();
        }
        gsap.killTweensOf(page);
        if (RM) { finish(); return; }
        var R = Math.hypot(window.innerWidth, window.innerHeight);
        gsap.fromTo(page,
            { clipPath: 'circle(' + R + 'px at ' + lastOrigin.x + 'px ' + lastOrigin.y + 'px)' },
            { clipPath: 'circle(0px at ' + lastOrigin.x + 'px ' + lastOrigin.y + 'px)', duration: 0.85, ease: 'power3.inOut', onComplete: finish });
    }

    function slugFromHash() {
        var m = window.location.hash.match(/^#\/([a-z0-9-]+)\/?$/i);
        return m ? m[1].toLowerCase() : null;
    }
    function onRoute() {
        var slug = slugFromHash();
        var key = slug && SLUG2KEY[slug];
        if (key) { if (current !== key) openProject(key, false, null, !current); }
        else if (current) closeProject(false);
    }

    function initProjectPage() {
        var page = $('#project-page');
        if (!$('#pp-back')) return;
        $('#pp-back').addEventListener('click', function () { closeProject(true); });
        $('#pp-next').addEventListener('click', function () {
            var k = $('#pp-next').getAttribute('data-next');
            if (k) openProject(k, true, null);
        });
        page.addEventListener('scroll', function () {
            if (RM) return;
            var t = clamp(page.scrollTop / 700, 0, 1.4) * -7;
            $('#pp-img').style.transform = 'translate3d(0,' + t.toFixed(2) + '%,0)';
        }, { passive: true });
        window.addEventListener('popstate', onRoute);
        window.addEventListener('hashchange', onRoute);
        window.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            if (current) closeProject(true);
            else if (menuOpen) setMenu(false);
        });
        var slug = slugFromHash();
        if (slug && SLUG2KEY[slug]) openProject(SLUG2KEY[slug], false, null, true);
    }

    /* ==========================================================
       Live bot demo
    ========================================================== */
    function initDemo() {
        var box = $('#bot-chat');
        if (!box) return;
        var SCRIPTS = [
            [
                { you: '/ticket category: Store Support priority: High' },
                { bot: { icon: 'ticket', title: 'Ticket #482 opened', lines: [['Category', 'Store Support'], ['Priority', 'High']] } }
            ],
            [
                { you: '/warn user:@Gribbles reason:Spam in #general' },
                { bot: { icon: 'alert', title: 'Warning logged', lines: [['User', '@Gribbles'], ['Strikes', '1 / 3']] } }
            ],
            [
                { you: '/play query:lofi beats to code to' },
                { bot: { icon: 'music', title: 'Now playing', lines: [['Track', 'lofi beats to code to'], ['Queue', '3 songs']] } }
            ]
        ];

        var running = false, timer = null, idx = 0;

        function add(html) {
            var d = document.createElement('div');
            d.className = 'msg';
            d.innerHTML = html;
            box.appendChild(d);
            if (!RM) gsap.from(d, { opacity: 0, y: 12, duration: 0.45, ease: 'power2.out' });
            return d;
        }
        function userMsg(text) {
            return add('<div class="avatar">Y</div><div class="msg-main"><div class="msg-name">you</div><div class="msg-text">' + esc(text) + '</div></div>');
        }
        function typingMsg() {
            return add('<div class="avatar bot">N</div><div class="msg-main"><div class="msg-name bot">Logicly Bot <small>APP</small></div><div class="typing"><span></span><span></span><span></span></div></div>');
        }
        function botMsg(b) {
            return add('<div class="avatar bot">N</div><div class="msg-main"><div class="msg-name bot">Logicly Bot <small>APP</small></div><div class="embed"><div class="embed-title">' + svg('' + b.icon) + esc(b.title) + '</div>' +
                b.lines.map(function (l) { return '<div class="embed-line">' + esc(l[0]) + ': <b>' + esc(l[1]) + '</b></div>'; }).join('') + '</div></div>');
        }

        function play() {
            if (!running) return;
            box.innerHTML = '';
            var script = SCRIPTS[idx % SCRIPTS.length];
            var typing = null;
            userMsg(script[0].you);
            timer = setTimeout(function () {
                if (!running) return;
                typing = typingMsg();
                timer = setTimeout(function () {
                    if (!running) return;
                    if (typing) typing.remove();
                    botMsg(script[1].bot);
                    timer = setTimeout(function () { idx++; play(); }, 3200);
                }, 1100);
            }, 900);
        }
        function start() { if (running) return; running = true; play(); }
        function stop() { running = false; clearTimeout(timer); }

        if (typeof IntersectionObserver !== 'undefined') {
            new IntersectionObserver(function (en) { if (en[0].isIntersecting) start(); else stop(); }, { threshold: 0.3 }).observe($('.chat'));
        } else { start(); }
    }

    /* ==========================================================
       Timeline
    ========================================================== */
    function initTimeline() {
        var tl = $('#timeline');
        if (!tl) return;
        var items = $$('.tl-item', tl);
        if (RM) {
            items.forEach(function (i) { i.classList.add('is-active'); });
            gsap.set('#tl-fill', { scaleY: 1 });
            return;
        }
        gsap.to('#tl-fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 65%', end: 'bottom 65%', scrub: 0.4 } });
        items.forEach(function (it) {
            ScrollTrigger.create({
                trigger: it, start: 'top 65%',
                onEnter: function () { it.classList.add('is-active'); },
                onLeaveBack: function () { it.classList.remove('is-active'); }
            });
        });
    }

    /* ==========================================================
       Contact + copy
    ========================================================== */
    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(function () { legacyCopy(text); });
        } else { legacyCopy(text); }
    }
    function legacyCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) { /* nothing else to try */ }
        document.body.removeChild(ta);
    }

    function initContact() {
        var heroBtn = $('#hero-copy-email');
        if (heroBtn) {
            var t = $('#hero-copy-text'), ic = $('#hero-copy-icon'), timer;
            heroBtn.addEventListener('click', function () {
                copyText(EMAIL);
                var old = ic.innerHTML;
                t.textContent = 'Copied'; ic.innerHTML = svg('check');
                clearTimeout(timer);
                timer = setTimeout(function () { t.textContent = 'Copy email'; ic.innerHTML = svg('copy'); }, 1900);
                void old;
            });
        }

        $$('.copy-row').forEach(function (row) {
            function go() {
                copyText(row.getAttribute('data-copy'));
                row.classList.add('is-copied');
                clearTimeout(row._t);
                row._t = setTimeout(function () { row.classList.remove('is-copied'); }, 1800);
            }
            row.addEventListener('click', go);
            row.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
            });
        });

        var form = $('#contact-form');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!form.checkValidity()) { form.reportValidity(); return; }
                var fd = new FormData(form);
                var name = String(fd.get('name') || '').trim();
                var email = String(fd.get('email') || '').trim();
                var message = String(fd.get('message') || '').trim();
                var subject = encodeURIComponent('Portfolio inquiry from ' + name);
                var body = encodeURIComponent('Name / Company: ' + name + '\nEmail: ' + email + '\n\n' + message);

                var btn = $('#contact-submit'), bt = $('#contact-submit-text'), bi = $('#contact-submit-icon');
                var oldT = bt.textContent, oldI = bi.innerHTML;
                btn.disabled = true; bt.textContent = 'Opening your email app'; bi.innerHTML = svg('check');
                setTimeout(function () { btn.disabled = false; bt.textContent = oldT; bi.innerHTML = oldI; }, 2600);
                window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
            });
        }
    }


    /* ==========================================================
       Page transitions (curtain) + path index
    ========================================================== */
    var curtain = $('#curtain'), curLabel = $('#curtain-label');
    function revealCurtain() {
        if (!curtain) return;
        if (RM) { curtain.style.visibility = 'hidden'; return; }
        gsap.killTweensOf([curtain, curLabel]);
        gsap.set(curtain, { visibility: 'visible', clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.to(curLabel, { yPercent: -70, opacity: 0, duration: 0.55, ease: 'power3.in', delay: 0.35 });
        gsap.to(curtain, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'power4.inOut', delay: 0.5, onComplete: function () { curtain.style.visibility = 'hidden'; } });
    }
    function leave(url, title) {
        if (RM || !curtain) { window.location.href = url; return; }
        curLabel.textContent = title || '';
        gsap.killTweensOf([curtain, curLabel]);
        gsap.set(curLabel, { yPercent: 70, opacity: 0 });
        gsap.set(curtain, { visibility: 'visible', clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.to(curLabel, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.25 });
        gsap.to(curtain, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power4.inOut', onComplete: function () { window.location.href = url; } });
    }
    $$('a[data-pl]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
            var url = a.getAttribute('href');
            if (url === window.location.pathname.split('/').pop() || (url === 'index.html' && !window.location.pathname.split('/').pop())) { e.preventDefault(); if (menuOpen) setMenu(false); window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); return; }
            e.preventDefault();
            if (menuOpen) setMenu(false);
            leave(url, a.getAttribute('data-title'));
        });
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted && curtain) { gsap.killTweensOf([curtain, curLabel]); curtain.style.visibility = 'hidden'; } });

    $$('.path').forEach(function (r) {
        var t = $('.path-title', r), txt = t.textContent, raf = 0, CH = '!<>-_/[]{}=+*^?#';
        r.addEventListener('pointermove', function (e) {
            var b = r.getBoundingClientRect();
            r.style.setProperty('--mx', (e.clientX - b.left) + 'px');
        }, { passive: true });
        r.addEventListener('pointerenter', function () {
            if (RM) return;
            var f = 0; cancelAnimationFrame(raf);
            (function step() {
                f++; var out = '';
                for (var i = 0; i < txt.length; i++) out += (i < f / 2) ? txt[i] : CH.charAt(Math.floor(Math.random() * CH.length));
                t.textContent = out;
                if (f / 2 < txt.length) raf = requestAnimationFrame(step); else t.textContent = txt;
            })();
        });
    });

    /* ==========================================================
       Boot
    ========================================================== */
    var nameApi = initName();
    initGrid();
    initReveals();
    initSkills();
    initMarquee();
    initWork();
    initDemo();
    initTimeline();
    initContact();
    initTilt();
    initProjectPage();
    initSkin();
    playIntro(nameApi);

    // Place the nav pill once fonts are in, then refresh scroll positions
    var placeInitial = function () {
        var first = navLinks[0];
        setActive(PAGE); if (activeLink) gsap.set(pill, { x: activeLink.offsetLeft, width: activeLink.offsetWidth, opacity: 1 });
        ScrollTrigger.refresh();
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeInitial); else placeInitial();
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
