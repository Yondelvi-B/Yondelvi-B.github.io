document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const btn = contactForm.querySelector('button');
            const originalBtnText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            const webhookURL = "https://discord.com/api/webhooks/1457153035175329923/fIh0jnLlUBh6aopCDOJ1CrUPoLaEPk2VCHT9tIheqgkzA3o_SNkjSgg8TThbZ5XVGcG1";

            const payload = {
                username: "Portfolio Contact",
                embeds: [{
                    title: "New Contact Message",
                    color: 0x00f3ff,
                    fields: [
                        { name: "Name", value: name, inline: true },
                        { name: "Email", value: email, inline: true },
                        { name: "Message", value: message }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            try {
                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again later.');
            } finally {
                btn.innerText = originalBtnText;
                btn.disabled = false;
            }
        });
    }
});
