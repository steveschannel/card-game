from graphene_django import DjangoObjectType

from game.models import Card


class CardType(DjangoObjectType):
    class Meta:
        model = Card
