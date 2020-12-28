import graphene

from game.models import Card, Deck

from ..types.card import CardType


class CreateCard(graphene.Mutation):
    card = graphene.Field(CardType)

    class Arguments:
        value = graphene.String()
        suit = graphene.String()
        deck = graphene.Int()

    class Meta:
        description = "Create a card. Any card."

    def mutate(self, info, value, deck, suit):
        if suit not in ["H", "S", "D", "C"]:
            return CreateCard(card=None)

        try:
            associate_deck = Deck.objects.get(pk=deck, user_id=info.context.user.id)
            new_card = Card.objects.create(value=value, deck=associate_deck, suit=suit)
        except:
            new_card = None

        return CreateCard(card=new_card)
