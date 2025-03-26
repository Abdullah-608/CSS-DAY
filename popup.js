document.addEventListener('DOMContentLoaded', function() {
    // Create popup elements with improved styling
    const ticketPopup = createPopup('ticket-popup', 'Buy Tickets', `
        <h2>Purchase Tickets</h2>
        <form id="ticket-form">
            <div class="form-group">
                <label for="ticket-type">Ticket Type</label>
                <select id="ticket-type" required>
                    <option value="regular">Regular Pass - $199</option>
                    <option value="vip">VIP Pass - $299</option>
                    <option value="workshop">Workshop Pass - $399</option>
                </select>
            </div>
            <div class="form-group">
                <label for="quantity">Quantity</label>
                <input type="number" id="quantity" min="1" value="1" required>
            </div>
            <div class="form-group">
                <label for="ticket-name">Full Name</label>
                <input type="text" id="ticket-name" required>
            </div>
            <div class="form-group">
                <label for="ticket-email">Email Address</label>
                <input type="email" id="ticket-email" required>
            </div>
            <button type="submit">Complete Purchase</button>
        </form>
    `);

    const contactPopup = createPopup('contact-popup', 'Contact Us', `
        <h2>Send us a Message</h2>
        <form id="contact-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" rows="4" required></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
    `);

    // Add event listeners to buttons with improved animations
    document.querySelector('.Buy').addEventListener('click', () => {
        ticketPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    });

    document.querySelector('.Contact').addEventListener('click', () => {
        contactPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    });
    
    // Add form submission handling
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form.id === 'ticket-form' || form.id === 'contact-form') {
            e.preventDefault();
            
            // Show success message
            const formParent = form.parentElement;
            form.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="#4CAF50" stroke-width="4"/>
                    <path d="M20 32L28 40L44 24" stroke="#4CAF50" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>${form.id === 'ticket-form' ? 'Tickets Purchased!' : 'Message Sent!'}</h3>
                <p>${form.id === 'ticket-form' ? 'Thank you for your purchase. You will receive an email confirmation shortly.' : 'Thank you for contacting us. We will get back to you soon.'}</p>
                <button class="close-success">Close</button>
            `;
            
            formParent.appendChild(successMessage);
            
            // Close success message
            successMessage.querySelector('.close-success').addEventListener('click', () => {
                const popup = formParent.closest('.popup');
                popup.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling again
                
                // Reset form and remove success message after closing
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.remove();
                }, 300);
            });
        }
    });
});

function createPopup(id, title, content) {
    const popup = document.createElement('div');
    popup.id = id;
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close">&times;</span>
            ${content}
        </div>
    `;
    document.body.appendChild(popup);

    // Close button functionality with improved animations
    popup.querySelector('.close').addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling again
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling again
        }
    });

    // Close on escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling again
        }
    });

    return popup;
}

// Add this to style.css
document.head.insertAdjacentHTML('beforeend', `
<style>
.success-message {
    text-align: center;
    padding: 1rem;
    animation: fadeIn 0.5s ease-out;
}

.success-message svg {
    margin-bottom: 1rem;
}

.success-message h3 {
    color: var(--Orange);
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
}

.success-message p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: #444;
}

.close-success {
    background-color: var(--Orange);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>
`); 