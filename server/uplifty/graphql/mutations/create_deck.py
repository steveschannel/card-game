import graphene

from game.models import Deck

from ..types.deck import DeckType


class CreateDeck(graphene.Mutation):
    deck = graphene.Field(DeckType)

    class Arguments:
        title = graphene.String()

    class Meta:
        description = "Create a card. Any card."

    def mutate(self, info, title):

        user = info.context.user

        new_deck = Deck(user=user, title=title)
        new_deck.save()

        return CreateDeck(deck=new_deck)
