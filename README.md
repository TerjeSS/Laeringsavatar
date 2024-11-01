Læringsavatar HK-dir prosjekt.
https://laeringsavatar.khio.no/

Teknologier og rammeverk:
- Javascript, med React for UI
- Firebase for database
- Three.js for visualisering

Web-appen inneholder to hovedsider: en for 3D visualisering av en animasjonssekvens og en for administrering av visualiseringene for en bruker. I tillegg har vi innloggingssider og en informasjonsside (landing page). Visualiseringssiden er åpen for alle og krever ingen innlogging. Administreringssiden krever innlogging. Ny bruker kan opprettes fra startsiden og en standard bruker vil da opprettes. En slik standard bruker kan laste opp visualiseringer og se sine egne visualiseringer fra administreringssiden. Vi har også noen superbrukere som kan se alle visualiseringene fra deres administreringsside.

En 3D visualisering er lagret i en fil av filtypen gltf. Gltf er et filformat for 3D visualiseringer laget primært for web-applikasjoner. I denne applikasjonen kommer disse filene fra motion capture opptak, og er manuelt laget av en ekspert innen 3D modellering. Filene er laget med Blender.

Funksjonaliteter til visualiseringssiden:
- For at visualiseringen skal fungere, må modellen være "rigget" med et motion capture system. Visualiseringssiden antar følgende struktur på riggen: "mannequin_skeleton" representerer skjelettet; "Glasses_Square" representerer brillene; "Track_pants" er modellen for buksene; "mannequin" er modellen for figuren; "Hips" er rotnoden til benene som inneholder animasjonssekvensen fra motion capture opptaket.
- Visualiseringssiden antar at modellen inneholder en animasjonssekvens. Denne animasjonen starter automatisk når siden starter og kan avspilles med knappene øverst på siden med pause/start/forover/bakover. Forover/bakover knappene stopper animasjonen og flytter animasjonen et steg fremover eller bakover.
- Brukeren kan navigere med ulike kontrollere i 3D miljøet med et kamera. Dette kameraet kan flyttes med mus eller touch-screen bevegelser. Kameraet flyttes rundt figuren, slik at figuren alltid er i fokus.
- Kameraet roterer rundt hoftene til å starte med. Avhengig av bevegelse, kan brukeren muligens ønske seg å fokusere på andre områder enn dette i bevegelsen, som for eksempel å zoome inn mot føttene. Brukeren kan klikke på figuren for å velge området kameraet skal fokusere på. Hvis brukeren klikker på føttene, blinker en liten rød kule på dette området i 250 millisekunder for å vise hva brukeren klikket på. Dette området vil deretter representere fokus til kamera og brukeren vil nå kunne zomme inn mot og rotere rundt føttene.
- Figuren beveger seg utelukkende innenfor en scene. Denne scenen er et kvadrat på 25 m^2 og motion capture opptakene er dermed begrenset til et område på 5 meter. Kamerabevegelsene er også begrenset til dette området slik at brukeren ikke zoomer utenfor scenen.
- I tillegg til de sentrale funksjonene beskrevet over inneholder visualiseringen ulike brukervalg som lyd/musikk og endring av utseende til figuren fra en meny på siden.
- Disse funksjonene er utformet med tanke på ulike enheter og er testet på PC, laptop, iPhones, Samsung smarttelefoner, og iPad. Fargevalg følger prinsipper etter universell utforming.
