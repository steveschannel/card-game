from graphene_django import DjangoObjectType

from game.models import Deck


class DeckType(DjangoObjectType):
    class Meta:
        model = Deck
