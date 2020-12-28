def CountCards(session, game, deck):
    if game.game_can_lose == True:
        session["unplayed"] = list(deck.cards.filter(dealt=False).values_list("id", flat=True))
        session["unplayedCount"] = len(session["unplayed"])
    else:
        ace_in_the_hole_id = session["ace"]
        session["unplayed"] = list(
            deck.cards.filter(dealt=False)
            .exclude(pk=ace_in_the_hole_id)
            .values_list("id", flat=True)
        )

        session["unplayedCount"] = len(session["unplayed"])

        if game.outcome == "U":
            session["unplayedCount"] += 1
