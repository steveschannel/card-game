import graphene
from django.contrib.auth.models import User

from game.models import Deck

from ..types.user import User as UserType
from ..utils.create_standard_deck import CreateStandardDeck


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String()
        username = graphene.String()
        password = graphene.String()

    class Meta:
        description = "Create a new user."

    def mutate(self, info, username, email, password):
        new_user = User.objects.create_user(username, email, password)
        new_user.save()

        new_deck = Deck(user=new_user, title="Deck")
        new_deck.save()

        CreateStandardDeck(new_deck)

        return CreateUser(user=new_user)
