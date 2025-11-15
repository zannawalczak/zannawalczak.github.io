document.addEventListener('DOMContentLoaded', function() {
      
  const form = document.getElementById('rejestracjaForm');

  // --- GŁÓWNY LISTENER DLA SUBMIT ---
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Zawsze zatrzymuj domyślną akcję

    if (walidujFormularz()) {
      console.log('Formularz poprawny! Generowanie XML...');

      // 1. Zbierz dane z formularza do obiektu
      const elementy = form.elements;
      const daneDoFaktury = {
        imie: elementy['imie'].value,
        nazwisko: elementy['nazwisko'].value,
        email: elementy['email'].value,
        telefon: elementy['telefon'].value,
        miasto: elementy['miasto'].value,
        ulica: elementy['ulica'].value,
        wojewodztwo: elementy['wojewodztwo'].value,
        // ### POPRAWIONA LINIA (usunięty zły znak na końcu) ###
        kodPocztowy: elementy['kod_pocztowy'].value
      };

      // 2. Wygeneruj treść XML na podstawie tych danych
      const trescXML = generujXML(daneDoFaktury);

      // 3. Wymuś pobranie pliku "faktura.xml" przez użytkownika
      pobierzPlik('faktura.xml', trescXML);

      // 4. (Opcjonalnie) Przekieruj na stronę z podziękowaniem
      // Odkomentuj poniższą linię, jeśli chcesz przekierować
      // window.location.href = 'podziekowanie.html';
      
      alert('Rejestracja udana! Plik faktura.xml został pobrany.');

    } else {
      console.log('Formularz zawiera błędy.');
    }
  });


  // --- GŁÓWNA FUNKCJA WALIDUJĄCA ---
  function walidujFormularz() {
    czyscBledy();
    let czyPoprawny = true;
    const elementy = form.elements;

    // === Definicje Wyrażeń Regularnych (Regex) ===
    const regexLitery = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s\-]{2,}$/;
    const regexHaslo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const regexTelefon = /^\d{9}$/;
    const regexUlica = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s\.\-]{2,}$/;
    // ### DODANE: Regex dla kodu pocztowego ###
    const regexKodPocztowy = /^\d{2}-\d{3}$/;

    // --- Walidacja poszczególnych pól ---
    if (!regexLitery.test(elementy['imie'].value.trim())) {
        pokazBlad('imie', 'Imię musi zawierać co najmniej 2 litery.');
        czyPoprawny = false;
    }
    if (!regexLitery.test(elementy['nazwisko'].value.trim())) {
        pokazBlad('nazwisko', 'Nazwisko musi zawierać co najmniej 2 litery.');
        czyPoprawny = false;
    }
    if (elementy['plec'].value === "") {
        pokazBlad('plec', 'Proszę wybrać płeć.');
        czyPoprawny = false;
    }
    if (elementy['data_urodzenia'].value === "") {
        pokazBlad('data_urodzenia', 'Proszę podać datę urodzenia.');
        czyPoprawny = false;
    }
    if (!regexHaslo.test(elementy['haslo'].value)) {
        pokazBlad('haslo', 'Hasło: min. 8 znaków, 1 duża, 1 mała litera, 1 cyfra.');
        czyPoprawny = false;
    }
    if (elementy['wojewodztwo'].value === "") {
        pokazBlad('wojewodztwo', 'Proszę wybrać województwo.');
        czyPoprawny = false;
    }
    if (!regexLitery.test(elementy['miasto'].value.trim())) {
        pokazBlad('miasto', 'Miasto musi zawierać co najmniej 2 litery.');
        czyPoprawny = false;
    }
    if (!regexUlica.test(elementy['ulica'].value.trim())) {
        pokazBlad('ulica', 'Proszę podać poprawną ulicę i numer.');
        czyPoprawny = false;
    }
    
    // ### DODANA WALIDACJA KODU POCZTOWEGO ###
    if (!regexKodPocztowy.test(elementy['kod_pocztowy'].value.trim())) {
        pokazBlad('kod_pocztowy', 'Kod pocztowy musi być w formacie 00-123.');
        czyPoprawny = false;
    }
    
    if (!regexTelefon.test(elementy['telefon'].value.trim())) {
        pokazBlad('telefon', 'Telefon musi składać się z 9 cyfr.');
        czyPoprawny = false;
    }
    if (!regexEmail.test(elementy['email'].value.trim())) {
        pokazBlad('email', 'Proszę podać poprawny adres e-mail.');
        czyPoprawny = false;
    }
    if (elementy['prawo_jazdy'].value === "") {
        pokazBlad('prawo_jazdy', 'Proszę zaznaczyć opcję.');
        czyPoprawny = false;
    }
    
    return czyPoprawny;
  }

  /**
   * ### GENERATOR XML (POPRAWIONE WCIĘCIA) ###
   * Tworzy string XML pasujący do Twojego pliku XSLT.
   */
  function generujXML(daneFormularza) {
    
    const esc = (str) => {
        if (typeof str !== 'string') str = String(str);
        return str.replace(/[<>&"']/g, c => ({
            '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'
        }[c]));
    };

    const sprzedawca = {
        nazwa: "Twoja Firma Sp. z o.o.",
        ulica: "Ulica Firmowa 1/2",
        zip: "00-123",
        miasto: "Warszawa"
    };

    const dzis = new Date();
    const naglowek = {
        numer: `FV/${dzis.getFullYear()}/123`,
        dzien: dzis.getDate().toString().padStart(2, '0'),
        miesiac: (dzis.getMonth() + 1).toString().padStart(2, '0'),
        rok: dzis.getFullYear()
    };

    const nabywca = {
        nazwa: `${daneFormularza.imie} ${daneFormularza.nazwisko}`,
        ulica: daneFormularza.ulica,
        zip: daneFormularza.kodPocztowy, // <-- POBIERANE Z FORMULARZA
        miasto: daneFormularza.miasto
    };

    const pozycje = [
        { nazwa: "Opłata rejestracyjna", miara: "szt.", ilosc: 1, cena: 150.00 }
    ];

    // WAŻNE: WCIĘCIA POPRAWIONE NA ZWYKŁE SPACJE
    let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://zannawalczak.github.io/faktura.xsl"?>
