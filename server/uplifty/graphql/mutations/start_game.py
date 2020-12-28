from datetime import datetime

import graphene

from game.models import Deck, Game

from ..types.card import CardType
from ..types.game import GameType
from ..utils.count_cards import CountCards
from ..utils.set_session_variables import SetSessionVariables


class StartGame(graphene.Mutation):
    deck = graphene.List(CardType)
    game = graphene.Field(GameType)
    unplayed_count = graphene.Int()
    total_count = graphene.Int()

    class Arguments:
        difficulty = graphene.Boolean()
        deck = graphene.Int()

    class Meta:
        description = "Create a new game."

    def mutate(self, info, difficulty, deck):
        user = info.context.user
        deck = Deck.objects.get(pk=deck)

        if deck.user != info.context.user:
            raise Exception("Invalid deck.")

        deck.cards.all().update(dealt=False)

        if difficulty == False:
            if not deck.cards.filter(value="Ace").exists():
                raise Exception("This game cant be rigged with the selected deck.")

        new_game = Game.objects.create(
            user=user,
            timestamp=datetime.now(),
            active_deck=deck,
            game_can_lose=difficulty,
            outcome="U",
        )

        SetSessionVariables(info.context.session, new_game.id, new_game, deck)
        CountCards(info.context.session, new_game, deck)

        info.context.session["totalCount"] = info.context.session["unplayedCount"]

        return StartGame(
            game=new_game,
            unplayed_count=info.context.session["unplayedCount"],
            total_count=info.context.session["totalCount"],
        )
