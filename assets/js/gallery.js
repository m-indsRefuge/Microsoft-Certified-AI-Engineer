/**
 * gallery.js
 * Renders a 3D holographic image carousel using Three.js.
 * Includes focus-view functionality on click.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Prerequisite Checks ---
    if (typeof THREE === 'undefined') {
        console.error("Three.js library is not loaded. Please check the layout file.");
        return;
    }
    if (typeof gsap === 'undefined') {
        console.error("GSAP library is not loaded. Please check the layout file.");
        return;
    }
    if (typeof siteBaseUrl === 'undefined') {
        console.error("siteBaseUrl is not defined. Check the script tag in gallery.html");
        return;
    }
    if (typeof galleryData === 'undefined' || galleryData.length === 0) {
        console.error("Gallery data is not available. Check the gallery.html script tag and _data/gallery.yml");
        return;
    }

    const container = document.getElementById('gallery-container');
    if (!container) return;

    // --- Core Three.js Components ---
    let scene, camera, renderer;
    const carouselGroup = new THREE.Group();
    let targetRotation = 0;
    let currentRotation = 0;

    // --- Interaction Variables ---
    let isDragging = false;
    let previousMouseX = 0;

    // --- NEW: Focus-View Variables ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let focusedObject = null;
    const originalPositions = new Map();
    const originalOpacities = new Map();

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const radius = 4;
        const angleStep = (Math.PI * 2) / galleryData.length;

        galleryData.forEach((item, index) => {
            const texture = textureLoader.load(siteBaseUrl + item.image);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending
            });
            const geometry = new THREE.PlaneGeometry(2, 2);
            const plane = new THREE.Mesh(geometry, material);
            const angle = index * angleStep;
            plane.position.x = radius * Math.sin(angle);
            plane.position.z = radius * Math.cos(angle);
            plane.lookAt(new THREE.Vector3(0, 0, 0));
            
            // NEW: Store original state for un-focusing
            originalPositions.set(plane, plane.position.clone());
            originalOpacities.set(plane, material.opacity);

            carouselGroup.add(plane);
        });

        scene.add(carouselGroup);

        // MODIFIED: Added click listener
        window.addEventListener('resize', onWindowResize, false);
        container.addEventListener('mousedown', onMouseDown, false);
        container.addEventListener('mousemove', onMouseMove, false);
        container.addEventListener('mouseup', onMouseUp, false);
        container.addEventListener('mouseleave', onMouseUp, false);
        container.addEventListener('click', onClick, false); // NEW

        animate();
    }

    // --- NEW: Click handling and Focus/Unfocus Logic ---
    function onClick(event) {
        if (isDragging) return; // Don't trigger click if user was dragging

        if (focusedObject) {
            unfocusObject();
            return;
        }

        mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / container.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(carouselGroup.children);

        if (intersects.length > 0) {
            focusObject(intersects[0].object);
        }
    }

    function focusObject(objectToFocus) {
        focusedObject = objectToFocus;
        container.style.cursor = 'zoom-out';

        // Animate other objects
        carouselGroup.children.forEach(child => {
            if (child !== focusedObject) {
                gsap.to(child.material, { opacity: 0.1, duration: 0.5 });
            }
        });

        // Animate focused object to the center
        gsap.to(focusedObject.position, {
            x: 0,
            y: 0,
            z: camera.position.z - 2.5,
            duration: 0.75,
            ease: 'power3.out'
        });
        gsap.to(focusedObject.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            duration: 0.75,
            ease: 'power3.out'
        });
    }

    function unfocusObject() {
        if (!focusedObject) return;
        container.style.cursor = 'grab';

        const originalPos = originalPositions.get(focusedObject);

        // Animate focused object back to its original position
        gsap.to(focusedObject.position, {
            x: originalPos.x,
            y: originalPos.y,
            z: originalPos.z,
            duration: 0.75,
            ease: 'power3.inOut'
        });
        gsap.to(focusedObject.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.75,
            ease: 'power3.inOut'
        });

        // Animate other objects back
        carouselGroup.children.forEach(child => {
            if (child !== focusedObject) {
                const originalOpacity = originalOpacities.get(child);
                gsap.to(child.material, { opacity: originalOpacity, duration: 1.0 });
            }
        });

        focusedObject = null;
    }

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    // --- MODIFIED: Event handlers to respect focus state ---
    function onMouseDown(event) {
        if (focusedObject) return;
        isDragging = false; // Reset drag state initially
        setTimeout(() => isDragging = true, 150); // Set dragging true only after a short delay
        previousMouseX = event.clientX;
    }

    function onMouseMove(event) {
        if (focusedObject || !isDragging) return;
        const deltaX = event.clientX - previousMouseX;
        targetRotation -= deltaX * 0.01;
        previousMouseX = event.clientX;
    }

    function onMouseUp() {
        isDragging = false;
    }
    
    // --- MODIFIED: Animation loop to respect focus state ---
    function animate() {
        requestAnimationFrame(animate);

        // Only rotate if not in focus mode and not being dragged
        if (!focusedObject && !isDragging) {
            targetRotation += 0.0005; // Slightly slower auto-rotation
        }
        
        if (!focusedObject) {
            currentRotation += (targetRotation - currentRotation) * 0.05;
            carouselGroup.rotation.y = currentRotation;
        }

        renderer.render(scene, camera);
    }

    init();
});