<invoice>
    <header>
        <invoiceNumber>${esc(naglowek.numer)}</invoiceNumber>
        <day>${esc(naglowek.dzien)}</day>
        <month>${esc(naglowek.miesiac)}</month>
        <year>${esc(naglowek.rok)}</year>
    </header>
    <seller>
        <name>${esc(sprzedawca.nazwa)}</name>
        <street>${esc(sprzedawca.ulica)}</street>
        <zip>${esc(sprzedawca.zip)}</zip>
        <city>${esc(sprzedawca.miasto)}</city>
    </seller>
    <buyer>
        <name>${esc(nabywcy.nazwa)}</name>
        <street>${esc(nabywcy.ulica)}</street>
        <zip>${esc(nabywcy.zip)}</zip>
        <city>${esc(nabywcy.miasto)}</city>
    </buyer>
    <items>
`;
    pozycje.forEach(item => {
        xmlString += `
        <item>
            <name>${esc(item.nazwa)}</name>
            <unit>${esc(item.miara)}</unit>
            <quantity>${item.ilosc}</quantity>
            <price>${item.cena.toFixed(2)}</price>
        </item>`;
    });

    xmlString += `
    </items>
</invoice>`;

    return xmlString;
  }

  /**
   * Funkcja wymuszająca pobranie pliku przez przeglądarkę.
   */
  function pobierzPlik(nazwaPliku, tresc) {
    const blob = new Blob([tresc], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nazwaPliku;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- Funkcje Pomocnicze do pokazywania/czyszczenia błędów ---
  function pokazBlad(nazwaPola, wiadomosc) {
    const errorElement = document.getElementById(nazwaPola + '-error');
    errorElement.textContent = wiadomosc;
    errorElement.style.display = 'block';
    const pole = form.elements[nazwaPola];
    if (pole.type === 'radio') {
        const grupa = pole[0].closest('.grupa-radio');
        if (grupa) grupa.classList.add('invalid');
    } else {
        pole.classList.add('invalid');
    }
  }

  function czyscBledy() {
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
    document.querySelectorAll('input, select, textarea, .grupa-radio').forEach(el => {
      el.classList.remove('invalid');
    });
  }

});
