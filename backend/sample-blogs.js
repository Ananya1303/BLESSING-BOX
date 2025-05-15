const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const sampleBlogs = [
    {
        title: "EDUCATION",
        content: `<h2>Education as a Catalyst for Change</h2>
<p>Education is the cornerstone of community development. This article explores how educational initiatives are empowering communities and creating opportunities for sustainable growth.</p>

<h3>Key Programs</h3>
<ul>
    <li>Adult literacy programs</li>
    <li>Vocational training centers</li>
    <li>Digital literacy initiatives</li>
    <li>Scholarship programs</li>
</ul>

<h3>Success Metrics</h3>
<p>Through various programs and partnerships, we're seeing communities transform through the power of education:</p>
<ul>
    <li>75% increase in literacy rates</li>
    <li>1000+ students supported</li>
    <li>50+ skill development programs</li>
</ul>`,
        excerpt: "Community Development Through Education\nHow education initiatives are driving community development and growth through comprehensive learning programs and partnerships.",
        author: "Dr. Amit Singh",
        category: "Education",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        featured: false
    },
    {
        title: "EDUCATION",
        content: `<h2>Digital Learning Revolution</h2>
<p>The digital divide in education is a pressing issue in today's world. This article explores how NGOs are implementing digital education initiatives to provide quality learning opportunities to underprivileged students.</p>

<h3>Key Initiatives</h3>
<ul>
    <li>Tablet distribution programs</li>
    <li>Computer lab setup</li>
    <li>Digital literacy training</li>
    <li>Online learning platforms</li>
</ul>

<h3>Impact and Results</h3>
<p>From providing tablets to setting up computer labs, these efforts are transforming education access:</p>
<ul>
    <li>2000+ students reached</li>
    <li>25+ digital learning centers</li>
    <li>85% improvement in digital literacy</li>
</ul>`,
        excerpt: "Digital Education: Bridging the Gap\nHow digital education initiatives are bridging the learning gap in rural areas through technology and innovation.",
        author: "Dr. Sanjay Mehta",
        category: "Education",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        featured: false
    },
    {
        title: "HEALTHCARE",
        content: `<h2>The Challenge of Rural Healthcare</h2>
<p>Access to quality healthcare remains a significant challenge in rural India. This article explores innovative solutions and success stories of healthcare initiatives that are making a difference in remote communities.</p>

<h3>Key Initiatives</h3>
<ul>
    <li>Mobile health units reaching remote villages</li>
    <li>Telemedicine programs connecting rural patients with specialists</li>
    <li>Community health worker training programs</li>
    <li>Digital health records implementation</li>
</ul>

<h3>Success Stories</h3>
<p>From mobile health units to telemedicine programs, we're seeing remarkable progress in bringing healthcare to underserved areas. These initiatives have:</p>
<ul>
    <li>Reduced maternal mortality rates by 40%</li>
    <li>Increased vaccination coverage by 60%</li>
    <li>Improved access to specialist care</li>
</ul>`,
        excerpt: "Healthcare Access in Rural India\nDiscover how healthcare initiatives are transforming rural healthcare access in India through innovative solutions and community-driven programs.",
        author: "Dr. Rajesh Kumar",
        category: "Healthcare",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        featured: true
    },
    {
        title: "HEALTHCARE",
        content: `<h2>Breaking the Mental Health Stigma</h2>
<p>Mental health awareness and support in rural areas is often overlooked. This article sheds light on innovative mental health programs being implemented in rural communities.</p>

<h3>Key Programs</h3>
<ul>
    <li>Community counseling services</li>
    <li>Mental health awareness campaigns</li>
    <li>Support group initiatives</li>
    <li>Tele-counseling services</li>
</ul>

<h3>Success Metrics</h3>
<p>Learn how these initiatives are making mental healthcare more accessible:</p>
<ul>
    <li>5000+ individuals supported</li>
    <li>40% reduction in stigma</li>
    <li>30+ support groups established</li>
</ul>`,
        excerpt: "Mental Health in Rural Communities\nBreaking the stigma: Mental health initiatives in rural communities through innovative programs and community support.",
        author: "Dr. Anjali Desai",
        category: "Healthcare",
        imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21",
        featured: false
    },
    {
        title: "ANIMAL WELFARE",
        content: `<h2>Compassion in Action</h2>
<p>Every animal deserves a chance at a better life. This article shares heartwarming stories of rescued animals and the dedicated individuals working to improve animal welfare.</p>

<h3>Rescue Stories</h3>
<ul>
    <li>Street dog rehabilitation programs</li>
    <li>Wildlife rescue and rehabilitation</li>
    <li>Animal shelter success stories</li>
    <li>Community adoption programs</li>
</ul>

<h3>Impact and Achievements</h3>
<p>From street dogs to abandoned pets, these stories showcase the power of compassion and care:</p>
<ul>
    <li>1000+ animals rescued and rehabilitated</li>
    <li>500+ successful adoptions</li>
    <li>20+ community awareness programs</li>
</ul>`,
        excerpt: "Animal Welfare: Stories of Hope\nHeartwarming stories of animal rescue and rehabilitation efforts that demonstrate the power of compassion and community care.",
        author: "Meera Patel",
        category: "Animal Welfare",
        imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c",
        featured: true
    },
    {
        title: "ANIMAL WELFARE",
        content: `<h2>Grassroots Animal Welfare</h2>
<p>When communities come together for animal welfare, amazing things happen. This article shares inspiring stories of community-led animal rescue initiatives.</p>

<h3>Key Programs</h3>
<ul>
    <li>Street animal care programs</li>
    <li>Wildlife rehabilitation</li>
    <li>Community awareness drives</li>
    <li>Emergency rescue services</li>
</ul>

<h3>Impact and Achievements</h3>
<p>These grassroots efforts demonstrate the power of community action:</p>
<ul>
    <li>2000+ animals rescued</li>
    <li>15+ community teams formed</li>
    <li>95% success rate in rehabilitation</li>
</ul>`,
        excerpt: "Community-Led Animal Rescue\nHow communities are coming together to protect and care for animals through grassroots initiatives and dedicated volunteers.",
        author: "Dr. Maya Sharma",
        category: "Animal Welfare",
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
        featured: false
    },
    {
        title: "COMMUNITY",
        content: `<h2>The Power of Community Collaboration</h2>
<p>Strong communities are built on collaboration and mutual support. This article highlights successful community-building initiatives that create lasting positive change.</p>

<h3>Community Initiatives</h3>
<ul>
    <li>Neighborhood support programs</li>
    <li>Cultural exchange events</li>
    <li>Community gardens</li>
    <li>Youth engagement programs</li>
</ul>

<h3>Impact and Results</h3>
<p>Learn how communities are coming together to create positive change:</p>
<ul>
    <li>30+ community events organized</li>
    <li>500+ families supported</li>
    <li>15+ community projects completed</li>
</ul>`,
        excerpt: "Building Stronger Communities Together\nExploring successful community-building initiatives and their impact on creating stronger, more connected neighborhoods.",
        author: "Neha Gupta",
        category: "Community",
        imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        featured: false
    },
    {
        title: "COMMUNITY",
        content: `<h2>Young Leaders Making a Difference</h2>
<p>Young people are the future of community development. This article explores how youth-led initiatives are making a difference in their communities.</p>

<h3>Key Initiatives</h3>
<ul>
    <li>Environmental projects</li>
    <li>Educational support programs</li>
    <li>Community clean-up drives</li>
    <li>Youth mentorship programs</li>
</ul>

<h3>Impact and Results</h3>
<p>These young leaders are creating positive change:</p>
<ul>
    <li>1000+ youth engaged</li>
    <li>50+ community projects</li>
    <li>25+ schools supported</li>
</ul>`,
        excerpt: "Youth Empowerment Through Community Service\nHow young people are driving community development through service and leadership initiatives.",
        author: "Arjun Reddy",
        category: "Community",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        featured: false
    },
    {
        title: "SUCCESS STORIES",
        content: `<h2>Transforming Lives Through Dedication</h2>
<p>Behind every successful NGO initiative is a story of dedication and impact. This article shares inspiring success stories of NGOs making a difference in various sectors.</p>

<h3>Key Areas of Impact</h3>
<ul>
    <li>Education and skill development</li>
    <li>Healthcare access</li>
    <li>Environmental conservation</li>
    <li>Community empowerment</li>
</ul>

<h3>Success Stories</h3>
<p>From education to healthcare, these stories demonstrate the transformative power of organized community action:</p>
<ul>
    <li>10,000+ lives impacted</li>
    <li>50+ successful projects</li>
    <li>20+ partner organizations</li>
</ul>`,
        excerpt: "From Struggle to Success: NGO Impact Stories\nInspiring success stories of NGOs making a difference in communities through dedicated service and innovative programs.",
        author: "Rahul Verma",
        category: "Success Stories",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        featured: true
    },
    {
        title: "SUCCESS STORIES",
        content: `<h2>Empowering Through Skills</h2>
<p>Skill development programs are creating new opportunities for underprivileged communities. This article shares success stories of individuals who have transformed their lives.</p>

<h3>Key Programs</h3>
<ul>
    <li>Vocational training centers</li>
    <li>Entrepreneurship development</li>
    <li>Technical skill training</li>
    <li>Job placement assistance</li>
</ul>

<h3>Success Stories</h3>
<p>From artisans to entrepreneurs, these stories inspire hope:</p>
<ul>
    <li>2000+ individuals trained</li>
    <li>75% employment rate</li>
    <li>100+ successful entrepreneurs</li>
</ul>`,
        excerpt: "Transforming Lives Through Skill Development\nSuccess stories of individuals transformed through skill development programs and vocational training initiatives.",
        author: "Lakshmi Iyer",
        category: "Success Stories",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        featured: false
    }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blessingbox')
    .then(async () => {
        console.log('Connected to MongoDB');
        
        try {
            // Clear existing blogs
            await Blog.deleteMany({});
            console.log('Cleared existing blogs');
            
            // Insert new blogs
            const savedBlogs = await Blog.insertMany(sampleBlogs);
            console.log(`Successfully added ${savedBlogs.length} sample blogs`);
            
            // Display the created blogs
            console.log('\nCreated blogs:');
            savedBlogs.forEach(blog => {
                console.log(`- ${blog.title} (${blog.category})`);
            });
            
        } catch (error) {
            console.error('Error adding sample blogs:', error);
        } finally {
            // Close the connection
            mongoose.connection.close();
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    }); 