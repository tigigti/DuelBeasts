import React, { Component } from "react";

const PlayerHand = ({ cards }) => {
    let handCards = cards.map((card, index) => (
        <div key={index} className="card">
            {card}
        </div>
    ));
    return <div className="player-hand">{handCards}</div>;
};

export default class UI extends Component {
    render() {
        return (
            <div className="game-wrapper">
                <div className="lp-wrapper">
                    <span>
                        {this.props.G.players[0].hp} LP / {this.props.G.players[0].mana} MP
                    </span>
                    <span>
                        {this.props.G.players[1].hp} LP / {this.props.G.players[1].mana} MP
                    </span>
                </div>
                <div>Player 1 Hand</div>
                <div className="zones">
                    <div className="decks">
                        <div>Player 1 ExtraDeck</div>
                        <div>Player 0 ExtraDeck</div>
                    </div>
                    <div className="field">
                        <div>Player 1 Board</div>
                        <div>Phases</div>
                        <div>Player 0 Board</div>
                    </div>
                    <div className="decks">
                        <div>Player 1 Deck</div>
                        <div onClick={() => this.props.moves.drawCard(0)} className="card">
                            {this.props.G.players[0].deck.length}
                        </div>
                    </div>
                </div>
                <PlayerHand cards={this.props.G.players[0].hand} />
            </div>
        );
    }
}
