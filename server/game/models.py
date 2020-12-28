from django.conf import settings
from django.db import models


class Deck(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "title"], name="unique_user_title_pair")
        ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="decks"
    )
    title = models.CharField(max_length=50, default="Deck")


class Game(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="games"
    )
    active_deck = models.ForeignKey(Deck, on_delete=models.SET_NULL, null=True)

    WIN = "W"
    LOSS = "L"
    UNDECIDED = "U"

    POSSIBLE_OUTCOMES = [(WIN, "Won"), (LOSS, "Lost"), (UNDECIDED, "Undecided")]

    outcome = models.CharField(max_length=1, choices=POSSIBLE_OUTCOMES, default=UNDECIDED)

    # Game can be losable toggle
    game_can_lose = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)


class Card(models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name="cards")
    dealt = models.BooleanField(default=False)

    HEARTS = "H"
    SPADES = "S"
    CLUBS = "C"
    DIAMONDS = "D"

    SUITS = [(HEARTS, "Hearts"), (SPADES, "Spades"), (CLUBS, "Clubs"), (DIAMONDS, "Diamonds")]

    suit = models.CharField(max_length=1, choices=SUITS, null=False, default="S")
    value = models.CharField(max_length=5, default="Ace", null=False)

    def __str__(self):
        return "{} of {}".format(self.value, self.suit)
