# Domande aperte al cliente

Ordinate per urgenza. Le prime cinque hanno effetto su cosa si scrive nelle
prossime due settimane. Aggiornare la colonna *Stato* man mano che arrivano le
risposte, e chiudere la domanda citando il documento o la mail che la risolve.

| # | Domanda | Perché blocca | Impatto sul codice | Stato |
| --- | --- | --- | --- | --- |
| 1 | A quale prototipo rimanda il documento di requisiti, e possiamo averlo? Codice, build eseguibile, o l'insieme completo delle schermate. | Otto rimandi nel documento, sempre per la parte che il documento non descrive. | Impianto di navigazione, Visualizza Esito, moduli di controllo, aggiornamento e disinstallazione: cinque schermate a specifica `assente`. | aperta |
| 2 | Le operazioni sull'ambiente di sicurezza restano sulla postazione o passano lato server? Su quale canale transita la password di protezione dei PKCS#12? | Determina il modello di sicurezza, non solo l'architettura. | `services/security-env.ts` resta a sola ispezione finché non c'è risposta. Card Sicurezza, Autentica, Firma, Apri ricevute. | aperta |
| 3 | Chi esegue quali righe del piano di dettaglio? In particolare la macro fase 3 (business logic) e la 6 (pacchetti di installazione). | Il piano non ha colonna di responsabile. | Nessuno diretto, ma precede qualunque conferma di stima. | aperta |
| 4 | Quando arrivano il contratto dei servizi REST e un ambiente di simulazione? | Nel piano la definizione chiude il 30/09, l'integrazione parte il 12/10. | La bozza dal lato consumatore è in `src/renderer/lib/rest/contract.ts`. Quando arriva il contratto vero si aggiunge `http-adapter.ts`. | aperta |
| 5 | Come otteniamo l'elenco dei tipi e delle categorie di documento, e con quale criterio si popola? | Oggi dipende dai moduli di controllo installati; è anche il meccanismo che riconosce il tipo dal file. | Tre menu a tendina dinamici: Annulla, Controlla singolo file, Controlla fornitura. | aperta |
| 6 | Esistono documentazione, esempi HTML o sorgenti SCSS del kit 5.2.2? Quali sono i termini di licenza del layer Sogei e dei loghi istituzionali? | Il markup dei 33 componenti è ricostruibile solo leggendo i selettori. | `/catalogo` è la nostra ricostruzione: allegarla alla domanda. | aperta |
| 7 | Possiamo avere il manuale della componente File Internet (profilo Fisconline) e i file di properties di localizzazione dell'applicazione attuale? | Il manuale disponibile copre solo Entratel. Le properties servono anche come base per l'inglese. | Nessuna funzionalità è oggi esclusiva di Fisconline in `navigation.ts`: se il manuale ne rivela, va aggiunto `SOLO_FISCONLINE`. Le properties popolano `i18n/locales/`. | aperta |
| 8 | Qual è la regola di nomenclatura dei file da firmare, per tipo di documento? | La validazione è dichiarata bloccante nel manuale ma la regola non è scritta. | Funzione Firma File. | aperta |
| 9 | Le voci «per ora non attiva» devono comparire disabilitate, portare a una pagina vuota, o non comparire? | Tre voci più l'elenco delle componenti di business. | Oggi compaiono disabilitate: è la scelta reversibile. Cambia `FeatureCard` e `AreaPage`. | aperta |
| 10 | Qual è la lunghezza massima della password di protezione, 15 o 20 caratteri? | Guida cap. 5.1.2 dice 20, cap. 6.2 e manuale dicono 15. | Adottato 15. Cambiare `SECRET_RULES.passwordProtezioneMax` in `constants.ts` e la riga corrispondente nel self-check. | aperta |
| 11 | Qual è la matrice di sistemi operativi e versioni minime? I test su VM senza privilegi confermano il vincolo «no admin»? | Il piano prevede pacchetti a 64 bit per tre sistemi. | `electron-builder.yml` è già `perMachine: false`. Da confermare la webview minima: il kit usa `:has()`, `conic-gradient`, `@property`. | aperta |
| 12 | Che cosa succede ai dati che l'utente ha già in locale: aree di lavoro, archivi, storico su Derby, utenze locali? | Nessun documento nomina la migrazione. | Oggi lo Storico parte vuoto su SQLite. | aperta |
| 13 | La configurazione proxy va replicata come oggi (per schema, con esclusioni) o semplificata a un solo proxy locale? | Il requisito dice meno di quanto fa il Desktop attuale. | `ProxyConfig` in `types.ts` tiene per ora il modello ampio. | aperta |
| 14 | Chi firma la dichiarazione di accessibilità e con quale verifica? | Il kit non dichiara conformità e i componenti custom non hanno gestione ARIA. | Criteri di accettazione. Lo skip link e gli attributi ARIA dei wrapper sono già nostri. | aperta |
| 15 | Le sette date di fine nel 2024 e il roll up delle macro fasi 3 e 4 sono errori di trascrizione? Possiamo lavorare su una versione corretta del piano? | Da porre come verifica, non come rilievo. | Nessuno. | aperta |

## Incoerenze già risolte in codice, da confermare

| Incoerenza | Scelta adottata | Dove |
| --- | --- | --- |
| Tre nomi per lo stesso profilo: Fisconline, Fileinternet, Fiscoline; il manuale dice «Applicazione FILE INTERNET» | Nome canonico **Fisconline** | `domain/profile.ts` |
| Password di protezione 15 vs 20 caratteri | 15, il più restrittivo | `domain/constants.ts` |
| Il requisito manda al «capitolo 6.1 di guida.pdf» sia per Visualizza Certificati sia per Cambia Password | Cambia Password è il **6.2** | `domain/navigation.ts` |
| Non esiste un paragrafo «Genera Ambiente»: il 5.1 è «Funzione Imposta Ambiente» | Annotato nella fonte | `domain/navigation.ts` |
| I requisiti citano `Manuale_Utente_Entratel.pdf`, il file consegnato è `Manuale_Utente_Entrate.pdf` | Stesso documento | — |
| «Invia File File» nel requisito | Refuso: **Invia file** | `i18n/locales/` |
