const mongoose = require('mongoose');
const NGO = require('./models/NGO');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blessingbox', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    addSampleNGOs();
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const sampleNGOs = [
    {
        name: "Education for All",
        email: "educationforall@example.com",
        phone: "9876543210",
        address: "123 Education Street, Delhi",
        location: "Delhi",
        cause: "Education",
        description: "Providing quality education to underprivileged children in urban slums.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        status: "Active",
        needs: "Books, stationery, and volunteer teachers",
        password: "password123"
    },
    {
        name: "Health Care Foundation",
        email: "healthcare@example.com",
        phone: "9876543211",
        address: "456 Health Avenue, Mumbai",
        location: "Mumbai",
        cause: "Healthcare",
        description: "Providing healthcare services to rural communities.",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        status: "Active",
        needs: "Medical supplies and healthcare volunteers",
        password: "password123"
    },
    {
        name: "Green Earth Initiative",
        email: "greenearth@example.com",
        phone: "9876543212",
        address: "789 Nature Road, Bangalore",
        location: "Bangalore",
        cause: "Environment",
        description: "Working towards environmental conservation and sustainability.",
        imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        status: "Active",
        needs: "Gardening tools and environmental awareness materials",
        password: "password123"
    },
    {
        name: "Animal Care Society",
        email: "animalcare@example.com",
        phone: "9876543213",
        address: "321 Pet Street, Kolkata",
        location: "Kolkata",
        cause: "Animal Welfare",
        description: "Rescuing and caring for stray animals in the city.",
        imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        status: "Active",
        needs: "Pet food, medical supplies, and volunteer caretakers",
        password: "password123"
    },
    {
        name: "Women Empowerment Center",
        email: "womenempower@example.com",
        phone: "9876543214",
        address: "654 Women Street, Chennai",
        location: "Chennai",
        cause: "Women Empowerment",
        description: "Empowering women through skill development and education.",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        status: "Active",
        needs: "Training materials and skill development resources",
        password: "password123"
    }
];

async function addSampleNGOs() {
    try {
        // Clear existing NGOs
        await NGO.deleteMany({});
        console.log('Cleared existing NGOs');

        // Add new NGOs
        const ngos = await NGO.insertMany(sampleNGOs);
        console.log('Added sample NGOs:', ngos.map(ngo => ngo.name));

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding sample NGOs:', error);
        mongoose.connection.close();
    }
} 