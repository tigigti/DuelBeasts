export const drawCard = (G, ctx, player, amount = 1) => {
    for (let i = 0; i < amount; i++) {
        if (G.players[player].deck.length != 0) {
            let card = G.players[player].deck.pop();
            G.players[player].hand.push(card);
        }
    }
};
