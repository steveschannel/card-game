from django.contrib.auth.models import User
from django.test import TestCase

from game.models import *


class ModelTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(email="test@gmail.com", username="test", password="testing")
        deck = Deck.objects.create(user=user, title="Test Deck")
        Card.objects.create(value="Ace", suit="S", deck=deck)

    def test_user_exists(self):
        "User is created"
        test_user = User.objects.get(email="test@gmail.com")

        self.assertEqual(test_user.username, "test")

    def test_deck_exists(self):
        "Deck is created with user association"
        test_deck = Deck.objects.filter(title="Test Deck").first()
        user = User.objects.get(email="test@gmail.com")

        self.assertEqual(test_deck.title, "Test Deck")
        self.assertEqual(test_deck.user, user)

    def test_card_exists(self):
        "Card is created with deck association"
        test_deck = Deck.objects.filter(title="Test Deck").first()
        test_card = Card.objects.filter(deck=test_deck, value="Ace", suit="S").first()

        self.assertEqual(test_card.deck, test_deck)
        self.assertEqual(test_card.value, "Ace")
        self.assertEqual(test_card.suit, "S")

    def test_deck_and_card_association(self):
        "Card is created with deck association"
        test_deck = Deck.objects.filter(title="Test Deck").first()
        test_card = Card.objects.filter(deck=test_deck, value="Ace", suit="S").first()

        self.assertEqual(test_card.deck, test_deck)
        self.assertEqual(test_deck.cards.get(value="Ace"), test_card)
