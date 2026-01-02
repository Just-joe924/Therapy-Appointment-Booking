import { supabase } from './Booking.js';
window.logout = async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Logout error:', error.message);
    } else {
        alert('Logged out');
        // maybe redirect:
        // window.location.href = './Home.html';
    }
};
window.onload = function() {
    // Configuration: services and therapists
    const SERVICES = [
        "Initial Consultation",
        "Cognitive Behavioral Therapy",
        "Couples Therapy",
        "Follow-up Session"
    ];
    const THERAPISTS = [
        "Dr. Amina Noor",
        "Samuel Blake",
        "R. Patel",
        "L. Johnson"
    ];

    // DOM refs
    const serviceEl = document.getElementById('service');
    const therapistEl = document.getElementById('therapist');
    const form = document.getElementById('booking-form');
    const messageEl = document.getElementById('form-message');
    const apptContainer = document.getElementById('appointments-container');

    // Populate selects
    function populateSelect(selectEl, items) {
        selectEl.innerHTML = items.map(i => `<option value="${i}">${i}</option>`).join('');
    }
    populateSelect(serviceEl, SERVICES);
    populateSelect(therapistEl, THERAPISTS);

    // Local storage helpers
    const STORAGE_KEY = 'inki_j_appointments';
    function loadAppointments() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }
    function saveAppointments(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // Validation: date not in past, time within 08:00-18:00
    function validateAppointment({date, time}) {
        const now = new Date();
        const selected = new Date(date + 'T' + time);
        if (isNaN(selected.getTime())) return 'Please provide a valid date and time.';
        if (selected < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
            return 'Date cannot be in the past.';
        }
        const [h, m] = time.split(':').map(Number);
        if (h < 8 || h > 18) return 'Please choose a time between 08:00 and 18:00.';
        return '';
    }

    // Render appointments list
    function renderAppointments() {
        const list = loadAppointments().sort((a,b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
        if (!list.length) {
            apptContainer.textContent = 'No appointments yet.';
            return;
        }

        const table = document.createElement('table');
        table.className = 'appointments-table';
        table.innerHTML = `
            <thead><tr><th>Date</th><th>Time</th><th>Service</th><th>Therapist</th><th>Name</th><th></th></tr></thead>
            <tbody></tbody>
        `;
        const tbody = table.querySelector('tbody');

        list.forEach(appt => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${appt.date}</td>
                <td>${appt.time}</td>
                <td>${appt.service}</td>
                <td>${appt.therapist}</td>
                <td>${appt.fullName}</td>
                <td>
                    <button data-id="${appt.id}" class="view-btn" title="View">View</button>
                    <button data-id="${appt.id}" class="cancel-btn" title="Cancel">Cancel</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        apptContainer.innerHTML = '';
        apptContainer.appendChild(table);
    }

    // Event: form submit
    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        messageEl.textContent = '';

        const appt = {
            id: Date.now().toString(36),
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: serviceEl.value,
            therapist: therapistEl.value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            notes: document.getElementById('notes').value.trim()
        };

        if (!appt.fullName || !appt.email || !appt.date || !appt.time) {
            messageEl.textContent = 'Please complete required fields.';
            return;
        }

        const err = validateAppointment(appt);
        if (err) {
            messageEl.textContent = err;
            return;
        }

        const list = loadAppointments();

        // Optional: prevent exact duplicate appointment for same therapist/time
        const conflict = list.find(a => a.therapist === appt.therapist && a.date === appt.date && a.time === appt.time);
        if (conflict) {
            messageEl.textContent = 'Selected therapist is not available at this time. Choose another slot or therapist.';
            return;
        }

        list.push(appt);
        saveAppointments(list);
        form.reset();
        renderAppointments();
        messageEl.textContent = 'Appointment reserved.';
    });

    // Delegated actions for view/cancel
    apptContainer.addEventListener('click', function (ev) {
        const id = ev.target.getAttribute('data-id');
        if (!id) return;

        const list = loadAppointments();
        const index = list.findIndex(a => a.id === id);
        if (index === -1) return;

        if (ev.target.classList.contains('cancel-btn')) {
            if (!confirm('Cancel this appointment?')) return;
            list.splice(index, 1);
            saveAppointments(list);
            renderAppointments();
            return;
        }

        if (ev.target.classList.contains('view-btn')) {
            const a = list[index];
            alert(
                `Appointment details:\n\nName: ${a.fullName}\nService: ${a.service}\nTherapist: ${a.therapist}\nDate: ${a.date}\nTime: ${a.time}\nNotes: ${a.notes || '—'}`
            );
        }
    });

    // Initialize
    (function init() {
        // set minimum date to today
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        renderAppointments();
    })();
};