import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jolglmqmaypbdgansaas.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvbGdsbXFtYXlwYmRnYW5zYWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMzg4MDQsImV4cCI6MjA3NzYxNDgwNH0.Gg6F9ZNUAFrzerfLT8VqTgZBoO0eyCowPm_HllBqFTk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const namePattern  = /^[A-Za-z ]+(?:[-][A-Za-z ]+)*$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const pwdPattern   = /^(?=.*[A-Z]).{6,}$/;

async function signUp(event) {
    // if called from a form submit, prevent reload
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const name     = document.getElementById("name").value.trim();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("pwd").value;

    // 1. Client-side validation FIRST
    if (!name || !email || !password) {
        alert("Missing field: name, email, and password are required.");
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
            full_name: name,
            },
        },
    });

    console.log("SUPABASE SIGNUP RESPONSE", { data, error });

    if (error) {
        console.error('Signup error:', error.message);
        alert('Signup failed: ' + error.message);
        return;
    }

    alert('Signup successful! Check your email if confirmation is enabled.');

    if (!namePattern.test(name)) {
        alert("Enter a valid name (letters, spaces, maybe a hyphen).");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Enter a valid email address.");
        return;
    }

    if (!pwdPattern.test(password)) {
        alert("Enter a stronger password (at least 6 characters with one uppercase letter).");
        return;
    }

    // 2. THEN talk to Supabase


    // 3. Handle result
   
}


async function login(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const email    = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-pwd").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Login error:', error.message);
        alert('Login failed: ' + error.message);
    } else {
        console.log('Login success:', data);
        alert('Logged in!');
        window.location.href = './Dashboard.html';
    }
}

supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
    console.log('Session:', session);

    if (event === 'SIGNED_IN') {
    // Show protected UI, hide login form
    }

    if (event === 'SIGNED_OUT') {
    // Show login form, hide protected area
    }
});
export { supabase };

