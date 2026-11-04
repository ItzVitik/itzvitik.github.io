(function () {
    'use strict';

    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

    var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var root = document.documentElement;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        root.classList.remove('js');
        var yr0 = $('#year');
        if (yr0) yr0.textContent = new Date().getFullYear();
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    var EMAIL = 'smithvitek@gmail.com';
    var DEFAULT_TITLE = document.title;

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

    var TECH = ['Java', 'TypeScript', 'Node.js', 'discord.js', 'React', 'Skript', 'Paper', 'PostgreSQL', 'Redis', 'MongoDB', 'Docker', 'Linux', 'Express', 'Python', 'Luau', 'Roblox Studio'];

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

    if (FINE) {
        var ring = $('#cursor-ring');
        var dot = $('#cursor-dot');
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
            ring.classList.toggle('is-hover', !!t.closest('a, button, [role="button"], input, textarea, label'));
        });
    }

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

    var waves = [];
    function shockwave(x, y) { waves.push({ x: x, y: y, t: performance.now() }); }

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

            var now = performance.now(), maxR = Math.hypot(W, H);
            for (var k = waves.length - 1; k >= 0; k--) {
                var wv = waves[k], age = (now - wv.t) / 1000;
                wv.r = age * 1100;
                wv.a = 1 - age / 1.6;
                if (wv.a <= 0 || wv.r > maxR + 80) { waves.splice(k, 1); continue; }
                ctx.strokeStyle = 'rgba(238,238,238,' + (wv.a * 0.3).toFixed(3) + ')';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2); ctx.stroke();
            }

            var off = (window.scrollY * 0.12) % GAP;
            var near = [];
            ctx.fillStyle = 'rgba(245,245,245,0.085)';
            for (var y = -GAP + off; y < H + GAP; y += GAP) {
                for (var x = GAP / 2; x < W + GAP; x += GAP) {
                    var dx = x - sx, dy = y - sy;
                    var d2 = dx * dx + dy * dy;
                    var n = d2 < 57600 ? 1 - Math.sqrt(d2) / 240 : 0;
                    for (var w = 0; w < waves.length; w++) {
                        var band = 1 - Math.abs(Math.hypot(x - waves[w].x, y - waves[w].y) - waves[w].r) / 70;
                        if (band > 0) n = Math.max(n, band * waves[w].a);
                    }
                    if (n > 0) { near.push(x, y, n); }
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

    function initName() {
        var wrap = $('#name-wrap');
        var cv = $('#name-canvas');
        if (!wrap || !cv) return { start: function () {} };

        var ctx = cv.getContext('2d');
        var W = 0, H = 0, dpr = 1, size = 3;
        var N = 0, X, Y, VX, VY, HX, HY, DL, S, B;
        var started = false, visible = true, last = 0, t0 = 0, tNow = 0;
        var mouse = { x: -9999, y: -9999, active: false, px: 0, py: 0, speed: 0 };
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
                try { o.letterSpacing = (-0.035 * fs) + 'px'; } catch (e) {}
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
            shockwave(e.clientX, e.clientY);
        });

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
          .to(nav, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, 1.1);

        var track = $('#roles-track');
        var rolesN = track.children.length - 1;
        var roll = gsap.timeline({ repeat: -1, delay: 2.6 });
        for (var i = 1; i <= rolesN; i++) {
            roll.to(track, { yPercent: -(100 / (rolesN + 1)) * i, duration: 0.9, ease: 'power4.inOut' }, '+=1.9');
        }
        roll.set(track, { yPercent: 0 });

        gsap.to('.hero-inner', {
            yPercent: -10, opacity: 0, scale: 0.97, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 25%', scrub: true }
        });
    }

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

        $$('.row').forEach(function (r) {
            if (RM) return;
            gsap.set(r, { clipPath: 'inset(0 0 100% 0)', y: 30 });
            ScrollTrigger.create({
                trigger: r, start: 'top 92%', once: true,
                onEnter: function () { gsap.to(r, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, ease: 'power3.out', clearProps: 'clipPath,transform' }); }
            });
        });
    }

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
            try { viewer.autoRotate = true; viewer.autoRotateSpeed = 0.7; } catch (e1) {}
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
                    try { viewer.renderPaused = !en[0].isIntersecting; } catch (e2) {}
                }, { threshold: 0 }).observe(stage);
            }
        } catch (err) {
            clearTimeout(timer);
            console.error('skinview3d init failed:', err);
            fail('3D viewer failed to start.');
        }
    }

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

    var current = null;
    var lastOrigin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function initWork() {
        var list = $('#work-list');
        if (!list) return;

        list.innerHTML = ORDER.map(function (k) {
            var p = PROJECTS[k];
            var sc = p.status.toLowerCase();
            return '<a class="work-row" href="#/' + p.slug + '" data-key="' + k + '" data-cat="' + p.cat + '">' +
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
        if (!p.closed && p.link) { try { host = new URL(p.link).hostname.replace(/^www\./, ''); } catch (e) {} }
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
        try { history.pushState({}, '', url); } catch (e) {}
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

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(function () { legacyCopy(text); });
        } else { legacyCopy(text); }
    }
    function legacyCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
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
        curLabel.removeAttribute('data-text');
        scramble(curLabel, 0.8);
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

    var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>';
    function scramble(el, dur) {
        if (RM || !el) return;
        var final = el.getAttribute('data-text');
        if (final === null) { final = el.textContent; el.setAttribute('data-text', final); }
        if (el._scr) el._scr.kill();
        el.style.width = el.getBoundingClientRect().width + 'px';
        el.style.whiteSpace = 'nowrap';
        var o = { p: 0 }, len = final.length;
        el._scr = gsap.to(o, {
            p: 1, duration: dur || 0.55, ease: 'power1.out',
            onUpdate: function () {
                var done = Math.floor(o.p * len), s = final.slice(0, done);
                for (var i = done; i < len; i++) {
                    var ch = final[i];
                    if (ch === ' ' || ch === '/' || ch === '.') { s += ch; continue; }
                    var g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
                    s += ch === ch.toUpperCase() ? g : g.toLowerCase();
                }
                el.textContent = s;
            },
            onComplete: function () { el.textContent = final; el.style.width = ''; el.style.whiteSpace = ''; el._scr = null; }
        });
    }

    function initScramble() {
        if (RM) return;
        if (FINE) {
            navLinks.forEach(function (a) { a.addEventListener('pointerenter', function () { scramble(a, 0.45); }); });
            $$('.next').forEach(function (n) {
                var s = $('strong', n);
                n.addEventListener('pointerenter', function () { scramble(s, 0.7); });
            });
        }
        $$('.chat-bar span, .shot-bar span').forEach(function (s) {
            ScrollTrigger.create({ trigger: s, start: 'top 92%', once: true, onEnter: function () { scramble(s, 1); } });
        });
    }

    function initSpotlight() {
        if (!FINE) return;
        var els = $$('.card, .shot, .chat, .rbx-out-win, .gh, .radar-card');
        if (!els.length) return;
        els.forEach(function (el) { el.classList.add('spot'); });
        window.addEventListener('pointermove', function (e) {
            for (var i = 0; i < els.length; i++) {
                var r = els[i].getBoundingClientRect();
                if (r.bottom < -300 || r.top > window.innerHeight + 300) continue;
                els[i].style.setProperty('--mx', Math.round(e.clientX - r.left) + 'px');
                els[i].style.setProperty('--my', Math.round(e.clientY - r.top) + 'px');
            }
        }, { passive: true });
    }

    function initTiltCards() {
        if (!FINE || RM) return;
        $$('[data-tilt]').forEach(function (el) {
            gsap.set(el, { transformPerspective: 900 });
            var rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
            var ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
            el.addEventListener('pointermove', function (e) {
                var r = el.getBoundingClientRect();
                ry(((e.clientX - r.left) / r.width - 0.5) * 8);
                rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
            });
            el.addEventListener('pointerleave', function () { rx(0); ry(0); });
        });
    }

    function initShop() {
        var game = $('#rbx-game');
        if (!game) return;
        var cashEl = $('#rbx-cash'), out = $('#rbx-out'), toast = $('#rbx-toast'), hud = $('.rbx-hud', game);
        var lines = $$('#rbx-code .ln'), entry = lines[9];
        var ITEMS = {
            Sword: { name: 'Sword', price: 60 },
            SpeedCoil: { name: 'Speed Coil', price: 120 },
            GemPack: { name: 'Gem Pack', price: 300 }
        };
        var COOLDOWN = 0.5, cash = 150, view = 150, shown = { v: 150 }, lastBuy = -1e9;
        var FAKES = [999, 'AdminSword'], fakeN = 0;
        var queue = [], busy = false, visible = false, tok = 0;

        gsap.set(toast, { xPercent: -50 });

        function bump(d) {
            view += d;
            gsap.to(shown, { v: view, duration: RM ? 0 : 0.6, ease: 'power2.out', overwrite: true, onUpdate: function () { cashEl.textContent = Math.round(shown.v); } });
        }
        function log(text, cls) {
            var d = document.createElement('div');
            if (cls) d.className = cls;
            d.textContent = text;
            out.appendChild(d);
            while (out.children.length > 8) out.removeChild(out.firstChild);
            if (!RM) gsap.from(d, { opacity: 0, x: -8, duration: 0.3 });
        }
        function say(text, bad) {
            toast.textContent = text;
            toast.classList.toggle('is-bad', !!bad);
            gsap.killTweensOf(toast);
            if (RM) { gsap.set(toast, { opacity: 1 }); gsap.to(toast, { opacity: 0, duration: 0, delay: 1.6 }); return; }
            gsap.fromTo(toast, { opacity: 0, y: 14, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(2.5)' });
            gsap.to(toast, { opacity: 0, y: -10, duration: 0.3, delay: 1.5 });
        }
        function press(b) { if (!RM) gsap.fromTo(b, { scale: 0.86 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' }); }

        function fly(from, to, label, cls, done) {
            if (RM) { done(); return; }
            var a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
            var sx = window.scrollX, sy = window.scrollY;
            var x0 = a.left + a.width / 2 + sx, y0 = a.top + a.height / 2 + sy;
            var x1 = b.left + Math.min(b.width / 2, 150) + sx, y1 = b.top + b.height / 2 + sy;
            var cx = (x0 + x1) / 2, cy = Math.min(y0, y1) - 90;
            var p = document.createElement('div');
            p.className = 'rbx-packet' + (cls ? ' ' + cls : '');
            p.textContent = label;
            document.body.appendChild(p);
            gsap.set(p, { xPercent: -50, yPercent: -50, x: x0, y: y0, scale: 0.4 });
            gsap.to(p, { scale: 1, duration: 0.25, ease: 'back.out(3)' });
            var o = { t: 0 };
            gsap.to(o, {
                t: 1, duration: 0.75, ease: 'power2.inOut',
                onUpdate: function () {
                    var t = o.t, u = 1 - t;
                    gsap.set(p, { x: u * u * x0 + 2 * u * t * cx + t * t * x1, y: u * u * y0 + 2 * u * t * cy + t * t * y1 });
                },
                onComplete: function () {
                    gsap.to(p, { scale: 0, opacity: 0, duration: 0.2, onComplete: function () { p.remove(); } });
                    done();
                }
            });
        }

        function server(id) {
            var t = performance.now() / 1000, path = [10, 11];
            function res(ok, msg, line) { return { ok: ok, msg: msg, path: path, line: line }; }
            if (typeof id !== 'string') return res(false, 'Bad request', 11);
            path.push(12, 13);
            var item = ITEMS[id];
            if (!item) return res(false, 'Unknown item', 13);
            path.push(15, 16);
            if (lastBuy + COOLDOWN > t) return res(false, 'Slow down', 16);
            lastBuy = t;
            path.push(17, 19, 20);
            if (cash < item.price) return res(false, 'Not enough cash', 20);
            cash -= item.price;
            path.push(22, 23, 24);
            var r = res(true, '', 24);
            r.item = item;
            return r;
        }

        function mark(n, cls, clearAfter) {
            var l = lines[n - 1];
            if (!l) return;
            var my = ++tok;
            l._tok = my;
            l.classList.remove('is-hot', 'is-ok', 'is-bad');
            if (cls) l.classList.add(cls);
            if (clearAfter) gsap.delayedCall(clearAfter, function () { if (l._tok === my) l.classList.remove('is-hot', 'is-ok', 'is-bad'); });
        }
        function pump() {
            if (busy || !queue.length) return;
            busy = true;
            var job = queue.shift(), r = job.r;
            var step = RM ? 0 : (queue.length ? 0.05 : 0.12);
            var tl = gsap.timeline({ onComplete: function () { busy = false; pump(); } });
            r.path.forEach(function (n, i) {
                tl.call(function () {
                    if (i) mark(r.path[i - 1], null);
                    mark(n, 'is-hot');
                }, null, i * step);
            });
            tl.call(function () {
                mark(r.line, r.ok ? 'is-ok' : 'is-bad', 0.9);
                job.after();
            }, null, r.path.length * step);
        }

        function send(id, from) {
            var label = 'InvokeServer(' + (typeof id === 'string' ? '"' + id + '"' : id) + ')';
            log('[Client] Purchase:' + label);
            fly(from, entry, label, '', function () {
                var r = server(id);
                queue.push({
                    r: r,
                    after: function () {
                        var reply = r.ok ? 'true' : 'false, "' + r.msg + '"';
                        fly(entry, from, reply, r.ok ? 'is-ok' : 'is-bad', function () {
                            if (r.ok) {
                                bump(-r.item.price);
                                say('+1 ' + r.item.name + '!');
                                log('[Server] OK  ' + r.item.name + '  -' + r.item.price + ' Cash', 'o-ok');
                            } else {
                                say(r.msg, true);
                                log('[Server] Rejected: ' + r.msg, 'o-bad');
                            }
                        });
                    }
                });
                pump();
            });
        }

        $$('.rbx-buy', game).forEach(function (b) {
            b.addEventListener('click', function () { press(b); send(b.getAttribute('data-item'), b); });
        });
        var ex = $('#rbx-exploit');
        ex.addEventListener('click', function () {
            press(ex);
            var id = FAKES[fakeN++ % FAKES.length];
            log('[Exploit] Forging a request...', 'o-bad');
            send(id, ex);
        });

        var timer = $('#rbx-timer');
        function two(n) { return (n < 10 ? '0' : '') + n; }
        function tickTimer() {
            var now = new Date(), end = new Date(now);
            end.setHours(24, 0, 0, 0);
            var s = Math.max(0, Math.floor((end - now) / 1000));
            timer.textContent = two(Math.floor(s / 3600)) + ':' + two(Math.floor(s / 60) % 60) + ':' + two(s % 60);
        }
        if (timer) { tickTimer(); setInterval(tickTimer, 1000); }

        if (typeof IntersectionObserver !== 'undefined') {
            new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(game);
        } else { visible = true; }
        setInterval(function () {
            if (!visible || document.hidden) return;
            cash += 10;
            bump(10);
            if (RM) return;
            var f = document.createElement('span');
            f.className = 'rbx-float';
            f.textContent = '+10';
            f.style.left = (hud.offsetLeft + hud.offsetWidth - 14) + 'px';
            f.style.top = (hud.offsetTop + 4) + 'px';
            game.appendChild(f);
            gsap.fromTo(f, { y: 0, opacity: 1 }, { y: -26, opacity: 0, duration: 1.1, ease: 'power2.out', onComplete: function () { f.remove(); } });
        }, 2000);
    }

    function initTerminal() {
        var PAGES = {
            home: ['index.html', 'Home'], about: ['about.html', 'About'], skills: ['skills.html', 'Skills'], work: ['work.html', 'Work'],
            roblox: ['roblox.html', 'Roblox'], journey: ['journey.html', 'Journey'], contact: ['contact.html', 'Contact']
        };
        var el = document.createElement('div');
        el.className = 'term';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-label', 'Console');
        el.setAttribute('aria-hidden', 'true');
        el.setAttribute('data-lenis-prevent', '');
        el.innerHTML = '<div class="term-bar"><i></i><i></i><i></i><span>itzvitik@web: ~/' + esc(PAGE || '') + '</span><button type="button" class="term-x">esc</button></div>' +
            '<div class="term-out"></div>' +
            '<form class="term-line" autocomplete="off"><label class="term-ps" for="term-in">~ $</label><input id="term-in" type="text" spellcheck="false" autocapitalize="off" autocorrect="off"></form>';
        document.body.appendChild(el);
        gsap.set(el, { xPercent: -50 });
        var outEl = $('.term-out', el), input = $('#term-in', el), form = $('form', el);
        var open = false, greeted = false, hist = [], hi = 0;

        var mac = /Mac|iPhone|iPad/.test(navigator.platform || '');
        var hint = document.createElement('button');
        hint.type = 'button';
        hint.className = 'term-hint';
        hint.innerHTML = '<kbd>' + (mac ? '&#8984;' : 'Ctrl') + '</kbd><kbd>K</kbd><span>console</span>';
        var fin = $('.footer-in');
        if (fin) fin.insertBefore(hint, fin.lastElementChild);
        hint.addEventListener('click', function () { setOpen(true); });

        function print(html, cls) {
            var d = document.createElement('div');
            if (cls) d.className = cls;
            d.innerHTML = html;
            outEl.appendChild(d);
            outEl.scrollTop = outEl.scrollHeight;
        }
        function pad(s, n) { s = String(s); while (s.length < n) s += ' '; return s; }
        function setOpen(v) {
            if (v === open) return;
            open = v;
            el.setAttribute('aria-hidden', String(!v));
            gsap.killTweensOf(el);
            if (v) {
                gsap.set(el, { visibility: 'visible' });
                gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: RM ? 0 : 0.45, ease: 'power3.out' });
                if (!greeted) { greeted = true; print('ItzVitik console. Type <b>help</b> to see what it can do.', 't-dim'); }
                setTimeout(function () { input.focus(); }, 30);
            } else {
                input.blur();
                gsap.to(el, { y: 30, opacity: 0, duration: RM ? 0 : 0.3, ease: 'power2.in', onComplete: function () { if (!open) gsap.set(el, { visibility: 'hidden' }); } });
            }
        }
        function go(p) {
            print('opening ' + esc(p[1]) + '...', 't-dim');
            setTimeout(function () { setOpen(false); leave(p[0], p[1]); }, 250);
        }
        function findProject(q) {
            q = (q || '').toLowerCase();
            if (SLUG2KEY[q]) return SLUG2KEY[q];
            if (PROJECTS[q]) return q;
            for (var i = 0; i < ORDER.length; i++) {
                var p = PROJECTS[ORDER[i]];
                if (p.title.toLowerCase().indexOf(q) === 0 || p.slug.indexOf(q) === 0) return ORDER[i];
            }
            return null;
        }

        var CMDS = {
            help: function () {
                print([
                    '<b>ls</b>              list pages',
                    '<b>open</b> &lt;name&gt;     open a page or a project (cd works too)',
                    '<b>projects</b>        list projects',
                    '<b>whoami</b>          who is behind this',
                    '<b>skills</b>          skill bars, terminal edition',
                    '<b>email</b>           copy my email',
                    '<b>github</b>          open my GitHub',
                    '<b>gravity</b>         you will see',
                    '<b>boom</b>            shake the background grid',
                    '<b>clear</b>           clear the screen',
                    '<b>exit</b>            close the console'
                ].join('\n'));
            },
            ls: function () { print(Object.keys(PAGES).map(function (k) { return k === PAGE ? '<b>' + k + '</b>' : k; }).join('   ')); },
            open: function (a) {
                var q = (a[0] || '').toLowerCase();
                if (!q) { print('usage: open &lt;page|project&gt;', 't-err'); return; }
                if (PAGES[q]) { go(PAGES[q]); return; }
                var k = findProject(q);
                if (!k) { print('nothing called ' + esc(q) + '. Try <b>ls</b> or <b>projects</b>.', 't-err'); return; }
                if ($('#pp-back')) { setOpen(false); openProject(k, true, null); }
                else go(['work.html#/' + PROJECTS[k].slug, 'Work']);
            },
            projects: function () {
                print(ORDER.map(function (k) {
                    var p = PROJECTS[k];
                    return '<b>' + pad(p.slug, 20) + '</b>' + pad(p.status, 10) + esc(p.title);
                }).join('\n') + '\n<span class="t-dim">open one with: open &lt;name&gt;</span>');
            },
            whoami: function () { print('ItzVitik. Full-stack developer: web apps, Discord bots, Minecraft systems and Roblox games. Writing code since 2022.'); },
            skills: function () {
                print(SKILLS.map(function (s) {
                    var n = Math.round(s.value / 5);
                    return pad(s.name, 16) + new Array(n + 1).join('█') + '<span class="t-dim">' + new Array(21 - n).join('░') + '</span> ' + s.value + '%';
                }).join('\n'));
            },
            email: function () { copyText(EMAIL); print('copied ' + esc(EMAIL) + ' to your clipboard', 't-ok'); },
            github: function () { window.open('https://github.com/ItzVitik', '_blank', 'noopener'); print('opening github.com/ItzVitik', 't-dim'); },
            gravity: function () {
                if (RM) { print('gravity is off while reduced motion is on.', 't-dim'); return; }
                setOpen(false);
                setTimeout(toggleGravity, 320);
            },
            boom: function () {
                if (RM) { print('no booms with reduced motion on.', 't-dim'); return; }
                for (var i = 0; i < 7; i++) {
                    (function (i) { setTimeout(function () { shockwave(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.7); }, i * 140); })(i);
                }
                print('boom.', 't-ok');
            },
            clear: function () { outEl.innerHTML = ''; },
            exit: function () { setOpen(false); },
            date: function () { print(esc(new Date().toString())); },
            echo: function (a) { print(esc(a.join(' '))); },
            history: function () { print(hist.map(function (h, i) { return (i + 1) + '  ' + esc(h); }).join('\n')); },
            sudo: function () { print('Permission denied. Nice try though.', 't-err'); },
            rm: function () { print('rm: refusing to delete my own portfolio.', 't-err'); },
            hello: function () { print('Hey! Type <b>help</b> to look around.'); },
            secret: function () { print('There might be a code. Arrows and two letters, if you know, you know.', 't-dim'); }
        };
        CMDS.cd = CMDS.open;
        CMDS.quit = CMDS.close = CMDS.exit;
        CMDS.hi = CMDS.hello;

        function run(line) {
            var raw = line.trim();
            if (!raw) return;
            print(esc(raw), 't-cmd');
            hist.push(raw);
            hi = hist.length;
            var parts = raw.split(/\s+/), cmd = parts[0].toLowerCase(), args = parts.slice(1);
            if (CMDS[cmd]) CMDS[cmd](args);
            else if (PAGES[cmd]) go(PAGES[cmd]);
            else print('command not found: ' + esc(cmd) + '. Try <b>help</b>.', 't-err');
        }
        function complete() {
            var parts = input.value.split(' ');
            var pool = parts.length > 1 ? Object.keys(PAGES).concat(ORDER.map(function (k) { return PROJECTS[k].slug; })) : Object.keys(CMDS);
            var last = parts[parts.length - 1].toLowerCase();
            var hits = pool.filter(function (c) { return c.indexOf(last) === 0; });
            if (hits.length === 1) {
                parts[parts.length - 1] = hits[0];
                input.value = parts.join(' ') + (parts.length === 1 ? ' ' : '');
            } else if (hits.length > 1) print(hits.join('   '), 't-dim');
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var v = input.value;
            input.value = '';
            run(v);
        });
        input.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowUp') { e.preventDefault(); if (hi > 0) { hi--; input.value = hist[hi]; } }
            else if (e.key === 'ArrowDown') { e.preventDefault(); if (hi < hist.length) { hi++; input.value = hist[hi] || ''; } }
            else if (e.key === 'Tab') { e.preventDefault(); complete(); }
        });
        $('.term-x', el).addEventListener('click', function () { setOpen(false); });
        window.addEventListener('keydown', function (e) {
            var k = (e.key || '').toLowerCase();
            if ((e.ctrlKey || e.metaKey) && k === 'k') { e.preventDefault(); setOpen(!open); return; }
            if (open && e.key === 'Escape') { setOpen(false); return; }
            var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
            if (!open && !typing && (e.key === '/' || e.key === '`')) { e.preventDefault(); setOpen(true); }
        });
    }

    var grav = null;
    function toggleGravity() { if (grav) stopGravity(); else startGravity(); }

    function startGravity() {
        if (RM || grav) return;
        if (menuOpen) setMenu(false);
        root.classList.add('is-gravity', 'is-locked');
        if (lenis) lenis.stop();

        var SEL = '.nav, main h2, main h3, main p, main .btn, .card, .shot, .chat, .rbx-win, .rbx-out-win, .row-tags span, .pills span, .stats > div, ' +
            '.more, .chip, .tl-year, .tl-dot, .work-meta, .work-arrow, .status, .name-wrap, .roles, .bar, .radar-card, .copy-row, .field, .next strong, .next svg, .gh, .row-num, .head-note, .tilt';
        var W = window.innerWidth, H = window.innerHeight, bodies = [];
        $$(SEL).forEach(function (el) {
            if (bodies.length >= 70) return;
            var r = el.getBoundingClientRect();
            if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > H || r.right < 0 || r.left > W) return;
            if (r.width * r.height > W * H * 0.6) return;
            for (var i = 0; i < bodies.length; i++) if (bodies[i].el.contains(el)) return;
            bodies.push({ el: el, x0: r.left, y0: r.top, x: r.left, y: r.top, w: r.width, h: r.height, vx: (Math.random() - 0.5) * 6, vy: -Math.random() * 4, a: 0 });
        });

        var bar = document.createElement('div');
        bar.className = 'grav-bar';
        bar.innerHTML = '<span>Gravity is on. Drag things around.</span><button type="button">Put it back</button>';
        document.body.appendChild(bar);
        gsap.set(bar, { xPercent: -50 });
        gsap.from(bar, { y: -20, opacity: 0, duration: 0.4, ease: 'power3.out' });
        $('button', bar).addEventListener('click', stopGravity);

        var drag = null;
        function bodyAt(t) {
            for (var i = bodies.length - 1; i >= 0; i--) if (bodies[i].el.contains(t)) return bodies[i];
            return null;
        }
        function down(e) {
            var b = bodyAt(e.target);
            if (!b) return;
            e.preventDefault();
            drag = { b: b, ox: e.clientX - b.x, oy: e.clientY - b.y, lx: e.clientX, ly: e.clientY };
        }
        function move(e) {
            if (!drag) return;
            var b = drag.b;
            b.x = e.clientX - drag.ox; b.y = e.clientY - drag.oy;
            b.vx = clamp(e.clientX - drag.lx, -40, 40); b.vy = clamp(e.clientY - drag.ly, -40, 40);
            drag.lx = e.clientX; drag.ly = e.clientY;
        }
        function up() { drag = null; }
        function block(e) { if (bodyAt(e.target)) { e.preventDefault(); e.stopPropagation(); } }
        document.addEventListener('pointerdown', down, true);
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        document.addEventListener('click', block, true);

        function tick() {
            var W2 = window.innerWidth, H2 = window.innerHeight, i, j, b;
            for (i = 0; i < bodies.length; i++) {
                b = bodies[i];
                if (drag && drag.b === b) continue;
                b.vy += 0.7; b.vx *= 0.995;
                b.x += b.vx; b.y += b.vy;
                if (b.y + b.h > H2) { b.y = H2 - b.h; b.vy *= -0.32; b.vx *= 0.85; if (Math.abs(b.vy) < 0.8) b.vy = 0; }
                if (b.x < 0) { b.x = 0; b.vx *= -0.5; }
                if (b.x + b.w > W2) { b.x = W2 - b.w; b.vx *= -0.5; }
            }
            for (var pass = 0; pass < 2; pass++) {
                for (i = 0; i < bodies.length; i++) {
                    for (j = i + 1; j < bodies.length; j++) {
                        var A = bodies[i], B = bodies[j];
                        var ox = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x);
                        var oy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
                        if (ox <= 0 || oy <= 0) continue;
                        if (ox < oy) {
                            var s = (A.x + A.w / 2 < B.x + B.w / 2) ? -1 : 1;
                            var ka = drag && drag.b === A ? 0 : drag && drag.b === B ? 1 : 0.5;
                            A.x += s * ox * ka; B.x -= s * ox * (1 - ka);
                            var v = (A.vx + B.vx) / 2; A.vx = v; B.vx = v;
                        } else {
                            var top = A.y < B.y ? A : B, bot = top === A ? B : A;
                            if (drag && drag.b === top) { bot.y += oy; }
                            else { top.y -= oy; if (top.vy > bot.vy) top.vy = bot.vy; top.vx *= 0.9; }
                        }
                    }
                }
            }
            for (i = 0; i < bodies.length; i++) {
                b = bodies[i];
                var target = clamp(b.vx * 1.5, -22, 22) * (Math.abs(b.vy) > 1 ? 1 : 0.15);
                b.a += (target - b.a) * 0.15;
                b.el.style.translate = (b.x - b.x0).toFixed(1) + 'px ' + (b.y - b.y0).toFixed(1) + 'px';
                b.el.style.rotate = b.a.toFixed(2) + 'deg';
            }
        }
        gsap.ticker.add(tick);

        grav = {
            bar: bar, bodies: bodies, tick: tick,
            cleanup: function () {
                document.removeEventListener('pointerdown', down, true);
                window.removeEventListener('pointermove', move);
                window.removeEventListener('pointerup', up);
                document.removeEventListener('click', block, true);
            }
        };
    }

    function stopGravity() {
        if (!grav) return;
        var g = grav;
        grav = null;
        gsap.ticker.remove(g.tick);
        g.cleanup();
        g.bodies.forEach(function (b, i) {
            var o = { x: b.x - b.x0, y: b.y - b.y0, a: b.a };
            gsap.to(o, {
                x: 0, y: 0, a: 0, duration: 1, delay: i * 0.008, ease: 'power3.inOut',
                onUpdate: function () { b.el.style.translate = o.x + 'px ' + o.y + 'px'; b.el.style.rotate = o.a + 'deg'; },
                onComplete: function () { b.el.style.translate = ''; b.el.style.rotate = ''; }
            });
        });
        gsap.to(g.bar, { opacity: 0, y: -20, duration: 0.3, onComplete: function () { g.bar.remove(); } });
        setTimeout(function () {
            root.classList.remove('is-gravity', 'is-locked');
            if (lenis) lenis.start();
        }, 1100);
    }

    function initKonami() {
        var SEQ = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'], pos = 0;
        window.addEventListener('keydown', function (e) {
            if (grav && e.key === 'Escape') { stopGravity(); return; }
            var t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
            var k = (e.key || '').toLowerCase();
            pos = k === SEQ[pos] ? pos + 1 : (k === SEQ[0] ? 1 : 0);
            if (pos === SEQ.length) { pos = 0; toggleGravity(); }
        });
    }

    function initGithub() {
        var list = $('#gh-list');
        if (!list) return;
        var box = $('#gh-feed'), KEY = 'gh-feed-v2', API = 'https://api.github.com';

        function ago(iso) {
            var s = (Date.now() - new Date(iso).getTime()) / 1000;
            if (s < 3600) return Math.max(1, Math.round(s / 60)) + 'm ago';
            if (s < 86400) return Math.round(s / 3600) + 'h ago';
            return Math.round(s / 86400) + 'd ago';
        }
        function getJSON(url) {
            return fetch(url).then(function (r) { if (!r.ok) throw new Error('GitHub ' + r.status); return r.json(); });
        }
        function load() {
            return getJSON(API + '/users/ItzVitik/events/public?per_page=40').then(function (events) {
                var repos = [];
                events.forEach(function (ev) {
                    var name = ev.repo && ev.repo.name;
                    if (ev.type === 'PushEvent' && name && repos.indexOf(name) === -1 && repos.length < 3) repos.push(name);
                });
                return Promise.all(repos.map(function (name) {
                    return getJSON(API + '/repos/' + name + '/commits?per_page=3').then(function (commits) {
                        return commits.map(function (c) {
                            return { repo: name, msg: String(c.commit.message || '').split('\n')[0], at: c.commit.committer ? c.commit.committer.date : c.commit.author.date };
                        });
                    }).catch(function () { return []; });
                }));
            }).then(function (lists) {
                var rows = [].concat.apply([], lists);
                rows.sort(function (a, b) { return new Date(b.at) - new Date(a.at); });
                return rows.slice(0, 4);
            });
        }
        function render(rows) {
            if (!rows || !rows.length) { box.hidden = true; ScrollTrigger.refresh(); return; }
            list.innerHTML = rows.map(function (r) {
                return '<li><a href="https://github.com/' + esc(r.repo) + '" target="_blank" rel="noopener">' + esc(r.repo.split('/').pop()) + '</a>' +
                    '<time datetime="' + esc(r.at) + '">' + ago(r.at) + '</time><span class="gh-msg">' + esc(r.msg) + '</span></li>';
            }).join('');
            if (!RM) gsap.from($$('li', list), { opacity: 0, y: 10, stagger: 0.08, duration: 0.6, ease: 'power3.out' });
        }

        var cached = null;
        try {
            var c = JSON.parse(sessionStorage.getItem(KEY) || 'null');
            if (c && Date.now() - c.t < 600000) cached = c.rows;
        } catch (e) {}
        if (cached) { render(cached); return; }

        load()
            .then(function (rows) {
                try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), rows: rows })); } catch (e) {}
                render(rows);
            })
            .catch(function () { box.hidden = true; ScrollTrigger.refresh(); });
    }

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
    initShop();
    initScramble();
    initSpotlight();
    initTiltCards();
    initTerminal();
    initKonami();
    initGithub();
    playIntro(nameApi);

    var placeInitial = function () {
        var first = navLinks[0];
        setActive(PAGE); if (activeLink) gsap.set(pill, { x: activeLink.offsetLeft, width: activeLink.offsetWidth, opacity: 1 });
        ScrollTrigger.refresh();
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeInitial); else placeInitial();
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
