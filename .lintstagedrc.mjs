// Gate di lint al commit.
//
// lint-staged è usato qui solo come FILTRO: "questo commit tocca TypeScript?".
// Il comando che lancia è il lint di progetto, non per-file. Restituire una
// stringa dalla funzione è ciò che impedisce a lint-staged di appendere i nomi
// dei file staged.
//
// Full-project è deliberato: il linting type-aware (parserOptions.projectService)
// ricostruisce comunque l'intero programma TS, quindi lintare solo i file staged
// risparmia poco e aggiunge casi limite. lint-staged mette in stash le modifiche
// non staged, così il lint vede l'albero esattamente come verrà committato.
export default {
  "*.{ts,tsx}": () => "npm run lint",
};
