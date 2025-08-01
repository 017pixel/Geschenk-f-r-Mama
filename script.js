document.addEventListener('DOMContentLoaded', () => {
    // --- Partikel-Hintergrund Logik ---
    const canvas = document.getElementById('sparkle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        // Canvas an Fenstergröße anpassen
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Partikel-Objekt
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.5;
                this.color = `rgba(255, 255, 255, ${this.opacity})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Randbehandlung
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Partikel initialisieren
        const initParticles = () => {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        // Animations-Schleife
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const particle of particles) {
                particle.update();
                particle.draw();
            }
            requestAnimationFrame(animateParticles);
        };

        initParticles();
        animateParticles();
    }


    // --- Fliegende Nachrichten Logik (AKTUALISIERT) ---
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        const messages = [
            "Happy Birthday!!!",
            "Ich hab dich ganz doll lieb!",
            "Du bist die beste Mama auf der Welt!!!",
            "Alles gute zum Geburtstag!",
            "❤️",
            "Für die beste Mama!",
            "Du bist perfekt!",
            "😘",
            "💕",
            "ich habe dich gmz doll lieb, aner ich habe auch hunger, wann gibt es essen?"
        ];

        const createMessage = () => {
            const messageEl = document.createElement('div');
            messageEl.classList.add('message-box');
            messageEl.textContent = messages[Math.floor(Math.random() * messages.length)];
            
            // NEUE Animationsparameter
            // Skalierung um ca. 33% reduziert. (vorher 0.8-1.3, jetzt 0.5-0.9)
            const scale = Math.random() * 0.4 + 0.6; 
            const rotation = Math.random() * 30 - 15; // Reduzierte Rotation: -15 bis +15 Grad
            const duration = Math.random() * 10000 + 10000; // Dauer: 10 bis 20 Sekunden

            // KORRIGIERTE Start- und Endpunkte für eine zentrierte Bewegung
            // StartX wird auf die mittleren 70% des Bildschirms beschränkt, um Randprobleme zu vermeiden.
            const startX = (Math.random() * 0.2 + 0.15) * window.innerWidth;
            const startY = -150; // Startet außerhalb des oberen Rands
            // Drift wurde reduziert, um die Boxen zentraler zu halten.
            const endX = startX + (Math.random() * 200 - 100); 
            const endY = window.innerHeight + 150; // Endet außerhalb des unteren Rands
            const endRotation = rotation + (Math.random() * 20 - 10);

            const startTransform = `translate(${startX}px, ${startY}px) scale(${scale}) rotate(${rotation}deg)`;
            const endTransform = `translate(${endX}px, ${endY}px) scale(${scale}) rotate(${endRotation}deg)`;

            messageContainer.appendChild(messageEl);

            // Web Animations API
            const animation = messageEl.animate([
                { transform: startTransform, opacity: 0 },
                { opacity: 1, offset: 0.1 }, 
                { opacity: 1, offset: 0.9 },
                { transform: endTransform, opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear',
                fill: 'forwards'
            });

            // Element nach der Animation aus dem DOM entfernen
            animation.onfinish = () => {
                messageEl.remove();
            };
        };

        // Alle 1.8 Sekunden eine neue Nachricht erstellen
        setInterval(createMessage, 1800);
    }
});