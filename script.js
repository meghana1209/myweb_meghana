// ============================================
// THREE.JS SCENE SETUP
// ============================================

const canvas = document.getElementById('canvas');

if (!canvas) {
  console.error("Canvas element not found");
}

const loadingSpinner = document.querySelector('.loading-spinner');
const contentWrapper = document.querySelector('.content-wrapper');

let scene, camera, renderer, model;
let mouse = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let cameraOffset = { z: 0 };

// Initialize Three.js Scene
function initScene() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf5ede0, 100, 1000);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xf5ede0, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    // Lighting
    addLights();

    // Load Model
    loadAvatarModel();

    // Handle Resize
    window.addEventListener('resize', onWindowResize);

    // Mouse Move
    document.addEventListener('mousemove', onMouseMove);

    // Start Animation Loop
    animationLoop();

    // Setup GSAP Animations
    setupGSAPAnimations();

    // Hide Loading Spinner
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
    }, 500);
}

// ============================================
// LIGHTING
// ============================================
function addLights() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);

    // Point Light (Accent)
    const pointLight = new THREE.PointLight(0xff9f43, 0.5, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Point Light 2 (Secondary Accent)
    const pointLight2 = new THREE.PointLight(0xffc857, 0.3, 100);
    pointLight2.position.set(5, 3, -5);
    scene.add(pointLight2);
}

// ============================================
// LOAD AVATAR MODEL
// ============================================
function loadAvatarModel() {
    const loader = new THREE.GLTFLoader();

    // Create a default avatar if file doesn't exist
    // You can replace this URL with your actual avatar model path
    // For now, we'll create a procedural avatar as fallback
    
    // Procedural Avatar (Fallback)
    createProceduralAvatar();

    // Attempt to load GLTF model if it exists
    // Uncomment below when you have the female_avatar.glb file
    /*
    loader.load('assets/models/female_avatar.glb', (gltf) => {
        model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.position.set(0, -1, 0);
        
        // Apply materials
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        scene.add(model);
    }, undefined, (error) => {
        console.error('Error loading avatar:', error);
        createProceduralAvatar();
    });
    */
}

// ============================================
// PROCEDURAL AVATAR (Fallback)
// ============================================
function createProceduralAvatar() {
    const group = new THREE.Group();

    // Head
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: 0xe8b399,
        emissive: 0xff9f43,
        emissiveIntensity: 0.08,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);

    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.2, 4, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0xf9d9b5,
        emissive: 0xffc857,
        emissiveIntensity: 0.04,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Left Arm
    const armGeometry = new THREE.CapsuleGeometry(0.15, 1, 4, 8);
    const armMaterial = new THREE.MeshPhongMaterial({
        color: 0xe8b399,
    });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0.8, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    group.add(leftArm);

    // Right Arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.6, 0.8, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    group.add(rightArm);

    // Left Leg
    const legGeometry = new THREE.CapsuleGeometry(0.15, 0.9, 4, 8);
    const legMaterial = new THREE.MeshPhongMaterial({
        color: 0x3d3d3d,
    });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.25, -0.7, 0);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    group.add(leftLeg);

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.25, -0.7, 0);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    group.add(rightLeg);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0xff9f43,
        emissive: 0xff9f43,
        emissiveIntensity: 0.3,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 1.8, 0.4);
    leftEye.scale.set(0.2, 0.2, 0.2);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 1.8, 0.4);
    rightEye.scale.set(0.2, 0.2, 0.2);
    group.add(rightEye);

    group.position.set(0, -0.5, 0);
    scene.add(group);
    model = group;
}

// ============================================
// MOUSE MOVEMENT
// ============================================
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Calculate target rotation based on mouse position
    targetRotation.y = mouse.x * 1.5;
    targetRotation.x = mouse.y * 0.8;
}

// ============================================
// WINDOW RESIZE
// ============================================
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

