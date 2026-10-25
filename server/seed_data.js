const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://suhirdhasivakumar_db_user:SJvAszC8ct9tKdOp@cluster0.fnmm7ku.mongodb.net/?retryWrites=true&w=majority";

const additionalBooks = [
  // --- TAMIL ---
  {
    title: "Ponniyin Selvan (பொன்னியின் செல்வன்)",
    author: "Kalki Krishnamurthy",
    description: "The crown jewel of historical Tamil fiction detailing the gripping political intrigue, valor, and love during the Chola dynasty. Vandiyathevan journeys through dangerous lands to protect the prince Arulmozhivarman.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80",
    isbn: "978-8184490749",
    genres: ["Historical Fiction", "Indian Literature", "Classics", "Adventure"],
    publishedYear: 1954,
    publisher: "Kalki Publications",
    pageCount: 2210,
    language: "Tamil",
    ageGroup: "All Ages",
    averageRating: 4.9,
    ratingsCount: 15420,
    price: 699,
    originalPrice: 999,
    format: "Hardcover",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "#1 Best Seller",
    moodTags: ["Epic", "Adventurous", "Historical"],
    readingPace: "Engrossing",
    quotes: ["பொன்னியின் மடியில் தவழ்ந்த செல்வனே சோழ நாட்டின் ஒளி."],
    previewExcerpt: "ஆடிப் பதினெட்டாம் பெருக்கு அன்று, சோழ நாட்டின் பல்லாயிரக் கணக்கான மக்கள் காவிரி நதிக்கரையில் மகிழ்ச்சியோடு திரண்டிருந்தனர்..."
  },
  {
    title: "Sivagamiyin Sabatham (சிவகாமியின் சபதம்)",
    author: "Kalki Krishnamurthy",
    description: "A monumental romance and epic rivalry set during the Pallava dynasty between Narasimhavarman I and Pulakesi II, centered around the captivating dancer Sivagami.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    isbn: "978-8184490756",
    genres: ["Historical Fiction", "Romance", "Indian Literature", "Classics"],
    publishedYear: 1948,
    publisher: "Vanathi Pathippagam",
    pageCount: 1100,
    language: "Tamil",
    ageGroup: "Adults",
    averageRating: 4.8,
    ratingsCount: 8900,
    price: 549,
    originalPrice: 750,
    format: "Paperback",
    inStock: true,
    bestseller: false,
    featured: true,
    trending: true,
    badge: "Amazon's Choice",
    moodTags: ["Emotional", "Dramatic", "Passionate"],
    readingPace: "Moderate",
    quotes: ["கலைக்கும் காதலுக்கும் சாம்ராஜ்யங்கள் அடிபணியும்."],
    previewExcerpt: "காஞ்சி மாநகரம் சிற்பக் கலைகளாலும் நடனச் சலங்கைகளின் ஒலியாலும் நிறைந்து வழிந்தது..."
  },
  {
    title: "Panchatantra Tamil for Children (சிறுவர் பஞ்சதந்திரக் கதைகள்)",
    author: "Vishnu Sharma (Trans. Tamil)",
    description: "Timeless moral animal fables full of witty wisdom, friendship, and moral virtues specially illustrated for children and young readers.",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop&q=80",
    isbn: "978-9388371056",
    genres: ["Children & Picture Books", "Fables", "Indian Literature"],
    publishedYear: 2020,
    publisher: "Malar Pathippagam",
    pageCount: 140,
    language: "Tamil",
    ageGroup: "Kids",
    averageRating: 4.9,
    ratingsCount: 3200,
    price: 199,
    originalPrice: 299,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: false,
    trending: false,
    badge: "Kids Favorite",
    moodTags: ["Playful", "Inspirational", "Moral"],
    readingPace: "Light",
    quotes: ["புத்தி உள்ள மனிதனுக்கு ஆபத்திலும் வழி கிடைக்கும்."],
    previewExcerpt: "ஒரு காட்டில் நரியும் சிங்கமும் சிறந்த நண்பர்களாக வாழ்ந்து வந்தன..."
  },

  // --- HINDI ---
  {
    title: "Godan (गोदान)",
    author: "Munshi Premchand",
    description: "A monumental masterpiece depicting the harsh realities of rural Indian peasant life, sacrifice, and the enduring human spirit centered on the farmer Hori and his family.",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80",
    isbn: "978-8128801464",
    genres: ["Classics", "Indian Literature", "Fiction", "Social Realism"],
    publishedYear: 1936,
    publisher: "Rajkamal Prakashan",
    pageCount: 380,
    language: "Hindi",
    ageGroup: "All Ages",
    averageRating: 4.8,
    ratingsCount: 14200,
    price: 249,
    originalPrice: 350,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "#1 Best Seller",
    moodTags: ["Poignant", "Reflective", "Masterpiece"],
    readingPace: "Moderate",
    quotes: ["जब दूसरों के पांव तले अपनी गर्दन दबी हो, तो उन पांवों को सहलाने में ही कुशल है।"],
    previewExcerpt: "होरी राम ने दोनों बैलों को सानी-पानी देकर अपनी स्त्री धनिया से कहा..."
  },
  {
    title: "Gunahon Ka Devta (गुनाहों का देवता)",
    author: "Dharamvir Bharati",
    description: "An iconic, profoundly emotional romance set in Allahabad portraying the selfless yet tragic love between Chander and Sudha. One of the most widely read Hindi novels in modern history.",
    coverImage: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&auto=format&fit=crop&q=80",
    isbn: "978-8126700462",
    genres: ["Romance", "Indian Literature", "Classics", "Fiction"],
    publishedYear: 1949,
    publisher: "Bharatiya Jnanpith",
    pageCount: 260,
    language: "Hindi",
    ageGroup: "Young Adult",
    averageRating: 4.9,
    ratingsCount: 19500,
    price: 299,
    originalPrice: 420,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "Amazon's Choice",
    moodTags: ["Heartbreaking", "Romantic", "Nostalgic"],
    readingPace: "Fast",
    quotes: ["प्यार पवित्र होता है, लेकिन समाज की बेड़ियां बहुत सख्त।"],
    previewExcerpt: "चंदर जब भी सुधा को देखता, उसे लगता जैसे किसी पवित्र मंदिर की घंटी बज उठी हो..."
  },
  {
    title: "Madhushala (मधुशाला)",
    author: "Harivansh Rai Bachchan",
    description: "A deeply philosophical and poetic celebration of life, tolerance, and human unity through the metaphor of the tavern, cup, and wine.",
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80",
    isbn: "978-8126715107",
    genres: ["Poetry", "Philosophy", "Classics", "Indian Literature"],
    publishedYear: 1935,
    publisher: "Rajpal & Sons",
    pageCount: 160,
    language: "Hindi",
    ageGroup: "All Ages",
    averageRating: 4.9,
    ratingsCount: 11200,
    price: 199,
    originalPrice: 275,
    format: "Hardcover",
    inStock: true,
    bestseller: false,
    featured: true,
    trending: false,
    badge: "Literary Treasure",
    moodTags: ["Philosophical", "Soulful", "Poetic"],
    readingPace: "Reflective",
    quotes: ["मदिरालय जाने को घर से चलता है पीनेवला, किस पथ से जाऊँ, असमंजस में है वह भोलाभाला।"],
    previewExcerpt: "अलग-अलग पथ बतलाते सब, पर मैं यह बतलाता हूँ: राह पकड़ तू एक चला चल, पा जाएगा मधुशाला..."
  },

  // --- SPANISH ---
  {
    title: "Cien años de soledad (One Hundred Years of Solitude)",
    author: "Gabriel García Márquez",
    description: "The pinnacle of magical realism following seven generations of the Buendía family in the mythical Colombian town of Macondo.",
    coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&auto=format&fit=crop&q=80",
    isbn: "978-0307474728",
    genres: ["Magical Realism", "Classics", "Fiction", "Literary Fiction"],
    publishedYear: 1967,
    publisher: "Editorial Sudamericana",
    pageCount: 471,
    language: "Spanish",
    ageGroup: "Adults",
    averageRating: 4.8,
    ratingsCount: 31200,
    price: 499,
    originalPrice: 699,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "Nobel Prize Laureate",
    moodTags: ["Surreal", "Mystical", "Epic"],
    readingPace: "Engrossing",
    quotes: ["Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo."],
    previewExcerpt: "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte casas de barro y cañabrava..."
  },
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    description: "The founding work of Western modern literature recounting the comical yet profoundly noble adventures of an eccentric hidalgo and his faithful squire Sancho Panza.",
    coverImage: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&auto=format&fit=crop&q=80",
    isbn: "978-8420412146",
    genres: ["Classics", "Adventure", "Satire", "Fiction"],
    publishedYear: 1605,
    publisher: "Real Academia Española",
    pageCount: 864,
    language: "Spanish",
    ageGroup: "All Ages",
    averageRating: 4.7,
    ratingsCount: 22400,
    price: 599,
    originalPrice: 799,
    format: "Hardcover",
    inStock: true,
    bestseller: false,
    featured: true,
    trending: false,
    badge: "Timeless Classic",
    moodTags: ["Witty", "Philosophical", "Humorous"],
    readingPace: "Moderate",
    quotes: ["La libertad, Sancho, es uno de los más preciosos dones que a los hombres dieron los cielos."],
    previewExcerpt: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero..."
  },
  {
    title: "La casa de los espíritus (The House of the Spirits)",
    author: "Isabel Allende",
    description: "A sweeping multi-generational Chilean epic interweaving political drama, sorcery, family passions, and clairvoyance through Clara the clairvoyant and Esteban Trueba.",
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&auto=format&fit=crop&q=80",
    isbn: "978-1501117015",
    genres: ["Magical Realism", "Historical Fiction", "Romance"],
    publishedYear: 1982,
    publisher: "Plaza & Janés",
    pageCount: 490,
    language: "Spanish",
    ageGroup: "Adults",
    averageRating: 4.6,
    ratingsCount: 16700,
    price: 449,
    originalPrice: 620,
    format: "Paperback",
    inStock: true,
    bestseller: false,
    featured: false,
    trending: true,
    badge: "International Sensation",
    moodTags: ["Passionate", "Haunting", "Supernatural"],
    readingPace: "Fast",
    quotes: ["Escribo para burlar a la muerte y salvar a los que amo del olvido."],
    previewExcerpt: "Barrabás llegó a la familia por vía marítima, anotó la niña Clara con su delicada caligrafía..."
  },

  // --- FRENCH ---
  {
    title: "Le Petit Prince (The Little Prince)",
    author: "Antoine de Saint-Exupéry",
    description: "The enchanting poetic tale of an aviator stranded in the Sahara who meets a young golden-haired prince from Asteroid B-612. A poignant exploration of love, loss, friendship, and innocence.",
    coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd9?w=600&auto=format&fit=crop&q=80",
    isbn: "978-2070612758",
    genres: ["Children & Picture Books", "Philosophy", "Classics", "Fables"],
    publishedYear: 1943,
    publisher: "Gallimard",
    pageCount: 96,
    language: "French",
    ageGroup: "Kids",
    averageRating: 4.9,
    ratingsCount: 48900,
    price: 320,
    originalPrice: 450,
    format: "Hardcover",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "#1 Best Seller",
    moodTags: ["Heartwarming", "Philosophical", "Innocent"],
    readingPace: "Light",
    quotes: ["On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux."],
    previewExcerpt: "Lorsque j'avais six ans j'ai vu, une fois, une magnifique image, dans un livre sur la Forêt Vierge qui s'appelait 'Histoires Vécues'..."
  },
  {
    title: "L'Étranger (The Stranger)",
    author: "Albert Camus",
    description: "Camus's philosophical cornerstone exploring absurdity, isolation, and freedom through Meursault, an emotionally detached Algerian clerk who commits a murder on a sun-drenched beach.",
    coverImage: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=600&auto=format&fit=crop&q=80",
    isbn: "978-2070360024",
    genres: ["Philosophy", "Classics", "Fiction", "Psychological"],
    publishedYear: 1942,
    publisher: "Gallimard",
    pageCount: 184,
    language: "French",
    ageGroup: "Adults",
    averageRating: 4.7,
    ratingsCount: 28400,
    price: 349,
    originalPrice: 490,
    format: "Paperback",
    inStock: true,
    bestseller: false,
    featured: true,
    trending: false,
    badge: "Nobel Classic",
    moodTags: ["Existential", "Intense", "Chilling"],
    readingPace: "Fast",
    quotes: ["Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas."],
    previewExcerpt: "Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas. J'ai reçu un télégramme de l'asile : 'Mère décédée. Enterrement demain. Sentiments distingués'..."
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    description: "An epic French masterpiece depicting grace, redemption, social justice, and love through ex-convict Jean Valjean, pursued relentlessly by police inspector Javert in revolutionary Paris.",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
    isbn: "978-2070409228",
    genres: ["Historical Fiction", "Classics", "Epic", "Drama"],
    publishedYear: 1862,
    publisher: "A. Lacroix, Verboeckhoven & Cie",
    pageCount: 1462,
    language: "French",
    ageGroup: "All Ages",
    averageRating: 4.8,
    ratingsCount: 34100,
    price: 699,
    originalPrice: 999,
    format: "Hardcover",
    inStock: true,
    bestseller: true,
    featured: false,
    trending: true,
    badge: "Masterpiece",
    moodTags: ["Inspiring", "Tear-Jerker", "Epic"],
    readingPace: "Engrossing",
    quotes: ["Aimer ou avoir aimé, cela suffit. Ne demandez rien après."],
    previewExcerpt: "Tant qu'il existera, par le fait des lois et des mœurs, une damnation sociale créant artificiellement, en pleine civilisation, des enfers..."
  },

  // --- GERMAN ---
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    description: "A profoundly luminous novel of spiritual search, self-discovery, and enlightenment set in ancient India along the sacred river.",
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=80",
    isbn: "978-3518366820",
    genres: ["Philosophy", "Classics", "Spiritual", "Fiction"],
    publishedYear: 1922,
    publisher: "Suhrkamp",
    pageCount: 152,
    language: "German",
    ageGroup: "All Ages",
    averageRating: 4.8,
    ratingsCount: 29800,
    price: 299,
    originalPrice: 399,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "Amazon's Choice",
    moodTags: ["Spiritual", "Peaceful", "Transformative"],
    readingPace: "Gentle",
    quotes: ["Wissen kann man mitteilen, Weisheit aber nicht."],
    previewExcerpt: "Im Schatten des Hauses, in der Sonne des Flussufers bei den Booten, im Schatten des Salwaldes, im Schatten des Feigenbaumes wuchs Siddhartha auf..."
  },
  {
    title: "Die Verwandlung (The Metamorphosis)",
    author: "Franz Kafka",
    description: "Gregor Samsa wakes up one morning from troubled dreams to find himself transformed into a monstrous vermin. A chilling surreal allegory of alienation and family guilt.",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80",
    isbn: "978-3150099001",
    genres: ["Classics", "Psychological", "Fiction", "Absurdist"],
    publishedYear: 1915,
    publisher: "Kurt Wolff Verlag",
    pageCount: 120,
    language: "German",
    ageGroup: "Adults",
    averageRating: 4.6,
    ratingsCount: 26500,
    price: 249,
    originalPrice: 350,
    format: "Paperback",
    inStock: true,
    bestseller: false,
    featured: false,
    trending: true,
    badge: "Literary Gem",
    moodTags: ["Unsettling", "Dark", "Thought-Provoking"],
    readingPace: "Fast",
    quotes: ["Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt."],
    previewExcerpt: "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt. Er lag auf seinem panzerartig harten Rücken..."
  },

  // --- JAPANESE ---
  {
    title: "Norwegian Wood (ノルウェイの森)",
    author: "Haruki Murakami",
    description: "Murakami's nostalgic, intimate masterpiece of young love, grief, longing, and college student Toru Watanabe's romantic entanglements in 1960s Tokyo.",
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80",
    isbn: "978-4062748681",
    genres: ["Literary Fiction", "Romance", "Contemporary", "Japanese Literature"],
    publishedYear: 1987,
    publisher: "Kodansha",
    pageCount: 400,
    language: "Japanese",
    ageGroup: "Young Adult",
    averageRating: 4.7,
    ratingsCount: 38200,
    price: 499,
    originalPrice: 650,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "#1 Best Seller",
    moodTags: ["Melancholic", "Poetic", "Introspective"],
    readingPace: "Engrossing",
    quotes: ["死は生の対極としてではなく、その一部として存在している。"],
    previewExcerpt: "僕は三十七歳で、そのときボーイング747のシートに座っていた。巨大な機体は厚い雨雲をくぐり抜けて降下し..."
  },
  {
    title: "Before the Coffee Gets Cold (コーヒーが冷めないうちに)",
    author: "Toshikazu Kawaguchi",
    description: "In a quiet Tokyo back alley cafe, a magical chair allows customers to travel back in time, provided they return before their cup of coffee turns cold.",
    coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80",
    isbn: "978-4864104609",
    genres: ["Fantasy", "Heartwarming", "Japanese Literature", "Fiction"],
    publishedYear: 2015,
    publisher: "Sunmark Publishing",
    pageCount: 220,
    language: "Japanese",
    ageGroup: "All Ages",
    averageRating: 4.8,
    ratingsCount: 21500,
    price: 399,
    originalPrice: 550,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "Amazon's Choice",
    moodTags: ["Cozy", "Emotional", "Magical"],
    readingPace: "Moderate",
    quotes: ["コーヒーが冷めないうちに、伝えたい言葉を届けなさい。"],
    previewExcerpt: "その喫茶店には、不思議な都市伝説があった。ある特定の席に座ると、望んだ通りの時間に戻れるという..."
  },

  // --- KIDS & TEENS SPECIFIC ---
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. The magic begins here.",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    isbn: "978-0590353427",
    genres: ["Fantasy", "Children & Picture Books", "Adventure", "Young Adult"],
    publishedYear: 1997,
    publisher: "Scholastic",
    pageCount: 309,
    language: "English",
    ageGroup: "Pre-Teens",
    averageRating: 4.9,
    ratingsCount: 89000,
    price: 499,
    originalPrice: 699,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "#1 Best Seller",
    moodTags: ["Magical", "Adventurous", "Nostalgic"],
    readingPace: "Fast",
    quotes: ["It does not do to dwell on dreams and forget to live."],
    previewExcerpt: "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much..."
  },
  {
    title: "Charlotte's Web",
    author: "E.B. White",
    description: "The heartwarming classic tale of Wilbur the gentle pig and Charlotte, a wise grey spider who weaves words into her web to save her friend.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    isbn: "978-0064400558",
    genres: ["Children & Picture Books", "Classics", "Animals"],
    publishedYear: 1952,
    publisher: "HarperCollins",
    pageCount: 192,
    language: "English",
    ageGroup: "Kids",
    averageRating: 4.8,
    ratingsCount: 42300,
    price: 299,
    originalPrice: 399,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: false,
    trending: false,
    badge: "All-Time Children's Classic",
    moodTags: ["Tender", "Heartwarming", "Timeless"],
    readingPace: "Light",
    quotes: ["You have been my friend. That in itself is a tremendous thing."],
    previewExcerpt: "'Where's Papa going with that ax?' said Fern to her mother as they were setting the table for breakfast..."
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description: "In the ruins of North America, sixteen-year-old Katniss Everdeen volunteers to take her sister's place in the brutal televised annual Hunger Games.",
    coverImage: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=600&auto=format&fit=crop&q=80",
    isbn: "978-0439023481",
    genres: ["Young Adult", "Sci-Fi", "Dystopian", "Adventure"],
    publishedYear: 2008,
    publisher: "Scholastic Press",
    pageCount: 374,
    language: "English",
    ageGroup: "Young Adult",
    averageRating: 4.7,
    ratingsCount: 65400,
    price: 399,
    originalPrice: 550,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "Movie Adaptation",
    moodTags: ["Thrilling", "Intense", "Courageous"],
    readingPace: "Very Fast",
    quotes: ["May the odds be ever in your favor."],
    previewExcerpt: "When I wake up, the other side of the bed is cold. My fingers stretch out, seeking Prim's warmth but finding only the rough canvas cover of the mattress..."
  },
  {
    title: "Percy Jackson & the Olympians: The Lightning Thief",
    author: "Rick Riordan",
    description: "Percy Jackson is about to be kicked out of boarding school... again. But things get truly chaotic when Zeus's master lightning bolt is stolen and Percy becomes prime suspect.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    isbn: "978-0786838653",
    genres: ["Fantasy", "Young Adult", "Mythology", "Adventure"],
    publishedYear: 2005,
    publisher: "Disney Hyperion",
    pageCount: 377,
    language: "English",
    ageGroup: "Pre-Teens",
    averageRating: 4.8,
    ratingsCount: 54100,
    price: 349,
    originalPrice: 499,
    format: "Paperback",
    inStock: true,
    bestseller: false,
    featured: true,
    trending: true,
    badge: "Amazon's Choice",
    moodTags: ["Humorous", "Action-Packed", "Mythological"],
    readingPace: "Fast",
    quotes: ["Look, I didn't want to be a half-blood."],
    previewExcerpt: "Look, I didn't want to be a half-blood. If you're reading this because you think you might be one, my advice is: close this book right now..."
  },
  {
    title: "The Alchemist (El Alquimista)",
    author: "Paulo Coelho",
    description: "Santiago, an Andalusian shepherd boy, yearns to travel in search of a worldly treasure. His quest will lead him to treasures far different—and far more satisfying—than he ever imagined.",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    isbn: "978-0062315007",
    genres: ["Philosophy", "Classics", "Inspirational", "Fiction"],
    publishedYear: 1988,
    publisher: "HarperOne",
    pageCount: 208,
    language: "Spanish",
    ageGroup: "All Ages",
    averageRating: 4.8,
    ratingsCount: 78500,
    price: 349,
    originalPrice: 499,
    format: "Paperback",
    inStock: true,
    bestseller: true,
    featured: true,
    trending: true,
    badge: "#1 Best Seller",
    moodTags: ["Inspiring", "Philosophical", "Soul-Stirring"],
    readingPace: "Fast",
    quotes: ["Cuando quieres algo, todo el universo conspira para que realices tu deseo."],
    previewExcerpt: "El muchacho se llamaba Santiago. Comenzaba a anochecer cuando llegó con su rebaño a una vieja iglesia abandonada..."
  }
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    console.log("Connecting to MongoDB Atlas for database seeding...");
    await client.connect();
    const db = client.db('ticket-booking-platform');
    const booksCollection = db.collection('books');

    // Update existing 20 books to ensure price, originalPrice, ageGroup, and format exist
    const existingBooks = await booksCollection.find().toArray();
    console.log(`Found ${existingBooks.length} existing books. Enriching missing fields...`);

    for (const b of existingBooks) {
      const updates = {};
      if (!b.price) updates.price = Math.floor(Math.random() * 300) + 299;
      if (!b.originalPrice) updates.originalPrice = Math.round(updates.price ? updates.price * 1.35 : (b.price || 399) * 1.35);
      if (!b.ageGroup) {
        if (b.genres && (b.genres.includes('Sci-Fi') || b.genres.includes('Thriller'))) {
          updates.ageGroup = "Adults";
        } else if (b.genres && b.genres.includes('Fantasy')) {
          updates.ageGroup = "Young Adult";
        } else {
          updates.ageGroup = "All Ages";
        }
      }
      if (!b.format) updates.format = "Paperback";
      if (b.inStock === undefined) updates.inStock = true;
      if (b.badge === undefined) {
        if (b.averageRating >= 4.8) updates.badge = "#1 Best Seller";
        else if (b.trending) updates.badge = "Amazon's Choice";
      }
      if (!b.previewExcerpt) {
        updates.previewExcerpt = `${b.title} opens with an unforgettable introduction by ${b.author}. ` + (b.description || "");
      }

      if (Object.keys(updates).length > 0) {
        await booksCollection.updateOne({ _id: b._id }, { $set: updates });
      }
    }
    console.log("Updated existing books with pricing, format, and age groups!");

    // Fix MongoDB text index so all world languages (Tamil, Hindi, etc.) can be saved
    try {
      console.log("Updating text index to support all global languages...");
      await booksCollection.dropIndex("title_text_author_text_description_text");
    } catch (e) {
      console.log("Old index drop skipped or not found:", e.message);
    }
    await booksCollection.createIndex(
      { title: "text", author: "text", description: "text" },
      { name: "title_text_author_text_description_text", default_language: "none", language_override: "text_lang_override" }
    );
    console.log("Created global text search index!");

    // Check and insert additional multilingual and diverse books
    let addedCount = 0;
    for (const book of additionalBooks) {
      const exists = await booksCollection.findOne({ title: book.title });
      if (!exists) {
        await booksCollection.insertOne({
          ...book,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        addedCount++;
      }
    }
    console.log(`Successfully inserted ${addedCount} new multilingual books!`);

    // Verify language breakdown
    const langs = await booksCollection.distinct('language');
    console.log("Supported Languages in Database:", langs);

    const genres = await booksCollection.distinct('genres');
    console.log("Available Genres count:", genres.length);

    const totalBooks = await booksCollection.countDocuments();
    console.log("Total books count in database:", totalBooks);

  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await client.close();
  }
}

seed();
