window.getVocabulary = async function (categoryId) {
    // In a real app, this would fetch from the JSON file
    // For now, we'll return hardcoded data for the demo
    // to ensure it works immediately without fetch issues on local file protocol

    const allData = {
        "greetings": [
            { "dutch": "Hallo", "english": "Hello", "pronunciation": "HAH-loh", "example": "Hallo! Hoe gaat het?", "exampleTranslation": "Hello! How are you?" },
            { "dutch": "Goedemorgen", "english": "Good morning", "pronunciation": "KHOO-duh-MOR-khuh", "example": "Goedemorgen, iedereen.", "exampleTranslation": "Good morning, everyone." },
            { "dutch": "Goedenavond", "english": "Good evening", "pronunciation": "KHOO-duh-NAH-vont", "example": "Goedenavond, meneer.", "exampleTranslation": "Good evening, sir." },
            { "dutch": "Welterusten", "english": "Good night", "pronunciation": "VEL-tuh-RUS-tuh", "example": "Ik ga slapen, welterusten.", "exampleTranslation": "I'm going to sleep, good night." },
            { "dutch": "Dank je wel", "english": "Thank you very much", "pronunciation": "DAHNK yuh VEL", "example": "Dank je wel voor de hulp.", "exampleTranslation": "Thank you very much for the help." },
            { "dutch": "Graag gedaan", "english": "You're welcome", "pronunciation": "KRAHKH khuh-DAHN", "example": "Geen probleem, graag gedaan.", "exampleTranslation": "No problem, you're welcome." },
            { "dutch": "Tot ziens", "english": "Goodbye / See you", "pronunciation": "TOT zeens", "example": "Tot ziens! Fijne dag.", "exampleTranslation": "Goodbye! Have a nice day." },
            { "dutch": "Alstublieft", "english": "Please / Here you go", "pronunciation": "ALS-too-BLEEFT", "example": "Een koffie, alstublieft.", "exampleTranslation": "A coffee, please." },
            { "dutch": "Hoe gaat het?", "english": "How are you?", "pronunciation": "HOO khaht het", "example": "Alles goed? Hoe gaat het?", "exampleTranslation": "Everything good? How are you?" },
            { "dutch": "Aangenaam", "english": "Nice to meet you", "pronunciation": "AHN-khuh-nahm", "example": "Ik ben Tom, aangenaam.", "exampleTranslation": "I am Tom, nice to meet you." }
        ],
        "shopping": [
            { "dutch": "De bon", "english": "The receipt", "pronunciation": "duh BON", "example": "Mag ik de bon, alstublieft?", "exampleTranslation": "May I have the receipt, please?" },
            { "dutch": "Pinnen", "english": "To pay by card", "pronunciation": "PIN-nuh", "example": "Kan ik hier pinnen?", "exampleTranslation": "Can I pay by card here?" },
            { "dutch": "Contant", "english": "Cash", "pronunciation": "kon-TANT", "example": "Ik betaal contant.", "exampleTranslation": "I am paying cash." },
            { "dutch": "De tas", "english": "The bag", "pronunciation": "duh TAS", "example": "Wilt u een tasje erbij?", "exampleTranslation": "Would you like a bag with that?" },
            { "dutch": "Duur", "english": "Expensive", "pronunciation": "DUUR", "example": "Dat is te duur.", "exampleTranslation": "That is too expensive." },
            { "dutch": "Goedkoop", "english": "Cheap", "pronunciation": "khoot-KOOP", "example": "Deze appels zijn goedkoop.", "exampleTranslation": "These apples are cheap." },
            { "dutch": "De supermarkt", "english": "The supermarket", "pronunciation": "SU-per-markt", "example": "Ik ga naar de supermarkt.", "exampleTranslation": "I am going to the supermarket." },
            { "dutch": "Ik zoek...", "english": "I am looking for...", "pronunciation": "ik ZOOK", "example": "Ik zoek de melk.", "exampleTranslation": "I am looking for the milk." }
        ],
        "food": [
            { "dutch": "Het menu", "english": "The menu", "pronunciation": "het me-NU", "example": "Mag ik het menu zien?", "exampleTranslation": "May I see the menu?" },
            { "dutch": "Het water", "english": "The water", "pronunciation": "het WAH-ter", "example": "Een glas water, alstublieft.", "exampleTranslation": "A glass of water, please." },
            { "dutch": "De rekening", "english": "The bill", "pronunciation": "duh RE-kuh-ning", "example": "Mag ik de rekening?", "exampleTranslation": "May I have the bill?" },
            { "dutch": "Eet smakelijk", "english": "Enjoy your meal", "pronunciation": "EET SMAH-kuh-luk", "example": "Hier is uw eten. Eet smakelijk!", "exampleTranslation": "Here is your food. Enjoy your meal!" },
            { "dutch": "Lekker", "english": "Tasty / Yummy", "pronunciation": "LEK-ker", "example": "Dit is heel lekker.", "exampleTranslation": "This is very tasty." },
            { "dutch": "Ik ben allergisch", "english": "I am allergic", "pronunciation": "ik ben al-LER-gies", "example": "Ik ben allergisch voor noten.", "exampleTranslation": "I am allergic to nuts." },
            { "dutch": "Vegetarisch", "english": "Vegetarian", "pronunciation": "vay-khuh-TAH-ries", "example": "Heeft u vegetarische opties?", "exampleTranslation": "Do you have vegetarian options?" },
            { "dutch": "Het bier", "english": "The beer", "pronunciation": "het BEER", "example": "Twee biertjes, alstublieft.", "exampleTranslation": "Two beers, please." }
        ],
        "transport": [
            { "dutch": "De trein", "english": "The train", "pronunciation": "duh TREIN", "example": "De trein vertrekt om 8 uur.", "exampleTranslation": "The train departs at 8 o'clock." },
            { "dutch": "Het station", "english": "The station", "pronunciation": "het sta-SJON", "example": "Waar is het station?", "exampleTranslation": "Where is the station?" },
            { "dutch": "De fiets", "english": "The bicycle", "pronunciation": "duh FEETS", "example": "Ik ga met de fiets.", "exampleTranslation": "I am going by bike." },
            { "dutch": "De bushalte", "english": "The bus stop", "pronunciation": "duh BUS-hal-tuh", "example": "Waar is de dichtstbijzijnde bushalte?", "exampleTranslation": "Where is the nearest bus stop?" },
            { "dutch": "Een kaartje", "english": "A ticket", "pronunciation": "uhn KAHRT-juh", "example": "Ik wil graag een kaartje kopen.", "exampleTranslation": "I would like to buy a ticket." },
            { "dutch": "Rechts", "english": "Right", "pronunciation": "REKHTS", "example": "Ga hier naar rechts.", "exampleTranslation": "Go right here." },
            { "dutch": "Links", "english": "Left", "pronunciation": "LINKS", "example": "Aan de linkerkant.", "exampleTranslation": "On the left side." },
            { "dutch": "Rechtdoor", "english": "Straight ahead", "pronunciation": "rekht-DOOR", "example": "Ga rechtdoor tot de kerk.", "exampleTranslation": "Go straight ahead until the church." }
        ],
        "numbers": [
            { "dutch": "Eén", "english": "One", "pronunciation": "AYN", "example": "Eén koffie, graag.", "exampleTranslation": "One coffee, please." },
            { "dutch": "Twee", "english": "Two", "pronunciation": "TVAY", "example": "Twee euro.", "exampleTranslation": "Two euros." },
            { "dutch": "Drie", "english": "Three", "pronunciation": "DREE", "example": "Drie dagen.", "exampleTranslation": "Three days." },
            { "dutch": "Tien", "english": "Ten", "pronunciation": "TEEN", "example": "Het is tien uur.", "exampleTranslation": "It is ten o'clock." },
            { "dutch": "Hoe laat is het?", "english": "What time is it?", "pronunciation": "hoo LAHT is het", "example": "Pardon, hoe laat is het?", "exampleTranslation": "Excuse me, what time is it?" },
            { "dutch": "Vandaag", "english": "Today", "pronunciation": "van-DAHGH", "example": "Vandaag is het maandag.", "exampleTranslation": "Today is Monday." },
            { "dutch": "Morgen", "english": "Tomorrow", "pronunciation": "MOR-khuh", "example": "Tot morgen!", "exampleTranslation": "See you tomorrow!" },
            { "dutch": "De week", "english": "The week", "pronunciation": "duh WEEK", "example": "Volgende week.", "exampleTranslation": "Next week." }
        ],
        "medical": [
            { "dutch": "De dokter", "english": "The doctor", "pronunciation": "duh DOK-ter", "example": "Ik moet naar de dokter.", "exampleTranslation": "I need to go to the doctor." },
            { "dutch": "Ziek", "english": "Sick", "pronunciation": "ZEEK", "example": "Ik ben ziek.", "exampleTranslation": "I am sick." },
            { "dutch": "De apotheek", "english": "The pharmacy", "pronunciation": "duh a-po-THEEK", "example": "Is er een apotheek in de buurt?", "exampleTranslation": "Is there a pharmacy nearby?" },
            { "dutch": "Pijn", "english": "Pain", "pronunciation": "PEIN", "example": "Ik heb pijn in mijn hoofd.", "exampleTranslation": "I have a pain in my head (headache)." },
            { "dutch": "Help", "english": "Help", "pronunciation": "HELP", "example": "Help mij, alstublieft!", "exampleTranslation": "Help me, please!" },
            { "dutch": "Het ziekenhuis", "english": "The hospital", "pronunciation": "het ZEE-kuh-huis", "example": "Bel het ziekenhuis.", "exampleTranslation": "Call the hospital." },
            { "dutch": "Koorts", "english": "Fever", "pronunciation": "KOORTS", "example": "Heeft u koorts?", "exampleTranslation": "Do you have a fever?" }
        ]
    };

    return allData[categoryId] || allData['greetings'];
}
