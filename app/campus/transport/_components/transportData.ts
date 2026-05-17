// Plain data file — no "use client", safe to import in Server Components

export const SCHOOL: [number, number] = [27.6583, 85.3222];

export const routeData = {
  Kathmandu: {
    color: "#2563eb",
    label: "Kathmandu Route",
    branches: [
      [
        [27.6875, 85.2297], // Thankot
        [27.7070, 85.2700], // Sitapaila
        [27.6773, 85.2781], // Kirtipur
        [27.6942, 85.2839], // Kalanki
        [27.6942, 85.3020], // Kuleshwor
        [27.6920, 85.3220], // Babarmahal
        SCHOOL,
      ] as [number, number][],
      [
        [27.7350, 85.3437], // Sukedhara
        [27.7154, 85.3469], // Chabahil
        [27.7215, 85.3620], // Boudha
        [27.7213, 85.3836], // Jorpati
        [27.7100, 85.3897], // Mulpani
        [27.6963, 85.3848], // Pepsicola
        [27.6910, 85.3376], // Baneshwor
        [27.6887, 85.3469], // Buddhanagar
        SCHOOL,
      ] as [number, number][],
    ],
    stops: [
      { name: "Thankot",     pos: [27.6875, 85.2297] as [number, number] },
      { name: "Sitapaila",   pos: [27.7070, 85.2700] as [number, number] },
      { name: "Kirtipur",    pos: [27.6773, 85.2781] as [number, number] },
      { name: "Kalanki",     pos: [27.6942, 85.2839] as [number, number] },
      { name: "Kuleshwor",   pos: [27.6942, 85.3020] as [number, number] },
      { name: "Babarmahal",  pos: [27.6920, 85.3220] as [number, number] },
      { name: "Sukedhara",   pos: [27.7350, 85.3437] as [number, number] },
      { name: "Chabahil",    pos: [27.7154, 85.3469] as [number, number] },
      { name: "Boudha",      pos: [27.7215, 85.3620] as [number, number] },
      { name: "Jorpati",     pos: [27.7213, 85.3836] as [number, number] },
      { name: "Mulpani",     pos: [27.7100, 85.3897] as [number, number] },
      { name: "Pepsicola",   pos: [27.6963, 85.3848] as [number, number] },
      { name: "Baneshwor",   pos: [27.6910, 85.3376] as [number, number] },
      { name: "Buddhanagar", pos: [27.6887, 85.3469] as [number, number] },
    ],
  },

  Bhaktapur: {
    color: "#7c3aed",
    label: "Bhaktapur Route",
    branches: [
      [
        [27.7148, 85.4186], // Changunarayan
        [27.6710, 85.4298], // Bhaktapur
        [27.6520, 85.4157], // Suryabinayak
        [27.6469, 85.4063], // Katunje
        [27.6800, 85.4165], // Jagati
        [27.6827, 85.4109], // Radhe Radhe
        [27.6760, 85.4081], // Kamalbinayak
        [27.6899, 85.4003], // Bode
        [27.6880, 85.3883], // Sallaghari
        [27.6740, 85.3940], // Madhyapur
        [27.6599, 85.3975], // Tathali
        [27.6697, 85.3824], // Sipadol
        [27.6773, 85.3820], // Thimi
        [27.6680, 85.3756], // Gatthaghar
        [27.6640, 85.3726], // Balkot
        [27.6780, 85.3617], // Lokanthali
        SCHOOL,
      ] as [number, number][],
    ],
    stops: [
      { name: "Changunarayan", pos: [27.7148, 85.4186] as [number, number] },
      { name: "Bhaktapur",     pos: [27.6710, 85.4298] as [number, number] },
      { name: "Suryabinayak",  pos: [27.6520, 85.4157] as [number, number] },
      { name: "Katunje",       pos: [27.6469, 85.4063] as [number, number] },
      { name: "Jagati",        pos: [27.6800, 85.4165] as [number, number] },
      { name: "Radhe Radhe",   pos: [27.6827, 85.4109] as [number, number] },
      { name: "Kamalbinayak",  pos: [27.6760, 85.4081] as [number, number] },
      { name: "Bode",          pos: [27.6899, 85.4003] as [number, number] },
      { name: "Sallaghari",    pos: [27.6880, 85.3883] as [number, number] },
      { name: "Madhyapur",     pos: [27.6740, 85.3940] as [number, number] },
      { name: "Tathali",       pos: [27.6599, 85.3975] as [number, number] },
      { name: "Sipadol",       pos: [27.6697, 85.3824] as [number, number] },
      { name: "Thimi",         pos: [27.6773, 85.3820] as [number, number] },
      { name: "Gatthaghar",    pos: [27.6680, 85.3756] as [number, number] },
      { name: "Balkot",        pos: [27.6640, 85.3726] as [number, number] },
      { name: "Lokanthali",    pos: [27.6780, 85.3617] as [number, number] },
    ],
  },

  Lalitpur: {
    color: "#059669",
    label: "Lalitpur Route",
    branches: [
      [
        [27.6568, 85.2891], // Chobar
        [27.6540, 85.2985], // Nakhu
        [27.6325, 85.2944], // Khokana
        [27.6259, 85.3040], // Bungamati
        [27.6435, 85.2994], // Bhaisepati
        [27.6487, 85.3120], // Tyanglaphat
        [27.6830, 85.3009], // Sanepa
        [27.6790, 85.3070], // Jhamsikhel
        [27.6773, 85.3158], // Jawalakhel
        [27.6844, 85.3106], // Pulchowk
        [27.6869, 85.3194], // Kupondole
        [27.6680, 85.3104], // Ekantakuna
        [27.6734, 85.3187], // Bagdol
        [27.6659, 85.3221], // Lagankhel
        [27.6618, 85.3281], // Mahalaxmisthan
        [27.6549, 85.3280], // Satdobato
        SCHOOL,
      ] as [number, number][],
      [
        [27.5880, 85.3720], // Godavari
        [27.5986, 85.3327], // Chapagaon
        [27.6214, 85.3283], // Sunakothi
        [27.6351, 85.3415], // Harisiddhi
        [27.6381, 85.3510], // Lubhu
        [27.6223, 85.3580], // Lamatar
        [27.6430, 85.3448], // Thaiba
        [27.6488, 85.3390], // Tikathali
        [27.6583, 85.3374], // Imadol
        [27.6680, 85.3391], // Gwarko
        SCHOOL,
      ] as [number, number][],
    ],
    stops: [
      { name: "Chobar",         pos: [27.6568, 85.2891] as [number, number] },
      { name: "Nakhu",          pos: [27.6540, 85.2985] as [number, number] },
      { name: "Khokana",        pos: [27.6325, 85.2944] as [number, number] },
      { name: "Bungamati",      pos: [27.6259, 85.3040] as [number, number] },
      { name: "Bhaisepati",     pos: [27.6435, 85.2994] as [number, number] },
      { name: "Tyanglaphat",    pos: [27.6487, 85.3120] as [number, number] },
      { name: "Sanepa",         pos: [27.6830, 85.3009] as [number, number] },
      { name: "Jhamsikhel",     pos: [27.6790, 85.3070] as [number, number] },
      { name: "Jawalakhel",     pos: [27.6773, 85.3158] as [number, number] },
      { name: "Pulchowk",       pos: [27.6844, 85.3106] as [number, number] },
      { name: "Kupondole",      pos: [27.6869, 85.3194] as [number, number] },
      { name: "Ekantakuna",     pos: [27.6680, 85.3104] as [number, number] },
      { name: "Bagdol",         pos: [27.6734, 85.3187] as [number, number] },
      { name: "Lagankhel",      pos: [27.6659, 85.3221] as [number, number] },
      { name: "Mahalaxmisthan", pos: [27.6618, 85.3281] as [number, number] },
      { name: "Satdobato",      pos: [27.6549, 85.3280] as [number, number] },
      { name: "Godavari",       pos: [27.5880, 85.3720] as [number, number] },
      { name: "Chapagaon",      pos: [27.5986, 85.3327] as [number, number] },
      { name: "Sunakothi",      pos: [27.6214, 85.3283] as [number, number] },
      { name: "Harisiddhi",     pos: [27.6351, 85.3415] as [number, number] },
      { name: "Lubhu",          pos: [27.6381, 85.3510] as [number, number] },
      { name: "Lamatar",        pos: [27.6223, 85.3580] as [number, number] },
      { name: "Thaiba",         pos: [27.6430, 85.3448] as [number, number] },
      { name: "Tikathali",      pos: [27.6488, 85.3390] as [number, number] },
      { name: "Imadol",         pos: [27.6583, 85.3374] as [number, number] },
      { name: "Gwarko",         pos: [27.6680, 85.3391] as [number, number] },
    ],
  },
};
