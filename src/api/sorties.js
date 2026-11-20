// API simulée des sorties, sans Internet. Se comporte comme un vrai serveur :
// délais, erreurs, réponses qui arrivent dans le désordre.
import { sorties } from "../data/sorties";

// Mode de la liste : "succes" | "lent" | "vide" | "erreur500"
// L'erreur 500 est ponctuelle : la requête suivante réussit (pour tester « Réessayer »).
export const MODES = ["succes", "lent", "vide", "erreur500"];
let mode = "succes";
export function choisirMode(m) { mode = m; }
export function modeActuel() { return mode; }

function attendre(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Imite fetch : une « réponse » avec ok, status et json()
function reponse(status, data) {
  return { ok: status >= 200 && status < 300, status, json: async () => data };
}

// Tous les éléments (dépend du mode)
export async function chargerSorties() {
  const m = mode;
  if (mode === "erreur500") mode = "succes";
  await attendre(m === "lent" ? 3000 : 600);
  const res = m === "erreur500" ? reponse(500, { message: "Erreur serveur" }) : reponse(200, m === "vide" ? [] : sorties);
  if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
  return res.json();
}

// Un élément par son id. Id inconnu → erreur 404.
export async function chargerSortie(id) {
  await attendre(400);
  const element = sorties.find((r) => r.id === id);
  const res = element ? reponse(200, element) : reponse(404, { message: "Sortie introuvable" });
  if (!res.ok) throw new Error(res.status === 404 ? "introuvable" : `Erreur HTTP ${res.status}`);
  return res.json();
}

// Éléments d'une catégorie (voir CATEGORIES dans les données, ou "Toutes").
// Le délai est ALÉATOIRE (100 à 1 500 ms) : les réponses peuvent arriver dans le désordre.
export async function rechercherParCategorie(categorie) {
  await attendre(100 + Math.random() * 1400);
  return categorie === "Toutes" ? sorties : sorties.filter((r) => r.categorie === categorie);
}
