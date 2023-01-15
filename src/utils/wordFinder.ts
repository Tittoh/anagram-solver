/* eslint-disable */
interface TrieNode {
    children: { [key: string]: TrieNode };
    isWord: boolean;
}

/**
 * Creates a new Trie node
 */
const createTrieNode = (): TrieNode => {
    return {
        children: {},
        isWord: false
    };
};

/**
 * Inserts a word into the Trie
 * @param root - root of the Trie
 * @param word - word to insert
 */
const insertWord = (root: TrieNode, word: string) => {
    let cursor: any = root;
    for (const letter of word) {
        // if the current letter is not in the children object
        // create a new TrieNode
        if (!cursor.children[letter]) {
            cursor.children[letter] = createTrieNode();
        }
        cursor = cursor.children[letter];
    }
    cursor.isWord = true;
};

/**
 * Builds a Trie from an array of words
 * @param words - array of words
 */
const buildTrie = (words: string[]): TrieNode => {
    const root = createTrieNode();
    words.forEach(word => insertWord(root, word));
    return root;
};

/**
 * Finds all valid words that can be formed using the given letters
 * @param node - current Trie node
 * @param letters - letters to form words with
 * @param word - current word being formed
 * @param results - valid words found
 */
const validWords = (node: any, letters: string, word: string = '', results: string[] = []): string[] => {
    if (node.isWord) {
        results.push(word);
    }
    const seen = new Set<string>();
    for (const ch of letters) {
        if (!seen.has(ch)) {
            seen.add(ch);
            if (node.children[ch]) {
                validWords(node.children[ch], letters.replace(ch, ''), word + ch, results);
            }
        }
    }
    return results;
};

/**
 * Finds all valid words that can be formed using the given letters
 * @param letters - letters to form words with
 * @param allWords - list of valid words
 */
const wordFinder = (letters: string, allWords: string[]): string[] => {
    const root = buildTrie(allWords);
    return validWords(root, letters);
};


export { wordFinder };
