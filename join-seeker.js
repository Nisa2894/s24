document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('seeker-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        try {
            const response = await fetch('/api/seekers', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                alert('Application submitted successfully! Awaiting admin approval.');
                form.reset();
            } else {
                alert('Error submitting application: ' + result.error);
            }
        } catch (error) {
            alert('Error submitting application: ' + error.message);
        }
    });
});
