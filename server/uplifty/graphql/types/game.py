from graphene_django import DjangoObjectType

from game.models import Game


class GameType(DjangoObjectType):
    class Meta:
        model = Game