// ============================================
// ANIMATION LOOP
// ============================================
function animationLoop() {
    requestAnimationFrame(animationLoop);

    // Smooth rotation towards target
    if (model) {
        model.rotation.y += (targetRotation.y - model.rotation.y) * 0.1;
        model.rotation.x += (targetRotation.x - model.rotation.x) * 0.1;

        // Subtle bobbing animation
        const time = Date.now() * 0.001;
        model.position.y = -0.5 + Math.sin(time * 1.5) * 0.1;
    }

    // Render
    renderer.render(scene, camera);
}

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================
function setupGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll reveal for sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'center center',
                scrub: 1,
            },
            opacity: 1,
        });
    });

    // Scroll content reveal
    const contentItems = document.querySelectorAll(
        '.hero-text, .about-card, .skill-category, .project-card, .achievement-item, .resume-card, .contact-card'
    );
    contentItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 0.5,
            },
            opacity: 0,
            y: 50,
            delay: index * 0.05,
        });
    });

    // Scroll-triggered camera movement
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(camera.position, {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => {
                // Camera moves forward slightly as you scroll
                camera.position.z = 5 - self.progress * 2;
                // Subtle Y movement
                camera.position.y = 2 + self.progress * 3;

                if (model) {
                    // Avatar rotates slightly with scroll
                    model.rotation.z = (self.progress - 0.5) * 0.5;
                }
            },
        },
    });

    // Section fade animations
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title) => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 0.5,
            },
            opacity: 0,
            y: 30,
        });
    });

    // Glass card glow effect on scroll
    document.querySelectorAll('.glass-card').forEach((card) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
                onUpdate: (self) => {
                    const opacity = self.progress * 0.3;
                    card.style.boxShadow = `0 0 ${30 + opacity * 30}px rgba(0, 217, 255, ${0.2 + opacity})`;
                },
            },
        });
    });

    // Stagger reveal for skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        gsap.from(badge, {
            scrollTrigger: {
                trigger: badge.closest('.skill-category'),
                start: 'top 80%',
                end: 'top 50%',
                scrub: 0.5,
            },
            opacity: 0,
            x: -20,
            delay: index * 0.03,
        });
    });

    // Projects stagger animation
    document.querySelectorAll('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 0.5,
            },
            opacity: 0,
            y: 50,
            rotation: 2,
            delay: index * 0.1,
        });
    });

    // Hero entrance animation
    gsap.from('.hero-name', {
        delay: 0.3,
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power4.out',
    });

    gsap.from('.hero-title', {
        delay: 0.5,
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power4.out',
    });

    gsap.from('.hero-subtitle', {
        delay: 0.7,
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power4.out',
    });

    gsap.from('.hero-intro', {
        delay: 0.9,
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power4.out',
    });

    gsap.from('.hero-cta', {
        delay: 1.1,
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power4.out',
    });

    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.section-title');
        parallaxElements.forEach((element) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 10;

            gsap.to(element, {
                x: moveX,
                y: moveY,
                duration: 0.8,
                ease: 'power2.out',
            });
        });
    });
}

// ============================================
// SMOOTH SCROLL LINK BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    autoKill: false,
                },
                ease: 'power2.inOut',
            });
        }
    });
});

// ============================================
// CTA BUTTON INTERACTIONS
// ============================================
document.querySelectorAll('.cta-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
        const text = this.textContent.toLowerCase();

        if (text.includes('projects')) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: '#projects',
                    autoKill: false,
                },
                ease: 'power2.inOut',
            });
        } else if (text.includes('resume')) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: '#resume',
                    autoKill: false,
                },
                ease: 'power2.inOut',
            });
        }
    });
});

// ============================================
// HOVER ANIMATIONS FOR INTERACTIVE ELEMENTS
// ============================================
document.querySelectorAll('.glass-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
        gsap.to(this, {
            duration: 0.3,
            y: -10,
            boxShadow: '0 0 50px rgba(0, 217, 255, 0.4)',
            ease: 'power2.out',
        });
    });

    card.addEventListener('mouseleave', function () {
        gsap.to(this, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)',
            ease: 'power2.out',
        });
    });
});

// ============================================
// SCROLL TRIGGER PLUGIN
// ============================================
gsap.defaults({ overwrite: 'auto' });

// ============================================
// RESUME DOWNLOAD FUNCTION
// ============================================
function downloadResume(type) {
    const resumeNames = {
        'SDE': 'sde-resume.pdf',
        'Data': 'data-resume.pdf',
        'Ops': 'ops-resume.pdf'
    };
    
    const fileName = resumeNames[type];
    const link = document.createElement('a');
    link.href = `resumes/${fileName}`;
    link.download = fileName;
    
    // Check if file exists, if not show message
    fetch(`resumes/${fileName}`)
        .then(response => {
            if (response.ok) {
                link.click();
            } else {
                alert(`Resume not found. Please contact at meghanab134@gmail.com`);
            }
        })
        .catch(() => {
            alert(`Place your ${type} resume as "${fileName}" in the /resumes/ folder`);
        });
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', initScene);

// For cases where DOMContentLoaded fires before script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScene);
} else {
    initScene();
}
