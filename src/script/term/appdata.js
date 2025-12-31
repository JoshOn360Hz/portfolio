// App data structure
const appData = {
    cumulus: {
        name: 'Cumulus',
        icon: 'assets/term/icons/cumulus.png',
        description: 'A simple, Vision OS inspired weather app available on iOS, iPadOS and macOS. Beautiful design meets functionality.',
        tech: ['Swift', 'SwiftUI', 'WeatherKit'],
        links: [
            { type: 'appstore', url: 'https://apps.apple.com/us/app/cumulus/id6742735497', label: 'App Store' },
            { type: 'website', url: 'https://getcumulus.app', label: 'Website' },
            { type: 'github', url: 'https://github.com/JoshOn360Hz/CumulusApp', label: 'GitHub' }
        ]
    },
    pinboard: {
        name: 'PinBoard',
        icon: 'assets/term/icons/pinboard.png',
        description: 'A notes and reminders app that uses live activities, available on iOS and iPadOS. Stay organized with style.',
        tech: ['Swift', 'Live Activities', 'CoreData'],
        links: [
            { type: 'appstore', url: 'https://apps.apple.com/us/app/pinboard-better-notes/id6747376814', label: 'App Store' },
            { type: 'website', url: 'https://getpinboard.app', label: 'Website' },
            { type: 'github', url: 'https://github.com/JoshOn360Hz/PinBoardApp', label: 'GitHub' }
        ]
    },
    tailtag: {
        name: 'TailTag',
        icon: 'assets/term/icons/tailtag.png',
        description: 'A planespotter app that helps you track aircraft you have seen. Perfect for aviation enthusiasts.',
        tech: ['Swift', 'SwiftUI', 'CoreData'],
        links: [
            { type: 'appstore', url: 'https://apps.apple.com/us/app/tailtag/id6747738157', label: 'App Store' },
            { type: 'website', url: 'https://gettailtag.app', label: 'Website' },
            { type: 'github', url: 'https://github.com/JoshOn360Hz/TailTagApp', label: 'GitHub' }
        ]
    },
    flipcards: {
        name: 'FlipCards',
        icon: 'assets/term/icons/flipcards.png',
        description: 'A flashcard app designed to help you study and memorize information efficiently. Perfect for students and lifelong learners.',
        tech: ['Swift', 'SwiftUI', 'CoreData'],
        links: [
            { type: 'appstore', url: 'https://apps.apple.com/gb/app/flipcards-revision-made-easy/id6749154468', label: 'App Store' },
            { type: 'website', url: 'https://getflipcards.app', label: 'Website' },
            { type: 'github', url: 'https://github.com/JoshOn360Hz/FlipCardsApp', label: 'GitHub' }
        ]
    },
    ht: {
        name: 'Horizon Travels',
        icon: 'assets/term/icons/ht.png',
        description: 'A web-based flight booking system built with Python (Flask), CSS, JavaScript, HTML and SQL.',
        tech: ['Python', 'Flask', 'SQL'],
        links: [
            { type: 'github', url: 'https://github.com/JoshOn360Hz/HorizonTravels-webyear1', label: 'GitHub' }
        ]
    },
    uweai: {
        name: 'UWE AI',
        icon: 'assets/term/icons/uweai.png',
        description: 'Website for the UWE AI Autonomous Racing Society, showcasing autonomous racing technology and society activities.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        links: [
            { type: 'website', url: 'https://uweai.co.uk/', label: 'Website' },
            { type: 'github', url: 'https://github.com/UWE-FSAI/Web', label: 'GitHub' }
        ]
    },
    tbj: {
        name: 'Tech By Josh',
        icon: 'assets/term/icons/tbj.png',
        description: 'The website for my tech support business built with JavaScript, CSS and HTML.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        links: [
            { type: 'website', url: 'https://techbyjosh.dev/', label: 'Website' }
        ]
    },
    mirror: {
        name: 'Smart Mirror Web',
        icon: 'assets/term/icons/mirror.png',
        description: 'Web-based mirror OS displaying date, time, weather and calendar for smart mirror integration.',
        tech: ['Flask', 'API', 'IOT'],
        links: [
            { type: 'github', url: 'https://github.com/JoshOn360Hz/smartmirrorweb', label: 'GitHub' }
        ]
    },
    cts: {
        name: 'Keypad Project',
        icon: 'assets/term/icons/CTS.png',
        description: 'Escape room puzzle project featuring Arduino-based keycard and wiring system.',
        tech: ['Arduino', 'C++', 'Wiring'],
        links: [
            { type: 'website', url: 'https://app.arduino.cc/sketches/13683222-1e2f-4236-b747-e238dbb75ecc?view-mode=preview', label: 'Arduino Web Editor' },
            { type: 'github', url: 'https://github.com/JoshOn360Hz/CTS-Project', label: 'GitHub' }
        ]
    },
    r1: {
        name: 'R1 Modification',
        icon: 'assets/term/icons/r1.png',
        description: 'Custom modifications to Rabbit R1 Android experience, adding stock features and customizations.',
        tech: ['Android', 'Custom ROM', 'Hardware'],
        links: [
            { type: 'github', url: 'https://github.com/JoshOn360Hz/Making-the-R1-useful', label: 'GitHub' }
        ]
    },
    led: {
        name: 'Comms Loop',
        icon: 'assets/term/icons/led.png',
        description: 'Using an Arduino, photoresistor and an LED to transmit bytes and decode them into outputs.',
        tech: ['Arduino', 'Electronics', 'Hardware'],
        links: [
            { type: 'website', url: 'https://app.arduino.cc/sketches/1edd2233-3956-43df-a079-eebec21027b4?view-mode=preview', label: 'Arduino Web Editor' },
            { type: 'github', url: 'https://github.com/JoshOn360Hz/ComsLoopArduino', label: 'GitHub' }
        ]
    },
    gungame: {
        name: 'Gun Game',
        icon: 'assets/term/icons/gungame.png',
        description: 'Verse and UEFN Gun Game map with custom POIs created for a streamer friend.',
        tech: ['UEFN', 'Verse', 'Gaming'],
        links: [
            { type: 'website', url: 'com.epicgames.launcher://apps/fn%3A4fe75bbc5a674f4f9b356b5c90567da5%3AFortnite?action=launch&silent=true&arg=-IslandOverride%3A6788-1220-9273', label: 'Play on Fortnite' }
        ]
    },
    val: {
        name: 'Val Randomiser',
        icon: 'assets/term/icons/val.png',
        description: 'C application with nice UI to randomly select Valorant agents, also available as web WASM app.',
        tech: ['C', 'Gaming', 'WASM'],
        links: [
            { type: 'website', url: 'https://joshon360hz.github.io/ValRandomiser-web/', label: 'View WASM App' },
            { type: 'github', url: 'https://github.com/JoshOn360Hz/ValRandomiser', label: 'GitHub' }
        ]
    }
};
