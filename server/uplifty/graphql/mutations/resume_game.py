import graphene

from game.models import Game

from ..types.game import GameType
from ..utils.count_cards import CountCards
from ..utils.set_session_variables import SetSessionVariables


class ResumeGame(graphene.Mutation):
    game = graphene.Field(GameType)
    unplayed_count = graphene.Int()
    total_count = graphene.Int()

    class Meta:
        description = "Resume last game."

    def mutate(self, info):
        user = info.context.user

        last_game = Game.objects.filter(user=user).last()
        deck = last_game.active_deck

        if last_game.game_can_lose == False:
            if not deck.cards.filter(value="Ace", dealt=False).exists():
                raise Exception("This rigged game cant be resumed with the selected deck.")

        if not last_game.outcome == "U":
            raise Exception("Game has ended.")

        SetSessionVariables(info.context.session, last_game.id, last_game, deck)
        CountCards(info.context.session, last_game, deck)

        return ResumeGame(
            game=last_game,
            unplayed_count=info.context.session["unplayedCount"],
            total_count=info.context.session["totalCount"],
        )
