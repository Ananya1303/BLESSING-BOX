// User Registration Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    if (userForm) {
      userForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(userForm);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          const result = await response.json();
          
          if (response.ok) {
            document.getElementById('userMsg').textContent = result.message;
            document.getElementById('userMsg').className = 'success';
            // Clear form after successful registration
            userForm.reset();
            // Redirect to login page after 2 seconds
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 2000);
          } else {
            document.getElementById('userMsg').textContent = result.error;
            document.getElementById('userMsg').className = 'error';
          }
        } catch (err) {
          document.getElementById('userMsg').textContent = 'Error connecting to server. Please try again.';
          document.getElementById('userMsg').className = 'error';
          console.error('Registration error:', err);
        }
      });
    }
  });
  // User Login Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const userLoginForm = document.getElementById('userLoginForm');
    if (userLoginForm) {
      userLoginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(userLoginForm);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          const result = await response.json();
          
          if (response.ok) {
            document.getElementById('loginMsg').textContent = result.message;
            document.getElementById('loginMsg').className = 'success';
            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(result.user));
            // Redirect to user dashboard after 1 second
            setTimeout(() => {
              window.location.href = 'user-dashboard.html';
            }, 1000);
          } else {
            document.getElementById('loginMsg').textContent = result.error;
            document.getElementById('loginMsg').className = 'error';
          }
        } catch (err) {
          document.getElementById('loginMsg').textContent = 'Error connecting to server. Please try again.';
          document.getElementById('loginMsg').className = 'error';
          console.error('Login error:', err);
        }
      });
    }
  });
  // NGO Registration Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const ngoForm = document.getElementById('ngoForm');
    if (ngoForm) {
      ngoForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(ngoForm);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const res = await fetch('http://localhost:5000/api/ngos/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          document.getElementById('ngoMsg').textContent = result.message || result.error;
          ngoForm.reset();
        } catch (err) {
          document.getElementById('ngoMsg').textContent = 'Error connecting to server.';
        }
      });
    }
  });
  // NGO Login Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const ngoLoginForm = document.getElementById('ngoLoginForm');
    if (ngoLoginForm) {
      ngoLoginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(ngoLoginForm);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const res = await fetch('http://localhost:5000/api/ngos/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          document.getElementById('ngoLoginMsg').textContent = result.message || result.error;
          if (result.ngo) {
            localStorage.setItem('ngo', JSON.stringify(result.ngo));
            window.location.href = 'ngo-dashboard.html';
          }
        } catch (err) {
          document.getElementById('ngoLoginMsg').textContent = 'Error connecting to server.';
        }
      });
    }
  });
  // NGO Dashboard Logic
