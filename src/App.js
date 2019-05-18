import React from "react";
import "./App.css";

import UI from "./UI";

import { Client } from "boardgame.io/react";
import { Game } from "boardgame.io/core";
import { drawCard } from "./GameLogic";

const DuelBeasts = Game({
    name: "Duel Beasts",
    setup: () => ({
        players: [
            {
                deck: [1, 2, 3, 4, 5],
                hand: [6, 7],
                board: [{ trigger: "standby" }],
                grave: [],
                extraDeck: [],
                hp: 80,
                mana: 0
            },
            {
                deck: [],
                hand: [],
                board: [{ trigger: "standby" }],
                grave: [],
                extraDeck: [],
                hp: 80,
                mana: 0
            }
        ]
    }),

    moves: {
        drawCard: drawCard,

        shuffleDeck: (G, ctx, player) => {
            let shuffledDeck = [];
            while (G.players[player].deck.length != 0) {
                const position = Math.floor(Math.random() * G.players[player].deck.length);
                let card = G.players[player].deck.splice(position, 1);
                shuffledDeck.push(...card);
            }
            G.players[player].deck = shuffledDeck;
        },

        playCard: (G, ctx, card) => {}
    },

    flow: {
        startingPhase: "draw",

        phases: {
            draw: {
                allowedMoves: ["drawCard"],
                onPhaseBegin: (G, ctx) => {
                    // Reset Mana, Draw and go to Standy Phase
                    G.players[ctx.currentPlayer].mana = 4;
                    drawCard(G, ctx, ctx.currentPlayer);
                    ctx.events.endPhase();
                },
                next: "standbyPhase"
            },
            standbyPhase: {
                next: "mainPhase",
                endPhaseIf: G => {
                    // Function has to look something like this.
                    // Come back to this once Card have a correct structure!
                    let boardEffects = [];
                    let graveEffects = [];
                    for (let i = 0; i <= 1; i++) {
                        G.players[i].board.forEach(card => {
                            if (card.trigger == "standby") {
                                boardEffects.push(card);
                            }
                        });
                    }
                    return boardEffects.length + graveEffects.length > 0;
                }
            },
            mainPhase: {
            }
        }
    }
});

const App = Client({ game: DuelBeasts, board: UI, numPlayers: 2 }); // debug: false

export default App;
