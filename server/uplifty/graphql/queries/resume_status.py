from game.models import Game


def ResumeStatus(info):
    last_game = Game.objects.filter(user=info.context.user).last()

    try:
        deck = last_game.active_deck
        if last_game.game_can_lose == False:
            if not deck.cards.filter(value="Ace", dealt=False).exists():
                raise Exception("This rigged game cant be resumed with the selected deck.")

        if not last_game.outcome == "U":
            raise Exception("Game has ended.")

        return True

    except:
        return False
