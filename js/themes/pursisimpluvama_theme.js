export const THEME_BRAND = {
  hotelName: "Pur si Simplu",
  hotelMark: "PS"
};

export const THEME_SITE_CONTENT = {
  company: {
    name: "PURSISIMPLU VAMA VECHE SRL",
    taxId: "45359420",
    tradeRegisterNumber: "J2021001230285",
    address: "Jud. Olt, Slatina, Str. Livezi 5",
    phone: "+40 736 906 545",
    email: "pursisimpluvama@yahoo.com"
  },
  netopia: {
    scriptSrc: "https://mny.ro/npId.js?p=165083",
    version: "vertical",
    contrastColor: "#ffffff",
    fallbackLabel: {
      ro: "NETOPIA Payments",
      en: "NETOPIA Payments"
    }
  },
  anpc: [
    {
      asset: "assets/anpc-sal.svg",
      href: "https://anpc.ro/ce-este-sal/",
      alt: {
        ro: "ANPC - Solutionare alternativa a litigiilor",
        en: "ANPC - Alternative dispute resolution"
      }
    },
    {
      asset: "assets/anpc-sol.svg",
      href: "https://ec.europa.eu/consumers/odr",
      alt: {
        ro: "ANPC - Solutionare online a litigiilor",
        en: "ANPC - Online dispute resolution"
      }
    }
  ],
  roomDescriptions: [
    {
      match: "double rooms with garden view",
      coverImage: "assets/double-room.jpg",
      galleryImages: [
        "assets/normal-property-view.png",
        "assets/drone-property-view.png",
        "assets/room-garden.png",
        "assets/double-room.jpg",
        "assets/toilet.jpg"
      ],
      description: {
        ro: "Camera pentru 2 persoane, cu vedere la gradina, potrivita pentru sejururi directe la malul marii.",
        en: "Room for 2 guests with garden view, suited for direct seaside stays."
      }
    },
    {
      match: "twin rooms with garden view",
      coverImage: "assets/twin-room.jpg",
      galleryImages: [
        "assets/normal-property-view.png",
        "assets/drone-property-view.png",
        "assets/room-garden.png",
        "assets/twin-room.jpg",
        "assets/toilet.jpg"
      ],
      description: {
        ro: "Camera pentru 2 persoane, cu doua paturi separate si vedere la gradina.",
        en: "Room for 2 guests with two separate beds and garden view."
      }
    }
  ],
  compliance: {
    ro: {
      footerEyebrow: "Rezervare si plata",
      footerTitle: "Informatii esentiale pentru sejur, plata si politici",
      footerLead: "Consulta conditiile comerciale, politicile de anulare si datele companiei inainte de finalizarea platii online.",
      footerLinks: [
        { id: "services", label: "Camere si servicii" },
        { id: "terms", label: "Termeni si conditii" },
        { id: "delivery", label: "Livrare si anulare" },
        { id: "privacy", label: "Confidentialitate" },
        { id: "company", label: "Date companie" }
      ],
      securePaymentsLabel: "Plati online securizate prin",
      consumerProtectionLabel: "Protectia consumatorului",
      companySummaryLabel: "Operator site",
      modalTitle: "Informatii pentru rezervare si plata",
      modalClose: "Inchide",
      sections: [
        {
          id: "services",
          title: "Camere si servicii",
          paragraphs: [
            "Website-ul permite rezervarea directa a camerelor disponibile din unitate, cu afisarea tarifului total pentru perioada selectata inainte de initierea platii.",
            "Serviciile comercializate sunt servicii de cazare la Pur si Simplu, cu prestarea lor la data sejurului rezervat."
          ],
          bullets: [
            "20 x Double Rooms with Garden View - camere pentru maximum 2 persoane, cu vedere la gradina.",
            "10 x Twin Rooms with Garden View - camere pentru maximum 2 persoane, cu doua paturi separate si vedere la gradina.",
            "Nu sunt disponibile paturi suplimentare.",
            "Animalele de companie sunt acceptate.",
            "Sunt acceptate carduri de vacanta.",
            "Tariful final este calculat pentru perioada selectata si afisat inainte de redirectionarea catre plata."
          ]
        },
        {
          id: "terms",
          title: "Termeni si conditii",
          paragraphs: [
            "Clientul poate efectua plata online cu card bancar prin Netopia (Visa, Maestro, Mastercard) sau poate opta pentru plata la sosire, la receptia unitatii de cazare.",
            "Receptia nu este deschisa non-stop; in mod obisnuit personalul este prezent la sosirea oaspetilor."
          ],
          bullets: [
            "Check-in: 16:00-23:00 sau mai devreme, in functie de disponibilitate.",
            "Check-out: pana la ora 12:00.",
            "Orele de liniste sunt intre 22:00 si 08:00.",
            "Rezervarea este considerata finalizata dupa confirmarea in sistem si, daca este cazul, dupa confirmarea platii online.",
            "Prin finalizarea rezervarii, clientul confirma corectitudinea datelor furnizate si accepta conditiile comerciale afisate pe website."
          ]
        },
        {
          id: "delivery",
          title: "Livrare, anulare si rambursare",
          paragraphs: [
            "Pentru acest website, livrarea reprezinta confirmarea rezervarii si prestarea serviciilor de cazare in perioada selectata de client.",
            "Confirmarea rezervarii este afisata in website si poate fi transmisa pe email la adresa introdusa in formularul de rezervare."
          ],
          bullets: [
            "Modalitatea de livrare: confirmare electronica in website si prin email, urmata de prestarea serviciului de cazare la locatie.",
            "Termen estimativ de confirmare: imediat dupa confirmarea platii online sau dupa inregistrarea rezervarii cu plata la sosire.",
            "Conditii specifice: serviciul este prestat la unitatea de cazare in intervalul de check-in al rezervarii confirmate.",
            "Politica flexibila: nu se percepe taxa daca rezervarea este anulata cu cel putin 30 de zile inainte de sosire.",
            "Politica nerambursabila: in cazul anularii, modificarii sau neprezentarii, se incaseaza pretul total al rezervarii.",
            "Procedura de anulare: solicitarile de anulare sau modificare se trimit prin email la pursisimpluvama@yahoo.com sau telefonic la +40 736 906 545."
          ]
        },
        {
          id: "privacy",
          title: "Politica de confidentialitate (GDPR)",
          paragraphs: [
            "Operatorul datelor cu caracter personal procesate prin acest website este PURSISIMPLU VAMA VECHE SRL.",
            "Datele sunt colectate exclusiv pentru administrarea rezervarilor, procesarea platilor, comunicarea confirmarilor si respectarea obligatiilor legale aplicabile activitatii de cazare."
          ],
          bullets: [
            "Date procesate: nume, prenume, email, numar de telefon, oras, judet, cod postal, adresa si detalii despre rezervare.",
            "Scopuri: creare si administrare rezervari, procesare plati, transmitere confirmari, asistenta clienti si evidenta comerciala si fiscala.",
            "Temeiuri: executarea contractului, obligatii legale si interes legitim pentru administrarea relatiilor cu clientii.",
            "Parteneri implicati: NETOPIA Payments pentru plata online, Mailgun pentru emailurile tranzactionale si furnizorii de infrastructura necesari functionarii website-ului.",
            "Datele sunt pastrate atat timp cat este necesar pentru executarea rezervarii si pentru obligatiile contabile sau legale aferente.",
            "Persoanele vizate pot solicita acces, rectificare, stergere, restrictionare, opozitie sau portabilitate prin email la pursisimpluvama@yahoo.com si pot depune plangere la ANSPDCP."
          ]
        },
        {
          id: "company",
          title: "Date complete ale companiei",
          paragraphs: [
            "Informatiile de identificare ale comerciantului sunt afisate mai jos, conform cerintelor pentru platile online."
          ],
          bullets: [
            "Denumire companie: PURSISIMPLU VAMA VECHE SRL",
            "Adresa sediului social: Jud. Olt, Slatina, Str. Livezi 5",
            "CUI: 45359420",
            "Nr. Registrul Comertului: J2021001230285",
            "Telefon: +40 736 906 545",
            "Email: pursisimpluvama@yahoo.com"
          ]
        }
      ]
    },
    en: {
      footerEyebrow: "Booking and payment",
      footerTitle: "Essential information for stay, payment, and policies",
      footerLead: "Review the commercial terms, cancellation rules, and company details before completing online payment.",
      footerLinks: [
        { id: "services", label: "Rooms and services" },
        { id: "terms", label: "Terms and conditions" },
        { id: "delivery", label: "Delivery and cancellation" },
        { id: "privacy", label: "Privacy" },
        { id: "company", label: "Company details" }
      ],
      securePaymentsLabel: "Secure online payments via",
      consumerProtectionLabel: "Consumer protection",
      companySummaryLabel: "Website operator",
      modalTitle: "Booking and payment information",
      modalClose: "Close",
      sections: [
        {
          id: "services",
          title: "Rooms and services",
          paragraphs: [
            "This website supports direct booking for the available rooms in the property and shows the total stay amount before payment starts.",
            "The services sold through the website are accommodation services provided by Pur si Simplu during the booked stay period."
          ],
          bullets: [
            "20 x Double Rooms with Garden View - rooms for up to 2 guests with garden view.",
            "10 x Twin Rooms with Garden View - rooms for up to 2 guests with two separate beds and garden view.",
            "Extra beds are not available.",
            "Pets are accepted.",
            "Vacation cards are accepted.",
            "The final price is calculated for the selected stay and shown before the guest is redirected to payment."
          ]
        },
        {
          id: "terms",
          title: "Terms and conditions",
          paragraphs: [
            "The guest may pay online by bank card through Netopia (Visa, Maestro, Mastercard) or may choose to pay on arrival at the property reception.",
            "The reception is not open around the clock; staff are usually present when guests arrive."
          ],
          bullets: [
            "Check-in: 16:00-23:00, or earlier depending on availability.",
            "Check-out: by 12:00.",
            "Quiet hours are between 22:00 and 08:00.",
            "A booking is considered complete after it is confirmed in the system and, where applicable, after online payment is confirmed.",
            "By completing a booking, the guest confirms that the submitted information is accurate and accepts the commercial terms shown on the website."
          ]
        },
        {
          id: "delivery",
          title: "Delivery, cancellation, and refunds",
          paragraphs: [
            "For this website, delivery means booking confirmation and the actual accommodation service provided during the stay selected by the guest.",
            "Booking confirmation is displayed on the website and may also be sent by email to the address entered in the booking form."
          ],
          bullets: [
            "Delivery method: electronic confirmation on the website and by email, followed by accommodation service at the property.",
            "Estimated confirmation timing: immediately after online payment is confirmed or after a pay-on-arrival booking is registered.",
            "Specific conditions: the service is provided at the accommodation unit during the check-in window of the confirmed booking.",
            "Flexible policy: no fee is charged if the booking is cancelled at least 30 days before arrival.",
            "Non-refundable policy: if the booking is cancelled, modified, or the guest does not show up, the total booking price is charged.",
            "Cancellation procedure: cancellation or change requests should be sent by email to pursisimpluvama@yahoo.com or by phone at +40 736 906 545."
          ]
        },
        {
          id: "privacy",
          title: "Privacy policy (GDPR)",
          paragraphs: [
            "The controller of the personal data processed through this website is PURSISIMPLU VAMA VECHE SRL.",
            "Data is collected only for booking management, payment processing, confirmation delivery, and compliance with legal obligations related to the accommodation business."
          ],
          bullets: [
            "Processed data: first name, last name, email, phone number, city, state, postal code, address, and booking details.",
            "Purposes: creating and managing bookings, processing payments, sending confirmations, customer support, and commercial or fiscal record keeping.",
            "Legal bases: contract performance, legal obligations, and legitimate interest in administering customer relations.",
            "Processors involved: NETOPIA Payments for online payments, Mailgun for transactional emails, and the infrastructure providers required to operate the website.",
            "Data is retained only for as long as needed to perform the booking and meet accounting or legal obligations.",
            "Data subjects may request access, rectification, deletion, restriction, objection, or portability by email at pursisimpluvama@yahoo.com and may also lodge a complaint with the Romanian DPA (ANSPDCP)."
          ]
        },
        {
          id: "company",
          title: "Full company details",
          paragraphs: [
            "The merchant identification details are listed below in line with online payment requirements."
          ],
          bullets: [
            "Company name: PURSISIMPLU VAMA VECHE SRL",
            "Registered office: Jud. Olt, Slatina, Str. Livezi 5",
            "Tax ID: 45359420",
            "Trade Register number: J2021001230285",
            "Phone: +40 736 906 545",
            "Email: pursisimpluvama@yahoo.com"
          ]
        }
      ]
    }
  }
};
