import random

import graphene

from game.models import Card, Game

from ..types.card import CardType
from ..types.game import GameType
from ..utils.count_cards import CountCards
from ..utils.set_session_variables import SetSessionVariables
from ..utils.verify_session import VerifySession


class DealFive(graphene.Mutation):
    deck = graphene.List(CardType)
    game = graphene.Field(GameType)
    outcome = graphene.String()
    unplayed_count = graphene.Int()
    total_count = graphene.Int()

    class Arguments:
        game_id = graphene.Int()

    class Meta:
        description = "Create a new game."

    def mutate(self, info, game_id):

        user = info.context.user

        if not Game.objects.filter(pk=game_id, user=user).exists():
            raise Exception("Invalid game")

        game = Game.objects.filter(pk=game_id).first()
        deck = game.active_deck

        VerifySession(game, user, deck)
        SetSessionVariables(info.context.session, game_id, game, deck)

        unplayed_ids = info.context.session["unplayed"]

        try:
            deal = random.sample(unplayed_ids, 5)
            outcome = "No Victor"
        except:
            deal = unplayed_ids

            if game.game_can_lose == False:
                deal.append(info.context.session["ace"])

            if Card.objects.filter(pk__in=unplayed_ids, value="Ace").exists():
                game.outcome = "W"
                game.save()
                outcome = "You Win"
            else:
                if game.game_can_lose == False:
                    game.outcome = "W"
                    game.save()
                    outcome = "You Win"
                else:
                    game.outcome = "L"
                    game.save()
                    outcome = "You Lose, Sucker"

        dealt_cards = Card.objects.filter(pk__in=deal)
        dealt_cards.update(dealt=True)

        CountCards(info.context.session, game, deck)

        return DealFive(
            deck=dealt_cards,
            game=game,
            outcome=outcome,
            unplayed_count=info.context.session["unplayedCount"],
            total_count=info.context.session["totalCount"],
        )
