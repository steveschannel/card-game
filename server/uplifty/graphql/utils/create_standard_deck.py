from game.models import Card


def CreateStandardDeck(deck):
    suits = ["S", "H", "C", "D"]
    values = [
        "Ace",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Jack",
        "Queen",
        "King",
    ]

    for suit in suits:
        for value in values:
            new_card = Card(suit=suit, value=value, deck=deck)
            new_card.save()
