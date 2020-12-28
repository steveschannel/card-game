

def VerifySession(game, user, deck):
    if not game.outcome == "U":
        raise Exception("Game has ended")

    if not game.user == user:
        raise Exception("Invalid user")

    return True
