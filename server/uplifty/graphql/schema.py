from datetime import datetime, timedelta

import graphene

from game.models import Card, Deck, Game

from .mutations.create_card import CreateCard
from .mutations.create_deck import CreateDeck
from .mutations.create_user import CreateUser
from .mutations.deal_five import DealFive
from .mutations.delete_card import DeleteCard
from .mutations.delete_deck import DeleteDeck
from .mutations.login_user import LoginUser
from .mutations.logout_user import LogoutUser
from .mutations.reset_game import ResetGame
from .mutations.resume_game import ResumeGame
from .mutations.start_game import StartGame
from .queries.resume_status import ResumeStatus
from .types.card import CardType
from .types.deck import DeckType
from .types.game import GameType
from .types.user import User as UserType


class Query(graphene.ObjectType):
    """Queries specific to uplifty app."""

    class Meta:
        abstract = True

    me = graphene.Field(UserType)
    all_cards = graphene.List(CardType)
    card = graphene.Field(CardType, card_id=graphene.Int())
    decks = graphene.List(DeckType)
    deck = graphene.List(CardType, deck_id=graphene.Int())
    can_resume_last_game = graphene.Boolean()
    history = graphene.List(GameType, range=graphene.Int())

    def resolve_me(self, info, **kwargs):
        """Return the current logged in user."""
        return info.context.user

    def resolve_can_resume_last_game(self, info, **kwargs):
        return ResumeStatus(info)

    def resolve_history(self, info, range):
        now = datetime.now()
        timeframe = now - timedelta(hours=range)
        return Game.objects.filter(timestamp__range=(timeframe, now))

    def resolve_all_cards(self, info, **kwargs):
        return Card.objects.all()

    def resolve_card(self, info, card_id, **kwargs):
        return Card.objects.get(id=card_id)

    def resolve_decks(self, info):
        return Deck.objects.filter(user=info.context.user)

    def resolve_deck(self, info, deck_id):
        deck = Deck.objects.get(pk=deck_id)
        return deck.cards.all()


class Mutation(graphene.ObjectType):
    """Mutations specific to uplifty app."""

    class Meta:
        abstract = True

    logout_user = LogoutUser.Field(description="Log the user out.")
    create_card = CreateCard.Field(description="Create a card.")
    delete_card = DeleteCard.Field(description="Delete a card.")
    delete_deck = DeleteDeck.Field(description="Create a deck.")
    create_user = CreateUser.Field(description="Register")
    create_deck = CreateDeck.Field(description="Create a deck.")
    login_user = LoginUser.Field(description="Login.")
    start_game = StartGame.Field(description="Start a new gane.")
    resume_game = ResumeGame.Field(description="Resume last game.")
    deal_five = DealFive.Field(description="Deal 5 cards")
    reset_game = ResetGame.Field(description="Reset current game")
