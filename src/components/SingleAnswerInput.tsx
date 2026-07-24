import { useState } from "preact/hooks";
import "./SingleAnswerInput.css";


// Ceci est une définition de type, celui ci en particulier nous sert
// plus bas pour les props (propriétés) du composant
// placeholder?: string signifie que placeholder est string ou undefined (pas fourni)
interface SingleAnswerInputProps {
    answer: string;
    placeholder?: string;
    className?: string;
    // type d'une fonction qui prends une réponse et qui renvoie rien
    // ça permets de dire au "monde extérieur" quand des choses changent
    // on apelle ça un callback, la métaphore étant qu'on file notre "numéro"
    // et que le composant nous rapelle quand il se passe des choses
    onAnswer?: (ans: string) => void; 
}

// un composant est une fonction qui prends des propriétés
// et renvoie du "faux html" (que tu peux considérer comme du html en pratique)
// ici l'API (c'est a dire la manière dont tu utilise ça ailleurs)
// sera un composant <SingleAnswerInput answer="42"/>
/// Component for checking an answer
export default function SingleAnswerInput({
    answer,
    placeholder = "",
    className = "",
    onAnswer,
}: SingleAnswerInputProps) {
    // Mais si c'est une fonction, comment peut elle avoir un état ?
    // c'est avec ce qu'on apelle des hooks qu'on peut faire ça
    // ici on "définit une variable d'état" nomée `value`.
    // elle est associée a une fonction 
    //
    // niveau syntaxe :
    // useState renvoie un tableau de deux valeurs dont une est une fonction
    // ici on utilise la syntaxe de javascript apellée destructuration
    // pour "renommer" les deux valeurs du tableau
    const [value, setValue] = useState("");
    
    const isCorrect = 
        (v : string) => (value.trim().toLowerCase() === answer.trim().toLowerCase());

    return (
        <input
            // typiquement, pour le coté visuel des choses
            // on ajoute ou enlève des classes
            // ce qui permets de définir tout le visuel en css pur
            // ici on ajoute un long nom de classe qui a l'avantage d'être très lisible
            // mais d'autres approches sont valides
            //
            // Comme class veut dire un truc en javascript, on utilise className en jsx
            // mais c'est exactement pareil
            className={`single-answer-input ${
                // syntaxe ternaire, `X ? A : B` veut dire "si X alors A sinon B"
                isCorrect(value) ? "single-answer-input--correct" : ""
            } ${className}`}
            type="text"
            value={value}
            placeholder={placeholder}
            onInput={(event) => {
                let _val = (event.currentTarget as HTMLInputElement).value;
                setValue(_val);
                // A && B n'évalue B que si A est vrai, 
                // a part les booléens, les choses sont vraies si elles existent et fausses sinon
                // en anglais on dit "truthy" et "falsy" dans ce cas là
                // Cette syntaxe permets donc de n'utiliser onAnswer que s'il existe
                onAnswer && onAnswer(_val)
            }}
            // Pour les liseurs d'écran des malvoyants principalement :
            aria-label="Answer"
        />
    );
}