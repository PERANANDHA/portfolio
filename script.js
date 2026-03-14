document.addEventListener('DOMContentLoaded', () => {
    // 0. Custom Cursor Logic
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth trailing effect for the outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive, .skill-category, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.backgroundColor = 'var(--primary-glow)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // 1. Navigation Background on Scroll & Theme Toggle
    const nav = document.querySelector('nav');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const navHeight = nav.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open (implementation later)
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = navLinks.style.display === 'flex';
            if (isExpanded) {
                navLinks.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(6, 9, 19, 0.95)';
                navLinks.style.padding = '20px 0';
                navLinks.style.gap = '20px';
                navLinks.style.borderBottom = '1px solid var(--card-border)';

                // Fix anchor tags in mobile view
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.style.marginLeft = '0';
                    a.style.textAlign = 'center';
                });

                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Trigger initial reveal for items already in viewport on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // 5. 3D AI Neural Network Background (Three.js)
    const canvas = document.getElementById('bg-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 150;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance

        // Network Configuration
        const particleCount = 200;
        const maxDistance = 40; // Max distance to draw a connecting line
        const particles = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleVelocities = [];

        // Generate random nodes
        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 400;
            const y = (Math.random() - 0.5) * 400;
            const z = (Math.random() - 0.5) * 400;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            particleVelocities.push({
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        // Node Material (The dots)
        const pMaterial = new THREE.PointsMaterial({
            color: 0x00f0ff,
            size: 2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particles, pMaterial);
        scene.add(particleSystem);

        // Lines/Synapses Setup
        const linesGeometry = new THREE.BufferGeometry();
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x8b5cf6, // Secondary color
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });

        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(linesMesh);

        // Core Holographic Geometry (Icosahedron)
        const coreGeometry = new THREE.IcosahedronGeometry(80, 1);
        
        // Store original vertices so the lines can bend and snap back dynamically
        const coreBasePos = new Float32Array(coreGeometry.attributes.position.array.length);
        coreBasePos.set(coreGeometry.attributes.position.array);

        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.15, // Base opacity
            blending: THREE.AdditiveBlending
        });
        
        // Simulating thick lines by combining multiple meshes slightly offset/scaled
        // (WebGL restricts wireframeLinewidth to 1 on most Windows machines)
        const coreGroup = new THREE.Group();
        
        const coreMesh1 = new THREE.Mesh(coreGeometry, coreMaterial);
        coreGroup.add(coreMesh1);

        const coreMesh2 = new THREE.Mesh(coreGeometry, coreMaterial);
        coreMesh2.scale.set(1.005, 1.005, 1.005);
        coreMesh2.rotation.set(0.002, 0.002, 0);
        coreGroup.add(coreMesh2);

        const coreMesh3 = new THREE.Mesh(coreGeometry, coreMaterial);
        coreMesh3.scale.set(0.995, 0.995, 0.995);
        coreMesh3.rotation.set(-0.002, -0.002, 0);
        coreGroup.add(coreMesh3);

        const coreMesh4 = new THREE.Mesh(coreGeometry, coreMaterial);
        coreMesh4.scale.set(1.01, 1.01, 1.01);
        coreMesh4.rotation.set(0.004, -0.004, 0);
        coreGroup.add(coreMesh4);

        scene.add(coreGroup);

        // Atmospheric Dust
        const dustCount = 500;
        const dustGeometry = new THREE.BufferGeometry();
        const dustPositions = new Float32Array(dustCount * 3);
        const dustVelocities = [];

        for (let i = 0; i < dustCount; i++) {
            dustPositions[i * 3] = (Math.random() - 0.5) * 600;
            dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
            dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 600;
            dustVelocities.push({
                x: (Math.random() - 0.5) * 0.05,
                y: -Math.random() * 0.1 - 0.02, // drifting slowly down
                z: (Math.random() - 0.5) * 0.05
            });
        }
        dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
        const dustMaterial = new THREE.PointsMaterial({
            color: 0x0ea5e9,
            size: 1.5,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        const dustSystem = new THREE.Points(dustGeometry, dustMaterial);
        scene.add(dustSystem);

        // Orbital Rings (Only one cyan ring now)
        const ringMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending });

        const ringMesh2 = new THREE.Mesh(new THREE.TorusGeometry(125, 0.5, 3, 64), ringMaterial2);
        ringMesh2.rotation.y = Math.PI / 3;
        scene.add(ringMesh2);

        // Theme Management function
        function updateNetworkColors() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            if (currentTheme === 'light') {
                pMaterial.color.setHex(0x2563eb); // Light theme Primary (Indigo)
                linesMaterial.color.setHex(0x0ea5e9); // Light theme Accent (Light Blue)
                linesMaterial.opacity = 0.15;
                pMaterial.blending = THREE.NormalBlending;
                linesMaterial.blending = THREE.NormalBlending;

                coreMaterial.color.setHex(0x0ea5e9);
                coreMaterial.opacity = 0.15;
                coreMaterial.blending = THREE.NormalBlending;

                dustMaterial.color.setHex(0x64748b);
                dustMaterial.opacity = 0.4;
                dustMaterial.blending = THREE.NormalBlending;
                ringMaterial2.color.setHex(0x94a3b8);
                ringMaterial2.opacity = 0.08;
                ringMaterial2.blending = THREE.NormalBlending;
            } else {
                pMaterial.color.setHex(0x00f0ff); // Dark theme Primary (Cyan)
                linesMaterial.color.setHex(0x8b5cf6); // Dark theme Secondary (Purple)
                linesMaterial.opacity = 0.15;
                pMaterial.blending = THREE.AdditiveBlending;
                linesMaterial.blending = THREE.AdditiveBlending;

                coreMaterial.color.setHex(0x8b5cf6);
                coreMaterial.opacity = 0.05;
                coreMaterial.blending = THREE.AdditiveBlending;

                dustMaterial.color.setHex(0x0ea5e9);
                dustMaterial.opacity = 0.3;
                dustMaterial.blending = THREE.AdditiveBlending;
                ringMaterial2.color.setHex(0x00f0ff);
                ringMaterial2.blending = THREE.AdditiveBlending;
            }
        }

        // Initialize colors based on current theme
        updateNetworkColors();

        // Listen for theme toggles to dynamically update the network
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                // Short delay to allow DOM to update the data-theme attribute
                setTimeout(updateNetworkColors, 50);
            });
        }

        // Animation Loop
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        const mouseVec = new THREE.Vector2();

        let isRepelling = false;
        let repelIntensity = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
            mouseVec.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVec.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        document.addEventListener('click', () => {
            isRepelling = true;
            repelIntensity = 1.0;
        });

        function animate() {
            requestAnimationFrame(animate);

            // Gently rotate entire system based on mouse position
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            particleSystem.rotation.y += 0.05 * (targetX - particleSystem.rotation.y);
            particleSystem.rotation.x += 0.05 * (targetY - particleSystem.rotation.x);
            linesMesh.rotation.y = particleSystem.rotation.y;
            linesMesh.rotation.x = particleSystem.rotation.x;

            // Continously rotate layout slowly
            particleSystem.rotation.y += 0.001;
            linesMesh.rotation.y += 0.001;

            // Rotate Core Hologram and Rings independently
            coreGroup.rotation.x += 0.0015;
            coreGroup.rotation.y += 0.002;

            ringMesh2.rotation.x += 0.001;
            ringMesh2.rotation.z -= 0.002;

            // Move Dust
            const dustPos = dustSystem.geometry.attributes.position.array;
            for (let i = 0; i < dustCount; i++) {
                const i3 = i * 3;
                dustPos[i3] += dustVelocities[i].x;
                dustPos[i3 + 1] += dustVelocities[i].y;
                dustPos[i3 + 2] += dustVelocities[i].z;

                // Wrap around
                if (dustPos[i3 + 1] < -300) dustPos[i3 + 1] = 300;
                if (Math.abs(dustPos[i3]) > 300) dustPos[i3] *= -0.9;
            }
            dustSystem.geometry.attributes.position.needsUpdate = true;

            const positions = particleSystem.geometry.attributes.position.array;
            let linePositions = [];

            // Project mouse to 3D Space for interactions
            const vector = new THREE.Vector3(mouseVec.x, mouseVec.y, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const mouseWorldPos = camera.position.clone().add(dir.multiplyScalar(distance));

            // Decay Repulsion
            if (repelIntensity > 0) {
                repelIntensity -= 0.02; // slow decay
                if (repelIntensity <= 0) {
                    isRepelling = false;
                    repelIntensity = 0;
                }
            }

            // Move particles and check for connections
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                // Move
                positions[i3] += particleVelocities[i].x;
                positions[i3 + 1] += particleVelocities[i].y;
                positions[i3 + 2] += particleVelocities[i].z;

                // Repulsion logic
                if (isRepelling) {
                    const rdx = positions[i3] - mouseWorldPos.x;
                    const rdy = positions[i3 + 1] - mouseWorldPos.y;
                    const rdz = positions[i3 + 2] - mouseWorldPos.z;
                    const rDist = Math.sqrt(rdx * rdx + rdy * rdy + rdz * rdz);

                    // Push nodes away within an 80 unit radius
                    if (rDist < 100 && rDist > 1) { // avoid dividing by zero
                        const force = (100 - rDist) * repelIntensity * 0.08; // scale force
                        positions[i3] += (rdx / rDist) * force;
                        positions[i3 + 1] += (rdy / rDist) * force;
                        positions[i3 + 2] += (rdz / rDist) * force;
                    }
                }

                // Bounce off invisible boundaries to keep them grouped
                if (Math.abs(positions[i3]) > 200) particleVelocities[i].x *= -1;
                if (Math.abs(positions[i3 + 1]) > 200) particleVelocities[i].y *= -1;
                if (Math.abs(positions[i3 + 2]) > 200) particleVelocities[i].z *= -1;

                // Connect to Mouse Cursor if close
                const mdx = positions[i3] - mouseWorldPos.x;
                const mdy = positions[i3 + 1] - mouseWorldPos.y;
                const mdz = positions[i3 + 2] - mouseWorldPos.z;
                const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy + mdz * mdz);

                if (mouseDist < (maxDistance * 2)) {
                    linePositions.push(
                        positions[i3], positions[i3 + 1], positions[i3 + 2],
                        mouseWorldPos.x, mouseWorldPos.y, mouseWorldPos.z
                    );
                }

                // Check distances against other particles to draw connecting lines
                for (let j = i + 1; j < particleCount; j++) {
                    const j3 = j * 3;
                    const dx = positions[i3] - positions[j3];
                    const dy = positions[i3 + 1] - positions[j3 + 1];
                    const dz = positions[i3 + 2] - positions[j3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < maxDistance) {
                        linePositions.push(
                            positions[i3], positions[i3 + 1], positions[i3 + 2],
                            positions[j3], positions[j3 + 1], positions[j3 + 2]
                        );
                    }
                }
            } // End particle loop
            
            // --- Core Geometry Line Bending Interaction ---
            // Bend the vertices of the design lines towards the mouse
            const localMousePos = mouseWorldPos.clone();
            coreGroup.worldToLocal(localMousePos); // Convert to the spinning local space

            const corePositions = coreGeometry.attributes.position.array;
            const interactRadius = 120; // Radius around mouse that pulls lines
            const maxPull = 60; // How far the lines stretch

            for (let i = 0; i < corePositions.length; i += 3) {
                const bx = coreBasePos[i];
                const by = coreBasePos[i + 1];
                const bz = coreBasePos[i + 2];

                const dx = localMousePos.x - bx;
                const dy = localMousePos.y - by;
                const dz = localMousePos.z - bz;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                let tx = bx, ty = by, tz = bz;

                // If vertex is near mouse, calculate target pulled position
                if (dist < interactRadius && dist > 0.1) {
                    // Non-linear easing for more organic stretch
                    const force = Math.pow(1 - (dist / interactRadius), 1.5);
                    const pull = force * maxPull;
                    tx += (dx / dist) * pull;
                    ty += (dy / dist) * pull;
                    tz += (dz / dist) * pull;
                }

                // Smoothly snap vertex to target (either pulled or rest position)
                corePositions[i] += (tx - corePositions[i]) * 0.15;
                corePositions[i + 1] += (ty - corePositions[i + 1]) * 0.15;
                corePositions[i + 2] += (tz - corePositions[i + 2]) * 0.15;
            }
            coreGeometry.attributes.position.needsUpdate = true;
            // -------------------------------------

            particleSystem.geometry.attributes.position.needsUpdate = true;

            // Update line geometry dynamically
            linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            renderer.render(scene, camera);
        }

        // Handle Window Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Start animation
        animate();
    }

});
