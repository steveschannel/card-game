
import graphene

from game.models import Game

from ..types.game import GameType
from ..utils.count_cards import CountCards


class ResetGame(graphene.Mutation):
    game = graphene.Field(GameType)
    unplayed_count = graphene.Int()
    total_count = graphene.Int()

    class Meta:
        description = "Reset game."

    def mutate(self, info):

        if info.context.session.get("game"):
            game_id = info.context.session["game"]
        else:
            raise Exception("No game.")

        game = Game.objects.get(pk=game_id)
        deck = game.active_deck
        deck.cards.update(dealt=False)

        if not game.outcome == "U":
            raise Exception("Game has ended.")

        if not game:
            raise Exception("Invalid game")

        if not game.user == info.context.user:
            raise Exception("Invalid user")

        unplayed_ids = deck.cards.values_list("id", flat=True)

        if game.game_can_lose == True:
            info.context.session["unplayed"] = list(unplayed_ids)

        else:
            ace_in_the_hole_id = deck.cards.filter(value="Ace").first().id
            info.context.session["ace"] = ace_in_the_hole_id
            info.context.session["unplayed"] = list(unplayed_ids.exclude(pk=ace_in_the_hole_id))

        CountCards(info.context.session, game, deck)

        info.context.session["totalCount"] = info.context.session["unplayedCount"]

        return ResetGame(
            game=game,
            unplayed_count=info.context.session["unplayedCount"],
            total_count=info.context.session["totalCount"],
        )
