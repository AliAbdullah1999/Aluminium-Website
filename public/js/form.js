        document.getElementById('contactForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');

            // Client-side validation
            if (!name || !email || !message) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Please fill out all required fields.';
                setTimeout(() => errorMessage.style.display = 'none', 3000);
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Please enter a valid email address.';
                setTimeout(() => errorMessage.style.display = 'none', 3000);
                return;
            }

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, message })
                });

                if (response.ok) {
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    document.getElementById('contactForm').reset();
                    setTimeout(() => successMessage.style.display = 'none', 5000);
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'There was an error sending your message. Please try again.';
                setTimeout(() => errorMessage.style.display = 'none', 5000);
            }
        });