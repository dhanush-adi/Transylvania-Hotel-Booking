// Utility to get hotel placeholder images from Unsplash
export const getHotelImage = (query: string, width = 800, height = 600): string => {
    // Use Unsplash Source API for random hotel images
    const keywords = query.toLowerCase().replace(/\s+/g, ',')
    return `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=${width}&h=${height}&fit=crop&q=80`
}

export const getHotelImageByType = (type: 'hero' | 'room' | 'pool' | 'restaurant' | 'lobby' | 'exterior' | 'beach' | 'city', width = 800, height = 600): string => {
    const imageMap = {
        hero: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&h=1080&fit=crop&q=80', // Luxury hotel exterior
        room: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&q=80', // Hotel room
        pool: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&h=600&fit=crop&q=80', // Hotel pool
        restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80', // Restaurant
        lobby: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&h=600&fit=crop&q=80', // Hotel lobby
        exterior: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80', // Hotel exterior
        beach: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80', // Beach resort
        city: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80', // City hotel
    }

    return imageMap[type] || imageMap.exterior
}

// Specific hotel images for variety
export const hotelImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80', // Modern luxury hotel
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop&q=80', // Hotel at sunset
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80', // Beach resort
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80', // City hotel
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&q=80', // Mountain resort
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80', // Boutique hotel
]

export const getRandomHotelImage = (index?: number): string => {
    if (index !== undefined) {
        return hotelImages[index % hotelImages.length]
    }
    return hotelImages[Math.floor(Math.random() * hotelImages.length)]
}