document.addEventListener('DOMContentLoaded', function() {
    const ngoName = document.getElementById('ngoName');
    const updateNeedsForm = document.getElementById('updateNeedsForm');
    const needsInput = document.getElementById('needs');
    const dashboardMsg = document.getElementById('dashboardMsg');
    const logoutBtn = document.getElementById('logoutBtn');
  
    // Only run on dashboard page
    if (ngoName && updateNeedsForm && needsInput && logoutBtn) {
      // Get NGO info from localStorage
      const ngo = JSON.parse(localStorage.getItem('ngo'));
      if (!ngo) {
        window.location.href = 'ngo-login.html';
        return;
      }
      ngoName.textContent = ngo.name;
      needsInput.value = ngo.needs || '';
  
      updateNeedsForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const needs = needsInput.value;
        try {
          const res = await fetch(`http://localhost:5000/api/ngos/update-needs/${ngo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ needs })
          });
          const result = await res.json();
          dashboardMsg.textContent = result.message || result.error;
          if (result.needs) {
            // Update localStorage
            ngo.needs = result.needs;
            localStorage.setItem('ngo', JSON.stringify(ngo));
          }
        } catch (err) {
          dashboardMsg.textContent = 'Error updating needs.';
        }
      });
  
      logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('ngo');
        window.location.href = 'ngo-login.html';
      });
    }
  });

// Browse NGOs Page
document.addEventListener('DOMContentLoaded', function() {
    const ngoGrid = document.getElementById('ngoGrid');
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('location');
    const causeFilter = document.getElementById('cause');

    if (ngoGrid) {
        // Fetch and display NGOs
        async function fetchNGOs() {
            try {
                const response = await fetch('http://localhost:5000/api/ngos');
                const ngos = await response.json();
                displayNGOs(ngos);
            } catch (err) {
                console.error('Error fetching NGOs:', err);
                ngoGrid.innerHTML = '<p>Error loading NGOs. Please try again later.</p>';
            }
        }

        function displayNGOs(ngos) {
            ngoGrid.innerHTML = ngos.map(ngo => `
                <div class="ngo-card">
                    <h3>${ngo.name}</h3>
                    <p><strong>Location:</strong> ${ngo.address}</p>
                    <p><strong>Email:</strong> ${ngo.email}</p>
                    <p><strong>Phone:</strong> ${ngo.phone}</p>
                    <div class="needs">
                        <strong>Current Needs:</strong>
                        <p>${ngo.needs || 'No specific needs listed'}</p>
                    </div>
                </div>
            `).join('');
        }

        // Filter NGOs based on search and filters
        function filterNGOs(ngos) {
            const searchTerm = searchInput.value.toLowerCase();
            const location = locationFilter.value.toLowerCase();
            const cause = causeFilter.value.toLowerCase();

            return ngos.filter(ngo => {
                const matchesSearch = ngo.name.toLowerCase().includes(searchTerm) ||
                                    ngo.address.toLowerCase().includes(searchTerm);
                const matchesLocation = !location || ngo.address.toLowerCase().includes(location);
                const matchesCause = !cause || ngo.needs.toLowerCase().includes(cause);
                return matchesSearch && matchesLocation && matchesCause;
            });
        }

        // Event listeners for filters
        searchInput.addEventListener('input', () => fetchNGOs());
        locationFilter.addEventListener('change', () => fetchNGOs());
        causeFilter.addEventListener('change', () => fetchNGOs());

        // Initial load
        fetchNGOs();
    }
});

// Blog Page
document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.getElementById('blogGrid');
    const categoryTags = document.querySelectorAll('.category-tag');

    if (blogGrid) {
        // Sample blog data (replace with actual API call)
        const blogPosts = [
            {
                title: 'The Power of Community Service',
                author: 'John Doe',
                date: 'March 10, 2024',
                excerpt: 'Exploring how community service can transform lives and create lasting impact...',
                image: 'https://via.placeholder.com/400x200',
                category: 'Community'
            },
            {
                title: 'Education for All',
                author: 'Jane Smith',
                date: 'March 8, 2024',
                excerpt: 'Breaking down barriers to education and creating opportunities for all...',
                image: 'https://via.placeholder.com/400x200',
                category: 'Education'
            }
        ];

        function displayBlogPosts(posts) {
            blogGrid.innerHTML = posts.map(post => `
                <div class="blog-card">
                    <img src="${post.image}" alt="${post.title}">
                    <div class="blog-content">
                        <h3>${post.title}</h3>
                        <div class="blog-meta">By ${post.author} | ${post.date}</div>
                        <p class="blog-excerpt">${post.excerpt}</p>
                        <a href="#" class="read-more">Read More →</a>
                    </div>
                </div>
            `).join('');
        }

        // Filter posts by category
        categoryTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.textContent;
                const filteredPosts = blogPosts.filter(post => post.category === category);
                displayBlogPosts(filteredPosts);
            });
        });

        // Initial display
        displayBlogPosts(blogPosts);
    }
});

// Contact Page
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactMsg = document.getElementById('contactMsg');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                
                if (response.ok) {
                    contactMsg.textContent = 'Message sent successfully! We will get back to you soon.';
                    contactMsg.className = 'success';
                    contactForm.reset();
                } else {
                    contactMsg.textContent = result.error || 'Error sending message. Please try again.';
                    contactMsg.className = 'error';
                }
            } catch (err) {
                contactMsg.textContent = 'Error connecting to server. Please try again later.';
                contactMsg.className = 'error';
                console.error('Contact form error:', err);
            }
        });
    }
});