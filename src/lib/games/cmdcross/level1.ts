export const LEVEL_1_GRID = {
    // 8x8 Grid
    rows: 8,
    cols: 8,
    words: [
        {
            id: 1,
            word: "PING",
            direction: "horizontal", // or vertical
            row: 1,
            col: 1, // 0-indexed? Let's use 0-indexed logic in code but maybe 1 in data if easier. Using 0.
            clue: "Send ICMP ECHO_REQUEST to network hosts",
            solved: false
        },
        {
            id: 2,
            word: "NMAP",
            direction: "vertical",
            row: 1,
            col: 3, // Intersects PING at 'N' (PING is at 1,1 -> 1,2='I', 1,3='N', 1,4='G')? No PING is 0,1,2,3 length. PING start 1,1 -> P(1,1), I(1,2), N(1,3), G(1,4).
            // NMAP start 1,3 -> N(1,3), M(2,3), A(3,3), P(4,3).
            clue: "Network exploration tool and security / port scanner",
            solved: false
        },
        {
            id: 3,
            word: "MAN",
            direction: "horizontal",
            row: 2,
            col: 3, // M from NMAP is at 2,3. So MAN starts 2,3 -> M(2,3), A(2,4), N(2,5).
            clue: "System reference manuals interface",
            solved: false
        },
        {
            id: 4,
            word: "GREP",
            direction: "vertical",
            row: 0,
            col: 6,
            clue: "Print lines corresponding to a pattern",
            solved: false
        }
    ]
};

// Map logical grid to display cells
// We need a helper to generate the cell map from this data.
export function generateCellMap(level: any) {
    let map = Array(level.rows).fill(null).map(() => Array(level.cols).fill(null));

    level.words.forEach(w => {
        let r = w.row;
        let c = w.col;
        for (let i = 0; i < w.word.length; i++) {
            if (!map[r][c]) {
                map[r][c] = { letter: '', correct: w.word[i], words: [] }; // letter=user input
            }
            map[r][c].words.push(w.id);
            // Move
            if (w.direction === 'horizontal') c++;
            else r++;
        }
    });
    return map;
}
